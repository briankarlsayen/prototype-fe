import React, { SVGProps, useEffect, useRef, useState } from "react";

function Camera() {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const startCamera = async (constraints) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      videoRef.current.srcObject = mediaStream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  useEffect(() => {
    const checkMobileAndStartCamera = async () => {
      if (isMobileDevice()) {
        await startCamera({
          video: { facingMode: "user", width: 300, height: 300 },
        });
      } else {
        await startCamera({ video: { width: 300, height: 300 } });
      }
    };

    checkMobileAndStartCamera();

    // navigator.mediaDevices
    //   .getUserMedia({ video: { width: 300, height: 300 } })
    //   .then((stream) => (videoRef.current.srcObject = stream))
    //   .catch((error) => console.log("error", error));
  }, [image]);

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

  const handleRetry = () => {
    setImage(null);
  };

  return (
    <div>
      <h1>React Camera App</h1>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {image ? (
        <img src={image} />
      ) : (
        <video
          ref={videoRef}
          onCanPlay={() => paintToCanvas()}
          autoPlay
        ></video>
      )}
      <div className="flex gap-2 pt-2">
        {image && (
          <button onClick={handleRetry} className="btn btn-danger">
            Retry
          </button>
        )}
        <button onClick={handleCapture} className="btn btn-info ">
          Capture
        </button>
      </div>
    </div>
  );
}

export default Camera;
