import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Stack, TextField } from "@mui/material";
import JobManagerView from "./JobManagerView";
import SuggestedKeywords from "../JobKeywords/SuggestedKeywords";

const JobDetail = (props: any) => {
  const { jobData }: { jobData: Job } = props;

  const jobType = jobData.type === "part-time" ? "Part time" : "Full time";

  const applicationList: Application[] = useApplicationStore(
    (state) => state.applicationList
  );

  const applicantemail = useUserStore((state) => state.email);
  const userId = useUserStore((state) => state.id);
  const applicantname = useUserStore((state) => state.name);
  const applicantSkills = useUserStore((state) => state.skills);
  const applicantNumber = useUserStore((state) => state.phonenumber);
  const role = useUserStore((state) => state.role);

  const [application, setApplication] = useState<Application | null>(null);
  const [showApply, setShowApply] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const userRole = useUserStore((state) => state.role);

  useEffect(() => {
    const temp: Application | undefined = applicationList.find(
      (item: Application) => {
        return item.jobid === jobData._id && item.applicantid === userId;
      }
    );
    setApplication(temp || null);
  }, [jobData, applicationList, userId]);

  useEffect(() => {
    if (role === "Manager") {
      setShowQuestionnaire(false);
    } else {
      const temp: Application | undefined = applicationList.find(
        (item) =>
          item.jobid === jobData._id &&
          item.status === "screening" &&
          item.applicantid === userId
      );
      setShowQuestionnaire(!!temp || false);
    }
  }, [jobData, applicationList, userId, role]);

  useEffect(() => {
    if (role === "Manager") {
      setShowApply(false);
    } else {
      const temp: Application | undefined = applicationList.find(
        (item) => jobData._id === item.jobid
      );
      setShowApply(!temp || false);
    }
  }, [jobData, applicationList, role]);

  const { register, handleSubmit } = useForm();

  const handleApplyJob = (e: any) => {
    e.preventDefault();
    const body = {
      applicantname,
      applicantid: userId,
      applicantemail,
      applicantSkills,
      phonenumber: applicantNumber,
      managerid: jobData.managerid,
      jobname: jobData.name,
      jobid: jobData._id,
    };

    axios
      .post("http://localhost:8000/api/v1/users/createapplication", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to apply");
          return;
        }
        location.reload();
        toast.success("Applied successfully");
      });
  };

  const handleAnswerQuestionnaire = (data: any) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const answers = jobData.questions.map(
      (_: string, index: number) => data[`answer${index}`] || ""
    );

    const body = {
      applicationId: application?._id,
      status: "grading",
      answers: answers,
    };

    axios.post(url, body).then((res) => {
      if (res.status === 200) {
        toast.success("Questionnaire submitted");
        location.reload();
        return;
      }
      toast.error("Failed to submit questionnaire");
    });
  };

  return (
    <>
      <div className="w-7/12">
        <div className="flex flex-col m-4 ">
          <div className="text-xl border-b border-gray-300 font-bold">
            Job Details
          </div>
          <div className="flex flex-row justify-between m-2">
            <div className="flex flex-col">
              <div>
                <span className="font-semibold text-lg">Role:</span>&nbsp;
                {jobData.name}
              </div>
              <div>
                <span className="font-semibold text-lg">Job Status:</span>
                &nbsp;
                <span
                  className={`capitalize ${
                    jobData.status === "open"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {jobData.status}
                </span>
              </div>
              <div>
                <span className="font-semibold text-lg capitalize">Type:</span>
                &nbsp;
                {jobType}
              </div>
              <div>
                <span className="font-semibold text-lg">Location:</span>&nbsp;
                {jobData.location}
              </div>
              <div>
                <span className="font-semibold text-lg">Required Skills:</span>
                &nbsp;
                {jobData.requiredSkills}
              </div>
              <div>
                {userRole === "Applicant" &&
                  (application?.status === "accepted" ||
                  application?.status === "rejected" ? (
                    <>
                      <b>Application Status:</b>
                      <span className="capitalize">
                        &nbsp;{application?.status}
                      </span>
                    </>
                  ) : (
                    <>
                      <b>Application Status:</b>&nbsp;In Review
                    </>
                  ))}
              </div>
            </div>
            <div className="text-3xl p-4">{jobData.pay}$/hr</div>
          </div>
          <div className="h-6" />
          <div className="text-lg border-b border-gray-300 mb-2 font-bold">
            Description
          </div>
          <div className="text-[#686868] mx-2">{jobData.description}</div>
          {role === "Applicant" && jobData.status === "open" && (
            <div>
              <SuggestedKeywords jobId={jobData._id} />
            </div>
          )}
        </div>
      </div>

      {role === "Applicant" && jobData.status === "open" && (
        <div>
          {showQuestionnaire && (
            <div className="w-7/12 mb-10">
              <div className="flex flex-col m-4 ">
                <div className="text-xl border-b border-gray-300 font-bold">
                  Fill Questionnaire
                </div>

                <form onSubmit={handleSubmit(handleAnswerQuestionnaire)} noValidate>
                  <Stack spacing={2} width={600}>
                    {jobData.questions.map((question: string, index: number) => (
                      <div key={index}>
                        <div className="flex flex-row justify-between m-2">
                          <div className="flex flex-col ">
                            <div>
                              <span className="font-semibold text-lg">
                                {index + 1}:
                              </span>
                              &nbsp;
                              {question}
                            </div>
                          </div>
                        </div>
                        <TextField
                          label={`Answer ${index + 1}`}
                          type="text"
                          {...register(`answer${index}`)}
                          sx={{
                            "& label": {
                              paddingLeft: (theme) => theme.spacing(1),
                            },
                            "& input": {
                              paddingLeft: (theme) => theme.spacing(2.5),
                            },
                            "& fieldset": {
                              paddingLeft: (theme) => theme.spacing(1.5),
                              borderRadius: "10px",
                            },
                          }}
                        />
                      </div>
                    ))}
                    <Button
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
                      Submit
                    </Button>
                  </Stack>
                </form>
              </div>
            </div>
          )}

          {showApply && (
            <Button
              onClick={handleApplyJob}
              type="button"
              variant="contained"
              style={{
                background: "#FF5353",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "18px",
                width: "250px",
              }}
            >
              Apply Now
            </Button>
          )}
        </div>
      )}

      {role === "Manager" &&
        userId === jobData.managerid &&
        jobData.status === "open" && (
          <>
            <JobManagerView jobData={jobData} />
            <div className="h-40"></div>
          </>
        )}
    </>
  );
};

export default JobDetail;

