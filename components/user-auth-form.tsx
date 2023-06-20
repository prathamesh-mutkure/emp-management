"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formType: "signin" | "signup";
}

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().length(8, "Password must be of 8 characters"),
});

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({
  formType,
  className,
  ...props
}: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);

  //   const { signIn, signUp } = useAuth();

  const searchParams = useSearchParams();
  const router = useRouter();

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);

      //   const userCredential = await (formType === "signup"
      //     ? signUp(data.email, data.password)
      //     : signIn(data.email, data.password));

      //   console.log(userCredential);

      router.push(searchParams?.get("from") || "/employees");
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

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading || isGitHubLoading}
                {...register("email")}
              />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Password
              </Label>
              <Input
                id="password"
                placeholder="8 digit password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading || isGitHubLoading}
                {...register("password")}
              />
              {errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}

      {/* <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true);
          // signIn("github")
        }}
        // disabled={isLoading || isGitHubLoading}
        disabled={true}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button> */}
    </div>
  );
}
