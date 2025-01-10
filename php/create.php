<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

// Check if the connection is successful
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

try {
    if (!isset($_POST['title']) || !isset($_POST['content']) || !isset($_POST['image'])) {
        throw new Exception("Missing required fields");
    }

    $title = $conn->real_escape_string($_POST['title']);
    $content = $conn->real_escape_string($_POST['content']);
    $image = $conn->real_escape_string($_POST['image']);

    $sql = "INSERT INTO posts (title, content, image) VALUES ('$title', '$content', '$image')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Post created successfully']);
    } else {
        throw new Exception($conn->error);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$conn->close();
?>