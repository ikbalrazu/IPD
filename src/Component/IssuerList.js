import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Footer from "../Sheard/Footer";
import Menu from "../Sheard/Menu";
import TopHeader from "../Sheard/TopHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classes from "./home.module.css";

export default function IssuerList() {
  const location = useLocation();
  const monthlist = useNavigate();
  const [issuerlist, setIssuerList] = useState();
  const [issuername, setIssuerName] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));

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
      selector: (row) => row?.data?.DealName,
    },
    {
      name: "Issuer Name",
      sortable: true,
      selector: (row) => row?.data?.Issuer_Name,
    },
    {
      name: " Product Type",
      sortable: true,
      selector: (row) => row?.data?.DealType,
    },
    {
      name: "Deal Administrator",
      sortable: true,
      selector: (row) => row?.data?.Deal_Administrator,
    },
    {
      name: "Last Update Date",
      sortable: true,
      selector: (row) => row?.data?.Added_Time,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={handleButtonClick}
          name={row.data.ID}

          className="btn btn-primary py-1"
        >
          Details
        </button>
      ),
    },
  ];

  const handleButtonClick = (state) => {
    let link = state.target.name;
    let dealadminstrator = state.target.Deal_Administrator;
    const dealsdata = JSON.parse(location?.state?.data);
    //console.log(link);
    monthlist("/monthslist", {
      state: link,
    });
  };



  useEffect(() => {
    //IssuerList();
    //console.log(JSON.parse(location?.state?.data));
    const dealsdata = JSON.parse(location?.state?.data);
    //console.log(dealsdata);
    setIssuerList(dealsdata);
  }, []);
  return (
    <div>
      <TopHeader></TopHeader>
      <Menu></Menu>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            {/* Search Section Start */}
            <section>
              <div
                className=" mt-4"
                style={
                  {
                    // backgroundColor: "#232323",
                    // padding: 20,
                  }
                }
              >
                <h5 className="text-start py-1" style={{ color: "#00ADEE" }}>
                  Welcome, {userInfo?.name}
                </h5>


              </div>
            </section>
            {/* Search Section End  */}

            {/* File Section tart  */}

            <section
              className="container mt-1"
              style={{
                backgroundColor: "#222222",
                padding: 25,
              }}
            >

              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active text-white"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <h3> List of Deals for {issuername} </h3>
                  <span>{issuerlist?.length}</span>

                  <div>
                    <DataTable
                      title="Deal Name"
                      columns={columns}
                      data={issuerlist}
                      theme="solarized"
                      pagination
                    />
                  </div>
                </div>
                <div
                  className="tab-pane fade text-white"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <h3> Deal Name </h3>


                </div>

                {/* End table of All content  */}


              </div>
            </section>

            {/* File Section End  */}
          </div>


        </div>
      </div>

      <Footer className={classes.footer}
      ></Footer>
    </div>
  );
}
