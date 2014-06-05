<?php
include_once("classes/db_connect.php");

$myDbConnect = new CRUD();
$myDbConnect->dbConnect();

//$publicationDate = $_POST['publicationDate'];
$title = $_POST['title'];
$summary = $_POST['summary'];
$content = $_POST['content'];
$date = $_POST['date'];

echo $content;
echo $title;
echo $summary;
echo $date;



$sql = "INSERT INTO articles (publicationDate, title, summary, content) VALUES ('" . $date . "','" . $title . "','" . $summary . "','" . $content . "')";
  $myDbConnect->insertupdate( $sql );
  //echo "insert";







// id | publicationDate | categoryID | title | summary | content |

?>
