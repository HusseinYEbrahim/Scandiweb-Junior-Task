<?php 

include('./Product.php');
include('./Book.php');
include('./DVD.php');
include('./Furniture.php');

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

class DBConnect
{

    private $dsn = "mysql:host=localhost;port=3306;dbname=scandiweb";


    public function connect()
    {
        $conn = '';
        try
        {
            $conn = new PDO($this->dsn, 'hussein', 'password');
        }
        catch(PDOException $e)
        {
            $conn ='';
        }
        return $conn;
    }


    //get data
    public getProducts($conn)
    {
        //Querying the Data
        $sql = "SELECT * FROM Products"; 
        $stmt = $conn->query($sql);
        $products = array();
        
        while($row = $stmt->fetch(PDO::FETCH_CLASS | PDO::FETCH_CLASSTYPE | PDO::FETCH_PROPS_LATE))
        {
            //Some Attributes are not set THIS IS DONE BY MAKING PARENT PROTECTED ATTRIBUTES TO BE SEEN WITH THE PDO_FETCH_CLASS
            array_push($products, new FinalProduct($row->getSku(), $row->getName(), $row->getPrice(), $row->getSpecialProperty(), $row->getType()));
        }
        
        //Sending JSON File 
        echo json_encode($products);
    }




    //insert record
    public addProduct($conn, $product)
    {
        $className = $product['type'];
        
        //Object of the inserted Product from the Client
        $productObject = new $className($product['sku'], $product['type'], $product['name'], $product['price'], $payload);
        
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


    }




    //delete records

    public function deleteProducts($conn, $listToBeDeleted)
    {
        
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
    }

}
