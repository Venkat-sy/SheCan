import React, { useRef, useState } from "react";
import styles from "./About.module.css";
import { useInViewFadeUp } from "../utils/useInViewFadeUp";
import html2canvas from "html2canvas";

export default function About() {
  const a = useInViewFadeUp(0);
  const b = useInViewFadeUp(140);
  const c = useInViewFadeUp(280);
  const d = useInViewFadeUp(420);
  const previewRef = useRef(null);

  const [aboutText, setAboutText] = useState(
    `She Can Foundation empowers students through mentorship, career readiness, and inclusive community programs. We believe in fair opportunity, respectful learning, and hands-on growth for every learner.`,
  );
  const [status, setStatus] = useState(
    "Ready to capture the About section as PNG.",
  );
  const [imageUrl, setImageUrl] = useState("");

  async function generateImage() {
    if (!previewRef.current) {
      setStatus("Unable to find the preview section to capture.");
      return;
    }

    setStatus("Creating image from the About preview...");
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const pngUrl = canvas.toDataURL("image/png");
      setImageUrl(pngUrl);
      setStatus(
        "Image created successfully! Download it and attach it to the email.",
      );
    } catch (error) {
      console.error(error);
      setStatus("Image generation failed. Please try again.");
    }
  }

  function openEmail() {
    const subject = encodeURIComponent("She Can About Us PNG");
    const body = encodeURIComponent(
      "Please attach the generated About page image and send it to nnm23cc020@nmamit.in.",
    );
    window.location.href = `mailto:nnm23cc020@nmamit.in?subject=${subject}&body=${body}`;
  }

  return (
    <div className={styles.wrap}>
      <section className={styles.header}>
        <div className={styles.pill}>About SheCan</div>
        <h1 ref={a.ref} className={a.className}>
          She Can Foundation • Women’s Empowerment & Careers 🌟
        </h1>
        <p ref={b.ref} className={b.className + " " + styles.desc}>
          We focus on giving students meaningful opportunities where learning
          happens with respect. Our goal is to reduce fear, reduce pressure, and
          help people build skills through support.
        </p>
      </section>

      <section className={`${styles.editor} ${d.className}`} ref={d.ref}>
        <div className={styles.editorHeader}>
          <div>
            <h2>About Us content</h2>
            <p>
              Type your About Us text below, generate a PDF, and then open your
              email client.
            </p>
          </div>
          <div className={styles.editorActions}>
            <button className={styles.primaryBtn} onClick={generateImage}>
              Generate PNG
            </button>
            <button className={styles.secondaryBtn} onClick={openEmail}>
              Open Email
            </button>
          </div>
        </div>
        <textarea
          className={styles.textarea}
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          rows={10}
        />
        <div className={styles.status}>{status}</div>
      </section>

      <section className={styles.grid}>
        <InfoBlock
          refObj={a}
          title="What we believe"
          points={[
            "Every student deserves a fair chance.",
            "Feedback should be encouraging—not intimidating.",
            "Growth takes time, and we build step-by-step.",
          ]}
        />
        <InfoBlock
          refObj={b}
          title="How we help"
          points={[
            "Guided opportunities to practice real work.",
            "Mentorship and resources for skill-building.",
            "A welcoming community where you can ask questions.",
          ]}
        />
        <InfoBlock
          refObj={c}
          title="How to join"
          points={[
            "Fill out the volunteer form.",
            "We’ll review your details.",
            "Get invited to next steps & training.",
          ]}
        />
      </section>
    </div>
  );
}

const InfoBlock = React.forwardRef(function InfoBlock(
  { refObj, title, points },
  _ref,
) {
  return (
    <div ref={refObj.ref} className={refObj.className + " " + styles.block}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.list}>
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
});
