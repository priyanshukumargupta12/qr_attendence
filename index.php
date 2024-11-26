<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendance Marking System</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/jsQR/dist/jsQR.js"></script> <!-- For QR scanning -->
</head>
<body>
    <div class="container">
        <h1>Attendance Marking System</h1>

        <!-- QR code scanner input -->
        <div id="qr-reader" class="scanner">
            <video id="preview" style="width: 100%"></video>
        </div>

        <div id="result">
            <p>Scan QR Code to Mark Attendance</p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
