<?php

abstract class Product {

    protected $sku, $type, $name, $price; //Protected so when Fetch_CLASS wants to set these values it can do so directly 
    //This class is abstract so we can have the attributes as protected without worries

    public function __construct($sku, $type, $name, $price)
    {
        $this->sku = $sku;
        $this->type = $type;
        $this->name = $name;
        $this->price = $price;
    }

    public function getSku()
    {
        return $this->sku;
    }

    public function setSku($sku)
    {
        $this->sku = $sku;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType($type)
    {
        $this->type = $type;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function __set($name, $value){}

    public abstract function getSpecialProperty();
}