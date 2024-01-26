import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config";
import Mark from "./Mark";

export default function ClickableCanvas({ user }) {
  const [globalMousePos, setGlobalMousePos] = useState({});
  const [localMousePos, setLocalMousePos] = useState({});
  const [markPos, setMarkPos] = useState({ x: -50, y: -50 });
  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(undefined);

  const markSize = 30;
  const canvasWidth = 500;
  const canvasHeight = 500;

  const handleMouseMove = (event) => {
    // 👇 Get mouse position relative to element
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;

    setLocalMousePos({ x: localX, y: localY });
  };

  const handleSuccess = (response) => {
    console.log(response);
    setSuccess(true);
  };

  const handleFailure = (error) => {
    console.error(error);
    setSuccess(false);
  };

  const handleClick = (event) => {
    if (clicked) return;

    axios
      .post(`${config.API_URL}/loads`, {
        user: user,
        workload: localMousePos.x / canvasWidth,
        mentalload: localMousePos.y / canvasHeight,
      })
      .then(handleSuccess)
      .catch(handleFailure);

    setMarkPos({ x: localMousePos.x, y: localMousePos.y });
    setClicked(true);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setGlobalMousePos({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          border: "1px solid gray",
          width: "500px",
          height: "500px",
          position: "relative",
        }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <Mark
          visible={true}
          size={markSize}
          success={success}
          position={markPos}
        />
      </div>
      <p>
        ({localMousePos.x}, {localMousePos.y})
      </p>
    </div>
  );
}
