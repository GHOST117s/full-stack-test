<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $content = $_POST['content'];

    $sql = "INSERT INTO posts (title, content) VALUES ('$title', '$content')";
    $result = pg_query($conn, $sql);

    if (!$result) {
        echo "Error: " . pg_last_error();
    } else {
        echo "New post created successfully";
    }
}
?>