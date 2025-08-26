<?php
//a captcha is most likely not needed
//die(); //to block the script

//get the data from the form
$json = file_get_contents('php://input');
$data = json_decode($json, true);

//TODO manage email data to send an email

$email = $data['email'] ?? null;

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.systeme.io/api/contacts",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode([
        'email' => $email,
        'locale' => 'fr'
    ]),
    CURLOPT_HTTPHEADER => [
        "X-API-Key: e6dai7b4okflm6dt5f8cbvwi4gzad0cuvcsmqjc52uacchu9unpng4npwlwlmwpw",
        "accept: application/json",
        "content-type: application/json"
    ],
    // IMPORTANT DO NOT COMMIT THESE TWO LINES UNCOMMENTED
    //CURLOPT_SSL_VERIFYPEER => false,
    //CURLOPT_SSL_VERIFYHOST => false,
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo json_encode(["curl_error" => $err]);
} else {
    echo json_encode(["systeme_io_answer" => $response]);
}
