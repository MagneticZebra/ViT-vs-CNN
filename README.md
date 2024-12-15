# 🧠 ML Model Comparison Tool

Welcome to the **ML Model Comparison Tool**, an interactive platform designed to showcase and compare the power of the **Convolutional Neural Networks (ConvNet)** and **Transformer models**. This project offers an engaging way to dive into machine learning by uploading images, analyzing predictions, and comparing model performances.

---

## 🌟 Features

- **Interactive Image Upload**:
   - Drag-and-drop or select images with seamless validation.
   - Only supports **JPG** images to maintain consistent results across the model.
- **Model Selection**:
   - Choose between **ConvNet** and **Transformer** for analysis.
- **Real-Time Predictions**:
   - View predictions with detailed confidence scores.
- **Performance Tracking**:
   - Dynamic graphs track each model’s accuracy over time based on user feedback.
- **User Feedback Integration**:
   - Rate model predictions as accurate or inaccurate with thumbs-up or thumbs-down.
- **Minimalistic Design**:
   - Sleek user interface with smooth animations.
- **Efficient server processing**:
   - A robust REST API server system to serve the frontend UI.
---

## 🚀 How It Works

1. **Upload an Image**:
   - Use the drag-and-drop area or file upload button.
   - Only **JPG** images are accepted, and invalid file types are blocked.
2. **Choose Your Model**:
   - Select from two advanced models: **ConvNet** or **Transformer**.
3. **Analyze the Image**:
   - Get predictions with confidence scores displayed in real-time.
   - The result section dynamically adjusts to fit the uploaded image.
4. **Provide Feedback**:
   - Use thumbs-up or thumbs-down buttons to rate prediction accuracy.
   - Feedback updates the performance graphs instantly.
5. **Track Model Performance**:
   - Compare accuracy percentages and trends on real-time dynamic graphs.

---

## 🔧 Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: FastAPI, Python, transformers
- **Dynamic Animations**: ScrollReveal.js for smooth scrolling effects
- **Graphs**: Chart.js for real-time performance tracking
- **Alerts**: SweetAlert2 for interactive feedback pop-ups
- **File Validation**: Ensures only valid JPG files are processed

---

## 🛠️ How to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ML-Model-Comparison-Tool.git
   cd ML-Model-Comparison-Tool```
1.5. (Optional) Create a virtual environment
2. Install all the packages
   ```bash
   pip install requirements.txt
   ```
3. Run api/main.py
4. Open live server settings.json and change the value to:
```
"liveServer.settings.ignoreFiles":
[
"**"
]
```
5. Open index.html in vscode and run it as live server.
