import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./Component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Help from "./Component/Help";
import Details from "./Component/Details";
import Search from "./Component/Search";
import Registration from "./Component/Registration";
import IssuerList from "./Component/IssuerList";
import FinancierList from "./Component/FinancierList";
import MonthsList from "./Component/MonthsList";
import ResetPassword from "./Component/ResetPassword";
import EmailOTPVerify from "./Component/EmailOTPVerify";
import ConfirmResetPassword from "./Component/ConfirmResetPassword";
import SetUserPassword from "./Component/SetUserPassword";
import ConfirmSetUserPassword from "./Component/ConfirmSetUserPassword";
import General from "./Component/General";



function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/general" element={<General />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details" element={<Details />} />
        <Route path="/issuerlist" element={<IssuerList />} />
        <Route path="/financierlist" element={<FinancierList />} />
        <Route path="/monthslist" element={<MonthsList />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
        <Route
          path="/confirmresetpassword"
          element={<ConfirmResetPassword />}
        />
        <Route path="/emailotpverify" element={<EmailOTPVerify />} />
        <Route
          path="/setuserpassword/:id/:token"
          element={<SetUserPassword />}
        />
        <Route
          path="/confirmsetuserpassword"
          element={<ConfirmSetUserPassword />}
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
