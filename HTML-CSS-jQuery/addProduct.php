<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

//includes
include('./classes/DBConnect.php');


//Db Connection
$db = new DBConnect();
$conn = $db->connect();
if(!$conn)
{
    echo 'DataBase Connection Failed';
    exit(0);
}


//Getting The Payload from the User
$payload = file_get_contents('php://input');
$product = json_decode($payload, true);


$db->addProduct($conn, $product);