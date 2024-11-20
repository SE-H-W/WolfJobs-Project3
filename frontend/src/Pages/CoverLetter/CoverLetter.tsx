/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import CoverLetterDropZone from "../../components/CoverLetter/CoverLetterDropZone"; // Reusing the same dropzone component for file upload
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-hot-toast";

const CoverLetter: React.FC = () => {
  // State to store the uploaded file
  const [file, setFile] = useState<File | null>(null);

  // The current cover letter data
  const coverLetterName = useUserStore((state) => state.coverLetter);
  const userId = useUserStore((state) => state.id);
  const updateCoverLetter = useUserStore((state) => state.updateCoverLetter);

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("coverletter", file);
      formData.append("id", userId);

      try {
        const response = await axios.post(
          "http://localhost:8000/users/uploadCoverLetter",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          console.log("Cover Letter uploaded successfully");
          toast.success(
            "Cover Letter Uploaded Successfully. Sign out and sign back in to see changes!"
          );
          // Optionally update state in the store
          updateCoverLetter(file.name);
        }
      } catch (error) {
        console.error("Error uploading the cover letter", error);
        toast.error("Cover Letter could not be uploaded");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-1/3">
          <CoverLetterDropZone
            onFileUpload={(acceptedFiles) => setFile(acceptedFiles[0])}
          />
          <div className="flex flex-row">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded"
            >
              Upload Cover Letter
            </button>
          </div>

          {coverLetterName && (
            <div className="mt-4">
              <p>Current Cover Letter: {coverLetterName}</p>
              <a
                href={`/coverletterviewer/${userId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 font-bold text-white bg-red-500 rounded"
              >
                View
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CoverLetter;
