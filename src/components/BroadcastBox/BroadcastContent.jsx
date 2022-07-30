import React from "react";
import styles from "./BroadcastContent.module.css";

const BroadcastContent = ({ bc }) => {
  return (
    <div className={styles.innerContent}>
      <div className={styles.broadcaster}>
        <span>{bc.broadcaster}</span>
      </div>
      <span>{bc.body}</span>
      <span>{bc.date}</span>
    </div>
  );
};

export default BroadcastContent;
