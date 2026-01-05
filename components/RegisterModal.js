"use client";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegister } from "@/hooks/mutations/useAuthMutations";
import { useState } from "react";

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  surname: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    ),
  address: yup.string().max(200, "Address must not exceed 200 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegisterModal = ({ show, onHide, onSwitchToLogin, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const onSubmit = async (data) => {
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = data;
      const response = await registerMutation.mutateAsync(userData);
      reset();
      onHide();
      // Call onSuccess callback to show OTP modal
      if (onSuccess) {
        onSuccess(data.email);
      }
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleClose = () => {
    reset();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <h4 className="mb-0">Create Your Account</h4>
      </Modal.Header>

      <Modal.Body className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name *"
                  style={{ border: "1px solid #ddd" }}
                  {...register("name")}
                />
                {errors.name && (
                  <small className="text-danger d-block mt-1">{errors.name.message}</small>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name *"
                  style={{ border: "1px solid #ddd" }}
                  {...register("surname")}
                />
                {errors.surname && (
                  <small className="text-danger d-block mt-1">{errors.surname.message}</small>
                )}
              </div>
            </div>
          </div>

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
              type="tel"
              className="form-control"
              placeholder="Phone Number *"
              style={{ border: "1px solid #ddd" }}
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <small className="text-danger d-block mt-1">{errors.phoneNumber.message}</small>
            )}
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              rows="2"
              placeholder="Address (Optional)"
              style={{ border: "1px solid #ddd" }}
              {...register("address")}
            />
            {errors.address && (
              <small className="text-danger d-block mt-1">{errors.address.message}</small>
            )}
          </div>

          <div className="row">
            <div className="col-md-6">
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
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password *"
                  style={{ border: "1px solid #ddd" }}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <small className="text-danger d-block mt-1">{errors.confirmPassword.message}</small>
                )}
              </div>
            </div>
          </div>

          {registerMutation.isError && (
            <div className="alert alert-danger" role="alert">
              {registerMutation.error?.message || "Registration failed. Please try again."}
            </div>
          )}

          <div className="form-group mb-0">
            <button
              type="submit"
              className="theme-btn w-100"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creating Account..." : "Create Account"} <i className="far fa-arrow-alt-right" />
            </button>
          </div>

          <div className="text-center mt-3">
            <p className="mb-0">
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                  onSwitchToLogin();
                }}
                style={{ color: "#ff3d00" }}
              >
                Login here
              </a>
            </p>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
