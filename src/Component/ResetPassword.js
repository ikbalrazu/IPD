import React, { useEffect, useState } from "react";
import LoginTopHeader from "../Sheard/LoginTopHeader";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";
import { Base64 } from "js-base64";

const ResetPassword = () => {
  const ConfirmResetPasswordPage = useNavigate();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [expire, setExpire] = useState();
  const [errormsg, setErrorMsg] = useState();

  const { id, token } = useParams();

  const ResetPassword = async () => {
    try {
      const { data } = await axios.post(
        "/verifyForgotMail",
        { token }
      );
      //console.log(data?.result);
      if (data?.result === "Link expired") {
        setExpire(true);
      } else {
        setExpire(false);
        if (!password || !confirmpassword) {
          setErrorMsg("Please fill up all fields!");
        } else if (password !== confirmpassword) {
          setErrorMsg("Password not matched!");
        } else if (password.length < 8) {
          setErrorMsg("Password is too short!");
        } else {
          axios
            .put("/reset-password", {
              id,
              password,
            })
            .then(function (data) {
              //console.log(data);
              if (data.data.message === "Data Updated Successfully") {
                ConfirmResetPasswordPage("/confirmresetpassword");
              } else {
                setErrorMsg("Something wrong! try again later");
              }
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(id);
    // console.log(token);
    const CheckValidLink = async () => {
      try {
        const { data } = await axios.post(
          "/verifyForgotMail",
          { token }
        );
        //console.log(data?.result);
        if (data?.result === "Link expired") {
          setExpire(true);
        } else {
          setExpire(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    CheckValidLink();
  }, [token]);

  return (
    <div>
      <LoginTopHeader></LoginTopHeader>

      <div className="form-content">
        {expire === false && (
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col-md-6 text-center">
                <div class="row">
                  <div className="col-sm-12 mt-5 ">
                    <div className="card text-white bg-dark ">
                      <div className="card-header text-center p-3 text-warning">
                        Your link will expire in 5 minutes.
                      </div>

                      <div class="card-body mt-2">
                        <div
                          className="form-group mt-1"
                          style={{ width: "50%" }}
                        >
                          <input
                            style={{
                              backgroundColor: "#00ADEE",
                              color: "white",
                              width: "200%",
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id=""
                            aria-describedby="username"
                            placeholder="New Password"
                            required
                            // onChange={(e)=>setResetEmail(e.target.value)}
                          />
                        </div>
                        <div class="form-group mt-3" style={{ width: "50%" }}>
                          <input
                            style={{
                              backgroundColor: "#00ADEE",
                              color: "white",
                              width: "200%",
                            }}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id=""
                            aria-describedby="username"
                            placeholder="Confirm New Password"
                            required
                            // onChange={(e)=>setResetEmail(e.target.value)}
                          />
                        </div>

                        <div class="form-group mt-3">
                          <button
                            //  style={{ float: "left", color: "#00ADEE" }}
                            type="button"
                            className="btn btn-primary mt-2 border-0"
                            onClick={ResetPassword}
                            id="registetionbutton"
                          >
                            Submit
                          </button>
                          {/* <p style={{ color: "red" }}>{alertmsg}</p> */}

                          {errormsg ? (
                            <div class="alert alert-danger mt-5" role="alert">
                              {errormsg}
                            </div>
                          ) : (
                            <> </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {expire === true && (
          <>
            <div class="alert alert-danger" role="alert">
              Your link has expired, please try to reset your password using the
              Forgot Password link.
            </div>
          </>
        )}
        
      </div>
    </div>
  );
};

export default ResetPassword;
