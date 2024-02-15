import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config";
import Mark from "./Mark";
import CommentInput from "./CommentInput";
import { Link } from "react-router-dom";

export default function ClickableCanvas({ user }) {
  const [globalMousePos, setGlobalMousePos] = useState({});
  const [localMousePos, setLocalMousePos] = useState({});
  const [markPos, setMarkPos] = useState({ x: -50, y: -50 });
  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(undefined);
  const [loadId, setLoadId] = useState(undefined);
  const [lastError, setLastError] = useState(undefined);
  const [userdata, setUserData] = useState(undefined);

  const markSize = 30;
  const canvasWidth = 500;
  const canvasHeight = 500;

  const fetchUsers = () => {
    axios
      .get(`${config.API_URL}/users`)
      .then((response) => {
        const currentUserData = response.data.find((u) => u.user === user.user);
        setUserData(currentUserData);
      })
      .catch((error) => {
        console.error(error);
        setLastError(`${error.response.status} ${error.message}`);
        setTimeout(() => setLastError(undefined), 8000);
      });
  };

  const handleMouseMove = (event) => {
    // 👇 Get mouse position relative to element
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;

    setLocalMousePos({ x: localX, y: localY });
  };

  const handleSuccess = (response) => {
    setLoadId(response.data);
    setSuccess(true);
  };

  const handleFailure = (error) => {
    console.error(error);
    setLastError(`${error.response.status} ${error.message}`);
    setSuccess(false);

    setTimeout(() => setLastError(undefined), 8000);
  };

  const handleClick = (event) => {
    if (clicked && success) {
      setSuccess(undefined);
      axios
        .patch(`${config.API_URL}/loads/${loadId}`, {
          user: user.user,
          workload: localMousePos.x / canvasWidth,
          mentalload: 1.0 - localMousePos.y / canvasHeight,
        })
        .then(handleSuccess)
        .catch(handleFailure);
    } else {
      setSuccess(undefined);
      axios
        .post(`${config.API_URL}/loads`, {
          user: user.user,
          workload: localMousePos.x / canvasWidth,
          mentalload: 1.0 - localMousePos.y / canvasHeight,
        })
        .then(handleSuccess)
        .catch(handleFailure);
    }

    setMarkPos({ x: localMousePos.x, y: localMousePos.y });
    setClicked(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccess(undefined);

    axios
      .patch(`${config.API_URL}/loads/${loadId}`, {
        comment: event.currentTarget.elements.comment_text.value,
      })
      .then(handleSuccess)
      .catch(handleFailure);
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

  useEffect(fetchUsers, []);

  return (
    <>
      <p>
        {userdata ? (
          <>
            <img
              src={userdata.slack.profile.image_512}
              style={{
                width: "3em",
                height: "3em",
                borderRadius: "50%",
                position: "relative",
                top: "1.5em",
              }}
            />
            <span style={{ fontSize: "x-large", marginLeft: "4%" }}>
              {userdata.slack.profile.real_name}
            </span>
          </>
        ) : (
          ""
        )}
        <br />
        <Link to={`/u/${user.user}`} style={{ marginLeft: "6%" }}>
          Omat sivut
        </Link>
      </p>
      <div className="input-table">
        <div className="input-row">
          <div className="input-cell vertical">
            <span style={{ float: "left" }}>⯅ Ahdistaa</span>
            <b>Kiireen tuntu</b>
            <span style={{ float: "right" }}>Hyvä fiilis ⯆</span>
          </div>
          <div
            className="input-cell canvas"
            style={{
              width: "500px",
              height: "500px",
              position: "relative",
            }}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          >
            <Mark
              visible={clicked}
              size={markSize}
              success={success}
              position={markPos}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-cell"></div>
          <div className="input-cell horizontal">
            <span style={{ float: "left" }}>⯇ Sopivasti tekemistä</span>
            <b>Kiireen määrä</b>
            <span style={{ float: "right" }}>Liikaa tekemistä ⯈</span>
          </div>
        </div>
      </div>
      <div className="form">
        {clicked ? (
          <CommentInput load_id={loadId} handle_submit={handleSubmit} />
        ) : (
          ""
        )}
      </div>
      <div className="error" style={{ opacity: lastError ? 1.0 : 0 }}>
        <span>{lastError}</span>
      </div>
    </>
  );
}
