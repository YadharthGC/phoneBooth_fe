import React from "react";
import "../scss/admin.scss";
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
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MedicationIcon from "@mui/icons-material/Medication";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import acc from "../images/acc.jpg";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [phone, setPhone] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const [validToken, setValidToken] = useState("");
  const [aiSrc, setAisrc] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    try {
      handleGetUsers();
      setStatus(false);
    } catch (err) {
      console.log(err);
    }
  }, [status]);

  const handleGetUsers = async () => {
    try {
      await axios.get(`${linkNode}/getusers`).then((res) => {
        if (res.data.status) {
          setUsers(res.data.msg.reverse());
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
      await axios
        .delete(`${linkNode}/deleteusers/${data._id}`)
        .then((res) => {
          console.log(res.data);
          setStatus(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = async (token) => {
    try {
      await axios
        .delete(`${linkNode}/delopupic/${validToken}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSend = async () => {
    try {
      await axios
        .get(`${linkNode}/sendmail/${validToken}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const handleOpen = async (token) => {
    console.log(token);
    await axios
      .get(`${linkNode}/getaipic/${token}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setOpen(true);
        } else {
          setOpen(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="admin">
      <div className="adminPage">
        <div className="adminTable">
          <div className="phoneSearch">
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="text"
              className="phoneInp"
              placeholder="search phone"
            />
          </div>
          <table className="adminTable">
            <thead className="thead">
              <tr>
                <td>User</td>
                <td>Contact</td>
                <td></td>
              </tr>
            </thead>
            <tbody className="tbody">
              {users.map((data) => {
                if (
                  !phone ||
                  (phone && data.phone.toString().includes(phone.toString()))
                ) {
                  return (
                    <tr>
                      <td className="tdA">
                        <div className="tdADiv">
                          {console.log(data.gender)}
                          <div className="genderDiv">
                            {data.gender === "male" ? (
                              <MaleIcon id="maleIcon" />
                            ) : (
                              <FemaleIcon id="femaleIcon" />
                            )}
                          </div>
                          <div className="nameCareer">
                            <div className="nameDiv">{data.name}</div>
                            <div className="careerDiv">
                              <div>{data.career}</div>
                              <div className="careerIconSpan">
                                {data.career === "engineer" ? (
                                  <EngineeringIcon id="careerIcon" />
                                ) : data.career === "lawyer" ? (
                                  <LocalPoliceIcon id="careerIcon" />
                                ) : data.career === "doctor" ? (
                                  <MedicationIcon id="careerIcon" />
                                ) : data.career === "chef" ? (
                                  <FastfoodIcon id="careerIcon" />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="tdB">
                        <div className="mailDiv">{data.email}</div>
                        <div className="phoneDiv">{data.phone}</div>
                      </td>
                      <td className="tdC">
                        <div className="iconsDiv">
                          <span className="cameraSpan">
                            <CameraAltIcon
                              id="cameraIcon"
                              onClick={() => {
                                handleCamera(data);
                              }}
                            />
                          </span>
                          <span className="sendSpan">
                            <AutoFixHighIcon
                              id="autoIcon"
                              onClick={() => {
                                console.log(data);
                                setValidToken(data.token);
                                handleOpen(data.token);
                              }}
                            />
                          </span>
                          <span className="deleteSpan">
                            <DeleteIcon
                              id="deleteIcon"
                              onClick={() => {
                                handleDeleteUser(data);
                              }}
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img alt="imgz" className="altImg" src={acc} />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="iconsDiv">
              <div className="refreshDiv">
                <RestartAltIcon
                  id="restartIcon"
                  onClick={() => {
                    handleReset();
                  }}
                />
              </div>
              <div className="SendDiv">
                <SendIcon
                  id="sendIcon"
                  onClick={() => {
                    handleSend();
                  }}
                />
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
