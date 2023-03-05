<?php 


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




    //insert record




    //delete records

}
