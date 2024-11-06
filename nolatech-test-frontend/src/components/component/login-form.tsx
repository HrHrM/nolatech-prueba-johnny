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
import { LoginFormData, loginSchema } from "@/utils/schemas";
import { Input } from "../ui/input";
import { loginUser } from "@/services/authService";
import { HiUser, HiLockClosed } from "react-icons/hi";
import { setID, setName, setRole } from "@/redux/slices/authSlice";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await loginUser(data);
      const responseData = await res;
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("role", responseData.user.role);
      localStorage.setItem("name", responseData.user.username);
      dispatch(setRole(responseData.user.role));
      dispatch(setID(responseData.user.id));
      dispatch(setName(responseData.user.username));

      toast.success("Login Successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      toast.error("Login failed: " + errorMessage);
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
            <form onSubmit={handleSubmit(login)} className="space-y-6">
              <div className="space-y-2 text-center mb-4">
                <h1 className="text-4xl font-extrabold text-gray-800">
                  Welcome Back
                </h1>
                <p className="text-gray-600">Log into your account</p>
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

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition transform hover:-translate-y-1 focus:ring-4 focus:ring-purple-500"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
          </CardContent>
          <CardFooter className="p-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginForm;
