import React from "react";
import styles from "./About.module.css";
import { useInViewFadeUp } from "../utils/useInViewFadeUp";

export default function About() {
  const a = useInViewFadeUp(0);
  const b = useInViewFadeUp(140);
  const c = useInViewFadeUp(280);

  return (
    <div className={styles.wrap}>
      <section className={styles.header}>
        <div className={styles.pill}>About SheCan</div>
        <h1 ref={a.ref} className={a.className}>
          She Can Foundation • Women's Empowerment & Careers 🌟
        </h1>
        <p ref={b.ref} className={b.className + " " + styles.desc}>
          We focus on giving students meaningful opportunities where learning
          happens with respect. Our goal is to reduce fear, reduce pressure, and
          help people build skills through support.
        </p>
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
            "We'll review your details.",
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
