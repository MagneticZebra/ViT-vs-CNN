const dragDrop = document.getElementById("dragDrop");
const imageUpload = document.getElementById("imageUpload");
const uploadIcon = document.getElementById("uploadIcon");
const uploadText = document.getElementById("uploadText");
const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");
const removeButton = document.getElementById("removeImage");

function simulateProgress(callback) {
    let progressValue = 0;
    progress.style.width = "0%";
    progressBar.style.display = "block";

    const interval = setInterval(() => {
        progressValue += 10;
        progress.style.width = `${progressValue}%`;

        if (progressValue >= 100) {
            clearInterval(interval);
            callback();
        }
    }, 100);
}

function disableUpload() {
    dragDrop.classList.add("uploaded");
    dragDrop.style.pointerEvents = "none";
    dragDrop.style.opacity = "0.6"; // Visual cue for disabled state
    uploadText.textContent = "Image Uploaded!";
    uploadIcon.textContent = "✔️";
    imageUpload.disabled = true; // Disable file input
    removeButton.style.display = "block"; // Show the remove button
}

function enableUpload() {
    dragDrop.classList.remove("uploaded");
    dragDrop.style.pointerEvents = "auto";
    dragDrop.style.opacity = "1"; // Reset visual state
    uploadText.textContent = "Drag & Drop your image here or click to upload";
    uploadIcon.textContent = "📁";
    imageUpload.value = ""; // Clear the file input value
    imageUpload.disabled = false; // Re-enable file input
    removeButton.style.display = "none"; // Hide the remove button
    progressBar.style.display = "none"; // Hide progress bar
}

dragDrop.addEventListener("dragover", (event) => {
    event.preventDefault();
    dragDrop.style.backgroundColor = "#e9e9e9";
});

dragDrop.addEventListener("dragleave", () => {
    dragDrop.style.backgroundColor = "#f9f9f9";
});

dragDrop.addEventListener("drop", (event) => {
    event.preventDefault();
    dragDrop.style.backgroundColor = "#f9f9f9";
    const file = event.dataTransfer.files[0];
    if (file) {
        imageUpload.files = event.dataTransfer.files;
        simulateProgress(() => {
            disableUpload();
        });
    }
});

imageUpload.addEventListener("change", () => {
    const file = imageUpload.files[0];
    if (file) {
        simulateProgress(() => {
            disableUpload();
        });
    }
});

removeButton.addEventListener("click", () => {
    enableUpload(); // Re-enable the upload functionality
});
