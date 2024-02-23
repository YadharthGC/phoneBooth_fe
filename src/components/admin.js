import React, { useState, useEffect } from "react";
import "../scss/admin.scss";
import axios from "axios";
import { linkNode } from "../nodeLink";
import { useNavigate } from "react-router";
import logo from "../images/logob.jpg";
import acc from "../images/acc.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MedicationIcon from "@mui/icons-material/Medication";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [tabLoad, setTabLoad] = useState(true);
  const [status, setStatus] = useState(false);
  const [phone, setPhone] = useState("");
  const [validToken, setValidToken] = useState("");
  const [aiSrc, setAisrc] = useState("");
  const navigate = useNavigate();
  const [aiLoad, setAiLoad] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loadState, setLoad] = useState("");

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
          setTabLoad(false);
        }
      });
    } catch (err) {
      console.log(err);
      setTabLoad(false);
      toast("error");
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
      setDeleting(true);
      setLoad("Deleting Candidate...");
      await axios
        .delete(`${linkNode}/deleteusers/${data._id}`)
        .then(async (res) => {
          await handleGetUsers();
          setDeleting(false);
        })
        .catch((err) => {
          console.log(err);
          setDeleting(false);
          toast("error");
        });
    } catch (err) {
      console.log(err);
      setDeleting(false);
      toast("error");
    }
  };

  const handleAiImage = async (token) => {
    try {
      setDeleting(true);
      setLoad("Fetching AI Image...");
      await axios
        .get(`${linkNode}/getaipic/${token}`)
        .then((res) => {
          if (res.data.status) {
            setAisrc(res.data?.msg);
            setAiLoad(true);
          } else {
            toast("No AI image Generated");
          }
          setDeleting(false);
        })
        .catch((err) => {
          console.log(err);
          setDeleting(false);
          toast("error");
        });
    } catch (err) {
      console.log(err);
      setDeleting(false);
      toast("error");
    }
  };

  const handleBack = () => {
    try {
      setStatus(true);
      setAiLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = async () => {
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
      setDeleting(true);
      setLoad("Sending...");

      await axios
        .get(`${linkNode}/sendmail/${validToken}`)
        .then((res) => {
          setLoad("SuccesFully Sent.");
          setTimeout(() => {
            setDeleting(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setDeleting(false);
          toast("error");
        });
    } catch (err) {
      console.log(err);
      setDeleting(false);
      toast("error");
    }
  };

  const HandleAiLoad = () => {
    if (deleting) {
      return <div className="tabLoading">{loadState}</div>;
    } else {
      if (aiLoad) {
        return (
          <div className="wholeAi">
            <div className="subAi">
              <div className="backDiv">
                <div className="backIconDiv">
                  <ArrowBackIcon
                    id="backIcon"
                    onClick={() => {
                      handleBack();
                    }}
                  />
                </div>
                <div className="aiHead">AI Image</div>
              </div>
              <div className="aiDiv">
                <img alt="imgz" className="altImg" src={aiSrc} />
              </div>
              <div className="iconsDivs">
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
            </div>
          </div>
        );
      } else if (!aiLoad) {
        if (tabLoad) {
          return (
            <div className="tabLoading">Fetching Candidates details...</div>
          );
        } else if (!tabLoad) {
          return (
            <>
              <div className="tabLoading">Candidates Details</div>
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
                <div className="tabTable">
                  <table>
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
                          (phone &&
                            data.phone.toString().includes(phone.toString()))
                        ) {
                          return (
                            <tr>
                              <td className="tdA">
                                <div className="tdADiv">
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
                                  {data.inputPic ? (
                                    ""
                                  ) : (
                                    <span className="cameraSpan">
                                      <CameraAltIcon
                                        id="cameraIcon"
                                        onClick={() => {
                                          handleCamera(data);
                                        }}
                                      />
                                    </span>
                                  )}
                                  <span className="sendSpan">
                                    <AutoFixHighIcon
                                      id="autoIcon"
                                      onClick={() => {
                                        setValidToken(data.token);
                                        setAisrc("");
                                        handleAiImage(data.token);
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
            </>
          );
        }
      }
    }
  };

  return (
    <div id="admin">
      <div className="header">
        <div className="univLogo">
          <img src={logo} alt="logo" className="logoImg" />
        </div>
        <div className="univName">Empower Futures</div>
      </div>
      <hr id="hrLine" />

      <div className="adminPage">{HandleAiLoad()}</div>

      <ToastContainer />
    </div>
  );
}
