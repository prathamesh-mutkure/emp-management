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
import { useCallback, useEffect, useState } from "react";
import { deleteEmployee, getAllEmployee } from "@/helper/apis/emp-apis";
import { setEmployees } from "@/store/employee-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Icons } from "@/components/icons";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { useSession } from "next-auth/react";
import LayoutLoading from "@/components/layouts/loading-layout";

const AllEmployeesPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employees);
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const loadEmployees = useCallback(async () => {
    if (isLoading || !data?.user.token) return;

    try {
      setIsLoading(true);
      const employees = await getAllEmployee(data?.user.token);
      dispatch(setEmployees(employees));
      // console.log(employees);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user.token, dispatch]);

  useEffect(() => {
    loadEmployees();
  }, [dispatch, loadEmployees]);

  const onDeleteEmployee = async (id: number | string) => {
    if (!data?.user.token) return;

    try {
      const res = await deleteEmployee(id, data?.user.token);

      if (res) {
        loadEmployees();

        return toast({
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

  if (status === "loading" || isLoading) {
    return (
      <LayoutLoading
        heading="Employees"
        text="Create and manage employees."
        buttonLabel="Add Employee"
      />
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Employees" text="Create and manage employees.">
        <Link href="/employees/add">
          <Button variant="outline">
            <Icons.add className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </DashboardHeader>

      <Table>
        <TableCaption>A list of all employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone No</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((emp, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{emp.username}</TableCell>
              <TableCell>{`${emp.firstname} ${emp.lastname}`}</TableCell>
              <TableCell>{emp.emailid}</TableCell>
              <TableCell>{emp.mobileno}</TableCell>
              <TableCell>
                {emp.department?.department_name ?? emp.department}
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/employees/update?username=${emp.username}`}
                  className="mr-2"
                >
                  <Button className="rounded-full">
                    <Icons.edit className="h-4 w-4" />
                  </Button>
                </Link>

                {/* TODO: Fix ID */}
                <Button
                  className="rounded-full"
                  onClick={() => onDeleteEmployee(emp.username)}
                >
                  <Icons.trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardShell>
  );
};

AllEmployeesPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AllEmployeesPage;
