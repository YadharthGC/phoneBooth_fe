import React, { useState, useEffect } from "react";
import "../scss/registration.scss";
import acc from "../images/acc.jpg";
import chef from "../images/chef.jpg";
import doc from "../images/doc.jpg";
import eng from "../images/eng.jpg";
import logo from "../images/logob.jpg";
import tk from "../images/tkb.jpg";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { linkNode } from "../nodeLink";
import axios from "axios";

export default function Registration() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [career, setCareer] = useState("");
  const [gender, setGender] = useState("");
  const [over, setOver] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log(name, phone, email, career, linkNode);
      let dataObj = {
        name: name,
        phone: phone,
        email: email,
        career: career,
        gender: gender,
        token: uuidv4(),
      };
      let val = `${name}\n${phone}\n${email}\n${career}\n${gender}\n${dataObj.token}`;
      await axios
        .post(`https://phonebooth-be.onrender.com/ablelyfbooth/setuser`, {
          dataObj,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data?.status) {
            handleClear();
            setOver(false);
            setLoading(false);
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
      setGender("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div id="registerPage">
      <div className="registerPage">
        <div className="header">
          <div className="univLogo">
            <img src={logo} alt="logo" className="logoImg" />
          </div>
          <div className="univName">Empower Futures</div>
        </div>
        <hr id="hrLine" />
        {loading ? (
          <div className="body complete">
            {/* <div className="tkImgDiv">
              <img src={tk} className="tkImg" alt="tk" />
            </div> */}
            <div className="tkTextB">Your details are being Submitted...</div>
          </div>
        ) : !loading ? (
          over ? (
            <div className="body">
              <div className="title">Registration Form</div>
              <div className="nameDiv">
                <div className="textDiv">Name:</div>
                <div className="inputDiv">
                  <input
                    type="text"
                    className="boxInput"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="emailDiv">
                <div className="textDiv">Email:</div>
                <div className="inputDiv">
                  <input
                    type="text"
                    className="boxInput"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="phoneDiv">
                <div className="textDiv">Phone:</div>
                <div className="inputDiv">
                  <input
                    type="text"
                    className="boxInput"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="genderDiv">
                <div className="textDiv">Gender:</div>
                <div className="genderRadio">
                  <span className="maleSpan">
                    <input
                      type="radio"
                      className="maleRadio"
                      name="gender"
                      onClick={() => {
                        setGender("male");
                      }}
                    />
                  </span>
                  <span className="maleText">Male</span>
                  <span className="femaleSpan">
                    <input
                      type="radio"
                      name="gender"
                      className="femaleRadio"
                      onClick={() => {
                        setGender("male");
                      }}
                    />
                  </span>
                  <span className="femaleText">Female</span>
                </div>
              </div>
              <div className="careerDiv">
                <div className="textDiv">What You want to be ?</div>
                <div className="imgDivs">
                  <div
                    className={`imgOneEng ${career}`}
                    onClick={() => {
                      setCareer("engineer");
                    }}
                  >
                    <div className="imgShow">
                      <img src={eng} className="imgRole" alt="acc" />
                    </div>
                    <div className="textRole">Engineer</div>
                  </div>
                  <div
                    className={`imgOneDoc ${career}`}
                    onClick={() => {
                      setCareer("doctor");
                    }}
                  >
                    <div className="imgShow">
                      <img src={doc} className="imgRole" alt="acc" />
                    </div>
                    <div className="textRole">Doctor</div>
                  </div>
                  <div
                    className={`imgOneAcc ${career}`}
                    onClick={() => {
                      setCareer("lawyer");
                    }}
                  >
                    <div className="imgShow">
                      <img src={acc} className="imgRole" alt="acc" />
                    </div>
                    <div className="textRole">Lawyer</div>
                  </div>
                  <div
                    className={`imgOneChef ${career}`}
                    onClick={() => {
                      setCareer("chef");
                    }}
                  >
                    <div className="imgShow">
                      <img src={chef} className="imgRole" alt="acc" />
                    </div>
                    <div className="textRole">Chef</div>
                  </div>
                </div>
              </div>
              <div
                className="submitDiv"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <div className="submitText">Submit</div>
              </div>
            </div>
          ) : (
            <div className="body complete">
              <div className="tkImgDiv">
                <img src={tk} className="tkImg" />
              </div>
              <div className="tkTextA">Thank You!</div>
              <div className="tkTextB"> Please Proceed to the Photo Booth.</div>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
