import React from "react";
import Form from "./Components/Form";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bg}></div>
      <div className={styles.formContainer}>
        <h1>
          <span className={styles.capitalTitle}>HR</span>net
        </h1>
        <NavLink to="/employee-list">
          <button>View Current Employees</button>
        </NavLink>
        <h2>Create Employee</h2>
        <Form />
      </div>
    </div>
  );
};

export default Home;
