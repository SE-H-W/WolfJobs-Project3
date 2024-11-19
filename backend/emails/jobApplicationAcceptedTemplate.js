function jobApplicationAcceptedTemplate({
  applicantName,
  jobTitle,
  companyName,
  contactEmail,
  applicationDate,
  nextSteps,
}) {
  return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h1 style="color: #0B5394;">Application Accepted</h1>
        <p>Dear ${applicantName},</p>
        <p>
          We are excited to inform you that your application for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been accepted as of ${applicationDate}.
        </p>
        <p>
          We were impressed by your skills and experience, and we believe you would be an excellent fit for our team.
        </p>
        <p>
        <strong>Next Steps:</strong><br>
        ${nextSteps}
      </p>
        <p>
          Should you have any questions, please don't hesitate to reach out to us at <a href="mailto:${contactEmail}">${contactEmail}</a>.
        </p>
        <p>Best regards,</p>
        <p>The ${companyName} Recruitment Team</p>
      </div>
    `;
}

module.exports = { jobApplicationAcceptedTemplate };
