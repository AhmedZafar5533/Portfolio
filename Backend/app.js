require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", "1");

app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
  })
);

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER || "your-app-email",
    pass: process.env.PASS || "your-app-password",
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/send-email", async (req, res) => {
  const { from, subject, text } = req.body;
  if (!from || !subject || !text) {
    return res
      .status(400)
      .json({ message: "Missing required fields", success: false });
  }

  try {
    const info = await transporter.sendMail({
      from: `"My App" <${req.body.from}>`,
      to: process.env.USER,
      subject: req.body.subject,
      text,
      html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 30px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; color: #333;">
      
      <!-- Header -->
      <h2 style="font-size: 20px; font-weight: 600; color: #222; margin: 0 0 20px; text-align: center;">
        📩 New Message Received
      </h2>

      <!-- Subject -->
      <p style="font-size: 16px; font-weight: 500; margin: 0 0 10px; color: #111;">
        ${req.body.subject}
      </p>

      <!-- Message -->
      <div style="padding: 15px 20px; border: 1px solid #eee; border-radius: 6px; margin: 15px 0;">
        <p style="font-size: 15px; line-height: 1.6; color: #444; margin: 0; white-space: pre-line;">
          ${text}
        </p>
      </div>

      <!-- Sender Info -->
      <p style="font-size: 14px; color: #555; margin: 10px 0 0;">
        <strong>From:</strong> ${req.body.from}
      </p>

      <!-- Footer -->
      <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
      <p style="font-size: 12px; color: #888; text-align: center; margin: 0;">
        Sent via <strong>My Portfolio</strong>
      </p>
    </div>
  `,
    });

    if (!info) return res.json({ message: "Email not sent", sucess: false });
    res.json({ message: "Email sent", sucess: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
