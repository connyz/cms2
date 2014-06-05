<?php
include_once("classes/db_connect.php");

$myDbConnect = new CRUD();
$myDbConnect->dbConnect();

// Detta är vad jag tror hur det kommer fungera ->
// Jag tror vi får ställa flera frågor här nedan sedan så på frontend kallar vi på vilka frågor som ska visas?

// fråga = visa all information i person
$show = json_encode(
  $myDbConnect->select(
    'SELECT * FROM articles'
  )
);
echo($show);
