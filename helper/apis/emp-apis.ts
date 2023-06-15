import { EMP_ENDPOINTS, server } from "@/constants/api-endpoints";
import axios, { AxiosResponse } from "axios";

export const addEmployee = async (department: Employee, token: string) => {
  try {
    const response = await server.post(EMP_ENDPOINTS.add, department, {
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

export const getEmployeeById = async (empId: number, token: string) => {
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
    console.error("Error adding department:", error);
    throw error;
  }
};

export const updateEmployee = async (department: Department, token: string) => {
  try {
    const response = await server.put(EMP_ENDPOINTS.update, department, {
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

export const deleteEmployee = async (empId: number, token: string) => {
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
