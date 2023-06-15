import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

interface EmployeeState {
  employees: string[];
}

const initialState: EmployeeState = {
  employees: [],
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<string[]>) => {
      state.employees = action.payload;
    },
  },
});

export const { setEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;
