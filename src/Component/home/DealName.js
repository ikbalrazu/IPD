import DataTable, { createTheme } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
const DealName = (props) => {
  
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

  return (
    <div>
      <DataTable
        title="Deal Name"
        columns={columns}
        data={props.data}
        theme="solarized"
        pagination
      />
    </div>
  );
};

export default DealName;
