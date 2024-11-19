// emailTemplates.js

function jobApplicationRejectionTemplate({
  applicantName,
  jobTitle,
  companyName,
  contactEmail,
}) {
  return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h1 style="color: #D9534F;">Application Update</h1>
        <p>Dear ${applicantName},</p>
        <p>
          We appreciate your interest in the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.
        </p>
        <p>
          After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.
        </p>
        <p>
          We encourage you to apply for future openings that match your skills and experience. We wish you the best in your job search.
        </p>
        <p>
          If you have any questions or would like feedback on your application, please feel free to reach out to us at <a href="mailto:${contactEmail}">${contactEmail}</a>.
        </p>
        <p>Sincerely,</p>
        <p>The ${companyName} Recruitment Team</p>
      </div>
    `;
}

module.exports = {
  jobApplicationRejectionTemplate,
};
