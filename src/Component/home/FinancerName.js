import React, { useEffect, useState } from "react";

import DataTable, { createTheme } from "react-data-table-component";
import { useNavigate, useLocation } from "react-router-dom";
const FinancerName = (props) => {
  const FinancierListPage = useNavigate();

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
      name: "Financer Name",
      sortable: true,
      selector: (row) => row?.name,
    },
    {
      name: "Deal Count",
      sortable: true,
      selector: (row) => row?.count,
    },

    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={handleButtonClick}
          name={JSON.stringify(row?.data)}
          className="btn btn-primary py-1"
        >
          Details
        </button>
      ),
    },
  ];
  const handleButtonClick = (state) => {
    // console.log("clicked");
    let link = state.target.name;
    FinancierListPage("/financierlist", {
      state: { link },
    });
    // alert(state.target.name);
  };

  useEffect(()=>{
    
  },[])
  return (
    <div>
      <DataTable
        title="Financer Name"
        columns={columns}
        data={props.data}
        theme="solarized"
        pagination
      />
    </div>
  );
};

export default FinancerName;
