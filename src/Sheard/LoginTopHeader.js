import React from "react";
import amal from '../images/amallogo.svg';

const LoginTopHeader = () => {
  return (
    <div
      style={{
        backgroundColor: "#232323",
      }}
    >
      <div className="container d-flex justify-content-between text-white py-4">
        <div><img src={amal} alt="example" style={{ height: 33 }} /></div>
        <div>CORPORATE TRUST INVESTOR REPORTING</div>
      </div>
    </div>
  );
};

export default LoginTopHeader;
