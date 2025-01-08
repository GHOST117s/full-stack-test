<?php
include 'db.php';

$sql = "SELECT * FROM posts";
$result = pg_query($conn, $sql);

if (!$result) {
    echo "Error: " . pg_last_error();
} else {
    $row = pg_fetch_assoc($result);    
    echo json_encode($row);
    
    // while ($row = pg_fetch_assoc($result)) {
    //     echo "ID: " . $row['id'] . "<br>";
    //     echo "Title: " . $row['title'] . "<br>";
    //     echo "Content: " . $row['content'] . "<br>";
    //     echo "Created At: " . $row['created_at'] . "<br><br>";
    // }
}
