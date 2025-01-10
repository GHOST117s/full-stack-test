<?php
header('Content-Type: application/json');
include 'db.php';

try {
    if (!isset($_POST['id']) || !isset($_POST['title']) || !isset($_POST['content']) || !isset($_POST['image'])) {
        throw new Exception("Missing required fields");
    }

    $id = $conn->real_escape_string($_POST['id']);
    $title = $conn->real_escape_string($_POST['title']);
    $content = $conn->real_escape_string($_POST['content']);
    $image = $conn->real_escape_string($_POST['image']);

    $sql = "UPDATE posts SET title = '$title', content = '$content', image = '$image' WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Post updated successfully']);
    } else {
        throw new Exception($conn->error);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$conn->close();
?>