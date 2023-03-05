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
//$jsonData = file_get_contents('php://input');
$jsonData = $_POST['data'];
$listToBeDeleted = $_POST['data'];


if($listToBeDeleted == null)
{
    echo 'No Data to Be Deleted';
    exit(0);
}

$sql = "DELETE FROM Products WHERE sku = :id";

$stmt = $conn->prepare($sql);

foreach($listToBeDeleted as $deletedId)
{
    $stmt->bindParam(':id', $deletedId);
    $stmt->execute();
}

http_response_code(200);
echo 'Data Deleted Successfully';









