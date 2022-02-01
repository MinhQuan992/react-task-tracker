import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  type: string;
  callback(): void;
};

const Button: React.FC<ButtonProps> = ({ text, type, callback }) => {
  return (
    <button
      className={`${styles.btn} ${
        type === "btnAdd" ? styles.btnAdd : styles.btnClose
      }`}
      onClick={callback}
    >
      {text}
    </button>
  );
};

export default Button;
