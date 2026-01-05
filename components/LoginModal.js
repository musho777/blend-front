"use client";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin } from "@/hooks/mutations/useAuthMutations";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginModal = ({ show, onHide, onSwitchToRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useLogin();
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      reset();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onHide();
      }, 2000);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleClose = () => {
    reset();
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <h4 className="mb-0">Login to Your Account</h4>
        </Modal.Header>

        <Modal.Body className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address *"
                style={{ border: "1px solid #ddd" }}
                {...register("email")}
              />
              {errors.email && (
                <small className="text-danger d-block mt-1">{errors.email.message}</small>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password *"
                style={{ border: "1px solid #ddd" }}
                {...register("password")}
              />
              {errors.password && (
                <small className="text-danger d-block mt-1">{errors.password.message}</small>
              )}
            </div>

            {loginMutation.isError && (
              <div className="alert alert-danger" role="alert">
                {loginMutation.error?.message || "Login failed. Please check your credentials."}
              </div>
            )}

            <div className="form-group mb-0">
              <button
                type="submit"
                className="theme-btn w-100"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"} <i className="far fa-arrow-alt-right" />
              </button>
            </div>

            <div className="text-center mt-3">
              <p className="mb-0">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                    onSwitchToRegister();
                  }}
                  style={{ color: "#ff3d00" }}
                >
                  Register here
                </a>
              </p>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <SuccessModal
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
        title="Login Successful!"
        message="Welcome back! You have successfully logged in."
      />
    </>
  );
};

export default LoginModal;
