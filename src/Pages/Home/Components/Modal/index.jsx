import React from "react";
import styles from "./styles.module.scss";

const Modal = ({
  onClose,
  children,
  display,
  className,
  containerClassName,
  modalClassName,
  closeButtonClassName,
}) => {
  if (!display) {
    return null;
  }
  const modalContainerClasses = `${styles.modalContainer} ${
    containerClassName || ""
  }`;
  const modalClasses = `${styles.modal} ${modalClassName || ""}`;
  const closeButtonClasses = `${styles.closeModalBtn} ${
    closeButtonClassName || ""
  }`;
  return (
    <div className={modalContainerClasses}>
      <div className={modalClasses}>
        <button className={closeButtonClasses} onClick={onClose}>
          &#10006;
        </button>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
