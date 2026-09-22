const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

if (!admin.apps.length) {
  admin.initializeApp();
}

function getTransporter() {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = (process.env.SMTP_USER || process.env.GMAIL_USER || "luckyoct16@gmail.com").trim();
  const rawPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "";
  const smtpPass = rawPass.trim().replace(/\s+/g, "");

  if (!smtpPass) {
    return null;
  }

  const isGmail = smtpHost.includes("gmail") || smtpUser.endsWith("@gmail.com");

  if (isGmail) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
}

function buildEmailBodies(data) {
  const name = data.name || "Valued Client";
  const businessName = data.businessName || "N/A";
  const email = data.email || "N/A";
  const phone = data.phone || "Not provided";
  const automationGoal = data.automationGoal || "Not provided";
  const currentProcess = data.currentProcess || "Not provided";
  const consultationId = data.consultationId || "Firestore Document";

  const textBody = `
New Consultation Booking Request
==================================================

1. Name: ${name}
2. Business Name: ${businessName}
3. Email: ${email}
4. Phone Number: ${phone}
5. What would you like to automate?: ${automationGoal}
6. Current Process:
${currentProcess}

==================================================
Firestore Document ID: ${consultationId}
Received: ${new Date().toISOString()}
`.trim();

  const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1d1d1f; line-height: 1.5;">
  <div style="border-bottom: 2px solid #0071e3; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #1d1d1f; font-size: 20px; font-weight: 600;">New Consultation Booking Request</h2>
    <p style="margin: 4px 0 0 0; color: #86868b; font-size: 13px;">Received via website consultation form</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; font-weight: 600; width: 35%; color: #515154;">1. Name:</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; color: #1d1d1f;">${escapeHtml(name)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; font-weight: 600; color: #515154;">2. Business Name:</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; color: #1d1d1f;">${escapeHtml(businessName)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; font-weight: 600; color: #515154;">3. Email:</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7;"><a href="mailto:${escapeHtml(email)}" style="color: #0071e3; text-decoration: none;">${escapeHtml(email)}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; font-weight: 600; color: #515154;">4. Phone Number:</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; color: #1d1d1f;">${escapeHtml(phone)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; font-weight: 600; color: #515154;">5. Automation Goal:</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; color: #1d1d1f;">${escapeHtml(automationGoal)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; font-weight: 600; vertical-align: top; color: #515154;">6. Current Process:</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; color: #1d1d1f; white-space: pre-wrap;">${escapeHtml(currentProcess)}</td>
    </tr>
  </table>

  <div style="font-size: 12px; color: #86868b; background: #f5f5f7; padding: 12px; border-radius: 8px;">
    <strong>Firestore Document ID:</strong> ${escapeHtml(consultationId)}<br>
    <strong>Timestamp:</strong> ${new Date().toLocaleString()}
  </div>
</div>
`.trim();

  return { textBody, htmlBody, subject: `New Consultation Booking: ${businessName} (${name})` };
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 1. HTTP Cloud Function to handle /api/send-consultation-notification
exports.api = onRequest({ cors: true }, async (req, res) => {
  // CORS preflight handled automatically by { cors: true }
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const data = req.body || {};
    const { name, businessName, email, automationGoal } = data;

    if (!name || !businessName || !email || !automationGoal) {
      return res.status(400).json({ success: false, error: "Missing required consultation fields" });
    }

    const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL || "luckyoct16@gmail.com";
    const smtpUser = (process.env.SMTP_USER || process.env.GMAIL_USER || "luckyoct16@gmail.com").trim();
    const transporter = getTransporter();

    const { textBody, htmlBody, subject } = buildEmailBodies(data);

    if (transporter) {
      const info = await transporter.sendMail({
        from: `"Consultation Intake" <${smtpUser}>`,
        to: recipient,
        replyTo: email,
        subject,
        text: textBody,
        html: htmlBody
      });

      return res.status(200).json({
        success: true,
        delivered: true,
        messageId: info.messageId,
        recipient
      });
    } else {
      console.log("[FIREBASE FUNCTION] SMTP_PASS not set, logged consultation:", textBody);
      return res.status(200).json({
        success: true,
        delivered: false,
        note: "Email notification logged (SMTP_PASS not configured)",
        recipient
      });
    }
  } catch (err) {
    console.error("[FIREBASE FUNCTION ERROR]", err);
    return res.status(500).json({ success: false, error: err.message || "Internal server error" });
  }
});

// 2. Firestore Document Created Trigger
// Automatically triggers on Firebase backend whenever a consultation document is added
exports.onConsultationCreated = onDocumentCreated("consultations/{consultationId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }

  const data = snapshot.data() || {};
  const consultationId = event.params.consultationId;

  // Prevent duplicate sending if already notified
  if (data.emailNotificationSent) {
    console.log(`Notification already sent for consultation ${consultationId}`);
    return;
  }

  const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL || "luckyoct16@gmail.com";
  const smtpUser = (process.env.SMTP_USER || process.env.GMAIL_USER || "luckyoct16@gmail.com").trim();
  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[FIRESTORE TRIGGER] SMTP_PASS not set. Consultation: ${consultationId}`);
    return;
  }

  const { textBody, htmlBody, subject } = buildEmailBodies({
    ...data,
    consultationId
  });

  try {
    const info = await transporter.sendMail({
      from: `"Consultation Intake" <${smtpUser}>`,
      to: recipient,
      replyTo: data.email,
      subject,
      text: textBody,
      html: htmlBody
    });

    console.log(`[FIRESTORE TRIGGER] Email sent! Message ID: ${info.messageId} to ${recipient}`);

    // Mark as sent in document without triggering endless loop
    await snapshot.ref.update({
      emailNotificationSent: true,
      emailNotificationSentAt: admin.firestore.FieldValue.serverTimestamp(),
      emailMessageId: info.messageId
    });
  } catch (error) {
    console.error(`[FIRESTORE TRIGGER ERROR] Failed to send email for ${consultationId}:`, error);
  }
});
