<?php

class Book extends Product {

    private $weight;
    
    public function __construct($sku = null, $type = null, $name = null, $price = null, $jsonProperty = null)
    {
        parent::__construct($sku, $type, $name, $price);

        if($jsonProperty == null)
        {
            return;
        }

        $property = json_decode($jsonProperty, true);
        $this->weight = $property['weight'];
    }

    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    public function getWeight()
    {
        return $this->weight;
    }

    public function getSpecialProperty()
    {
        return 'Weight: '.$this->getWeight().' KG';
    }

    public function getSql()
    {
        return "INSERT INTO Products (type, name, price, weight, sku) VALUES ('$this->type', '$this->name', '$this->price', '$this->weight', '$this->sku')";
    }

}