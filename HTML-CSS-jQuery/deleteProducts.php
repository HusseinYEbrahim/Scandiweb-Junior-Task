<?php

http_response_code(201);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');



//includes
include('./classes/DBConnect.php');

//Connecting to the Database
$db = new DBConnect();
$conn = $db->connect();

if(!$conn)
{
    echo 'Database Connection Failed';
    exit(0);
}

//Getting the List of SKUs to be deleted
$jsonData = $_POST['data'];
$listToBeDeleted = $_POST['data'];

$db->deleteProducts($conn, $listToBeDeleted);










