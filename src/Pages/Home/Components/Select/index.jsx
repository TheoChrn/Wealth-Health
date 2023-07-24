import React from "react";
import Select from "react-select";

const CustomSelect = ({ options, onChange, placeHolder }) => {
  return (
    <Select
      options={options}
      placeholder={placeHolder}
      defaultValue={placeHolder}
      onChange={onChange}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "rgba(192, 192, 192, 0.14)",
          border: "none",
          borderColor: "silver",
          boxShadow: state.isFocused ? "" : "transparent",
          outlineColor: state.isFocused ? "" : "",
          ":hover": {
            border: "solid 1px lime",
            boxShadow: "0px 0px 3px green",
            outlineColor: "green",
          },
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          fontSize: "14px",
          color: "grey",
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "white",
          color: "black",
          ":hover": {
            backgroundColor: "limegreen",
          },
          "::placeholder": {
            fontSize: "20px",
          },
        }),
      }}
    />
  );
};

export default CustomSelect;
