import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.brand}>CanShe</div>
          <div className={styles.muted}>
            She Can Foundation • Women’s Empowerment & Careers
          </div>
        </div>
        <div className={styles.right}>
          <a className={styles.link} href="/" aria-label="Home">
            Home
          </a>
          <a className={styles.link} href="/about">
            About
          </a>
          <a className={styles.link} href="/join">
            Join Us
          </a>
        </div>
      </div>
      <div className={styles.copy}>
        © {new Date().getFullYear()} She Can Foundation. All rights reserved.
      </div>
    </footer>
  );
}
