"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn, formatDate } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  addEmployee,
  getEmployeeById,
  updateEmployee,
} from "@/helper/apis/emp-apis";
import { useSession } from "next-auth/react";

interface EmployeeFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formType: "add" | "update";
}

const formSchema = z.object({
  firstname: z.string().min(1).max(50),
  lastname: z.string().min(1).max(50),
  username: z.string().min(1).max(50),
  emailid: z.string().email(),
  password: z.string().min(8).max(24),
  mobileno: z.string().min(10).max(10),
  // department: z.string().min(1).max(50),
  department: z.string().max(50),
  roles: z.string().array(),
  type: z.string().max(50),
  city: z.string().max(50),
  street: z.string().max(50),
  pincode: z.string().max(6),
  question: z.string().max(50),
  answer: z.string().max(50),
});

type FormData = z.infer<typeof formSchema>;

export function EmployeeForm({
  formType,
  className,
  ...props
}: EmployeeFormProps) {
  const { data, status } = useSession();

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

  const [emp, setEmp] = React.useState<Employee | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  async function onSubmit(values: FormData) {
    if (isLoading || !data?.user.token) return;

    try {
      setIsLoading(true);

      if (formType === "add") {
        const newEmployee: Omit<Employee, "department"> = {
          ...values,
          createdDate: formatDate(new Date()),
          lastUpdateDdate: formatDate(new Date()),
        };

        // @ts-ignore
        delete newEmployee["department"];
        // TODO: Fix dept

        const res = await addEmployee(newEmployee, data?.user.token);

        if (res) {
          router.replace("/employees");
        }

        router.push(searchParams?.get("from") || "/employees");
      } else {
        const newEmployee: Omit<Employee, "department"> = {
          ...values,
          createdDate: emp?.createdDate!,
          lastUpdateDdate: formatDate(new Date()),
        };

        // @ts-ignore
        delete newEmployee["department"];
        // TODO: Fix dept

        const res = await updateEmployee(newEmployee, data?.user.token);

        if (res) {
          router.replace("/employees");
        }

        router.push(searchParams?.get("from") || "/employees");
      }
    } catch (err: any) {
      const error = err;

      toast({
        title: "Failed to signin/signup",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    const loadEmp = async () => {
      const empId = searchParams.get("username");

      if (!empId || !data?.user.token || formType === "add") return;

      setIsLoading(true);
      const emp = await getEmployeeById(empId, data?.user.token);

      setEmp(emp);

      // @ts-ignore
      Object.entries(emp).forEach(([key, val]) => form.setValue(key, val));

      // Empty Password
      form.setValue("password", "");

      form.setValue("department", "");

      setIsLoading(false);
    };

    loadEmp();

    return () => {};
  }, [searchParams, form, data?.user.token, formType]);

  return (
    <div className={cn("grid gap-6 px-2", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={isLoading} className="grid grid-cols-2 gap-4">
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
                    <Input
                      placeholder="abc@gmail.com"
                      type="email"
                      {...field}
                    />
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
                    <Input
                      placeholder="johndoe"
                      {...field}
                      disabled={formType === "update"}
                    />
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
              {formType === "add" ? "Add" : "Update"}
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
