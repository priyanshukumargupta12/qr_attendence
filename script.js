// QR Code scanner initialization
const video = document.getElementById("preview");
const resultDiv = document.getElementById("result");

function startQRCodeScanner() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); 
            video.play();
            requestAnimationFrame(scanQRCode);
        })
        .catch(err => {
            console.error("Camera access denied: ", err);
            resultDiv.innerHTML = "<p>Error: Unable to access camera.</p>";
        });
}

function scanQRCode() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement("canvas");
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height, { inversionAttempts: "dontInvert" });

        if (code) {
            resultDiv.innerHTML = `<p>QR Code Data: ${code.data}</p>`;
            markAttendance(code.data); // Function to send data to backend
        }
    }
    requestAnimationFrame(scanQRCode);
}

function markAttendance(studentID) {
    // Make an API call to mark attendance
    fetch('mark_attendance.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student_id: studentID })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultDiv.innerHTML = "<p>Attendance marked successfully!</p>";
        } else {
            resultDiv.innerHTML = "<p>Error marking attendance.</p>";
        }
    })
    .catch(error => {
        resultDiv.innerHTML = "<p>Something went wrong. Try again later.</p>";
        console.error("Error:", error);
    });
}

// Start QR Code scanner
startQRCodeScanner();
