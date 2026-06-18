"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type EmailInput = {
  to: string
  subject: string
  html: string
}

const DEFAULT_FROM_EMAIL = process.env.EMAIL_FROM || "CCSA <onboarding@resend.dev>"

function formatDisplayText(value?: string) {
  if (!value) return ""
  const normalized = value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  if (!normalized) return ""

  return normalized
    .split(" ")
    .map((word) => {
      // Preserve acronyms
      if (word.length > 1 && word === word.toUpperCase()) return word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(" ")
}

export async function sendEmail({ to, subject, html }: EmailInput) {
  try {
    const formattedSubject = formatDisplayText(subject)
    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to,
      subject: formattedSubject,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return { error: "Failed to send email" }
    }

    return { success: true, id: data?.id }
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
  accentColor = "#082c3c",
}: {
  title: string
  eyebrow: string
  body: string
  ctaLabel?: string
  ctaHref?: string
  accentColor?: string
}) {
  const BRAND = "#082c3c"
  const fontStack = "'Comic Neue', 'Comic Sans MS', 'Comic Sans', Helvetica, Arial, sans-serif"

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet" />
  <title>CCSA</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(8,44,60,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:${BRAND};padding:28px 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-family:${fontStack};font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.65);">${eyebrow}</p>
                    <h1 style="margin:4px 0 0;font-family:${fontStack};font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">${title}</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;font-family:${fontStack};font-size:15px;line-height:1.75;color:#1e293b;">
              ${body}
              ${ctaLabel && ctaHref
                ? `<div style="margin-top:28px;">
                    <a href="${ctaHref}"
                      style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-family:${fontStack};font-weight:700;font-size:14px;">${ctaLabel}</a>
                   </div>`
                : ""}
              <p style="margin-top:36px;padding-top:20px;border-top:1px solid #e2e8f0;font-family:${fontStack};font-size:13px;color:#64748b;">
                Warm regards,<br/>
                <strong style="color:#082c3c;">CCSA Team</strong><br/>
                Cosmopolitan University Abuja
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:16px 32px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-family:${fontStack};font-size:11px;color:#94a3b8;">
                © ${new Date().getFullYear()} Centre for Climate-Smart Agriculture &amp; Food Systems, Cosmopolitan University Abuja.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export async function generateTrainingSubmissionEmail(name: string, program: string) {
  const readableProgram = formatDisplayText(program)

  return sharedEmailShell({
    title: "Your application has been received",
    eyebrow: "Training Application Submitted",
    accentColor: "#15803d",
    body: `
      <p>Dear ${name},</p>
      <p>Thank you for applying for the <strong>${readableProgram}</strong> training programme.</p>
      <p>Your application is now in our review queue. We are excited to review your details and will contact you as soon as there is an update.</p>
      <p>If you need to make a correction or have any questions, you can simply reply to this email and our team will be glad to help.</p>
    `,
  })
}

export async function generateTrainingSubmissionAdminEmail(name: string, email: string, program: string) {
  const readableProgram = formatDisplayText(program)

  return sharedEmailShell({
    title: "New training application received",
    eyebrow: "Admin Notification",
    accentColor: "#0f766e",
    body: `
      <p>A new training application has been submitted.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 18px;">
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700; width: 120px;">Applicant</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${name}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${email}</td></tr>
        <tr><td style="padding: 10px 0; font-weight: 700;">Training</td><td style="padding: 10px 0;">${readableProgram}</td></tr>
      </table>
    `,
  })
}

 export async function generateApprovalEmail(name: string, program: string) {
  const readableProgram = formatDisplayText(program)

  return sharedEmailShell({
    title: "Application approved",
    eyebrow: "Good news",
    accentColor: "#16a34a",
    body: `
      <p>Dear ${name},</p>
      <p>Congratulations. Your application for the <strong>${readableProgram}</strong> has been approved.</p>
      <p>We will reach out shortly with the next steps, schedule details, and any additional information you may need.</p>
    `,
  })
}

export async function generateRejectionEmail(name: string, program: string, reason?: string) {
  const readableProgram = formatDisplayText(program)

  return sharedEmailShell({
    title: "Application update",
    eyebrow: "Status update",
    accentColor: "#dc2626",
    body: `
      <p>Dear ${name},</p>
      <p>Thank you for your interest in the <strong>${readableProgram}</strong>.</p>
      <p>After careful review, we are unable to move forward with your application at this time.</p>
      ${reason ? `<p><strong>Feedback:</strong> ${reason}</p>` : ""}
      <p>We truly appreciate the time and effort you put into your application and hope you will consider future opportunities with us.</p>
    `,
  })
}

export async function generateCustomTrainingEmail(name: string, program: string, subject: string, message: string) {
  const readableProgram = formatDisplayText(program)
  const readableSubject = formatDisplayText(subject)

  return sharedEmailShell({
    title: readableSubject,
    eyebrow: "Message from CCSA",
    accentColor: "#2563eb",
    body: `
      <p>Dear ${name},</p>
      <p>We are reaching out regarding your <strong>${readableProgram}</strong> application.</p>
      <div style="background: #eff6ff; padding: 16px 18px; border-radius: 12px; margin: 18px 0; border: 1px solid #dbeafe;">
        <p style="margin: 0; white-space: pre-line;">${message}</p>
      </div>
      <p>If you need any clarification, please reply to this email and we will be happy to help.</p>
    `,
  })
}

export async function generateAccessRequestConfirmationEmail(name: string, publicationTitle: string) {
  const readableTitle = formatDisplayText(publicationTitle)

  return sharedEmailShell({
    title: "Access request received",
    eyebrow: "Publication Access",
    accentColor: "#082c3c",
    body: `
      <p>Dear ${name},</p>
      <p>Thank you for your interest in <strong>${readableTitle}</strong>.</p>
      <p>We have received your access request and our team will review it shortly. You will be contacted once a decision has been made.</p>
    `,
  })
}

export async function generateAccessRequestAdminEmail(
  name: string,
  email: string,
  organization: string | undefined,
  publicationTitle: string,
  reason: string | undefined,
) {
  const readableTitle = formatDisplayText(publicationTitle)

  return sharedEmailShell({
    title: "New publication access request",
    eyebrow: "Admin Notification",
    accentColor: "#082c3c",
    body: `
      <p>A new access request has been submitted for <strong>${readableTitle}</strong>.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px;">
        <tr><td style="padding:10px 12px;background:#f1f5f9;font-weight:700;width:130px;">Applicant</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${name}</td></tr>
        <tr><td style="padding:10px 12px;background:#f1f5f9;font-weight:700;">Email</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${email}</td></tr>
        ${organization ? `<tr><td style="padding:10px 12px;background:#f1f5f9;font-weight:700;">Organisation</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${organization}</td></tr>` : ""}
        ${reason ? `<tr><td style="padding:10px 12px;background:#f1f5f9;font-weight:700;">Reason</td><td style="padding:10px 12px;">${reason}</td></tr>` : ""}
      </table>
      <p style="margin-top:18px;">Please review this request in the admin panel.</p>
    `,
  })
}
