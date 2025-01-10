<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

try {
    $sql = "SELECT * FROM posts ORDER BY id DESC";
    $result = $conn->query($sql);


    if (!$result) {
        throw new Exception($conn->error);
    }

    $posts = [];
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }

    echo json_encode(['success' => true, 'data' => $posts]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$conn->close();
?>