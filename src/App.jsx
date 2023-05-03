import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Employee from "./Pages/Employee";

function App() {
  const ROUTE_HOME = "/";
  const ROUTE_EMPLOYEE = "/employee-list";
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_HOME} element={<Home />} />
        <Route path={ROUTE_EMPLOYEE} element={<Employee />} />
        <Route path="*" element={<Navigate to={ROUTE_HOME} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
