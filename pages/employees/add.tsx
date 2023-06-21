import { NextPage } from "next";
import { addEmployee } from "@/helper/apis/emp-apis";

import { Button } from "@/components/ui/button";

import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { NextPageWithLayout } from "../_app";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { EmployeeForm } from "@/components/employees/employee-form";

const formSchema = z.object({
  firstname: z.string().min(1).max(50),
  lastname: z.string().min(1).max(50),
  username: z.string().min(1).max(50),
  emailid: z.string().email(),
  password: z.string().min(8).max(24),
  mobileno: z.string().min(10).max(10),
  department: z.string().min(1).max(50),
  roles: z.string().array(),
  type: z.string().max(50),
  city: z.string().max(50),
  street: z.string().max(50),
  pincode: z.string().max(6),
  question: z.string().max(50),
  answer: z.string().max(50),
  //   createdDate: z.string().max(50),
  //   lastUpdateDdate: z.string().max(50),
});

const AddEmployeesPage: NextPageWithLayout = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Add Employee"
        text="Create and manage employees."
      >
        <Link href="/employees">
          <Button variant="outline">
            <Icons.users className="mr-2 h-4 w-4" />
            View Employees
          </Button>
        </Link>
      </DashboardHeader>

      <EmployeeForm formType="add" />
    </DashboardShell>
  );
};

AddEmployeesPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AddEmployeesPage;
