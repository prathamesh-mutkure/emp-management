"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn, formatDate } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useSession } from "next-auth/react";
import {
  addDepartment,
  getDepartmentById,
  updateDepartment,
} from "@/helper/apis/dept-apis";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/store-hooks";

interface DeptFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formType: "add" | "update";
}

const formSchema = z.object({
  department_name: z.string().min(1).max(50),
  description: z.string().min(1).max(50),
  department_head: z.string().min(1).max(50),
});

type FormData = z.infer<typeof formSchema>;

export function DeptForm({ formType, className, ...props }: DeptFormProps) {
  const { departments } = useAppSelector((state) => state.departments);
  const { data } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department_name: "",
      description: "",
      department_head: "",
    },
  });

  const [dept, setDept] = React.useState<Department | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  async function onSubmit(values: FormData) {
    if (isLoading || !data?.user.token) return;

    try {
      setIsLoading(true);

      if (formType === "add") {
        let maxId = 0;

        if (departments.length > 0) {
          departments.forEach((dept) => {
            if (dept.department_id > maxId) maxId = dept.department_id;
          });
        }

        const newDept: Department = {
          ...values,
          department_id: maxId + 1,
          creation_date: formatDate(new Date()),
          last_update_date: formatDate(new Date()),
        };

        const res = await addDepartment(newDept, data?.user.token);

        console.log(res);

        router.push(searchParams?.get("from") || "/departments");
      } else {
        const newDept: Department = {
          ...values,
          department_id: dept?.department_id!,
          creation_date: dept?.creation_date!,
          last_update_date: formatDate(new Date()),
        };

        await updateDepartment(newDept, data?.user.token);

        router.push(searchParams?.get("from") || "/departments");
      }
    } catch (err: any) {
      const error = err;

      toast({
        title: "Failed add/update department",
        description: `${error.message}, make sure all info is unique`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    const loadDept = async () => {
      const deptId = searchParams.get("id");

      if (!deptId || !data?.user.token || formType === "add") return;

      setIsLoading(true);
      const dept = await getDepartmentById(parseInt(deptId), data?.user.token);

      setDept(dept);

      // @ts-ignore
      Object.entries(dept).forEach(([key, val]) => form.setValue(key, val));

      setIsLoading(false);
    };

    loadDept();

    return () => {};
  }, [searchParams, form, data?.user.token, formType]);

  return (
    <div className={cn("grid gap-6 px-2", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={isLoading} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="department_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dept Name</FormLabel>
                  <FormControl>
                    <Input placeholder="DevOps" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department_head"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dept Head</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="cols-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add Department Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription> */}
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
