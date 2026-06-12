document.addEventListener('DOMContentLoaded', () => {
    // Image Upload Elements
    const uploadForm = document.getElementById('uploadForm');
    const imageInput = document.getElementById('imageInput');
    const uploadArea = document.getElementById('uploadArea');
    const resultArea = document.getElementById('resultArea');
    const resultImage = document.getElementById('resultImage');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const resetBtn = document.getElementById('resetBtn');

    // Webcam Elements
    const startWebcamBtn = document.getElementById('startWebcamBtn');
    const stopWebcamBtn = document.getElementById('stopWebcamBtn');
    const webcamPlaceholder = document.getElementById('webcamPlaceholder');
    const webcamFeed = document.getElementById('webcamFeed');
    const webcamControls = document.getElementById('webcamControls');

    // Drag and Drop Effects
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
    });

    uploadArea.addEventListener('drop', (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;
        handleFiles(files);
    });

    imageInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                uploadImage(file);
            } else {
                alert('Please upload an image file.');
            }
        }
    }

    function uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        uploadArea.style.display = 'none';
        loadingOverlay.style.display = 'flex';
        resultArea.style.display = 'none';

        fetch('/detect_image', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            loadingOverlay.style.display = 'none';
            if (data.error) {
                alert(data.error);
                uploadArea.style.display = 'flex';
            } else {
                // Add timestamp to prevent caching
                resultImage.src = data.image_url + '?t=' + new Date().getTime();
                resultArea.style.display = 'flex';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loadingOverlay.style.display = 'none';
            uploadArea.style.display = 'flex';
            alert('An error occurred during detection.');
        });
    }

    resetBtn.addEventListener('click', () => {
        resultArea.style.display = 'none';
        uploadArea.style.display = 'flex';
        imageInput.value = ''; // Reset file input
    });

    // Webcam Logic
    startWebcamBtn.addEventListener('click', () => {
        // Show feed, hide placeholder
        webcamPlaceholder.style.display = 'none';
        webcamFeed.style.display = 'block';
        webcamControls.style.display = 'flex';
        
        // Add timestamp to force reload and start stream
        webcamFeed.src = '/video_feed?t=' + new Date().getTime();
    });

    stopWebcamBtn.addEventListener('click', () => {
        // Stop stream by clearing source
        webcamFeed.src = '';
        
        // Show placeholder, hide feed
        webcamFeed.style.display = 'none';
        webcamControls.style.display = 'none';
        webcamPlaceholder.style.display = 'flex';
    });
});
