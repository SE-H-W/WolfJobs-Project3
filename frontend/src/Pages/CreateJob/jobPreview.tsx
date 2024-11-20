
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { Button } from "@mui/material";
import { AiFillCheckCircle } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type FormValuesDetails = {
  role: string;
  jobtype: string;
  location: string;
  pay: string;
  description: string;
  requiredSkills: string;
};

const JobPreview = () => {
  const location = useLocation();
  const { state } = location;
  const { details, questions }: { details: FormValuesDetails; questions: string[] } =
    state;

  const navigate = useNavigate();
  const userId = useUserStore((state) => state.id);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const url = `http://localhost:8000/api/v1/users/createjob`;
    const body = {
      id: userId,
      name: details.role,
      type: details.jobtype,
      location: details.location,
      description: details.description,
      pay: details.pay,
      questions: questions,
      requiredSkills: details.requiredSkills,
    };

    axios.post(url, body).then((res) => {
      if (res.status !== 200) {
        toast.error("Job posting failed");
        return;
      }
      toast.success("Job created");
      navigate("/dashboard");
    });
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
      <div className="flex flex-row">
        <div
          className="w-3/12  pt-10 border-r"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="text-2xl  translate-x-10">Create New Job Listing</div>
          <div className="flex flex-col items-start  ml-10  mt-10 ">
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">Add details</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">
                Fill Questionnaire
              </span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">Preview</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Confirm</span>
            </div>
          </div>
        </div>
        <div className="w-6/12">
          <div className="flex flex-col m-10 ">
            <div className="text-xl border-b border-gray-300 font-bold">
              Job Details
            </div>
            <div className="flex flex-row justify-between m-2">
              <div className="flex flex-col ">
                <div>
                  <span className="font-semibold text-lg">Role:</span>&nbsp;
                  {details.role}
                </div>
                <div>
                  <span className="font-semibold text-lg">Job Status:</span>
                  &nbsp;
                  <span className={`capitalize ${"text-green-500"}`}>open</span>
                </div>
                <div>
                  <span className="font-semibold text-lg capitalize">Type:</span>
                  &nbsp;
                  <span className="capitalize">
                    {details.jobtype.split("-").join(" ")}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-lg">Location:</span>
                  &nbsp;
                  {details.location}
                </div>
                <div>
                  <span className="font-semibold text-lg">Pay:</span>
                  &nbsp;
                  {details.pay}$/hr
                </div>
              </div>
            </div>
            <div className="text-lg border-b border-gray-300 mb-2 font-bold">
              Description
            </div>
            <div className="text-[#686868] mx-2">{details.description}</div>

            <div className="text-lg border-b border-gray-300 mb-2 font-bold">
              Required Skills
            </div>
            <div className="text-[#686868] mx-2">{details.requiredSkills}</div>

            <div className="text-lg border-b border-gray-300 mb-2 font-bold">
              Questions
            </div>
            {questions.map((question: string, index: number) => (
              <div key={index} className="text-[#686868] mx-2">
                {index + 1}: {question}
              </div>
            ))}
            <div className="mt-4 ">
              <Button
                onClick={onSubmit}
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  background: "#FF5353",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                Add Listing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPreview;

