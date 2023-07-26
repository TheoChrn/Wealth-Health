import React from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import styles from "./styles.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ value, selectedDate, onChange, currentYear }) => {
  const RenderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    currentYear,
  }) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const years = [...Array(45)].map((_, i) => currentYear - i);
    return (
      <div className="custom-header">
        <button
          onClick={decreaseMonth}
          type="button"
          disabled={prevMonthButtonDisabled}
        >
          {"<"}
        </button>
        <select
          value={getYear(date)}
          onChange={({ target: { value } }) => changeYear(value)}
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={months[getMonth(date)]}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          onClick={increaseMonth}
          type="button"
          disabled={nextMonthButtonDisabled}
        >
          {">"}
        </button>
      </div>
    );
  };

  return (
    <DatePicker
      value={value}
      renderCustomHeader={(params) => (
        <RenderCustomHeader {...params} currentYear={currentYear} />
      )}
      selected={selectedDate}
      wrapperClassName={styles.customDatePickerStyles}
      dateFormat="MM-dd-yyyy"
      placeholderText="mm-dd-yyyy"
      shouldCloseOnSelect={false}
      onChange={onChange}
    />
  );
};

export default CustomDatePicker;
