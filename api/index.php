<?php
//a captcha is most likely not needed
//die(); //to block the script

//get the data from the form
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Check if decoding was successful (should not happend unless the front is played with)
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

echo json_encode(manageContacts($data['email'], $data['firstName'], $data['surname']));

/**
 * This function creates a contact if it does not exists, and updates it if it does exist.
 */
function manageContacts(string $email, string $first_name, string $surname = ''): array {
    //initialisation
    $baseUrl = "https://api.systeme.io/api/";
    $headers = [
        "X-API-Key: e6dai7b4okflm6dt5f8cbvwi4gzad0cuvcsmqjc52uacchu9unpng4npwlwlmwpw",
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

function sendSystemIoRequest(array $curlOptions): array {
    $curl = curl_init();
    curl_setopt_array($curl, $curlOptions);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {return ["curl_error" => "request failed: $err"];}

    $results = json_decode($response, true);
    //detail is the identifier for the error messages from system.io
    if (array_key_exists('detail', $results)) {return ["systeme_io_error" => $results];}

    return ['success' => $results];
}
