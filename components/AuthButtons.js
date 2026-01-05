"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/mutations/useAuthMutations";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import OTPVerificationModal from "./OTPVerificationModal";

const AuthButtons = () => {
  const { isAuthenticated, user } = useAuth();
  const logoutMutation = useLogout();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleRegisterSuccess = (email) => {
    setOtpEmail(email);
    setShowOTP(true);
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setShowUserMenu(false);
  };

  if (isAuthenticated && user) {
    return (
      <div className="position-relative" style={{ marginLeft: "15px" }}>
        <button
          className="btn btn-link text-white p-0 d-flex align-items-center"
          onClick={() => setShowUserMenu(!showUserMenu)}
          style={{ textDecoration: "none" }}
        >
          <i className="far fa-user" style={{ fontSize: "20px", marginRight: "8px" }} />
          <span className="d-none d-lg-inline">{user.name}</span>
        </button>

        {showUserMenu && (
          <div
            className="position-absolute bg-white shadow-sm"
            style={{
              top: "100%",
              right: 0,
              marginTop: "10px",
              minWidth: "200px",
              borderRadius: "4px",
              zIndex: 1000,
            }}
          >
            <div className="p-3 border-bottom">
              <div className="fw-bold text-dark">{user.name} {user.surname}</div>
              <small className="text-muted">{user.email}</small>
            </div>
            <div className="p-2">
              <button
                className="btn btn-link text-dark w-100 text-start p-2"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <i className="far fa-sign-out me-2" />
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div style={{ marginLeft: "15px", display: "flex", gap: "10px" }}>
        <button
          className="btn btn-link text-white p-0"
          onClick={() => setShowLogin(true)}
          style={{ textDecoration: "none" }}
        >
          <i className="far fa-user" style={{ fontSize: "20px", marginRight: "5px" }} />
          <span className="d-none d-lg-inline">Login</span>
        </button>
      </div>

      <LoginModal
        show={showLogin}
        onHide={() => setShowLogin(false)}
        onSwitchToRegister={() => setShowRegister(true)}
      />

      <RegisterModal
        show={showRegister}
        onHide={() => setShowRegister(false)}
        onSwitchToLogin={() => setShowLogin(true)}
        onSuccess={handleRegisterSuccess}
      />

      <OTPVerificationModal
        show={showOTP}
        onHide={() => setShowOTP(false)}
        email={otpEmail}
      />
    </>
  );
};

export default AuthButtons;
