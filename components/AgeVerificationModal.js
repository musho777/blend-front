"use client";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";

const AgeVerificationModal = () => {
  const [show, setShow] = useState(false);
  const [underAge, setUnderAge] = useState(false);

  useEffect(() => {
    // Check if user has already verified their age
    const ageVerified = localStorage.getItem("ageVerified");
    if (!ageVerified) {
      setShow(true);
    }
  }, []);

  const handleConfirm = () => {
    // Store verification in localStorage
    localStorage.setItem("ageVerified", "true");
    setShow(false);
  };

  const handleDeny = () => {
    setUnderAge(true);
  };

  return (
    <>
      <Modal
        show={show && !underAge}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Body
          style={{ paddingTop: 20, paddingBottom: 20 }}
          className="text-center  "
        >
          <div className="mb-4">
            <h2
              className="mb-3"
              style={{ color: "#ff3d00", fontWeight: "bold" }}
            >
              Age Verification Required
            </h2>
            <div className="mb-4">
              <i
                className="fas fa-exclamation-triangle"
                style={{ fontSize: "60px", color: "#ff3d00" }}
              ></i>
            </div>
            <h4 className="mb-3">Are you 18 years of age or older?</h4>
            <p className="text-muted mb-4">
              This website contains age-restricted products. By entering this
              site, you certify <br /> that you are 18 years of age or older and
              agree to our Terms of Service.
            </p>
          </div>

          <div className="d-flex gap-3 justify-content-center">
            <button
              onClick={handleConfirm}
              className="theme-btn"
              style={{ minWidth: "150px", padding: "15px 30px" }}
            >
              Yes, I am 18+
            </button>
            <button
              onClick={handleDeny}
              className="btn btn-outline-secondary"
              style={{ minWidth: "150px", padding: "15px 30px" }}
            >
              No, I'm not
            </button>
          </div>

          <p className="text-muted mt-4 mb-0" style={{ fontSize: "12px" }}>
            You must be of legal age to purchase hookah products in your
            jurisdiction.
          </p>
        </Modal.Body>
      </Modal>

      {/* Under Age Modal */}
      <Modal show={underAge} backdrop="static" keyboard={false} centered>
        <Modal.Body className="p-5 text-center">
          <div className="mb-4">
            <i
              className="fas fa-ban"
              style={{ fontSize: "60px", color: "#ff3d00" }}
            ></i>
          </div>
          <h3 className="mb-3" style={{ color: "#ff3d00" }}>
            Access Restricted
          </h3>
          <p className="mb-4">
            We're sorry, but you must be 18 years or older to access this
            website and purchase our products.
          </p>
          <p className="text-muted">
            Please return when you meet the age requirement.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AgeVerificationModal;
