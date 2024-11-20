import React, { useCallback } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";

interface CoverLetterDropzoneProps {
  onFileUpload: (files: File[]) => void;
}

const CoverLetterDropzone: React.FC<CoverLetterDropzoneProps> = ({
  onFileUpload,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Pass the accepted files to the parent component
      onFileUpload(acceptedFiles);

      // Handle any file rejections
      fileRejections.forEach((file) => {
        console.error(`File rejected: ${file.file.name}`);
        // Optionally handle displaying an error message to the user
      });
    },
    [onFileUpload] // Include onFileUpload in the dependencies array
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: { "application/pdf": [".pdf"] }, // Accept only PDF files
    maxSize: 15 * 1024 * 1024, // Limit the size to 15MB max
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(
    dropzoneOptions
  );

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-gray-700">Drop your cover letter here...</p>
      ) : (
        <p className="text-gray-700">
          Drag 'n' drop your cover letter here, or click to select a file
        </p>
      )}
    </div>
  );
};

export default CoverLetterDropzone;
