import React, { useState,useEffect } from "react";
import Footer from "../Sheard/Footer";
import Menu from "../Sheard/Menu";
import TopHeader from "../Sheard/TopHeader";
import Pagination2 from "./Pagination2";
import "./search.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AdvanceSearch from "./Seacrch/AdvanceSearch";
import DataTable, { createTheme } from "react-data-table-component";
import SearchDocument from "./SearchDocument";

const Search = () => {
  const location = useLocation();
  const [documents, setDocuments] = useState([]);
  const monthlist = useNavigate();
  createTheme(
    "solarized",
    {
      text: {
        primary: "#fff",
        secondary: "#fff",
        disabled: "#fff",
      },
      background: {
        default: "#222222",
      },
      context: {
        background: "#e3f2fd",
        text: "rgba(0, 0, 0, 0.87)",
      },
      divider: {
        default: "#474747",
      },
      button: {
        default: "#fff",
        focus: "#fff",
        hover: "#fff",
        disabled: "#fff",
      },
    },
    "dark"
  );

  const columns = [
    {
      name: "Deal Name",
      sortable: true,
      wrap: true,
      selector: (row) => row?.DealName,
    },
    {
      name: "Issuer Name",
      sortable: true,
      selector: (row) => row?.Issuer_Name,
    },
    {
      name: "Financer Name",
      sortable: true,
      selector: (row) => row?.Financer,
    },
    {
      name: " Product Type",
      sortable: true,
      selector: (row) => row?.DealType,
    },
    {
      name: "Deal Administrator",
      sortable: true,
      selector: (row) => row?.Deal_Administrator,
    },
    {
      name: "Last Update Date",
      sortable: true,
      selector: (row) => row.Added_Time,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={handleButtonClick}
          name={row.ID}
          className="btn btn-primary py-1"
        >
          Details
        </button>
      ),
    },
  ];
 
  const handleButtonClick = (state) => {
    let link = state.target.name;
    monthlist("/monthslist", {
      state: link,
    });
  };


  
  useEffect(()=>{

  },[location]);



  return (
    <div>
      <TopHeader></TopHeader>
      <Menu></Menu>
      {/* Basic Search Section Start */}
      <AdvanceSearch/>
      {/* End table of All content  */}
      <div className="container mt-5">
      {location?.state?.ModuleName === "All_Deals" &&(
        // <DealName data={location?.state?.data?.data} />
        <DataTable
        title="Deal"
        columns={columns}
        data={location?.state?.data?.data}
        theme="solarized"
        pagination
        />
      )}
      {location?.state?.ModuleName === "All_Documents" &&(
        <SearchDocument data={location?.state?.data?.data}/>
      )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Search;
