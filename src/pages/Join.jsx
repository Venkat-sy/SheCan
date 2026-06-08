import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import styles from "./Join.module.css";
import { useInViewFadeUp } from "../utils/useInViewFadeUp";

export default function Join() {
  const fade1 = useInViewFadeUp(0);
  const fade2 = useInViewFadeUp(120);
  const previewRef = useRef(null);

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
    message:
      "Fill your details and submit. The form will be captured as a PNG and prepared for admin review.",
  });
  const [imageUrl, setImageUrl] = useState("");

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.email.includes("@") &&
      form.college.trim().length >= 2
    );
  }, [form]);

  async function captureForm() {
    if (!previewRef.current) {
      setStatus({
        type: "error",
        message: "Unable to capture the submission preview.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Generating submission PNG..." });
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const pngUrl = canvas.toDataURL("image/png");
      setImageUrl(pngUrl);
      setStatus({
        type: "success",
        message:
          "Submission image created. Open your email client to forward it to admin.",
      });
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Image generation failed. Please try again.",
      });
    }
  }

  function openEmail() {
    const subject = encodeURIComponent("She Can Join Us Submission");
    const body = encodeURIComponent(
      `Admin,

A new Join Us form has been submitted. Please review the attached PNG if your email client supports it, or download the generated image first and attach it manually.

Name: ${form.name}
Email: ${form.email}
College: ${form.college}
Interest: ${form.interest}
Mode: ${form.mode}
Message: ${form.message || "(none)"}

Thank you.`,
    );
    window.location.href = `mailto:nnm23cc020@nmamit.in?subject=${subject}&body=${body}`;
  }

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

    await captureForm();
    openEmail();
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
        <div ref={previewRef} className={styles.previewArea}>
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

            <button className={styles.btn} type="submit">
              Submit & Email Admin
            </button>

            <div className={styles.actionsRow}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={captureForm}
              >
                Create PNG Only
              </button>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={openEmail}
              >
                Open Email Draft
              </button>
            </div>

            <Status type={status.type} message={status.message} />
          </form>
        </div>

        {imageUrl && (
          <div className={styles.imagePreviewWrap}>
            <h3>Generated image preview</h3>
            <img
              className={styles.imagePreview}
              src={imageUrl}
              alt="Join form preview"
            />
            <a
              className={styles.downloadLink}
              href={imageUrl}
              download="SheCan-Join-Form.png"
            >
              Download PNG
            </a>
          </div>
        )}

        <div className={styles.note}>
          This flow is handled on the client side only. A submission image is
          generated and an email draft to admin is opened automatically. If your
          email client does not attach the PNG automatically, download it first
          and attach it manually before sending.
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
