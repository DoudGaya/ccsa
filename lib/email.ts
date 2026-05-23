"use server"

// This is a mock email service. In production, you'd use services like:
// - Resend
// - SendGrid
// - Nodemailer with SMTP
// - AWS SES

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    // Mock email sending - replace with actual email service
    // console.log("Sending email to:", to)
    // console.log("Subject:", subject)
    // console.log("HTML:", html)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { error: "Failed to send email" }
  }
}

 export async function generateApprovalEmail(name: string, program: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #16a34a;">Application Approved!</h2>
      <p>Dear ${name},</p>
      <p>Congratulations! Your application for the <strong>${program}</strong> has been approved.</p>
      <p>We will contact you soon with further details about the next steps.</p>
      <p>Best regards,<br>CCSA Team<br>Cosmopolitan University Abuja</p>
    </div>
  `
}

export async function generateRejectionEmail(name: string, program: string, reason?: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Application Status Update</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in the <strong>${program}</strong>.</p>
      <p>After careful review, we regret to inform you that your application was not successful at this time.</p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
      <p>We encourage you to apply for future programs.</p>
      <p>Best regards,<br>CCSA Team<br>Cosmopolitan University Abuja</p>
    </div>
  `
}

export async function generateAccessRequestConfirmationEmail(name: string, publicationTitle: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Access Request Received</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in <strong>${publicationTitle}</strong>.</p>
      <p>We have received your request for access and our team will review it shortly. You will be contacted once a decision has been made.</p>
      <p>Best regards,<br>CCSA Team<br>Cosmopolitan University Abuja</p>
    </div>
  `
}

export async function generateAccessRequestAdminEmail(
  name: string,
  email: string,
  organization: string | undefined,
  publicationTitle: string,
  reason: string | undefined,
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">New Publication Access Request</h2>
      <p>A new access request has been submitted for <strong>${publicationTitle}</strong>.</p>
      <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${email}</td></tr>
        ${organization ? `<tr><td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold;">Organisation</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${organization}</td></tr>` : ""}
        ${reason ? `<tr><td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold;">Reason</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${reason}</td></tr>` : ""}
      </table>
      <p style="margin-top: 16px;">Please review this request in the admin panel.</p>
      <p>CCSA Team</p>
    </div>
  `
}
