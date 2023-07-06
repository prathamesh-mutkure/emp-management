import { EMP_ENDPOINTS, server } from "@/constants/api-endpoints";
import axios, { AxiosResponse } from "axios";
import { TEST_DEPT } from "./dept-apis";

export const TEST_EMP: Employee = {
  username: "postgres",
  password: "31113111",
  emailid: "john@gmail.com",
  firstname: "John",
  lastname: "Doe",
  mobileno: 1234567890,
  department: TEST_DEPT,
  city: "Pune",
  street: "JM Road",
  pincode: "411044",
  question: "How is this project?",
  answer: "Excellent",
  type: "TYPE",
  roles: ["employee"],
  createdDate: "16/06/2023",
  lastUpdateDdate: "16/06/2023",
};

export const addEmployee = async (employee: Employee, token: string) => {
  try {
    const response = await server.post(EMP_ENDPOINTS.add, employee, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as boolean;
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

export const getEmployeeById = async (
  empId: number | string,
  token: string
) => {
  try {
    const response = await server.get(EMP_ENDPOINTS.get, {
      params: {
        id: empId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Employee;
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

export const getEmployeeDepartment = async (empId: number, token: string) => {
  try {
    const response = await server.get(EMP_ENDPOINTS.getDept, {
      params: {
        id: empId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Department;
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

export const getEmployeeByDateAndDept = async (
  date: string,
  deptId: number,
  token: string
) => {
  try {
    const response = await server.get(EMP_ENDPOINTS.getByDateAndDept, {
      params: {
        date,
        deptId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Employee;
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

export const getAllEmployee = async (token: string) => {
  try {
    const response = await server.get(EMP_ENDPOINTS.all, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Employee[];
  } catch (error) {
    console.error("Error getting employees:", error);

    throw error;
  }
};

export const updateEmployee = async (employee: Employee, token: string) => {
  try {
    const response = await server.put(EMP_ENDPOINTS.update, employee, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as boolean;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (empId: number | string, token: string) => {
  try {
    const response = await server.delete(EMP_ENDPOINTS.delete, {
      params: { id: empId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as boolean;
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};
