import React from "react";
import Button from "../Button/Button";
import styles from "./Header.module.css";

interface HeaderProps {
  title?: string;
  showForm: boolean;
  callback(): void;
}

const Header: React.FC<HeaderProps> = ({
  title = "Default Title",
  showForm,
  callback,
}) => (
  <header className={`${styles.header}`}>
    <h1>{title}</h1>
    <Button
      text={showForm ? "Close" : "Add"}
      type={showForm ? "btnClose" : "btnAdd"}
      callback={callback}
    />
  </header>
);

export default Header;
