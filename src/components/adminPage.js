import React from "react";
import "../scss/adminPage.scss";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { linkNode } from "../nodeLink";
import { useNavigate } from "react-router";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      handleGetUsers();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleGetUsers = async () => {
    try {
      await axios.get(`${linkNode}/getusers`).then((res) => {
        if (res.data.status) {
          console.log(res.data.msg.reverse());
          setUsers(res.data.msg);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCamera = async (data) => {
    try {
      navigate(`/video/${data._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteUser = async (data) => {
    try {
      console.log(data._id);
      await axios
        .delete(`${linkNode}/deleteusers/${data._id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="adminPage">
      <div className="adminPage">
        <div className="head">User Details</div>

        {users.length &&
          users.map((data) => {
            return (
              <div className="bodyPart">
                <div className="nameCon">
                  <span className="nameSpan">{data.name}</span>
                  <br />
                  <span className="careerSpan">{data.career}</span>
                </div>
                <div className="contactCon">
                  <span className="numberCon">{data.phone}</span>
                  <br />
                  <span className="mailCon">{data.email}</span>
                </div>
                {/* <div className="careerCon"></div> */}
                <div className="photoCon">
                  <span className="cameraSpan">
                    <CameraAltIcon
                      id="cameraIcon"
                      onClick={() => {
                        handleCamera(data);
                      }}
                    />
                  </span>
                  {/* <span className="imageSpan">
                    <ImageIcon id="imgIcon" />
                  </span> */}
                  <span className="sendSpan">
                    <SendIcon id="sendIcon" />
                  </span>
                  {/* <span className="editSpan">
                    <EditIcon id="editIcon" />
                  </span> */}
                  <span className="deleteSpan">
                    <DeleteIcon
                      id="deleteIcon"
                      onClick={() => {
                        handleDeleteUser(data);
                      }}
                    />
                  </span>
                </div>
              </div>
            );
          })}

        {/* <div className="body">
          <div className="tableDiv">
            <div className="headTable">
              <div className="nameHead">Name</div>
              <div className="contactHead">Contact</div>
              <div className="careerHead">Career</div>
              <div className="picHead"></div>
            </div>
            <div className="headBody">
              <div className="bodyPart">
                <div className="nameCon">Hari Yadharth GC</div>
                <div className="contactCon">
                  <span className="numberCon">9080045933</span>
                  <br />
                  <span className="mailCon">ganeshyadharth@gmail.com</span>
                </div>
                <div className="careerCon">Doctor</div>
                <div className="photoCon">
                  <span className="cameraSpan">
                    <CameraAltIcon id="cameraIcon" />
                  </span>
                  <span className="imageSpan">
                    <ImageIcon id="imgIcon" />
                  </span>
                  <span className="sendSpan">
                    <SendIcon id="sendIcon" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
