import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TableFooter,
} from "@mui/material";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

const Employee = () => {
  const data = useSelector((state) => state.employees.employeesData);

  const headCells = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "startDate", label: "Start Date" },
    { id: "department", label: "Department" },
    { id: "dateOfBirth", label: "Date of Birth" },
    { id: "street", label: "Street" },
    { id: "city", label: "City" },
    { id: "state", label: "State" },
    { id: "zipCode", label: "Zip Code" },
    { id: "abbreviation", label: "Abbreviation" },
  ];

  const [count, setCount] = useState(data.length);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = rows.sort((a, b) => {
    const isAsc = order === "asc";
    if (a[orderBy] < b[orderBy]) return isAsc ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return isAsc ? 1 : -1;
    return 0;
  });
  return (
    <div id="employee-div" className={styles.container}>
      <h1>Current Employees</h1>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map((cell) => (
              <TableCell
                key={cell.id}
                sortDirection={orderBy === cell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === cell.id}
                  direction={orderBy === cell.id ? order : "asc"}
                  onClick={() => handleSort(cell.id)}
                >
                  {cell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((data, index) => {
            console.log(data);
            const { id, ...rowData } = data;
            console.log(data);
            console.log(id);
            return (
              <TableRow key={index}>
                {Object.keys(rowData).map((key) => (
                  <TableCell key={key}>{rowData[key]}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={count}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50]}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <button>
        <NavLink to="/">Home</NavLink>
      </button>
    </div>
  );
};

export default Employee;
