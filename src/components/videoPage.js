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

export default function VideoPage() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const imagesArr = [];
  const navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState("");

  useEffect(() => {
    try {
      handleGetVideo();
    } catch (err) {
      console.log(err);
    }
  }, [videoRef]);

  const handleGetVideo = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCapture = async () => {
    try {
      let video = videoRef.current;
      let photo = photoRef.current;
      console.log(videoRef);
      photo.width = 2400;
      photo.height = 1600;

      let ctx = photo.getContext("2d");
      ctx.drawImage(video, 0, 0, 2400, 1600);
      // var dataImg = me.refs.canvas.toDataURL(); // note `me` being used here
      // console.log(dataImg);
      const base = await photo.toDataURL();
      imagesArr.push(base);
      console.log(base);
      setFile(base);
      toast("nice pose");
      console.log(params.id);
      await handleSetInput(base, params.id);
      // console.log(ctx, "ctx");
      // console.log(photo, "photo");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetInput = async (base, id) => {
    try {
      await axios
        .post(`${linkNode}/setpic`, {
          base,
          id,
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

  return (
    <div id="videoPage">
      <div className="videoPage">
        <div className="screenPage">
          <div className="camera">
            <div className="videoDiv">
              <video ref={videoRef}></video>
              <canvas id="canvasTag" ref={photoRef}></canvas>
            </div>
            <div className="submitDiv">
              <div
                className="submitBtn"
                onClick={() => {
                  handleCapture();
                }}
              >
                ◉
              </div>
              <div className="nxtBtn">
                <NavigateNextIcon id="nextIcon" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
