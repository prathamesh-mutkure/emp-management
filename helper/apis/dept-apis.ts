import { DEPT_ENDPOINTS, server } from "@/constants/api-endpoints";
import axios, { AxiosResponse } from "axios";

export const TEST_DEPT: Department = {
  department_id: 1,
  department_name: "DevOps",
  description: "DevOps",
  department_head: "John Doe",
  creation_date: "16/06/2023",
  last_update_date: "16/06/2023",
};

export const addDepartment = async (department: Department, token: string) => {
  try {
    const response = await server.post(DEPT_ENDPOINTS.add, department, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return response.data as boolean;
    }

    throw new Error(response.data);
  } catch (error) {
    throw error;
  }
};

export const getDepartmentById = async (deptId: number, token: string) => {
  try {
    const response = await server.get(DEPT_ENDPOINTS.get, {
      params: {
        id: deptId,
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

export const getAllDepartment = async (token: string) => {
  try {
    const response = await server.get(DEPT_ENDPOINTS.all, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Department[];
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

export const updateDepartment = async (
  department: Department,
  token: string
) => {
  try {
    const response = await server.put(DEPT_ENDPOINTS.update, department, {
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

export const deleteDepartment = async (deptId: number, token: string) => {
  try {
    const response = await server.delete(DEPT_ENDPOINTS.delete, {
      params: { id: deptId },
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
