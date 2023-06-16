import { NextPage } from "next";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { useEffect } from "react";
import { deleteEmployee, getAllEmployee } from "@/helper/apis/emp-apis";
import { setEmployees } from "@/store/employee-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

const AllEmployeesPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employees);

  useEffect(() => {
    const loadEmployees = async () => {
      const employees = await getAllEmployee("TOKEN");
      dispatch(setEmployees(employees));
    };

    loadEmployees();
  }, [dispatch]);

  const onDeleteEmployee = async (id: number) => {
    try {
      const res = await deleteEmployee(id, "TOKEN");

      if (res) {
        toast({
          title: "Deleted Employee",
        });
      }

      throw Error("Failed to delete employee");
    } catch (e) {
      console.log(e);
      toast({
        title: "Error deleting employee",
      });
    }
  };

  return (
    <div className="container mt-24">
      <h1 className="text-3xl font-bold uppercase text-center my-16">
        Employees
      </h1>

      <Table>
        <TableCaption>A list of all employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone No</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((emp, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{emp.username}</TableCell>
              <TableCell>{`${emp.firstname} ${emp.lastname}`}</TableCell>
              <TableCell>{emp.emailid}</TableCell>
              <TableCell>{emp.mobileno}</TableCell>
              <TableCell>{emp.department.department_name}</TableCell>
              <TableCell>
                <Link href={`/employees/update?username=${emp.username}`}>
                  <Button>Edit</Button>
                </Link>

                {/* TODO: Fix ID */}
                <Button onClick={() => onDeleteEmployee(0)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Link href="/employees/add">
        <Button className="my-12 mx-auto" variant="default">
          Add Employee
        </Button>
      </Link>
    </div>
  );
};

export default AllEmployeesPage;
