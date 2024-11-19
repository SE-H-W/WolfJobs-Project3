/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/ResetPasswordPage.tsx
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { resetPasswordURL } from "../../api/constants";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

const schema = yup.object({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { newPassword: "", confirmPassword: "" },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    if (!token) {
      setErrorMessage("Invalid or missing token.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setErrorMessage(null);

    console.log(data);

    if (data.newPassword !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      toast.error("Passwords do not match");
      return;
    }

    const result = await axios.post(resetPasswordURL, {
      password: data.newPassword,
      token: token,
    });

    if (result.data.success) {
      setMessage(result.data.message);

      toast.success("Password reset successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
    } else {
      toast.error(result.data.message);
      setErrorMessage(result.data.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-6">
            {/* Display Success Message */}
            {message && (
              <div
                className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                role="alert"
              >
                {message} Redirecting to login...
              </div>
            )}

            {/* Display Error Message */}
            {errorMessage && (
              <div
                className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                {...register("newPassword")}
                placeholder="Enter your new password"
                className={`w-full px-4 py-2 border ${
                  errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                  errors.newPassword
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm your new password"
                className={`w-full px-4 py-2 border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                  errors.confirmPassword
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              className="w-full px-4 py-2 transform transition-transform duration-200 hover:scale-105 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
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
              disabled={loading} // Disable button while loading
            >
              <div className="flex items-center justify-center flex-row gap-x-4">
                {loading && (
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
                )}
                Reset Password
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

        {/* Back to Login Link */}
        <p className="text-center ">
          Remember your password?{" "}
          <span>
            <Link className="cursor-pointer text-red-600" to={"/login"}>
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
