import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footer}`}>
      <p>Copyright &copy; 2022</p>
      <a href="/about">About</a>
    </footer>
  );
};

export default Footer;
