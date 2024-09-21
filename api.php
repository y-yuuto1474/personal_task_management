<?php
require 'vendor/autoload.php';

use Google\Client;
use Google\Service\Sheets;

function getClient() {
    $client = new Client();
    $client->setApplicationName('Google Sheets API PHP Quickstart');
    $client->setScopes(Sheets::SPREADSHEETS);
    $client->setAuthConfig(__DIR__ . '/.env');
    return $client;
}

function getSpreadsheetData($range) {
    $client = getClient();
    $service = new Sheets($client);
    $spreadsheetId = getenv('SPREADSHEET_ID');

    $response = $service->spreadsheets_values->get($spreadsheetId, $range);
    return $response-:>getValues();
}

function updateSpreadsheetData($range, $values) {
    $client = getClient();
    $service = new Sheets($client);
    $spreadsheetId = getenv('SPREADSHEET_ID');

    $body = new Sheets\ValueRange([
        'values' => $values
    ]);
    $params = ['valueInputOption' => 'RAW'];
    $service->spreadsheets_values->update($spreadsheetId, $range, $body, $params);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    if ($action === 'getData') {
        $data = getSpreadsheetData('Sheet1!A1:B5'); // 読み取り範囲
        echo json_encode($data);
    } elseif ($action === 'updateData') {
        $values = json_decode($_POST['values'], true);
        updateSpreadsheetData('Sheet1!A1:B5', $values); // 書き込み範囲
        echo json_encode(['status' => 'success']);
    }
}
