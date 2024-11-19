function jobSelectionTemplate({
  applicantName,
  jobTitle,
  companyName,
  contactEmail,
  startDate,
  onboardingDetails,
}) {
  return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h1 style="color: #0B5394;">Congratulations, ${applicantName}!</h1>
        <p>Dear ${applicantName},</p>
        <p>
          We are thrilled to inform you that you have been selected for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.
        </p>
        <p>
          Your skills and experience stood out among the many candidates we considered, and we are excited to have you join our team.
        </p>
        
        <p>
          <strong>Onboarding Details:</strong><br>
          ${onboardingDetails}
        </p>
        <p>
          Please confirm your acceptance of this offer by replying to this email. Should you have any questions, feel free to reach out to us at <a href="mailto:${contactEmail}">${contactEmail}</a>.
        </p>
        <p>We look forward to working with you!</p>
        <p>Best regards,</p>
        <p>The ${companyName} Team</p>
      </div>
    `;
}

module.exports = {
  jobSelectionTemplate,
};
