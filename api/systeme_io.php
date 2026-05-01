<?php
declare(strict_types=1);

//constants
const BASE_URL = 'https://api.systeme.io/api/';
define( 'BASE_HEADER' , [
    "X-API-Key: ".$_ENV['SYSTEMEIO_API_KEY'],
    "accept: application/json",
]);
const COMMON_CURL_OPTIONS = [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    // IMPORTANT DO NOT COMMIT THESE TWO LINES UNCOMMENTED
    //CURLOPT_SSL_VERIFYPEER => false,
    //CURLOPT_SSL_VERIFYHOST => false,
];

function manageContactInfos($data) {
    $contactResult = createOrUpdateContact($data['email'], $data['firstName'], $data['surname']);
    if ($data['formType'] == 'mailSubscription' && array_key_exists('success', $contactResult)) {
        return addTagContact($contactResult['success']['id']);
    }
    return $contactResult;
}

/**
 * This function creates a contact if it does not exists, and updates it if it does exist.
 * @param string $email
 * @param string $first_name
 * @param string $surname
 * @return array{curl_error: string}|array{success: mixed}|array{systeme_io_error: string}
 */
function createOrUpdateContact(string $email, string $first_name, string $surname = ''): array {
    //check if the contact already exist
    $getResults = sendSystemeIoGetRequest($email);
    if (!array_key_exists('success', $getResults)) {return $getResults;}

    //create the fields array
    $fields = [["slug" => "first_name", "value" => $first_name]];
    if ($surname) {$fields[] = ["slug" => "surname", "value" => $surname];}
    $fieldsData = ['fields' => $fields];

    //if there is no contact found, create
    if (empty($getResults['success']['items'])) 
        return sendSystemeIoPostRequest($email, $fieldsData);
    //if the contact already exists, look to update it.
    else return sendSystemeIoPatchRequest($fieldsData, $getResults['success']['items'][0]['id']);
}

/**
 * Sends a get request to systeme.io to get the contacts
 * @param string $email
 * @return array{curl_error: string|array{success: mixed}|array{systeme_io_error: string}}
 */
function sendSystemeIoGetRequest(string $email): array {
    //get contact infos if exists
    $getOptions = COMMON_CURL_OPTIONS + [
        CURLOPT_URL => BASE_URL . "contacts?email=" . urlencode($email),
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => BASE_HEADER
    ];
    return sendSystemeIoRequest($getOptions);
}

/**
 * Sends a post request to systeme.io to create a contact
 * @param string $email
 * @param array $fieldsData
 * @return array{curl_error: string|array{success: mixed}|array{systeme_io_error: string}}
 */
function sendSystemeIoPostRequest(string $email, array $fieldsData): array {
    //prepare the data array
    $fieldsData['locale'] = 'fr';
    $fieldsData['email'] = $email;
    
    $postOptions = COMMON_CURL_OPTIONS + [
        CURLOPT_URL => BASE_URL."contacts",
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode($fieldsData),
        CURLOPT_HTTPHEADER => array_merge(BASE_HEADER, ['content-type: application/json'])
    ];
    return sendSystemeIoRequest($postOptions);
}

/**
 * Sends a patch request to systeme.io to update a contact
 * @param array $fieldsData
 * @param int $id
 * @return array{curl_error: string|array{success: mixed}|array{systeme_io_error: string}}
 */
function sendSystemeIoPatchRequest(array $fieldsData, int $id): array {
    $patchOptions = COMMON_CURL_OPTIONS + [
        CURLOPT_URL => BASE_URL . "contacts/$id",
        CURLOPT_CUSTOMREQUEST => "PATCH",
        CURLOPT_POSTFIELDS => json_encode($fieldsData),
        CURLOPT_HTTPHEADER => array_merge(BASE_HEADER, ["content-type: application/merge-patch+json"])
    ];
    return sendSystemeIoRequest($patchOptions);
}

/**
 * Assigns the tag for the campain to a contact
 * @param int $contactId
 * @return array{curl_error: string|array{success: mixed}|array{systeme_io_error: string}}
 */
function addTagContact(int $contactId) {
    $postOptions = COMMON_CURL_OPTIONS + [
        CURLOPT_URL => BASE_URL."contacts/$contactId/tags",
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode(['tagId' => (int) $_ENV['TAG_CAMPAING_ID']]),
        CURLOPT_HTTPHEADER => array_merge(BASE_HEADER, ['content-type: application/json'])
    ];
    return sendSystemeIoRequest($postOptions);
}

/**
 * Sends a request to system.io, and manages the results
 * @param array $curlOptions the options array for a curl request
 * @return array{curl_error: string}|array{success: mixed}|array{systeme_io_error: string}
 */
function sendSystemeIoRequest(array $curlOptions): array {
    $curl = curl_init();
    curl_setopt_array($curl, $curlOptions);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {return ["curl_error" => "request failed: $err"];}

    $results = json_decode($response, true);
    //detail is the identifier for the error messages from system.io
    if ($response != null && array_key_exists('detail', $results)) {return ["systeme_io_error" => $results['detail']];}

    return ['success' => $results];
}