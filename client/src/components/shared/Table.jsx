import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "90vh",
      }}
    >
      <Paper
        className="blueGradient"
        elevation={3}
        sx={{
          padding: "1rem 4rem",
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          overflow: "hidden",
          height: "100%",
          boxShadow: "none",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            color: "white",
            margin: "2rem",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          pageSize={25}
          rowsPerPageOptions={[10, 25, 50, 100]}
          style={{
            height: "80%",
          }}
          sx={{
            border: "none",
            ".table-header": {
              bgcolor: "black",
              color: "white",
            },
            ".MuiDataGrid-cell": {
              display: "flex",
              alignItems: "end",
              color: "whitesmoke",
            },
            ".MuiTablePagination-selectLabel": {
              color: "white",
            },
            ".MuiTablePagination-displayedRows": {
              color: "white",
            },
            ".MuiSvgIcon-root": {
              color: "white",
            },
            ".MuiTablePagination-input": {
              color: "white",
            },
            ".MuiDataGrid-scrollbar": {
              height: "7px",
            },
            ".MuiDataGrid-selectedRowCount": {
              color: "white",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
