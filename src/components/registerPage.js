import React from "react";
import "../scss/registerPage.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { linkNode } from "../nodeLink";
import axios from "axios";
import QRCode from "react-qr-code";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [career, setCareer] = useState("");
  const [qrShow, setQrShow] = useState("");

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

  useEffect(() => {
    try {
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(name, phone, email, career, linkNode);
      let dataObj = { name: name, phone: phone, email: email, career: career };

      await axios
        .post(`${linkNode}/setuser`, { dataObj })
        .then((res) => {
          console.log(res.data);
          if (res.data?.status) {
            alert("Submitted Succesfully");
            handleClear();
          }
        })
        .catch((err) => {
          console.log(err);
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
    <div id="RegisterPage">
      <div className="registerPage">
        <div className="page">
          <div className="head">Registration Form</div>
          <div className="nameDiv">
            <div className="text">
              Name<span className="aster">*</span>
            </div>
            <div className="inputDiv">
              <input
                type="text"
                placeholder="name"
                className="nameInput"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="emailDiv">
            <div className="text">
              Email<span className="aster">*</span>
            </div>
            <div className="inputDiv">
              <input
                type="email"
                placeholder="email"
                className="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="phoneDiv">
            <div className="text">
              Phone<span className="aster">*</span>
            </div>
            <div className="inputDiv">
              <input
                type="text"
                placeholder="phone"
                className="phoneInput"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="careerDiv">
            <div className="text">
              Career<span className="aster">*</span>
            </div>
            <div className="inputDiv">
              <FormControl variant="standard" id="careerForm">
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="career"
                  value={career}
                  onChange={(e) => {
                    setCareer(e.target.value);
                  }}
                >
                  <MenuItem value="">career</MenuItem>
                  {careerOptions.map((data) => {
                    return <MenuItem value={data.value}>{data.label}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="finalDiv">
            <div className="submitDiv">
              <Button
                variant="contained"
                id="submitBtn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </div>
            <div
              className="resetDiv"
              onClick={() => {
                handleClear();
              }}
            >
              Clear form
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
