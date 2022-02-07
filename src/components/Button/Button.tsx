import React from "react";
import { useDispatch } from "react-redux";
import { changeState } from "../../features/taskFormSlice";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  type: string;
}

const Button: React.FC<ButtonProps> = ({ text, type }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${styles.btn} ${
        type === "btnAdd"
          ? styles.btnAdd
          : type === "btnClose"
          ? styles.btnClose
          : styles.btnGoBack
      }`}
      onClick={() => dispatch(changeState())}
    >
      {text}
    </button>
  );
};

export default Button;
