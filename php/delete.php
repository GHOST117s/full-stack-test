<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $title = $_POST['title'];
    $content = $_POST['content'];

    $sql = "UPDATE posts SET title='$title', content='$content' WHERE id=$id";
    $result = pg_query($conn, $sql);

    if (!$result) {
        echo "Error: " . pg_last_error();
    } else {
        echo "Post updated successfully";
    }
}
?>