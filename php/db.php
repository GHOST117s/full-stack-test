<?php
$host = "172.19.0.3";
$port = "5432";
$dbname = "full_stack_test";
$user = "root";
$password = "root";

$conn_string = "host=$host port=$port dbname=$dbname user=$user password=$password";
$conn = pg_connect($conn_string);

if (!$conn) {
    die("Connection failed: " . pg_last_error());
} else {
    echo "Connection successful!";
}
?>