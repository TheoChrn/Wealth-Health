import { createSlice } from "@reduxjs/toolkit";

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employeesData: []
  },
  reducers: {
    setEmployeesData: (state,  {payload} ) => {
      state.employeesData = state.employeesData.concat(payload);
    }
  }
});

export const { setEmployeesData } = employeesSlice.actions;
export default employeesSlice.reducer;