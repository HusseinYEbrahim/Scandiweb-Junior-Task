<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: *');


//includes
include('./classes/DBConnect.php');
include('./classes/Product.php');
include('./classes/DVD.php');
include('./classes/Furniture.php');
include('./classes/Book.php');

//Connect to the Database
$db = new DBConnect();
$conn = $db->connect();
if(!$conn)
{
    echo 'DataBase Connection Failed';
    exit(0);
}

//Output Class Format
class FinalProduct {
    public $sku, $name, $price, $property, $type;

    public function __construct($sku, $name, $price, $property, $type)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->property = $property;
        $this->type = $type;
    }
}

//Querying the Data
$sql = "SELECT * FROM Products"; 
$stmt = $conn->query($sql);


/*

getProducts file --> Class --> fetch function



*/

$products = array();

while($row = $stmt->fetch(PDO::FETCH_CLASS | PDO::FETCH_CLASSTYPE | PDO::FETCH_PROPS_LATE))
{
    //Some Attributes are not set THIS IS DONE BY MAKING PARENT PROTECTED ATTRIBUTES TO BE SEEN WITH THE PDO_FETCH_CLASS
    array_push($products, new FinalProduct($row->getSku(), $row->getName(), $row->getPrice(), $row->getSpecialProperty(), $row->getType()));
}

//Sending JSON File 
echo json_encode($products);


//Disconnect from the Database


