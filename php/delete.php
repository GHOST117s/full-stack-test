<?php
header('Content-Type: application/json');
include 'db.php';

try {
    if (!isset($_POST['id'])) {
        throw new Exception("Missing post ID");
    }

    $id = $conn->real_escape_string($_POST['id']);
    $sql = "DELETE FROM posts WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Post deleted successfully']);
    } else {
        throw new Exception($conn->error);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$conn->close();
?>