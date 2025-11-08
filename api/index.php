<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

require_once 'vendor/autoload.php';
require_once 'systeme_io.php';
require_once 'mail.php';

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
$contactResult = manageContactInfos($data);
//an error happend while trying to save the contact
if (!array_key_exists('success', $contactResult)) {
    echo json_encode($contactResult);
    exit;
}

//send an email to clairelise@avancer-avec.fr
echo json_encode(sendMailToHost($data));
