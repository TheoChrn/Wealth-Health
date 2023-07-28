import React, { useEffect, useState } from "react";
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

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [count, setCount] = useState(filteredData.length);
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

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const updatedFilteredData = data.filter((e) => {
      for (const [, value] of Object.entries(e)) {
        if (
          value
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .includes(search)
        ) {
          return true;
        }
      }
      return false;
    });
    setFilteredData(updatedFilteredData);
    setCount(updatedFilteredData.length);
    setPage(0);
  }, [search]);

  const sortedData = filteredData.sort((a, b) => {
    const isAsc = order === "asc";
    const orderByValueA = a[orderBy];
    const orderByValueB = b[orderBy];

    if (orderBy === "dateOfBirth" || orderBy === "startDate") {
      const dateA = orderByValueA?.split("-")[2];
      const dateB = orderByValueB?.split("-")[2];
      return isAsc ? dateA - dateB : dateB - dateA;
    }

    return isAsc
      ? (orderByValueA || "").localeCompare(orderByValueB || "")
      : (orderByValueB || "").localeCompare(orderByValueA || "");
  });

  const rows = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div id="employee-div" className={styles.container}>
      <h1>Current Employees</h1>
      <input
        placeholder="Type to search an employee..."
        className={styles.searchBar}
        onChange={(e) => {
          setSearch(
            e.target.value
              .toLowerCase()
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
          );
        }}
      ></input>
      <div className={styles.tableContainer}>
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
            {rows.map((data, index) => {
              const { id, ...rowData } = data;
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
                rowsPerPageOptions={[5, 10, 15]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {filteredData.length === 0 && <span>Aucunes données trouvées</span>}
      <button>
        <NavLink to="/">Home</NavLink>
      </button>
    </div>
  );
};

export default Employee;
