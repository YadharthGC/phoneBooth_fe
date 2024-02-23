import React from "react";
import "../scss/admin.scss";
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
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MedicationIcon from "@mui/icons-material/Medication";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [phone, setPhone] = useState("");

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
                            <AutoFixHighIcon id="autoIcon" />
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
    </div>
  );
}
