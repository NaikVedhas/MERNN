import React, { useRef, useState } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    canvas.isDrawing = true;
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!canvas.isDrawing) return;

    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    canvas.isDrawing = false;
  };

  const handleSend = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png"); // Convert canvas to image URL
    setImageUrl(dataUrl); // Display the image below the canvas
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Free-Hand Drawing</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ border: "1px solid black", cursor: "crosshair" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      ></canvas>
      <br />
      <button onClick={handleSend} style={{ margin: "10px" }}>
        Send Drawing
      </button>
      <button onClick={handleClear}>Clear Canvas</button>
      {imageUrl && (
        <div>
          <h3>Drawing Preview:</h3>
          <img src={imageUrl} alt="User Drawing" style={{ border: "1px solid black" }} />
        </div>
      )}
    </div>
  );
};

export default DrawingCanvas;
