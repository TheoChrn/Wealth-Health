import React, { useState } from "react";
import styles from "./styles.module.scss";
import mockedData from "../../../../API/mockedData/data.json";
import CustomDatePicker from "../DatePicker";
import CustomSelect from "../Select";
import { setEmployeesData } from "../../../../features/employees.slice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Employee from "../../../Employee";
//import Modal from "../Modal/index";
import { Modal } from "volturuss-hrnet-react-modal";

const Form = () => {
  const states = mockedData.states;
  const departments = mockedData.departments;
  const [hasError, setHasError] = useState();
  const [displayModal, setDisplayModal] = useState(true);
  const dispatch = useDispatch();
  const todayDate = new Date();
  const selectedBirthDate = new Date(
    2005,
    todayDate.getMonth(),
    todayDate.getDate()
  );
  const selectedStartDate = todayDate;
  const replaceNumbers = /[^A-zÀ-ú]/g;
  const replaceLetters = /[^0-9]/g;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    startDate: "",
    department: "",
    dateOfBirth: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    abbreviation: "",
  });

  const {
    firstName,
    lastName,
    startDate,
    department,
    dateOfBirth,
    street,
    city,
    state,
    zipCode,
    abbreviation,
  } = formData;

  class Employee {
    constructor({
      firstName,
      lastName,
      startDate,
      department,
      dateOfBirth,
      street,
      city,
      state,
      zipCode,
      abbreviation,
    }) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.startDate = startDate;
      this.department = department;
      this.dateOfBirth = dateOfBirth;
      this.street = street;
      this.city = city;
      this.state = state;
      this.zipCode = zipCode;
      this.abbreviation = abbreviation;
      this.id = uuidv4();
    }
  }

  const reset = () => {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      startDate: "",
      department: "",
      dateOfBirth: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      abbreviation: "",
    });
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  const onChange = (e) => {
    const { name, value, label, abbreviation } = e.target ? e.target : e;
    setFormData((prevState) => ({
      ...prevState,
      ...(name === "firstName" && {
        firstName: value.replace(replaceNumbers, ""),
      }),
      ...(name === "lastName" && {
        lastName: value.replace(replaceNumbers, ""),
      }),
      ...(name === "department" && {
        department: label.replace(replaceNumbers, ""),
      }),
      ...(name === "street" && { street: value }),
      ...(name === "city" && { city: value.replace(replaceNumbers, "") }),
      ...(name === "state" && { state: label.replace(replaceNumbers, "") }),
      ...(name === "zipCode" && {
        zipCode: value.slice(0, 5).replace(replaceLetters, ""),
      }),
      ...(abbreviation && {
        abbreviation: abbreviation.replace(replaceNumbers, ""),
      }),
    }));
  };

  const isFormDataValid = () => {
    const values = Object.values(formData);
    const hasEmptyValue = values.some((value) => !value);
    setHasError(hasEmptyValue);
    return !hasEmptyValue;
  };

  const formatDate = (date, dateField) => {
    const formattedDate =
      date.getDate().toString().padStart(2, "0") +
      "-" +
      parseInt(date.getMonth() + 1)
        .toString()
        .padStart(2, "0") +
      "-" +
      date.getFullYear();
    setFormData({ ...formData, [dateField]: formattedDate });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = isFormDataValid();
    if (isValid) {
      dispatch(
        setEmployeesData(
          new Employee({
            firstName,
            lastName,
            startDate,
            department,
            dateOfBirth,
            street,
            city,
            state,
            zipCode,
            abbreviation,
          })
        )
      );
      reset();
      setDisplayModal(true);
    } else {
      console.log(formData);
      console.log("Impossible d'envoyer tous les champs ne sont pas remplis");
    }
  };

  return (
    <form className={styles.form} id="create-employee" onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          value={firstName}
          placeholder="John"
          onChange={onChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={lastName}
          placeholder="Doe"
          onChange={onChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="date-of-birth">Date of Birth</label>
        <CustomDatePicker
          value={dateOfBirth}
          currentYear={new Date().getFullYear() - 18}
          selectedDate={selectedBirthDate}
          onChange={(date) => {
            formatDate(date, "dateOfBirth");
          }}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="start-date">Start Date</label>
        <CustomDatePicker
          value={startDate}
          selectedDate={selectedStartDate}
          currentYear={new Date().getFullYear()}
          onChange={(date) => {
            formatDate(date, "startDate");
          }}
        />
      </div>
      <fieldset className={styles.address}>
        <legend>Address</legend>

        <div className={styles.inputContainer}>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            name="street"
            placeholder="20 Henry Court Brooklyn"
            value={street}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="New York City"
            value={city}
            onChange={onChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="state">State</label>
          <CustomSelect options={states} onChange={onChange} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="zip-code">Zip Code</label>
          <input
            id="zip-code"
            type="number"
            name="zipCode"
            placeholder="11233"
            value={zipCode}
            onChange={onChange}
          />
        </div>
      </fieldset>
      <div className={`${styles.inputContainer} ${styles.departmentSelect}`}>
        <label htmlFor="department">Department</label>
        <CustomSelect options={departments} onChange={onChange} />
      </div>
      <button type="submit" className={styles.sumbitBtn}>
        Save
      </button>
      <Modal onClose={closeModal} display={displayModal}>
        <p>Employee created!</p>
      </Modal>
    </form>
  );
};

export default Form;
