import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
export default function DataTable({ rows, handleEdit, handleDelete }) {
  return (
    <TableContainer component={Paper}>
      <Box style={{ display: "flex", padding: 22, justifyContent: "center" }}>
        <Typography variant="h5">
          CRUD{" "}
          <span style={{ color: "red", fontWeight: "bolder" }}>
            Redux-Toolkit-Saga{" "}
          </span>
        </Typography>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Id</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              User Name
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Email
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.id}
              </TableCell>
              <TableCell align="center">{row.userName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="right">
                <Box
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    onClick={(e) => {
                      handleEdit({
                        id: row.id,
                        userName: row.userName,
                        email: row.email,
                      });
                    }}
                  >
                    {" "}
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={(e) => {
                      handleDelete({
                        id: row.id,
                      });
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
