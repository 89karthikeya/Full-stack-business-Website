import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side email notification endpoint
  app.post("/api/send-consultation-notification", async (req, res) => {
    try {
      const {
        consultationId,
        name,
        businessName,
        email,
        phone,
        automationGoal,
        currentProcess
      } = req.body;

      if (!name || !businessName || !email || !automationGoal) {
        return res.status(400).json({
          success: false,
          error: "Missing required consultation fields"
        });
      }

      const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL || "luckyoct16@gmail.com";
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
      const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || "luckyoct16@gmail.com";
      const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

      const textBody = `
New Consultation Booking Request
==================================================

1. Name: ${name}
2. Business Name: ${businessName}
3. Email: ${email}
4. Phone Number: ${phone || "Not provided"}
5. What would you like to automate?: ${automationGoal}
6. Current Process:
${currentProcess || "Not provided"}

==================================================
Firestore Document ID: ${consultationId || "Stored in Firestore"}
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
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; color: #1d1d1f;">${escapeHtml(phone || "Not provided")}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; font-weight: 600; color: #515154;">5. Automation Goal:</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; color: #1d1d1f;">${escapeHtml(automationGoal)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; font-weight: 600; vertical-align: top; color: #515154;">6. Current Process:</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e7; color: #1d1d1f; white-space: pre-wrap;">${escapeHtml(currentProcess || "Not provided")}</td>
    </tr>
  </table>

  <div style="font-size: 12px; color: #86868b; background: #f5f5f7; padding: 12px; rounded: 8px;">
    <strong>Firestore Document ID:</strong> ${escapeHtml(consultationId || "Created in Firestore")}<br>
    <strong>Timestamp:</strong> ${new Date().toLocaleString()}
  </div>
</div>
`.trim();

      // Check if SMTP credentials are provided
      if (smtpPass) {
        const cleanPass = smtpPass.trim().replace(/\s+/g, "");
        const isGmail = smtpHost.includes("gmail") || smtpUser.endsWith("@gmail.com");

        const transportConfig = isGmail
          ? {
              service: "gmail",
              auth: {
                user: smtpUser.trim(),
                pass: cleanPass
              }
            }
          : {
              host: smtpHost,
              port: smtpPort,
              secure: smtpPort === 465,
              auth: {
                user: smtpUser.trim(),
                pass: cleanPass
              }
            };

        const transporter = nodemailer.createTransport(transportConfig);

        const info = await transporter.sendMail({
          from: `"Consultation Intake" <${smtpUser.trim()}>`,
          to: recipient,
          replyTo: email,
          subject: `New Consultation Booking: ${businessName} (${name})`,
          text: textBody,
          html: htmlBody
        });

        console.log(`[EMAIL NOTIFICATION SENT] Message ID: ${info.messageId} to ${recipient}`);
        return res.json({
          success: true,
          delivered: true,
          messageId: info.messageId,
          recipient
        });
      } else {
        // Log notification details securely to server output
        console.log(`==================================================`);
        console.log(`[SECURE SERVER-SIDE EMAIL NOTIFICATION DISPATCHED]`);
        console.log(`Recipient: ${recipient}`);
        console.log(`Subject: New Consultation Booking: ${businessName} (${name})`);
        console.log(textBody);
        console.log(`==================================================`);
        console.log(`Note: To deliver to real inbox, set SMTP_PASS in secrets/environment.`);

        return res.json({
          success: true,
          delivered: false,
          note: "Email notification dispatched on server (SMTP_PASS not configured)",
          recipient,
          data: {
            name,
            businessName,
            email,
            phone: phone || "Not provided",
            automationGoal,
            currentProcess: currentProcess || "Not provided"
          }
        });
      }
    } catch (err: any) {
      console.error("[EMAIL NOTIFICATION ERROR]", err);
      return res.status(500).json({
        success: false,
        error: err.message || "Failed to send notification"
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

startServer();
