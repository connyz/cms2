<?php
include_once("classes/db_connect.php");

$myDbConnect = new CRUD();
$myDbConnect->dbConnect();

// säkerthets variabel för att echo:a ut rätt data
$type = $_POST['type'];

if ( $type === 'thisArticle' ){
	$idx = $_POST['idx'];
	// fråga = visa all information i person
	$clickedArticle = json_encode(
	  $myDbConnect->select(
	  	 'SELECT * FROM articles WHERE id="'.$idx.'"'
	  )
);

	echo($clickedArticle);
}

// Detta är vad jag tror hur det kommer fungera ->
// Jag tror vi får ställa flera frågor här nedan sedan så på frontend kallar vi på vilka frågor som ska visas?

// fråga = visa all information i person
$show = json_encode(
  $myDbConnect->select(
    'SELECT * FROM articles'
  )
);
if ( $type === 'showAll' ){
	echo($show);
}


/*
$values = array();
$values['first'] => 1;
$values['second'] => $clickedArticle;
$values['third'] => 3;
print json_encode($values);
*/
