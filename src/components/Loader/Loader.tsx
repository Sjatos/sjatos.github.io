import React, { FC } from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "./Loader.module.scss";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => (
  <div className={styles.Loader}>
    <Spinner animation="border" variant="light" />
  </div>
);

export default Loader;
