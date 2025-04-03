"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

interface LoginPageProps {
  onSuccess: () => void;
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    console.log("Login Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSuccess();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-none border border-gray-200 dark:border-gray-800">
        <CardContent className="p-0">
          <h2 className="text-center text-xl font-semibold text-black dark:text-white mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-black dark:text-white mb-2 block text-sm font-medium">
                Username or email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                {...register("email")}
                className="mt-1 h-11 border border-gray-200 dark:border-gray-800 rounded-md bg-[#f9f9f9] dark:bg-[#1e1e1e] text-black dark:text-white focus:outline-none focus:ring-0 focus:border-gray-300 placeholder:opacity-0"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-black dark:text-white mb-2 block text-sm font-medium">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  {...register("password")}
                  className="h-11 border border-gray-200 dark:border-gray-800 rounded-md bg-[#f9f9f9] dark:bg-[#1e1e1e] text-black dark:text-white focus:outline-none focus:ring-0 focus:border-gray-300 placeholder:opacity-0"
                />
                <EyeIcon
                  className="absolute right-3 top-3 h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-md bg-primary text-white bg-[#e66641] hover:bg-[#b54c2f] flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-center text-sm text-primary mt-2 cursor-pointer">
              Forgot your password?
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
