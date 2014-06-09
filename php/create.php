<?php
include_once("classes/db_connect.php");

$myDbConnect = new CRUD();
$myDbConnect->dbConnect();

//$publicationDate = $_POST['publicationDate'];

$type = $_POST['type'];


if ($type === "insert"){

	$title = $_POST['title'];
	$summary = $_POST['summary'];
	$content = $_POST['content'];
	$date = $_POST['date'];

	$sql = "INSERT INTO articles (publicationDate, title, summary, content) VALUES ('" . $date . "','" . $title . "','" . $summary . "','" . $content . "')";
	  $myDbConnect->insertupdate( $sql );
	  //echo "insert";
}

if ($type === "update"){

	$title = $_POST['title'];
	$summary = $_POST['summary'];
	$content = $_POST['content'];
	$date = $_POST['date'];
	$idx = $_POST['idx'];

	// " UPDATE articles SET title = '" . $title . "' , summary = '" . $summary . "', content = '" . $content . "', publicationDate = '" . $publicationDate . "' WHERE id= '" . $idx . "' ";
	 " UPDATE articles SET title = '" . $title . "' , summary = '" . $summary . "', content = '" . $content . "', publicationDate = '" . $publicationDate . "' WHERE id= '" . $idx . "' ";

	  $myDbConnect->insertupdate( $sql );
	  //echo "insert";
}



// id | publicationDate | categoryID | title | summary | content |

?>
