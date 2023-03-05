<?php


class DVD extends Product {

    private $size;

    public function __construct($sku = '', $type = '', $name = '', $price = '', $josnProperty = null)
    {
        parent::__construct($sku, $type, $name, $price);

        if($josnProperty == null)
        {
            return;
        }

        $property = json_decode($josnProperty, true);
        $this->size = $property['size'];
    }

    public function setSize($size)
    {
        $this->size = $size;
    }

    public function getSize()
    {
        return $this->size;
    }

    public function getSpecialProperty()
    {
        return 'Size: '.$this->getSize().' MB';
    }

    public function getSql()
    {

        return "INSERT INTO Products (type, name, price, size, sku) VALUES ('$this->type', '$this->name', '$this->price', '$this->size', '$this->sku')";

    }

}