import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DeptState {
  departments: Department[];
}

const initialState: DeptState = {
  departments: [],
};

export const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setDepartments: (state, action: PayloadAction<Department[]>) => {
      state.departments = action.payload;
    },
  },
});

export const { setDepartments } = departmentSlice.actions;

export default departmentSlice.reducer;
