import React, { useRef, useState } from 'react';
import "./App.css";

export default function WebcamCapture () {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  function startWebcam () {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.log('Error accessing webcam:', error);
      });
  };
  function stopWebcam() {
    navigator.mediaDevices.getUserMedia({ video: false });
  }

  function captureImage () {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageSrc = canvas.toDataURL('image/png');
    setCapturedImage(imageSrc);
  };

  function clearImage () {
    setCapturedImage(null);
  };

  return (
    <div>
      <button onClick={startWebcam} className='start-webcam-btn'>Start Webcam</button>
      <button onClick={stopWebcam} className='stop-webcam-btn'>Stop Webcam</button>

      <br />
      <video ref={videoRef} autoPlay className='video-frame'/>
      <br />
      <button onClick={captureImage} className='capture-photo'>Take a photo</button>
      <button onClick={clearImage} className='clear'>Clear Image</button>
      <br />
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};
