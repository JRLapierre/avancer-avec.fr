<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
    elseif ($data['formType'] == 'mailSubscription') {
        return $baseBody;
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
    if ($data['formType'] == 'mailSubscription') {
        $object = "Nouvelle inscription à \"Mes petits pas pour avancer\"";
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