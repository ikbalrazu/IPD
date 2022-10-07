import React, { useState,useEffect } from "react";
import LoginTopHeader from "../Sheard/LoginTopHeader";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const SetUserPassword = () => {
    const ConfirmResetPasswordPage = useNavigate();
    const {id,token} = useParams();
    const [password,setPassword] = useState();
    const [confirmpassword,setConfirmPassword] = useState();
    const [expire, setExpire] = useState();
    const [errormsg,setErrorMsg] = useState();
    

    const PasswordHandler = async() => {
        try{
            const {data} = await axios.post("/verifyForgotMail",{token})
            console.log(data?.result);
            if(data?.result === "Link expired"){
              setExpire(true);
            }else{
              setExpire(false);
              if(!password || !confirmpassword){
                setErrorMsg("Plz fill up all fields!");
              }else if (password !== confirmpassword) {
                setErrorMsg("password not matched!");
              }else if (password.length < 8) {
                setErrorMsg("Password is too short!");
              }else{
                  axios.put("/reset-password",{id,password}).then(function(data){
                  //console.log(data);
                  if(data.data.message === "Data Updated Successfully"){
                    ConfirmResetPasswordPage("/confirmsetuserpassword");
                  }else{
                    setErrorMsg("something wrong! try again later");
                  }
                  })
              }
            }
          }catch(error){
            console.log(error);
          }

    }

    useEffect(()=>{
        console.log(id);
        console.log(token);
        const CheckValidLink = async()=>{
            try{
            const {data} = await axios.post("/verifyForgotMail",{token})
            console.log(data?.result);
            if(data?.result === "Link expired"){
                setExpire(true);
            }else{
                setExpire(false);
            }
            }catch(error){
            console.log(error);
            }
        }
        CheckValidLink();
    },[token,id])

    return(
        <div>
            <LoginTopHeader></LoginTopHeader>
            {expire === false &&(
                <>
            <div style={{display:"flex",flexDirection:"column",margin:"0 auto",alignItems:"center"}}>
            <div class="form-group mt-3">
                      <input
                        style={{ backgroundColor: "#00ADEE", color: "white" }}
                        type="password"
                        class="form-control"
                        id="password"
                        aria-describedby="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
            </div>
            <div class="form-group mt-3">
                      <input
                        style={{ backgroundColor: "#00ADEE", color: "white" }}
                        type="password"
                        class="form-control"
                        id="password"
                        aria-describedby="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
            </div>
            <div class="form-group mt-3">
                      <button
                        //  style={{ float: "left", color: "#00ADEE" }}
                        type="button"
                        className="btn btn-primary mt-2 border-0"
                        onClick={PasswordHandler}
                        id="registetionbutton"
                      >
                        Ok
                      </button>
            </div>
            <div>
                <p style={{color:"red"}}>{errormsg}</p>
              </div>
            </div>
            </>
            )}
            {expire === true &&(
                <>
                <div className="form-group mt-1" style={{width:"50%"}}>
                <h1 className="expiredlink">Your link has expired, please try to set your password using the set Password link.</h1>
              </div>
              </>
              )}
            
        </div>
    )
}

export default SetUserPassword;