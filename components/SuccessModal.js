"use client";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";

const SuccessModal = ({ show, onHide, title, message, autoClose = true, autoCloseDelay = 2000 }) => {
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        onHide();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [show, onHide, autoClose, autoCloseDelay]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="text-center p-4">
        <div className="success-icon mb-3" style={{ fontSize: "64px", color: "#28a745" }}>
          <i className="far fa-check-circle" />
        </div>
        <h4 className="mb-2">{title || "Success!"}</h4>
        <p className="text-muted">{message || "Operation completed successfully."}</p>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
