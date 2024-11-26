CREATE DATABASE IF NOT EXISTS attendance_system;

USE attendance_system;

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(255) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    attendance_time DATETIME NOT NULL
);
