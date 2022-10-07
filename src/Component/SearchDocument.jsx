import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import { zohoFilenameParserFromDownloadUrl } from "./Helpers/functions";

const SearchDocument = ({data}) => {
  //const [propsdata,setPropsData] = useState(data);
  const [documents, setDocuments] = useState([]);

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
      name: "Available Reports",
      sortable: true,
      width: "150px",
      selector: (row) => row.DocumentName,
    },
    {
      name: "Deal Name",
      sortable: true,
      width: "220px",
      selector: (row) => row.DealName,
    },
    {
      name: "Issuer Name",
      sortable: true,
      selector: (row) => row.IssuerName,
    },
    {
      name: "Product Type",
      sortable: true,
      selector: (row) => row.ProductType,
    },
    {
      name: "Deal Administrator",
      sortable: true,
      selector: (row) => row.DealAdministrator,
    },
    {
      name: "Publish Date",
      sortable: true,
      selector: (row) => row.MonthReport,
    },
    {
      name: "Download",
      cell: (row) => (
        <button
          onClick={handleButtonClick}
          name={row.DownloadLink}
          id={row.Id}
          className="btn btn-primary py-1"
        >
          Download
        </button>
      ),
    },
  ];

  const handleButtonClick = async(state) => {
    let docname = zohoFilenameParserFromDownloadUrl(state.target.name);
    let docid = state.target.id;

    await axios
      .get(
        `/alldocdownload?id=${docid}&filename=${docname}`
      )
      .then(function (response) {
        window.open(response.data);
      });
  };

  
  useEffect(()=>{
    //console.log(data);
    setDocuments("");
    for (let i = 0; i < data?.length; i++) {
      //console.log(data.data.data[i]["Deals.DealName"]);
      const filename = data[i]?.Documents;
      const fileformat = filename?.split(".")[1];
      const MonthReport = data[i]?.MonthOfReport?.split(" & ").join(" ");
      setDocuments((olddata) => [
        ...olddata,
        {
          DocumentName: data[i].DocumentName,
          DownloadLink: data[i].Documents,
          FormatType: fileformat,
          ReportDate: data[i].CreatedDateTime,
          MonthReport: MonthReport,
          DealName: data[i].Deals.display_value,
          IssuerName: data[i].Issuer_Name,
          ProductType: data[i].Product_Type,
          DealAdministrator: data[i].Deal_Administrator,
        },
      ]);
    }
    
  },[data])
  return (
    <>
        <DataTable
        title="Documents"
        columns={columns}
        data={documents}
        theme="solarized"
        pagination
        />
    </>
  )
}

export default SearchDocument;