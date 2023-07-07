import { Button } from "@/components/ui/button";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { NextPageWithLayout } from "../_app";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import Link from "next/link";

import { DeptForm } from "@/components/department/dept-form";

const AddDeptPage: NextPageWithLayout = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Add Departments"
        text="Create and manage departments."
      >
        <Link href="/departments">
          <Button variant="outline">
            <Icons.users className="mr-2 h-4 w-4" />
            View Departments
          </Button>
        </Link>
      </DashboardHeader>

      <DeptForm formType="add" />
    </DashboardShell>
  );
};

AddDeptPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AddDeptPage;
