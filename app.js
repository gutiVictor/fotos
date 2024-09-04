// Obtén elementos de la página
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const saveButton = document.getElementById('save');
const context = canvas.getContext('2d');
const filenameInput = document.getElementById('filename');

// Solicita acceso a la cámara del dispositivo
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error("Error al acceder a la cámara: ", error);
        alert("Es necesario conceder permisos de cámara para usar esta funcionalidad.");
    }
}

// Captura la foto cuando se hace clic en el botón
captureButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, 1000, 1000); // Mantiene el tamaño de 1000x1000
});

// Función para comprimir la imagen
function compressImage(canvas, quality = 0.6) {
    // Retorna el URL de la imagen comprimida con la calidad especificada (0.6 equivale al 60% de la calidad original)
    return canvas.toDataURL('image/jpeg', quality);
}

// Guarda la foto cuando se hace clic en el botón
saveButton.addEventListener('click', () => {
    const filename = filenameInput.value.trim() || 'foto';
    const compressedImage = compressImage(canvas, 0.6); // 60% calidad, mantiene 1000x1000
    const link = document.createElement('a');
    
    link.href = compressedImage;
    link.download = `${filename}.jpg`;
    link.click();
});

// Inicia la cámara
startCamera();
