import React from "react";
import Button from "../Button/Button";
import styles from "./Header.module.css";

interface HeaderProps {
  title?: string;
  showForm: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = "Default Title",
  showForm,
}) => {
  return (
    <header className={`${styles.header}`}>
      <h1>{title}</h1>
      <Button
        text={showForm ? "Close" : "Add"}
        type={showForm ? "btnClose" : "btnAdd"}
      />
    </header>
  );
};

export default Header;
