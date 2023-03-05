<?php



class Furniture extends Product {

    private $length, $width, $height;

    public function __construct($sku = '', $type = '', $name = '', $price = '', $jsonProperty = null)
    {
        parent::__construct($sku, $type, $name, $price);

        if($jsonProperty == null)
        {
            return;
        }
        
        $property = json_decode($jsonProperty, true);
        $this->length = $property['length'];
        $this->width = $property['width'];
        $this->height = $property['height'];
    }

    public function getLength()
    {
        return $this->length;
    }

    public function setLength($length)
    {
        $this->length = $length;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function setWidth($width)
    {
        $this->width = $width;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function setHeight($height)
    {
        $this->height = $height;
    }



    public function getSpecialProperty()
    {
        return 'Dimension: '.$this->getLength().' X '.$this->getWidth().' X '.$this->getHeight();
    }

    public function getSql()
    {
        return "INSERT INTO Products (type, name, price, height, width, length, sku) VALUES ('$this->type', '$this->name', '$this->price', '$this->height', '$this->width', '$this->length', '$this->sku')";
    }

}