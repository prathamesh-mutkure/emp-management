import { configureStore } from "@reduxjs/toolkit";
import { employeesSlice } from "./employee-store";

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
