import { Button } from "@/components/ui/button";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { NextPageWithLayout } from "../_app";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { EmployeeForm } from "@/components/employees/employee-form";

const AddEmployeesPage: NextPageWithLayout = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Update Employee"
        text="Create and manage employees."
      >
        <Link href="/employees">
          <Button variant="outline">
            <Icons.users className="mr-2 h-4 w-4" />
            View Employees
          </Button>
        </Link>
      </DashboardHeader>

      <EmployeeForm formType="update" />
    </DashboardShell>
  );
};

AddEmployeesPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AddEmployeesPage;
