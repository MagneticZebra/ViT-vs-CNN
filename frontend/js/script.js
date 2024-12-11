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
  // Re-enable upload functionality
  enableUpload();

  // Reset the feedback flag
  feedbackGiven = false;

  // Reset feedback buttons
  document.getElementById("thumbsUp").disabled = false;
  document.getElementById("thumbsDown").disabled = false;

  // Hide feedback message
  document.getElementById("feedbackMessage").style.display = "none";

  // Reset containers
  uploadContainer.style.transform = "translateX(0)";
  resultContainer.style.display = "none";
  arrow.style.display = "none";

  // Clear the uploaded image preview
  fileInput.value = ""; // Reset file input
  resultImage.src = ""; // Clear image source

  // Hide the "Remove Image" button
  removeButton.style.display = "none";
});

document.getElementById("analyzeButton").addEventListener("click", () => {
  const imageUpload = document.getElementById("imageUpload").files[0];
  const modelSelector = document.getElementById("modelSelector").value;

  if (!imageUpload) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please upload an image before proceeding!",
    });
    return;
  }

  // Simulate loading the result
  Swal.fire({
    title: "Analyzing...",
    text: "Please wait while we process the image.",
    timer: 2000,
    didOpen: () => {
      Swal.showLoading();
    },
  }).then(() => {
    // Populate results
    const uploadedImage = document.getElementById("uploadedImage");
    const prediction = document.getElementById("prediction");
    const confidence = document.getElementById("confidence");
    const modelUsed = document.getElementById("modelUsed");

    uploadedImage.src = URL.createObjectURL(imageUpload);
    prediction.textContent = "Cat"; // Replace with actual prediction
    confidence.textContent = "95"; // Replace with actual confidence score
    modelUsed.textContent =
      modelSelector === "convnet" ? "ConvNet" : "Transformer";

    // Show result container and arrow
    document.querySelector(".upload-container").style.transform =
      "translateX(-220px)";
    document.querySelector(".result-container").style.display = "block";

    // Show feedback section
    const feedbackSection = document.getElementById("feedbackSection");
    feedbackSection.style.display = "block";

    // Reset feedback buttons
    document.getElementById("thumbsUp").disabled = false;
    document.getElementById("thumbsDown").disabled = false;
    document.getElementById("feedbackMessage").style.display = "none";
  });
});

// Handle thumbs up/down feedback
let feedbackGiven = false;

document.getElementById("thumbsUp").addEventListener("click", () => {
  if (feedbackGiven) return;

  if (!feedbackGiven) {
    const selectedModel = document.getElementById("modelSelector").value;
    updateGraph(selectedModel, true); // Calling updateGraph when thumbs up is clicked
    feedbackGiven = true;

    feedbackGiven = true;
    document.getElementById("thumbsUp").disabled = true;
    document.getElementById("thumbsDown").disabled = true;
    document.getElementById("feedbackMessage").style.display = "block";
  }
});

document.getElementById("thumbsDown").addEventListener("click", () => {
  if (feedbackGiven) return;

  if (!feedbackGiven) {
    const selectedModel = document.getElementById("modelSelector").value;
    updateGraph(selectedModel, false); // Calling updateGraph when thumbs down is clicked
    feedbackGiven = true;

    feedbackGiven = true;
    document.getElementById("thumbsUp").disabled = true;
    document.getElementById("thumbsDown").disabled = true;
    document.getElementById("feedbackMessage").style.display = "block";
  }
});

document.getElementById("removeImage").addEventListener("click", () => {
  // Reset containers
  const uploadContainer = document.querySelector(".upload-container");
  const resultContainer = document.querySelector(".result-container");
  const arrow = document.getElementById("arrow");
  const feedbackSection = document.getElementById("feedbackSection");

  // Reset positions and visibility
  uploadContainer.style.transform = "translateX(0)";
  resultContainer.style.display = "none";
  arrow.style.display = "none";

  // Reset feedback buttons
  document.getElementById("thumbsUp").disabled = false;
  document.getElementById("thumbsDown").disabled = false;
  document.getElementById("feedbackMessage").style.display = "none";

  // Clear uploaded image preview
  document.getElementById("imageUpload").value = ""; // Clear file input
  document.getElementById("uploadedImage").src = ""; // Clear image preview

  // Hide the "Remove Image" button
  document.getElementById("removeImage").style.display = "none";
});

// ---------------------------------------------------------- Graphs -------------------------------------------------------------------
// Data tracking variables
const convnetData = { correct: 0, total: 0, history: [] };
const transformerData = { correct: 0, total: 0, history: [] };

// Initialize ConvNet Chart
const convnetChart = new Chart(document.getElementById("convnetChart"), {
  type: "line",
  data: {
    labels: [], // X-axis labels (e.g., attempt numbers)
    datasets: [
      {
        label: "ConvNet Accuracy",
        data: [], // Y-axis data (accuracy percentage)
        borderColor: "#BB86FC",
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Attempts" } },
      y: { title: { display: true, text: "Accuracy (%)" }, max: 100, min: 0 },
    },
  },
});

// Initialize Transformer Chart
const transformerChart = new Chart(
  document.getElementById("transformerChart"),
  {
    type: "line",
    data: {
      labels: [], // X-axis labels (e.g., attempt numbers)
      datasets: [
        {
          label: "Transformer Accuracy",
          data: [], // Y-axis data (accuracy percentage)
          borderColor: "#FF5722",
          borderWidth: 2,
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Attempts" } },
        y: { title: { display: true, text: "Accuracy (%)" }, max: 100, min: 0 },
      },
    },
  }
);

// Function to update graph data
function updateGraph(model, correct) {
  const modelData = model === "convnet" ? convnetData : transformerData;
  const chart = model === "convnet" ? convnetChart : transformerChart;
  const accuracyElement =
    model === "convnet"
      ? document.getElementById("convnetAccuracy")
      : document.getElementById("transformerAccuracy");

  // Update data
  modelData.total++;
  if (correct) modelData.correct++;
  const accuracy = (modelData.correct / modelData.total) * 100;
  modelData.history.push(accuracy);

  // Update chart data
  chart.data.labels.push(modelData.total); // Add new attempt number
  chart.data.datasets[0].data.push(accuracy); // Add new accuracy value
  chart.update(); // Refresh the chart

  // Update accuracy text
  accuracyElement.textContent = `${
    model === "convnet" ? "ConvNet" : "Transformer"
  }: Right ${accuracy.toFixed(2)}% of the time`;
}

// Event Listeners for Feedback
document.getElementById("thumbsUp").addEventListener("click", () => {
  if (!feedbackGiven) {
    const selectedModel = document.getElementById("modelSelector").value;
    updateGraph(selectedModel, true); // User indicates the model was correct
    feedbackGiven = true;
  }
});

document.getElementById("thumbsDown").addEventListener("click", () => {
  if (!feedbackGiven) {
    const selectedModel = document.getElementById("modelSelector").value;
    updateGraph(selectedModel, false); // User indicates the model was incorrect
    feedbackGiven = true;
  }
});

updateGraph();
