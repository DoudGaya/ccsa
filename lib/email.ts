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
