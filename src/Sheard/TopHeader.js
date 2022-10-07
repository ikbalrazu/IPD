import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

export default function TopHeader() {
  const loginpage = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userinfo");
    localStorage.removeItem("dealsinfo");
    loginpage("/");
  };

  useEffect(() => {
    if (!userInfo) {
      loginpage("/");
    }
  }, []);

  return (
    <div className="container d-flex justify-content-between text-white py-2">
      <div style={{paddingRight:"0px",paddingLeft:"0px",fontWeight:"500"}}>CORPORATE TRUST INVESTOR REPORTING</div>
      <div className="d-flex d-flex align-items-center">
        <div style={{ paddingRight : 20 }}>WELCOME, {userInfo?.name}</div>
        <div class="form-group ">
          <button
            style={{ backgroundColor: '#00ADEE'}}
            type="button"
            className="btn btn-primary  border-0"
            onClick={logoutHandler}
          >
            Logout{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
