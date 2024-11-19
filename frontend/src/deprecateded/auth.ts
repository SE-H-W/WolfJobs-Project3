/* eslint-disable @typescript-eslint/no-explicit-any */
// import { toast } from "react-toastify";
import { getFormBody } from "./apiUtils";
import { loginURL, signupURL } from "../api/constants";
import toast from "react-hot-toast";

export async function login(email: string, password: string, navigate: any) {
  const url = loginURL;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        toast.success("User Logged in Successfully");
        navigate("/dashboard");
        return;
      }
      toast.error("Login Failed");
    });
}

export async function signup(
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
  role: string,
  affiliation: string,
  skills: string,
  navigate: any
) {
  const url = signupURL;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({
      email,
      password,
      confirm_password: confirmPassword,
      name,
      role,
      skills,
      affiliation,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        toast.success("User Created Successfully");
        navigate("/dashboard");
        return;
      }
      toast.error("Sign up Failed");
    });
}