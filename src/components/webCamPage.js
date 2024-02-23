import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "../scss/videoPage.scss";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import { linkNode } from "../nodeLink";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import none from "../images/blankProfile.jpg";

export default function CamPage() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState("");
  const [retake, setRetake] = useState(false);

  // handleGetUser();

  useEffect(() => {
    try {
      handleGetUser();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleCapture = () => {
    try {
      let imgUrl = webcamRef.current.getScreenshot({});
      setFile(imgUrl);
      setRetake(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios
        .post(`${linkNode}/setpic`, {
          base: file,
          id: params.id,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/admin");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetUser = async () => {
    try {
      await axios
        .get(`${linkNode}/getuser/${params.id}`)
        .then((res) => {
          console.log(res.data.msg);
          setFile(res.data?.msg.inputPic);
          if (res.data?.msg.inputPic) {
            setRetake(false);
          } else {
            setRetake(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const videoConstraints = {
    width: 700,
    height: 550,
    facingmode: { exact: "environment" },
  };

  return (
    <div className="webCamPage">
      <div className="page">
        {retake ? (
          <div className="livCamDiv">
            <div className="bodyA">
              <div className="liveShow">
                <Webcam
                  id="webcamLive"
                  crossOrigin="anonymous"
                  audio={false}
                  screenshotFormat="image/jpeg"
                  ref={webcamRef}
                  {...videoConstraints}
                />
              </div>
              <div className="captureDiv">
                <span
                  className="redBtn"
                  onClick={() => {
                    handleCapture();
                  }}
                >
                  &#9673;
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="showCamDiv">
            <div className="bodyB">
              <div className="imgShow">
                <img
                  className="dispImg"
                  src={file ? file : none}
                  alt="noimg"
                  {...videoConstraints}
                />
              </div>
              <div className="imgSubmit">
                <Button
                  id="reTakeBtn"
                  color="warning"
                  variant="contained"
                  onClick={() => {
                    setRetake(true);
                  }}
                  sx={{ marginRight: "1%" }}
                >
                  Retake
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
