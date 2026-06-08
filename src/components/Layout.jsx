import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logo}>CanShe</span>
          <span className={styles.tagline}>She Can Foundation</span>
        </div>

        <nav className={styles.nav} aria-label="Primary navigation">
          <NavItem to="/" label="Home" active={location.pathname === "/"} />
          <NavItem
            to="/about"
            label="About"
            active={location.pathname === "/about"}
          />
          <NavItem
            to="/join"
            label="Join Us"
            active={location.pathname === "/join"}
          />
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
}

function NavItem({ to, label, active }) {
  return (
    <Link className={active ? styles.navLinkActive : styles.navLink} to={to}>
      {label}
    </Link>
  );
}
