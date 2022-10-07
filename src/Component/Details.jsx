import React, { useState, useEffect } from "react";
import Footer from "../Sheard/Footer";
import Menu from "../Sheard/Menu";
import TopHeader from "../Sheard/TopHeader";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import { zohoFilenameParserFromDownloadUrl } from "./Helpers/functions";

const Details = () => {
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
      selector: (row) => row.DocumentName,
    },
    {
      name: "Format Type",
      sortable: true,
      selector: (row) => row.FormatType,
    },
    {
      name: "Report Date",
      sortable: true,
      selector: (row) => row.ReportDate,
    },
    {
      name: "Publish Date",
      sortable: true,
      selector: (row) => row.ReportDate,
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
    //console.log(state.target.name);
    let docname = zohoFilenameParserFromDownloadUrl(state.target.name);
    //console.log(docname);
    let docid = state.target.id;

    await axios
      .get(
        `/alldocdownload?id=${docid}&filename=${docname}`
      )
      .then(function (response) {
        //console.log(response);
        window.open(response.data);
      });
  };





  const location = useLocation();
  const [documents, setDocuments] = useState([]);
  const [documentslist, setDocumenstList] = useState([]);

  //const [accessdocuments,setAccessDocuments] = useState();


  useEffect(() => {
    //AllDocumentsById();
    //console.log(location.state);
    setDocumenstList(location?.state?.months_list_filter);
  }, []);

  return (
    <div>
      <TopHeader></TopHeader>

      <Menu> </Menu>

      {/*  Breadcrumb start  */}




      <div className="container mt-5 mb-5">
        

        <div className=" mb-3 mt-5">
          <DataTable
            title="Documents"
            columns={columns}
            data={documentslist}
            theme="solarized"
            pagination
          />
        </div>

        {/* Details Section Start  */}

      </div>
      {/* Details Section End  */}

      {/*  Breadcrumb End   */}

      <Footer> </Footer>
    </div>
  );
};

export default Details;
