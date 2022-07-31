import React from "react";
import styles from "./BroadcastContent.module.css";

const BroadcastContent = ({ bc }) => {
  return (
    <div className={styles.innerContent}>
      <div className={styles.broadcaster}>
        <span>{bc.broadcaster}</span>
      </div>
      <div className={styles.bodyContainer}>
        <span>{bc.body}</span>
      </div>
      <div className={styles.dateContainer}>
        <span>{bc.date}</span>
      </div>
    </div>
  );
};

export default BroadcastContent;
