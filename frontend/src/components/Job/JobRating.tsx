/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  API_ROOT,
  rejectionEmailURL,
  selectionEmailURL,
} from "../../api/constants";

const JobRating = (props: any) => {
  const { jobData }: { jobData: Job } = props;
  const [displayList, setDisplayList] = useState<Application[]>([]);
  const [searchParams] = useSearchParams();

  const applicationList = useApplicationStore((state) => state.applicationList);

  // console.log(applicationList);

  useEffect(() => {
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "rating"
      )
    );
  }, [searchParams]);

  const handleAccept = async (applicationId: string) => {
    const modifyApplicationUrl = `${API_ROOT}/users/modifyApplication`;

    const body = {
      applicationId: applicationId,
      status: "accepted",
    };

    try {
      // First POST request to modify the application
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

        // console.log(emailBody);

        // Second POST request to send the acceptance email
        const emailRes = await axios.post(selectionEmailURL, emailBody);

        if (emailRes.status === 201) {
          toast.success("Job Selection email sent");
        } else {
          toast.error("Failed to send Selection email");
        }
        location.reload();
      } else {
        toast.error("Failed to accept candidate");
      }
    } catch (error) {
      // Combined error handling
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

        // console.log(emailBody);

        // Second POST request to send the acceptance email
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

  return (
    <>
      <div className="text-xl">Rating</div>
      {displayList.length === 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {displayList.map((item: Application) => {
        return (
          <div className=" p-1">
            <div className="bg-white my-2 mx-1 p-2 rounded-lg">
              <div className=" flex flex-row justify-between">
                <div className="flex flex-col">
                  <div>
                    <span className="font-bold"> Name: </span>
                    {item.applicantname}
                  </div>
                  {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                  <div>
                    <span className="font-bold">Email: </span>
                    {item.applicantemail}
                  </div>
                  {!!item?.applicantSkills && (
                    <div>
                      <span className="font-bold">Skills:</span>
                      {item.applicantSkills}
                    </div>
                  )}
                  <div>
                    <span className="font-bold">Rating: </span>
                    {item.rating || "0"}
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
            </div>
          </div>
        );
      })}
    </>
  );
};

export default JobRating;
