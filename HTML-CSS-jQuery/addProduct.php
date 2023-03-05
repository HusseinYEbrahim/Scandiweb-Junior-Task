<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

//includes
include('./classes/DBConnect.php');
include('./classes/Product.php');
include('./classes/Book.php');
include('./classes/DVD.php');
include('./classes/Furniture.php');

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


$className = $product['type'];

//Object of the inserted Product from the Client
$productObject = new $className($product['sku'], $product['type'], $product['name'], $product['price'], $payload);

//Data Validation


$sql = $productObject->getSql();

try
{
    $conn->exec($sql);

    echo json_encode(['status' => 200]);
}
catch(PDOException $e)
{
    //The Only Exception i can meet is that of the Duplicate SKU key
    //http_response_code(500);
    echo json_encode(['status' => 201]);
    http_response_code(201);
}

