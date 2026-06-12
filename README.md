# 🎯 Real-Time Object Detection using YOLOv8

This project is a high-performance web application that identifies and locates objects in images or live webcam feeds in real time. It uses **YOLOv8** (You Only Look Once) for inference and provides a beautiful, modern interface powered by **Flask**.

## 🚀 Features

- **Image Upload:** Upload any image and instantly receive a new image with bounding boxes, labels, and confidence scores for detected objects.
- **Live Webcam Streaming:** Streams video directly from your webcam to the browser, performing real-time inference on each frame.
- **Premium User Interface:** A modern, dark-mode design with glassmorphism effects and animated backgrounds.
- **High Performance:** Utilizes the lightweight `yolov8n.pt` (Nano) model, which runs fast even on CPUs without dedicated GPU acceleration.

## 🏗️ Architecture & Tech Stack

- **Python:** Core programming language.
- **YOLOv8 (Ultralytics):** Deep Learning model for generating bounding boxes and class predictions.
- **OpenCV:** Computer Vision library used for drawing bounding boxes, handling images, and reading the webcam feed.
- **Flask:** Web framework to serve the application, handle file uploads, and stream MJPEG video.
- **HTML/CSS/JS:** Frontend stack with Vanilla CSS (Dark Mode/Glassmorphism).

## 📂 Project Structure

```text
real-time-object-detection/
│
├── static/                 # CSS, JS, and generated output images
├── templates/              # HTML templates (index.html)
├── uploads/                # Temporary storage for uploaded images
│
├── app.py                  # Main Flask backend and YOLOv8 inference logic
├── requirements.txt        # Python dependencies
└── .gitignore              # Git ignore file
```

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/VisionDetect-AI.git
   cd VisionDetect-AI/real-time-object-detection
   ```

2. **Create and activate a virtual environment:**
   - Windows:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - Mac/Linux:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   python app.py
   ```

5. **Open your browser:**
   Navigate to [http://127.0.0.1:5000](http://127.0.0.1:5000).

## 🧠 How it Works

1. **YOLOv8 Model Initialization:** The server loads the `yolov8n.pt` model weights on startup.
2. **Image Processing:** For uploaded images, OpenCV reads the file, YOLOv8 runs inference to detect objects, and OpenCV draws the resulting bounding boxes and labels onto the image before saving and serving it to the client.
3. **Webcam Streaming:** The server uses OpenCV to capture the local webcam feed (`cv2.VideoCapture(0)`). It processes each frame individually through YOLOv8, annotates it, encodes it as a JPEG, and streams it back to the client using a multi-part HTTP response (MJPEG stream).

## 📄 License

This project is open-source and available under the MIT License.
