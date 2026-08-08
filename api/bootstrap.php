<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

require_once 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();