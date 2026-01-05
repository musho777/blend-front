"use client";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useVerifyEmail, useResendOTP } from "@/hooks/mutations/useAuthMutations";
import SuccessModal from "./SuccessModal";

const OTPVerificationModal = ({ show, onHide, email }) => {
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const verifyEmailMutation = useVerifyEmail();
  const resendOTPMutation = useResendOTP();

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleComplete = async (value) => {
    if (value.length === 6) {
      try {
        await verifyEmailMutation.mutateAsync({ email, otp: value });
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setOtp("");
          onHide();
        }, 2000);
      } catch (error) {
        // Error is handled by the mutation hook
        setOtp("");
      }
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    try {
      await resendOTPMutation.mutateAsync({ email });
      // Start 60 second countdown
      setResendTimer(60);
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleClose = () => {
    setOtp("");
    setResendTimer(0);
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <h4 className="mb-0">Verify Your Email</h4>
        </Modal.Header>

        <Modal.Body className="text-center p-4">
          <div className="mb-4">
            <i
              className="far fa-envelope-open-text"
              style={{
                fontSize: "48px",
                color: "#ff3d00",
              }}
            />
          </div>

          <h5 className="mb-2">Enter Verification Code</h5>
          <p className="text-muted mb-4">
            We've sent a 6-digit code to
            <br />
            <strong>{email}</strong>
          </p>

          <div className="d-flex justify-content-center mb-4">
            <MuiOtpInput
              value={otp}
              onChange={handleChange}
              onComplete={handleComplete}
              length={6}
              TextFieldsProps={{
                placeholder: "-",
                type: "tel",
              }}
              sx={{
                gap: 1,
                maxWidth: "400px",
                "& .MuiOutlinedInput-root": {
                  height: "56px",
                  fontSize: "1.5rem",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff3d00",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff3d00",
                  },
                },
              }}
            />
          </div>

          {verifyEmailMutation.isError && (
            <div className="alert alert-danger" role="alert">
              {verifyEmailMutation.error?.message || "Invalid OTP. Please try again."}
            </div>
          )}

          {resendOTPMutation.isSuccess && (
            <div className="alert alert-success" role="alert">
              A new code has been sent to your email.
            </div>
          )}

          {resendOTPMutation.isError && (
            <div className="alert alert-danger" role="alert">
              {resendOTPMutation.error?.message || "Failed to resend OTP. Please try again."}
            </div>
          )}

          <div className="mt-4">
            <p className="text-muted mb-2">Didn't receive the code?</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleResendOTP();
              }}
              style={{
                color: resendTimer > 0 || resendOTPMutation.isPending ? "#999" : "#ff3d00",
                pointerEvents: resendTimer > 0 || resendOTPMutation.isPending ? "none" : "auto",
                textDecoration: "none"
              }}
            >
              {resendTimer > 0 ? (
                `Resend code in ${resendTimer}s`
              ) : resendOTPMutation.isPending ? (
                "Sending..."
              ) : (
                "Resend Code"
              )}
            </a>
          </div>

          {verifyEmailMutation.isPending && (
            <div className="mt-3">
              <div className="spinner-border" style={{ color: "#ff3d00" }} role="status">
                <span className="visually-hidden">Verifying...</span>
              </div>
              <p className="text-muted mt-2">Verifying your code...</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <SuccessModal
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
        title="Verification Successful!"
        message="Your account has been verified successfully. Welcome to WellFood!"
      />
    </>
  );
};

export default OTPVerificationModal;
