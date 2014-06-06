<?php
class CRUD {

  public function dbConnect(){

    // Add the property DBH
    // (an instance of PDO)
    $host = "localhost";
    $dbname = "cms2";
    $user = "root";
    $pass = "";

    $this->myPDO = new PDO("mysql:host=$host;dbname=$dbname",$user,$pass);
  }

  public function select($sql){
    $query = $this->myPDO->prepare($sql);
    $query->execute();
    $result = $query->fetchAll();
    return $result;
  }

  public function insertupdate($sql){
    $query = $this->myPDO->prepare($sql);
    $query->execute();
  }
}


