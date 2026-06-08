import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, "data", "volunteers.json");
fs.mkdirSync(path.dirname(dataFile), { recursive: true });

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

app.post("/api/volunteers", (req, res) => {
  const { name, email, college, interest, message } = req.body || {};

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
    message: message ? String(message) : "",
  };

  const all = readAll();
  all.unshift(entry);
  writeAll(all.slice(0, 500));

  return res
    .status(201)
    .json({ ok: true, message: "Thanks! Your request was received." });
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
