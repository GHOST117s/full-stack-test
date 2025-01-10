<?php
$host = "localhost";
$port = "3306";
$dbname = "full_stack_test";
$user = "root";
$password = "root";

// Create connection
$conn = new mysqli($host, $user, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
}
?>