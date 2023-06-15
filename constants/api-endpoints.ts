import axios from "axios";

export const BASE_URL = "http://localhost:8090";

export const server = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const DEPT_ENDPOINTS = {
  add: "/admin/department/add",
  get: "/admin/department/getbyid",
  all: "/admin/department/getall",
  update: "/admin/department/update",
  delete: "/admin/department/delete",
};

export const EMP_ENDPOINTS = {
  add: "/admin/employee/add",
  get: "/admin/employee/getbyid",
  all: "/admin/employee/getall",
  getByDateAndDept: "/admin/employee/getby_date_and_dept",
  getDept: "/admin/employee/getworking_department",
  update: "/admin/employee/update",
  delete: "/admin/employee/delete",
};

export const AUTH_ENDPOINTS = {
  login: "/auth/login-user",
};

export const COMMON_ENDPOINTS = {
  getEmp: "/common/get-employee",
  getDept: "/common/get-department",
};
