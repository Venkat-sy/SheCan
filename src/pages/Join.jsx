import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Join.module.css";
import { useInViewFadeUp } from "../utils/useInViewFadeUp";

// EmailJS Configuration - Get credentials from https://www.emailjs.com
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_demo";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_demo";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "demo_key";

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY !== "demo_key") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export default function Join() {
  const fade1 = useInViewFadeUp(0);
  const fade2 = useInViewFadeUp(120);

  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    interest: "Volunteer",
    mode: "Online",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "idle",
    message: "Fill your details and click Submit. Your information will be automatically sent to our admin.",
  });

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.email.includes("@") &&
      form.college.trim().length >= 2
    );
  }, [form]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) {
      setStatus({
        type: "error",
        message:
          "Please fill name, valid email, and college before submitting.",
      });
      return;
    }

    if (EMAILJS_PUBLIC_KEY === "demo_key") {
      setStatus({
        type: "error",
        message: "EmailJS not configured. Please set environment variables.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Sending your information to admin..." });
    try {
      const templateParams = {
        to_email: "nnm23cc020@nmamit.in",
        from_name: form.name,
        from_email: form.email,
        college: form.college,
        interest: form.interest,
        mode: form.mode,
        message: form.message || "(No message provided)",
        submission_time: new Date().toLocaleString(),
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setStatus({
        type: "success",
        message: "✓ Thank you! Your information has been sent to our admin.",
      });
      setForm({
        name: "",
        email: "",
        college: "",
        interest: "Volunteer",
        mode: "Online",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({
        type: "error",
        message:
          "Unable to send. Please check your internet connection and try again.",
      });
    }
  }

  return (
    <div className={styles.wrap}>
      <section className={styles.header}>
        <div ref={fade1.ref} className={fade1.className}>
          <div className={styles.pill}>Join Us</div>
          <h1 className={styles.title}>Volunteer with She Can Foundation</h1>
          <p className={styles.desc}>
            Students often need opportunities that feel safe and fair. Help us
            build that community.
          </p>
        </div>
      </section>

      <section className={styles.card}>
        <form ref={fade2.ref} className={fade2.className} onSubmit={onSubmit}>
          <div className={styles.row}>
            <label className={styles.label}>
              Full Name
              <input
                className={styles.input}
                value={form.name}
                onChange={(e) =>
                  setForm((s) => ({ ...s, name: e.target.value }))
                }
                placeholder="Your name"
              />
            </label>
            <label className={styles.label}>
              Email
              <input
                className={styles.input}
                value={form.email}
                onChange={(e) =>
                  setForm((s) => ({ ...s, email: e.target.value }))
                }
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className={styles.label}>
            College / University
            <input
              className={styles.input}
              value={form.college}
              onChange={(e) =>
                setForm((s) => ({ ...s, college: e.target.value }))
              }
              placeholder="College name"
            />
          </label>

          <div className={styles.row}>
            <label className={styles.label}>
              Interest
              <select
                className={styles.select}
                value={form.interest}
                onChange={(e) =>
                  setForm((s) => ({ ...s, interest: e.target.value }))
                }
              >
                <option value="Volunteer">Volunteer</option>
                <option value="Mentor">Mentor</option>
                <option value="Workshop Participant">
                  Workshop Participant
                </option>
              </select>
            </label>
            <label className={styles.label}>
              Preferred Mode
              <select
                className={styles.select}
                value={form.mode}
                onChange={(e) =>
                  setForm((s) => ({ ...s, mode: e.target.value }))
                }
              >
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>
            </label>
          </div>

          <label className={styles.label}>
            Message (optional)
            <textarea
              className={styles.textarea}
              value={form.message}
              onChange={(e) =>
                setForm((s) => ({ ...s, message: e.target.value }))
              }
              placeholder="Tell us what you want to learn or contribute..."
            />
          </label>

          <button className={styles.btn} type="submit" disabled={!canSubmit}>
            Submit
          </button>

          <Status type={status.type} message={status.message} />
        </form>

        <div className={styles.note}>
          Your information will be sent directly to our admin when you submit.
        </div>
      </section>
    </div>
  );
}

function Status({ type, message }) {
  if (!message) return null;
  const cls =
    type === "success"
      ? styles.success
      : type === "error"
        ? styles.error
        : styles.loading;

  return (
    <div className={cls} role="status">
      {message}
    </div>
  );
}
