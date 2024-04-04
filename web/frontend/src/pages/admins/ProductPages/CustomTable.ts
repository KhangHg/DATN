import DataTable from "react-data-table-component";

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  table: {
    style: {
      marginTop: "10px",
    },
  },
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      fontSize: "20px",
      borderBottomWidth: "1px",
      borderColor: "black",
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontWeight: 700,
    },
  },
  cells: {
    style: {
      fontSize: "16px",
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

export default customStyles;
