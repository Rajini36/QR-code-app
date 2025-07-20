function startQRScanner() {
    const scanResult = document.getElementById('scan-result');
    const html5QrCode = new Html5Qrcode("preview");

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: 250
                },
                qrCodeMessage => {
                    scanResult.innerText = "Scan Result: " + qrCodeMessage;
                },
                errorMessage => {}
            ).catch(err => console.error(err));
        }
    }).catch(err => console.error(err));
}

const generateBtn = document.getElementById('generate-btn');
const qrText = document.getElementById('qr-text');
const qrCodeContainer = document.getElementById('qr-code');

generateBtn.addEventListener('click', () => {
    qrCodeContainer.innerHTML = "";
    QRCode.toCanvas(qrText.value, { width: 200 }, function (error, canvas) {
        if (error) console.error(error);
        qrCodeContainer.appendChild(canvas);
    });
});
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', function() {
    if (fileInput.files.length === 0) return;
    const file = fileInput.files[0];
    const html5QrCode = new Html5Qrcode("preview");

    html5QrCode.scanFile(file, true)
        .then(decodedText => {
            document.getElementById("scan-result").innerText = "Scan Result: " + decodedText;
        })
        .catch(err => {
            console.error(err);
            document.getElementById("scan-result").innerText = "No QR code found.";
        });
});
