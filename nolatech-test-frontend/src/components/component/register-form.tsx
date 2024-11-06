import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import purpleoffice from "../../assets/backgroundImage.jpg";
import { Label } from "../ui/label";
import { RegisterFormData, registerSchema } from "@/utils/schemas";
import { Input } from "../ui/input";
import { HiUser, HiLockClosed } from "react-icons/hi";
import { registerUser } from "@/services/authService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      console.log(data);
      const responseData = await registerUser(data);
      toast.success("Registration Successful");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      toast.error("Registration failed: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-20"
        style={{ backgroundImage: `url(${purpleoffice})` }}
      ></div>

      {/* Overlay with a blue-purple effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-30"></div>

      {/* Main content */}
      <div className="relative z-10 p-6 backdrop-blur-md w-full max-w-lg">
        <Card className="animate__animated animate__fadeIn shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(signup)} className="space-y-6">
              <div className="space-y-2 text-center mb-4">
                <h1 className="text-4xl font-extrabold text-gray-800">
                  Sign Up
                </h1>
                <p className="text-gray-600">
                  Create your account and start your evaluation journey.
                </p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Label htmlFor="username">Username</Label>
                  <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
                    <HiUser className="text-gray-500 mx-2" />
                    <Input
                      id="username"
                      type="text"
                      {...register("username")}
                      placeholder="Enter your username"
                      className="flex-1 border-none"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
                    <HiLockClosed className="text-gray-500 mx-2" />
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                      placeholder="Enter your password"
                      className="flex-1 border-none"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="password">Role</Label>
                <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
                  <HiLockClosed className="text-gray-500 mx-2" />
                  <Select
                    onValueChange={(value: any) => setValue("role", value)}
                    defaultValue="Employee"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-red-500">{errors.role.message}</p>
                  )}{" "}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition transform hover:-translate-y-1 focus:ring-4 focus:ring-purple-500"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </form>
          </CardContent>
          <CardFooter className="p-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
                Log In
              </Link>
            </p>
          </CardFooter>
        </Card>
        <ToastContainer />
      </div>
    </div>
  );
}

export default RegisterForm;
