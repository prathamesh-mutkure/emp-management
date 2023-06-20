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
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      emailid: "",
      mobileno: "",
      department: "",
      type: "",
      roles: [],
      city: "",
      street: "",
      pincode: "",
      question: "",
      answer: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newEmployee: Omit<Employee, "department"> = {
        ...values,
        mobileno: parseInt(values.mobileno),
        // @ts-ignore
        department: values.department,
        createdDate: new Date().toLocaleString(),
        lastUpdateDdate: new Date().toLocaleString(),
      };

      // @ts-ignore
      const res = await addEmployee(newEmployee, "TOKEN");

      if (res) {
        router.replace("/employees");
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Error adding employee",
      });
    }
  };

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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="abc@gmail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile No</FormLabel>
                <FormControl>
                  <Input placeholder="0123456789" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dept ID</FormLabel>
                <FormControl>
                  <Input placeholder="Dept ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TODO: Add Roles and Type */}

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Pune" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="JM Road" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="440044" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="What's your height?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Umm, it's 6 feet 2 inches" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-2 mt-6">
            Submit
          </Button>
        </form>
      </Form>
    </DashboardShell>
  );
};

AddEmployeesPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AddEmployeesPage;
