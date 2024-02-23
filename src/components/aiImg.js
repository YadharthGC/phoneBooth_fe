import React from "react";
import acc from "../images/acc.jpg";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";

export default function AiImage() {
  return (
    <div className="aiImagePage">
      <div className="aiImgDiv">
        <img alt="imgz" className="altImg" src={acc} />
      </div>
      <div className="iconsDiv">
        <div className="refreshDiv">
          <RestartAltIcon id="restartIcon" />
        </div>
        <div className="SendDiv">
          <SendIcon id="sendIcon" />
        </div>
      </div>
    </div>
  );
}
