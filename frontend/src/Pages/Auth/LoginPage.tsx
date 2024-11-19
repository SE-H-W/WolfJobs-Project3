/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../deprecateded/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    console.log("form submitted");
    console.log(data);
    setLoading(true);
    await login(data.email, data.password, navigate);
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      const { credential } = credentialResponse;
      if (credential) {
        // Send the credential to the backend
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/google-login`,
          {
            token: credential,
          }
        );

        if (res.data.success) {
          // Store the JWT token (consider using HttpOnly cookies for better security)
          localStorage.setItem("token", res.data.data.token);
          // Redirect or perform other actions
          navigate("/dashboard"); // Replace with your desired route
        } else {
          // Handle login failure
          alert(res.data.message);
        }
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login Failure
  const handleGoogleFailure = (error: any) => {
    console.error("Google Login Failed:", error);
    alert("Google Login Failed");
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Sign In to your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email address"
                className={`w-full px-4 py-2 border ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                  errors.email ? "focus:ring-red-500" : "focus:ring-indigo-500"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className={`w-full px-4 py-2 border ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                  errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <p className="w-full text-center">
              <Link
                className="text-sm text-center text-red-600 hover:underline"
                to={"/forgot-password"}
              >
                Forgot Password?
              </Link>
            </p>

            <div className="flex justify-center mb-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => handleGoogleFailure}
                useOneTap
              />
            </div>

            <motion.button
              type="submit"
              className="w-full px-4 py-2  transform transition-transform duration-200 hover:scale-105 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
              whileTap={{
                scale: 0.8,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                },
              }}
              style={{
                background: "#FF5353",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              <div className="flex items-center justify-center flex-row gap-x-4">
                {loading && (
                  <>
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-100 animate-spin dark:text-red-600 fill-red-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                )}
                Login
              </div>
            </motion.button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center ">
          Don't have an account?{" "}
          <span>
            <Link className="cursor-pointer text-red-600" to={"/register"}>
              Signup
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
