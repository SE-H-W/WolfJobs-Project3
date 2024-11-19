/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import {
  acceptanceEmailURL,
  API_ROOT,
  rejectionEmailURL,
} from "../../api/constants";

const JobScreening = (props: any) => {
  const { jobData }: { jobData: Job } = props;
  const [searchParams] = useSearchParams();

  const [displayList, setDisplayList] = useState<Application[]>([]);
  const [matchPercentages, setMatchPercentages] = useState<{
    [key: string]: number;
  }>({});
  const [loadingMatch, setLoadingMatch] = useState<{ [key: string]: boolean }>(
    {}
  );

  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "applied"
      )
    );
  }, [searchParams, applicationList, jobData._id]);

  const handleAccept = async (applicationId: string) => {
    const modifyApplicationUrl = `${API_ROOT}/users/modifyApplication`;

    const body = {
      applicationId: applicationId,
      status: "screening",
    };

    try {
      const res = await axios.post(modifyApplicationUrl, body);

      if (res.status === 200) {
        toast.success("Accepted candidate");

        const applicationData = applicationList.find(
          (item) => item._id === applicationId
        );

        if (!applicationData) {
          toast.error("Application data not found");
          return;
        }

        const emailBody = {
          applicationId: applicationId,
          jobid: jobData._id,
          emailType: "acceptance",
          applicantEmail: applicationData.applicantemail,
          applicantName: applicationData.applicantname,
          jobTitle: jobData.name,
          companyName: jobData.managerAffilication,
          contactEmail: "contact@ncsu.edu",
        };

        const emailRes = await axios.post(acceptanceEmailURL, emailBody);

        if (emailRes.status === 201) {
          toast.success("Acceptance email sent");
        } else {
          toast.error("Failed to send acceptance email");
        }
        location.reload();
      } else {
        toast.error("Failed to accept candidate");
      }
    } catch (error) {
      const err = error as any;
      if (err.response) {
        console.error("Error Status:", err.response.status);
        console.error("Error Data:", err.response.data);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error setting up request:", err.message);
      }
      toast.error("An error occurred while processing the request");
    }
  };

  const handleReject = async (applicationId: string) => {
    const url = `${API_ROOT}/users/modifyApplication`;

    const body = {
      applicationId: applicationId,
      status: "rejected",
    };

    try {
      const res = await axios.post(url, body);

      if (res.status === 200) {
        toast.success("Rejected candidate");

        const applicationData = applicationList.find(
          (item) => item._id === applicationId
        );

        if (!applicationData) {
          toast.error("Application data not found");
          return;
        }

        const emailBody = {
          applicationId: applicationId,
          jobid: jobData._id,
          emailType: "rejection",
          applicantEmail: applicationData.applicantemail,
          applicantName: applicationData.applicantname,
          jobTitle: jobData.name,
          companyName: jobData.managerAffilication,
          contactEmail: "contact@ncsu.edu",
        };

        const emailRes = await axios.post(rejectionEmailURL, emailBody);

        if (emailRes.status === 201) {
          toast.success("Rejection email sent");
        } else {
          toast.error("Failed to send Rejection email");
        }
        location.reload();
      }
    } catch (error) {
      const err = error as any;
      if (err.response) {
        console.error("Error Status:", err.response.status);
        console.error("Error Data:", err.response.data);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error setting up request:", err.message);
      }
      toast.error("An error occurred while processing the request");
    }
  };

  const handleGetMatchPercentage = async (applicantId: string) => {
    setLoadingMatch((prev) => ({ ...prev, [applicantId]: true }));
    try {
      const response = await axios.post(
        "http://localhost:8000/resume/managerParseResume",
        { userId: applicantId, jobid: jobData._id }
      );

      if (response.data.success) {
        setMatchPercentages((prev) => ({
          ...prev,
          [applicantId]: response.data.match_percentage,
        }));
        toast.success("Match percentage calculated successfully");
      } else {
        toast.error("Failed to calculate match percentage");
      }
    } catch (error) {
      console.error("Error calculating match percentage:", error);
      toast.error("An error occurred while calculating match percentage");
    } finally {
      setLoadingMatch((prev) => ({ ...prev, [applicantId]: false }));
    }
  };

  return (
    <>
      <div className="text-xl">Screening</div>
      {displayList.length === 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {displayList?.map((item: Application) => (
        <div className="p-1" key={item._id}>
          <div className="p-2 mx-1 my-2 bg-white rounded-lg">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <div> Name: {item.applicantname} </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && (
                  <div>Skills: {item.applicantSkills}</div>
                )}
                <div className="flex mt-2">
                  <div className="flex justify-center px-2 py-1 mr-2 border border-gray-300 rounded-md">
                    <a
                      href={`/resumeviewer/${item.applicantid}`}
                      className="text-red-500"
                    >
                      View Resume
                    </a>
                  </div>
                  <div className="flex justify-center px-2 py-1 mr-2 border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleGetMatchPercentage(item.applicantid)}
                      disabled={loadingMatch[item.applicantid]}
                      className={`text-red-500 ${
                        loadingMatch[item.applicantid]
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {loadingMatch[item.applicantid]
                        ? "Checking..."
                        : "Get Match %"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    return handleAccept(item._id);
                  }}
                  style={{ color: "#FF5353" }}
                >
                  Accept
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    return handleReject(item._id);
                  }}
                  style={{ color: "#FF5353" }}
                >
                  Reject
                </Button>
              </div>
            </div>
            {matchPercentages[item.applicantid] && (
              <Card variant="outlined" className="mt-4">
                <CardContent>
                  <Typography variant="h6" component="div">
                    Match Percentage: {matchPercentages[item.applicantid]}%.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default JobScreening;
