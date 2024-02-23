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
  const [userDetails, setUserDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadText, setLoadText] = useState("");

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
      setLoading(true);
      setLoadText("Submitting Image...");
      let dataObj = {
        name: userDetails.name,
        gender: userDetails.gender,
        phone: userDetails.phone,
        email: userDetails.email,
        career: userDetails.career,
        inputPic: file,
        token: userDetails.token,
      };
      await axios
        .post(`${linkNode}/setpic/${params.id}`, {
          dataObj,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/admin");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetUser = async () => {
    try {
      setLoading(true);
      setLoadText("Fetching the candidate Details...");
      await axios
        .get(`${linkNode}/getuser/${params.id}`)
        .then((res) => {
          console.log(res.data.msg);
          setUserDetails(res.data.msg);
          setFile(res.data?.msg.inputPic);
          if (res.data?.msg.inputPic) {
            setRetake(false);
          } else {
            setRetake(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const HanldeCam = () => {
    try {
      if (loading) {
        return loadText;
      } else if (!loading) {
        if (retake) {
          return (
            <div className="livCamDiv">
              <div className="bodyA">
                <div className="liveShow">
                  <Webcam
                    id="webcamLive"
                    crossOrigin="anonymous"
                    audio={false}
                    screenshotFormat="image/jpeg"
                    ref={webcamRef}
                    facingMode="environment"
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
          );
        } else if (!retake) {
          return (
            <div className="showCamDiv">
              <div className="bodyB">
                <div className="imgShow">
                  <img
                    className="dispImg"
                    src={file ? file : none}
                    alt="noimg"
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
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="webCamPage">
      <div className="page">{HanldeCam()}</div>
    </div>
  );
}
