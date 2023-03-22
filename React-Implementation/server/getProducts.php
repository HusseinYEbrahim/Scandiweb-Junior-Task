<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: *');


//includes
include('./classes/DBConnect.php');

//Connect to the Database
$db = new DBConnect();
$conn = $db->connect();
if(!$conn)
{
    echo 'DataBase Connection Failed';
    exit(0);
}

$db->getProducts($conn);





