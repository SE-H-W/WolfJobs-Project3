
import { toast } from "react-toastify";
import { createJobURL, loginURL } from "../api/constants";

export const createJob = async (
  name: string,
  id: string,
  status: string,
  location: string,
  description: string,
  pay: string,
  type: string,
  questions: string[],
  affiliation: string,
  navigate: any
) => {
  const url = createJobURL;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      id,
      status,
      location,
      description,
      pay,
      type,
      questions,
      affiliation,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        // success
        navigate("/dashboard");
        toast.success("Job created");
      } else {
        toast.error("Failed to create job");
      }
    })
    .catch((error) => {
      console.error("Error creating job:", error);
      toast.error("An error occurred while creating the job");
    });
};

export async function login(email: string, password: string, navigate: any) {
  const url = loginURL;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Login data", data);
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
    });
}
