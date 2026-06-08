import React, { useMemo, useState } from "react";
import styles from "./Join.module.css";
import { useInViewFadeUp } from "../utils/useInViewFadeUp";

export default function Join() {
  const fade1 = useInViewFadeUp(0);
  const fade2 = useInViewFadeUp(120);

  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    interest: "Volunteer",
    message: "",
  });

  const [status, setStatus] = useState({ type: "idle", message: "" });

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
        message: "Please fill name, valid email, and college.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Submitting..." });
    try {
      const apiBase =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      const res = await fetch(`${apiBase}/api/volunteers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();

      setStatus({
        type: "success",
        message: data?.message || "Thanks! We received your request.",
      });
      setForm({
        name: "",
        email: "",
        college: "",
        interest: "Volunteer",
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Could not submit. Please try again.",
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
              <select className={styles.select} defaultValue="Online">
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

          <button
            className={canSubmit ? styles.btn : styles.btnDisabled}
            type="submit"
            disabled={!canSubmit}
          >
            Submit ✓
          </button>

          <Status type={status.type} message={status.message} />

          <div className={styles.note}>
            By submitting, you agree that your details can be used to contact
            you about next steps.
          </div>
        </form>
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
