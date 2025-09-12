<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

require_once 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

//get the data from the form
$data = json_decode(file_get_contents('php://input'), true);

// Check if decoding was successful (should not happend unless the front is played with)
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['json_error' => 'Invalid JSON']);
    exit;
}

//save the informations in the contacts
$contactResult = manageContacts($data['email'], $data['firstName'], $data['surname']);

//an error happend while trying to save the contact
if (!array_key_exists('success', $contactResult)) {
    echo json_encode($contactResult);
    exit;
}

//send an email to clairelise@avancer-avec.fr
echo json_encode(sendMailToHost($data));

//functions -----------------------------------------------------------------------------

/**
 * Creates the body of the mail depending on the content of the datas
 * @param mixed $data the data recieved from the front
 * @return string the html body of the mail
 */
function createMailBody($data) {
    $baseBody = "
        <p><strong>Nom :</strong> {$data['firstName']} {$data['surname']}</p>
        <p><strong>Email :</strong> {$data['email']}</p>
        <hr>
    ";
    if ($data['formType'] == 'defaultMessage') {
        return $baseBody.
            "<p><strong>Message :</strong></p>
            <p>" . nl2br(htmlspecialchars($data['mailContent'])) . "</p>";
    }
    elseif ($data['formType'] == 'firstMeeting') {
        $body = $baseBody;
        foreach ($data['questions'] as $question) {
            $body .="<p><strong>".htmlspecialchars($question['question'])."</strong></p>
                <p>".nl2br(htmlspecialchars($question['answer']))."</p>";
        }
        return $body;
    }
    //should not happend
    return "error";
}

/**
 * This function sends the result of the form to clairelise@avancer-avec.fr
 * @param array $data the data from the form
 * @return array{mail_error: string}|array{success: string}
 */
function sendMailToHost($data): array {
    //custom vars
    $customBody = createMailBody($data);
    if ($customBody == "error") {
        return ["form_error" => "problème dans le formulaire"];
    }
    $object = $data['object'];
    if ($data['formType'] == 'firstMeeting') {
        $object = "demande de premier rendez-vous gratuit";
    }

    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'ssl0.ovh.net';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'clairelise@avancer-avec.fr';
        $mail->Password   = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
        $mail->CharSet = 'UTF-8';

        // Recipients
        $mail->setFrom('clairelise@avancer-avec.fr', "{$data['firstName']} {$data['surname']}");
        $mail->addAddress('clairelise@avancer-avec.fr');

        // Content
        $mail->isHTML(true);
        $mail->Subject = $object;
        $mail->Body    = $customBody;

        $mail->send();
        return ['success' => 'mail sent successfully'];
    } catch (Exception $e) {
        return ["mail_error" => $mail->ErrorInfo];
    }
}

/**
 * This function creates a contact if it does not exists, and updates it if it does exist.
 * @param string $email
 * @param string $first_name
 * @param string $surname
 * @return array{curl_error: string}|array{success: mixed}|array{systeme_io_error: string}
 */
function manageContacts(string $email, string $first_name, string $surname = ''): array {
    //initialisation
    $baseUrl = "https://api.systeme.io/api/";
    $headers = [
        "X-API-Key: ".$_ENV['SYSTEMEIO_API_KEY'],
        "accept: application/json",
    ];

    $commonCurlOptions = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        // IMPORTANT DO NOT COMMIT THESE TWO LINES UNCOMMENTED
        //CURLOPT_SSL_VERIFYPEER => false,
        //CURLOPT_SSL_VERIFYHOST => false,
    ];

    //get contact infos if exists -------------------------------------------------------
    $getOptions = $commonCurlOptions + [
        CURLOPT_URL => $baseUrl . "contacts?email=" . urlencode($email),
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => $headers
    ];

    $getResults = sendSystemIoRequest($getOptions);
    if (!array_key_exists('success', $getResults)) {return $getResults;}

    //create the fields array
    $fields = [["slug" => "first_name", "value" => $first_name]];
    if ($surname) {$fields[] = ["slug" => "surname", "value" => $surname];}

    $data = ['fields' => $fields];

    //if there is no contact found, create ----------------------------------------------
    if (empty($getResults['success']['items'])) {
        $headers[] = 'content-type: application/json';
        //prepare the data array
        $data['locale'] = 'fr';
        $data['email'] = $email;
        
        $postOptions = $commonCurlOptions + [
            CURLOPT_URL => $baseUrl."contacts",
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => $headers
        ];

        return sendSystemIoRequest($postOptions);
    }
    //if the contact already exists, look to update it. ---------------------------------
    else {
        $id = $getResults['success']['items'][0]['id'];
        $headers[] = 'content-type: application/merge-patch+json';

        $patchOptions = $commonCurlOptions + [
            CURLOPT_URL => $baseUrl . "contacts/$id",
            CURLOPT_CUSTOMREQUEST => "PATCH",
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => $headers
        ];
        
        return sendSystemIoRequest($patchOptions);
    }
}

/**
 * Sends a request to system.io, and manages the results
 * @param array $curlOptions the options array for a curl request
 * @return array{curl_error: string}|array{success: mixed}|array{systeme_io_error: string}
 */
function sendSystemIoRequest(array $curlOptions): array {
    $curl = curl_init();
    curl_setopt_array($curl, $curlOptions);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {return ["curl_error" => "request failed: $err"];}

    $results = json_decode($response, true);
    //detail is the identifier for the error messages from system.io
    if (array_key_exists('detail', $results)) {return ["systeme_io_error" => $results['detail']];}

    return ['success' => $results];
}
