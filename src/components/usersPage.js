import React, { useState, useEffect } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Man4Icon from "@mui/icons-material/Man4";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import "../scss/usersPage.scss";
import { Button } from "@mui/material";
import { linkNode } from "../nodeLink";
import axios from "axios";
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import domtoimage from "dom-to-image";

export default function UsersPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [career, setCareer] = useState("");
  const [Gender, setGender] = useState("");
  const [qrShow, setQrShow] = useState(false);
  const [qrValue, setQrValue] = useState(null);
  const careerOptions = [
    {
      value: "engineer",
      label: "engineer",
    },
    {
      value: "doctor",
      label: "doctor",
    },
    {
      value: "Accountant",
      label: "Accountant",
    },
  ];
  const qrCodeRef = useRef(null);

  useEffect(() => {
    try {
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(name, phone, email, career, linkNode);
      let dataObj = {
        name: name,
        phone: phone,
        email: email,
        career: career,
        token: uuidv4(),
      };
      await axios
        .post(`https://phonebooth-be.onrender.com/ablelyfbooth/setuser`, {
          dataObj,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data?.status) {
            alert("Submitted Succesfully");
            handleClear();
            console.log(dataObj);
            setQrValue(dataObj);
            setQrShow(true);
            setTimeout(() => {
              handleDownload(dataObj);
            }, 3000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async (dataObj) => {
    try {
      const qrCodeDiv = document.getElementById("qrCode");
      console.log(qrCodeDiv);

      domtoimage
        .toJpeg(document.getElementById("qrCode").parentNode)
        .then(function (dataUrl) {
          let link = document.createElement("a");
          link.download = `${dataObj.name}.jpeg`;
          link.href = dataUrl;
          link.click();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = () => {
    try {
      setName("");
      setPhone("");
      setEmail("");
      setCareer("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div id="usersPage">
      {!qrShow ? (
        <div className="usersPage">
          <div className="head">Empower Futures</div>
          <div className="nameHead">
            <div className="nameSpan">Name</div>
          </div>
          <div className="nameDiv">
            <div className="nameCon">
              <BadgeIcon id="nameIcon" />
              <input
                type="text"
                className="nameInput"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="nameHead">
            <div className="nameSpan">Email</div>
          </div>
          <div className="mailDiv">
            <div className="mailCon">
              <MailIcon id="mailIcon" />
              <input
                type="text"
                className="mailInput"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="nameHead">
            <div className="nameSpan">Phone</div>
          </div>
          <div className="phoneDiv">
            <div className="phoneCon">
              <AppShortcutIcon id="phoneIcon" />
              <input
                type="text"
                className="phoneInput"
                placeholder="Phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="nameHead">
            <div className="nameSpan">Career</div>
          </div>
          <div className="careerDiv">
            <div className="careerCon">
              <WorkspacePremiumIcon id="careerIcon" />
              <select
                className="careerSelect"
                value={career}
                onChange={(e) => {
                  setCareer(e.target.value);
                }}
              >
                <option className="careerOption" value="doctor">
                  Doctor
                </option>
                <option className="careerOption" value="doctors">
                  Doctors
                </option>
                <option className="careerOption" value="doctorss">
                  Doctorss
                </option>
              </select>
            </div>
          </div>
          <div className="nameHead">
            <div className="nameSpan">Gender</div>
          </div>
          <div className="genderDiv">
            <div className="genderCon">
              <Man4Icon id="genderIcon" />
              <input
                type="radio"
                name="gender"
                className="genderRadio"
                onClick={() => {
                  setGender("male");
                }}
              />
              Male
              <input
                type="radio"
                name="gender"
                className="genderRadio female"
                onClick={() => {
                  setGender("male");
                }}
              />
              Female
            </div>
          </div>
          <div className="finalDiv">
            <div className="finalCon">
              <div className="submitDiv">
                <button
                  variant="contained"
                  id="submitBtn"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  SUBMIT
                </button>
              </div>
              {/* <div
              className="resetDiv"
              onClick={() => {
                // handleClear();
              }}
            >
              Clear form
            </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="qrDiv">
          <QRCode
            ref={qrCodeRef}
            id="qrCode"
            size={256}
            value={JSON.stringify(qrValue)}
            viewBox={`0 0 256 256`}
            download
          />
        </div>
      )}
    </div>
  );
}
