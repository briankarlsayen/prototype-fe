import React, { SVGProps, useEffect, useRef, useState } from "react";

function Camera() {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300, height: 300 } })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch((error) => console.log("error", error));
  }, []);

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = canvasRef.current;
    let ctx = photo.getContext("2d");

    const width = 300;
    const height = 300;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
    }, 200);
  };

  const handleCapture = () => {
    let photo = canvasRef.current;
    const imageDataUri = photo.toDataURL();
    setImage(imageDataUri);
  };

  return (
    <div>
      <h1>React Camera App</h1>
      <video ref={videoRef} onCanPlay={() => paintToCanvas()} autoPlay></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {image && <img src={image} />}
      <button onClick={handleCapture}>Capture</button>
      {/* <div>{stream && <video ref={videoRef} autoPlay playsInline />}</div> */}
    </div>
  );
}

export default Camera;
