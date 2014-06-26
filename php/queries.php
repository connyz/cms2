<?php
include_once("classes/db_connect.php");

$myDbConnect = new CRUD();
$myDbConnect->dbConnect();

// Tilldela vilken typ av sql-fråga som skickats in via $_POST['type'] till variablen $type
$type = $_POST['type'];

// Kolla om $type är lika med "insert"
if ($type === "insert"){

	$title = $_POST['title'];
	$summary = $_POST['summary'];
	$content = $_POST['content'];
	$tags = $_POST['tags'];
	$date = $_POST['date'];

	$sql = "INSERT INTO articles (publicationDate, title, summary, content, categoryId, status) VALUES ('" . $date . "','" . $title . "','" . $summary . "','" . $content . "','" . $tags . "','" . "PUBLISHED" . "')";
	  $myDbConnect->insupdel( $sql );
	  //echo "insert";
}

// Kolla om $type är lika med "draftinsert"
if ($type === "draftinsert"){

	$title = $_POST['title'];
	$summary = $_POST['summary'];
	$content = $_POST['content'];
	$date = $_POST['date'];

	$sql = "INSERT INTO articles (publicationDate, title, summary, content, status) VALUES ('" . $date . "','" . $title . "','" . $summary . "','" . $content . "','" . "DRAFT" . "')";
	  $myDbConnect->insupdel( $sql );
}

// Kolla om $type är lika med "update"
if ($type === "update"){

	$title = $_POST['title'];
	$summary = $_POST['summary'];
	$content = $_POST['content'];
	$date = $_POST['date'];
	$idx = $_POST['idx'];

	$sql = "UPDATE articles SET title = '$title', summary = '$summary', content = '$content', publicationDate = '$date' WHERE id='$idx'";

  	$myDbConnect->insupdel( $sql );
}

// Kolla om $type är lika med "draftSavePublish"
if ($type === "draftSavePublish"){

	$title = $_POST['title'];
	$summary = $_POST['summary'];
	$content = $_POST['content'];
	$date = $_POST['date'];
	$idx = $_POST['idx'];

	$sql = "UPDATE articles SET title = '$title', summary = '$summary', content = '$content', publicationDate = '$date', Status='PUBLISHED' WHERE id='$idx'";

  	$myDbConnect->insupdel( $sql );
}

// Kolla om $type är lika med "saveAndUnpublish"
if ($type === "saveAndUnpublish"){

	$title = $_POST['title'];
	$summary = $_POST['summary'];
	$content = $_POST['content'];
	$date = $_POST['date'];
	$idx = $_POST['idx'];

	$sql = "UPDATE articles SET title = '$title', summary = '$summary', content = '$content', publicationDate = '$date', Status='DRAFT' WHERE id='$idx'";

  	$myDbConnect->insupdel( $sql );
}

// Kolla om $type är lika med "thisArticle"
if ( $type === "thisArticle" ){
	$idx = $_POST['idx'];
	// hämta all information från en person med id "idx"
	$clickedArticle = json_encode(
	  $myDbConnect->select(
	  	 'SELECT * FROM articles WHERE id="'.$idx.'"'
	  )
	);
	echo($clickedArticle);
}

// Kolla om $type är lika med "showAll"
if ( $type === "showAll" ){
	// fråga = visa all information i person
	$show = json_encode(
	  $myDbConnect->select(
	    'SELECT * FROM articles WHERE status="PUBLISHED" ORDER BY publicationDate DESC'
	  )
	);
	echo($show);
}

// Kolla om $type är lika med "showalldrafts"
if ( $type === "showAllDrafts" ){
	// fråga = visa all information i person
	$show = json_encode(
	  $myDbConnect->select(
	    'SELECT * FROM articles WHERE status="DRAFT" ORDER BY publicationDate DESC'
	  )
	);
	echo($show);
}

// Kolla om $type är lika med "deleteArticle", isf ta bort rad från articletabellen
if ( $type === "deleteArticle" ){
	// Set idx variable to recieved id
	$idx = $_POST['idx'];

	// Set query
	$sql = "DELETE FROM articles WHERE id='$idx'";

	// Send query
	$myDbConnect->insupdel( $sql );
}

// Kolla om $type är lika med "showAll"
if ( $type === "getTag" ){
	// fråga = visa all information i person
	$show = json_encode(
	  $myDbConnect->select(
	    'SELECT name FROM categories'
	  )
	);
	echo($show);
}

/*SELECT categories.name FROM categories LEFT JOIN articles on articles.categoryId = categories.id WHERE articles.categoryId = 1*/



/*
$values = array();
$values['first'] => 1;
$values['second'] => $clickedArticle;
$values['third'] => 3;
print json_encode($values);
*/
