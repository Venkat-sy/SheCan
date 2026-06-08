import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, "data", "volunteers.json");
fs.mkdirSync(path.dirname(dataFile), { recursive: true });

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendAdminEmail(name, email, college, interest, mode, message) {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "nnm23cc020@nmamit.in",
      subject: "New Join Us Submission from She Can Foundation",
      html: `
        <h2>New Join Us Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>College/University:</strong> ${college}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <p><strong>Preferred Mode:</strong> ${mode}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "(None provided)"}</p>
        <hr>
        <p>This submission was received at: ${new Date().toISOString()}</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to admin for ${name}`);
  } catch (error) {
    console.error("Email send error:", error);
  }
}

function readAll() {
  try {
    const raw = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

function writeAll(list) {
  fs.writeFileSync(dataFile, JSON.stringify(list, null, 2), "utf8");
}

app.post("/api/volunteers", async (req, res) => {
  const { name, email, college, interest, mode, message } = req.body || {};

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ message: "Name is required." });
  }
  if (!email || !String(email).includes("@")) {
    return res.status(400).json({ message: "Valid email is required." });
  }
  if (!college || String(college).trim().length < 2) {
    return res.status(400).json({ message: "College/University is required." });
  }

  const entry = {
    id: Math.random().toString(16).slice(2),
    createdAt: new Date().toISOString(),
    name: String(name).trim(),
    email: String(email).trim(),
    college: String(college).trim(),
    interest: interest ? String(interest) : "Volunteer",
    mode: mode ? String(mode) : "Online",
    message: message ? String(message) : "",
  };

  const all = readAll();
  all.unshift(entry);
  writeAll(all.slice(0, 500));

  // Send email to admin automatically
  await sendAdminEmail(
    entry.name,
    entry.email,
    entry.college,
    entry.interest,
    entry.mode,
    entry.message,
  );

  return res
    .status(201)
    .json({
      ok: true,
      message: "Thanks! Your request was received and admin has been notified.",
    });
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
