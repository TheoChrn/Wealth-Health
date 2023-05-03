import React from "react";
import styles from "./styles.module.scss";

const Modal = ({ onClose, children, display }) => {
  if (!display) {
    return null;
  }
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button className={styles.closeModalBtn} onClick={onClose}>
          X
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
