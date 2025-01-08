<?php
include 'db.php';

$sql = "CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$result = pg_query($conn, $sql);

if (!$result) {
    die("Migration failed: " . pg_last_error());
} else {
    echo "Migration successful!";
}
?>