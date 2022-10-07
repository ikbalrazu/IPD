import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoginTopHeader from "../Sheard/LoginTopHeader";
import "./EmailOTPVerify.css";
import { AppContext } from "../context/Context";
import { Base64 } from "js-base64";
import classes from "./EmailOtp.module.css";

const EmailOTPVerify = () => {
  const locatiion = useLocation();
  const dashboard = useNavigate();
  // const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [randomotp, setRandomOtp] = useState();
  const [otp, setOtp] = useState();
  //const [dealsid,setDealsId] = useState([]);

  //const {setDealsId,deals} = useContext(AppContext);

  const alertmsg = useRef();
  const [msg, setMSG] = useState();

  const verifyPin = async() => {
    // console.log(typeof(randomotp));
    // console.log(typeof(otp));
    if (!otp) {
      alertmsg.current.style.color = "red";
      setMSG("Please enter otp!");
    }

    if (otp === randomotp.toString()) {
      //console.log("two factor authentication successfully done");
      //console.log(locatiion?.state?.Password);
      const encodepassword = locatiion?.state?.Password;
      const password = Base64.decode(encodepassword);
      const id = locatiion?.state?.ID;
      localStorage.setItem(
        "userinfo",
        JSON.stringify({
          id: locatiion?.state?.ID,
          name: locatiion?.state?.Name,
          email: locatiion?.state?.Email,
          // userstatus: locatiion?.state?.UserStatus,
          firstname: locatiion?.state?.FirstName,
          lastname: locatiion?.state?.LastName,
          // phone: locatiion?.state?.Phone_Number,
          // company: locatiion?.state?.Company,
          // companyrole: locatiion?.state?.Company_Role,
          // role: locatiion?.state?.Role,
          // deals: locatiion?.state?.Deals_need_access_to,
          is_notify:locatiion?.state?.Email_When_Document_Uploaded,
          token: locatiion?.state?.Token,
        })
      );

      

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      monthNames[today.getMonth()] +
      "-" +
      today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
      
      //const data = await axios.put("/logindate",{id,date,password});
      
      dashboard("/home");
    } else {
      alertmsg.current.style.color = "red";
      setMSG(
        "Please check your email again as the OTP you have entered is incorrect."
      );
    }
  };

  const sendEmail = () => {
    const email = locatiion?.state?.Email;
    const otpPin = Math.floor(1000 + Math.random() * 9000);
    setRandomOtp(otpPin);
    axios
      .post("/sendOTPVerificationEmail", {
        email,
        otpPin,
      })
      .then(function (data) {
        console.log(data?.data?.message);
        alertmsg.current.style.color = "#02A5E2";
        setMSG("Please check your email as a new OTP will be sent.");
      });
  };

  useEffect(() => {
    
    const email = locatiion?.state?.Email;
    const otpPin = Math.floor(1000 + Math.random() * 9000);
    //console.log(otpPin);
    setRandomOtp(otpPin);
    axios
      .post("/sendOTPVerificationEmail", {
        email,
        otpPin,
      })
      .then(function (data) {
        console.log(data?.data?.message);
      });
  }, []);

  return (
    <>
      <LoginTopHeader></LoginTopHeader>

      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-6 text-center">
            <div class="row">
              <div className="col-sm-12 mt-5 ">
                <div className="card text-white bg-dark ">
                  <div className="card-header text-center p-3">
                    OTP Verification
                  </div>
                  <div class="card-body">
                    <div
                      class="alert alert-success alert-dismissible fade show"
                      role="alert"
                    >
                      We have sent your registered email a one time code, please
                      check your email and enter in the code here that you
                      receive.
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                    </div>

                    <input
                      className={classes.otpinput}
                      type="text"
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter pin"
                    />
                    <button
                      className="btn btn-primary btn-block mt-4 mb-4 customBtn"
                      onClick={verifyPin}
                    >
                      Verify
                    </button>

                    <p>
                      {" "}
                      Haven't received the code? &nbsp;&nbsp;
                      <a className={classes.resendBtn} onClick={sendEmail}>
                        Resend Code
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.alert_message} ref={alertmsg}>
        {msg}
      </div>

      {/* New DEsign End  */}
      
    </>
  );
};
export default EmailOTPVerify;
