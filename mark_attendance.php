<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "attendance_system";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST request to mark attendance
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['student_id'])) {
    $student_id = $conn->real_escape_string($data['student_id']);
    $attendance_time = date('Y-m-d H:i:s');

    // Query to insert attendance
    $query = "INSERT INTO attendance (student_id, student_name, attendance_time) VALUES ('$student_id', 'Student Name', '$attendance_time')";

    if ($conn->query($query) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid data."]);
}

$conn->close();
?>
