"use server"

// This is a mock email service. In production, you'd use services like:
// - Resend
// - SendGrid
// - Nodemailer with SMTP
// - AWS SES

type EmailInput = {
  to: string
  subject: string
  html: string
}

const DEFAULT_FROM_EMAIL = process.env.EMAIL_FROM || process.env.ADMIN_EMAIL || "noreply@cosmopolitan.edu.ng"

export async function sendEmail({ to, subject, html }: EmailInput) {
  try {
    // Mock email sending - replace with actual email service
    // console.log("Sending email to:", to)
    // console.log("Subject:", subject)
    // console.log("HTML:", html)
    // console.log("From:", DEFAULT_FROM_EMAIL)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { error: "Failed to send email" }
  }
}

function sharedEmailShell({
  title,
  eyebrow,
  body,
  ctaLabel,
  ctaHref,
  accentColor = "#16a34a",
}: {
  title: string
  eyebrow: string
  body: string
  ctaLabel?: string
  ctaHref?: string
  accentColor?: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #f8fafc; padding: 24px; color: #0f172a;">
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);">
        <div style="padding: 28px; background: linear-gradient(135deg, ${accentColor}, #0f766e); color: white;">
          <p style="margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; opacity: 0.9;">${eyebrow}</p>
          <h2 style="margin: 0; font-size: 28px; line-height: 1.2;">${title}</h2>
        </div>
        <div style="padding: 28px; font-size: 16px; line-height: 1.7;">
          ${body}
          ${ctaLabel && ctaHref ? `<div style="margin-top: 28px;"><a href="${ctaHref}" style="display: inline-block; background: ${accentColor}; color: white; text-decoration: none; padding: 12px 18px; border-radius: 999px; font-weight: 700;">${ctaLabel}</a></div>` : ""}
          <p style="margin-top: 32px; color: #475569;">Warm regards,<br><strong>CCSA Team</strong><br>Cosmopolitan University Abuja</p>
        </div>
      </div>
    </div>
  `
}

export async function generateTrainingSubmissionEmail(name: string, program: string) {
  return sharedEmailShell({
    title: "Your application has been received",
    eyebrow: "Training Application Submitted",
    accentColor: "#15803d",
    body: `
      <p>Dear ${name},</p>
      <p>Thank you for applying for the <strong>${program}</strong> training programme.</p>
      <p>Your application is now in our review queue. We are excited to review your details and will contact you as soon as there is an update.</p>
      <p>If you need to make a correction or have any questions, you can simply reply to this email and our team will be glad to help.</p>
    `,
  })
}

export async function generateTrainingSubmissionAdminEmail(name: string, email: string, program: string) {
  return sharedEmailShell({
    title: "New training application received",
    eyebrow: "Admin Notification",
    accentColor: "#0f766e",
    body: `
      <p>A new training application has been submitted.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 18px;">
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700; width: 120px;">Applicant</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${name}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${email}</td></tr>
        <tr><td style="padding: 10px 0; font-weight: 700;">Training</td><td style="padding: 10px 0;">${program}</td></tr>
      </table>
    `,
  })
}

 export async function generateApprovalEmail(name: string, program: string) {
  return sharedEmailShell({
    title: "Application approved",
    eyebrow: "Good news",
    accentColor: "#16a34a",
    body: `
      <p>Dear ${name},</p>
      <p>Congratulations. Your application for the <strong>${program}</strong> has been approved.</p>
      <p>We will reach out shortly with the next steps, schedule details, and any additional information you may need.</p>
    `,
  })
}

export async function generateRejectionEmail(name: string, program: string, reason?: string) {
  return sharedEmailShell({
    title: "Application update",
    eyebrow: "Status update",
    accentColor: "#dc2626",
    body: `
      <p>Dear ${name},</p>
      <p>Thank you for your interest in the <strong>${program}</strong>.</p>
      <p>After careful review, we are unable to move forward with your application at this time.</p>
      ${reason ? `<p><strong>Feedback:</strong> ${reason}</p>` : ""}
      <p>We truly appreciate the time and effort you put into your application and hope you will consider future opportunities with us.</p>
    `,
  })
}

export async function generateCustomTrainingEmail(name: string, program: string, subject: string, message: string) {
  return sharedEmailShell({
    title: subject,
    eyebrow: "Message from CCSA",
    accentColor: "#2563eb",
    body: `
      <p>Dear ${name},</p>
      <p>We are reaching out regarding your <strong>${program}</strong> application.</p>
      <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 16px 18px; border-radius: 12px; margin: 18px 0;">
        <p style="margin: 0; white-space: pre-line;">${message}</p>
      </div>
      <p>If you need any clarification, please reply to this email and we will be happy to help.</p>
    `,
  })
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
