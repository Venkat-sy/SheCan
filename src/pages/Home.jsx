import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useInViewFadeUp } from "../utils/useInViewFadeUp";
import heroImg from "../../public/assets/hero.jpg";

export default function Home() {
  return (
    <div className={styles.wrap}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.left}>
            <AnimatedText />
            <p className={styles.sub}>
              We create fair, respectful opportunities for students to learn and
              grow—without fear of rejection or unrealistic expectations.
            </p>

            <div className={styles.actions}>
              <Link className={styles.primaryBtn} to="/join">
                Join Us ✨
              </Link>
              <Link className={styles.secondaryBtn} to="/about">
                Learn more
              </Link>
            </div>

            <div className={styles.badges}>
              <Badge text="Career-ready" />
              <Badge text="Mentorship-first" />
              <Badge text="Student-friendly" />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.imgCard}>
              <img
                className={styles.heroImg}
                src={heroImg}
                alt="Women empowerment community"
              />
              <div className={styles.glow} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <FeatureCard
          title="A safe space"
          desc="Learn with confidence. We design opportunities so everyone has a fair chance."
        />
        <FeatureCard
          title="Real guidance"
          desc="Workshops, mentorship, and feedback to help you build skills that matter."
        />
        <FeatureCard
          title="Growth mindset"
          desc="From student to capable contributor—step by step."
        />
      </section>
    </div>
  );
}

function Badge({ text }) {
  return <div className={styles.badge}>{text}</div>;
}

function AnimatedText() {
  const fade = useInViewFadeUp(0);
  const fade2 = useInViewFadeUp(120);
  const fade3 = useInViewFadeUp(240);

  return (
    <div>
      <div ref={fade.ref} className={fade.className}>
        <span className={styles.kicker}>🌟 Women’s Empowerment & Careers</span>
      </div>
      <h1 ref={fade2.ref} className={fade2.className}>
        Research • Resilience • Real opportunities.
      </h1>
      <div ref={fade3.ref} className={fade3.className}>
        <h2 className={styles.smallTitle}>At SheCan (She Can Foundation)</h2>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  const fade = useInViewFadeUp(0);
  return (
    <article ref={fade.ref} className={fade.className + " " + styles.card}>
      <div className={styles.icon}>✓</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
    </article>
  );
}
