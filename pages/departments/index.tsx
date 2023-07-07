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
import { deleteDepartment, getAllDepartment } from "@/helper/apis/dept-apis";
import { setDepartments } from "@/store/dept-store";

const AllDeptPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const { departments } = useAppSelector((state) => state.departments);
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const loadDepts = useCallback(async () => {
    if (isLoading || !data?.user.token) return;

    try {
      setIsLoading(true);
      const depts = await getAllDepartment(data?.user.token);
      dispatch(setDepartments(depts));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user.token, dispatch]);

  useEffect(() => {
    loadDepts();
  }, [dispatch, loadDepts]);

  const onDeleteDept = async (id: number | string) => {
    if (!data?.user.token) return;

    try {
      const res = await deleteDepartment(
        parseInt(id.toString()),
        data?.user.token
      );

      if (res) {
        loadDepts();

        return toast({
          title: "Deleted Depts",
        });
      }

      throw Error("Failed to delete departments");
    } catch (e) {
      console.log(e);
      toast({
        title: "Error deleting department",
      });
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <LayoutLoading
        heading="Departments"
        text="Create and manage department."
        buttonLabel="Add Department"
      />
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Departments"
        text="Create and manage departments."
      >
        <Link href="/departments/add">
          <Button variant="outline">
            <Icons.add className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        </Link>
      </DashboardHeader>

      <Table>
        <TableCaption>A list of all departments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Head</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {departments.map((dept, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                {dept.department_id}
              </TableCell>
              <TableCell>{dept.department_name}</TableCell>
              <TableCell>{dept.department_head}</TableCell>
              <TableCell>{dept.creation_date}</TableCell>
              <TableCell>{dept.last_update_date}</TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/departments/update?id=${dept.department_id}`}
                  className="mr-2"
                >
                  <Button className="rounded-full">
                    <Icons.edit className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  className="rounded-full"
                  onClick={() => onDeleteDept(dept.department_id)}
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

AllDeptPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AllDeptPage;
