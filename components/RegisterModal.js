"use client";
import { Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from 'next-intl';
import { useRegister } from "@/hooks/mutations/useAuthMutations";
import { useState, forwardRef } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Custom input component to limit digits
const CustomPhoneInput = forwardRef((props, ref) => {
  const handleKeyPress = (e) => {
    const value = e.target.value || '';
    const digitsOnly = value.replace(/\D/g, '');
    const newChar = e.key;

    // If the new character is a digit and we already have 11 digits, prevent input
    if (/\d/.test(newChar) && digitsOnly.length >= 11) {
      e.preventDefault();
    }
  };

  return (
    <input
      {...props}
      ref={ref}
      onKeyPress={handleKeyPress}
    />
  );
});
CustomPhoneInput.displayName = "CustomPhoneInput";

const RegisterModal = ({ show, onHide, onSwitchToLogin, onSuccess }) => {
  const t = useTranslations('auth');

  const registerSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(t('firstNameRequired'))
      .min(2, t('firstNameMin'))
      .max(50, t('firstNameMax')),
    lastName: yup
      .string()
      .required(t('lastNameRequired'))
      .min(2, t('lastNameMin'))
      .max(50, t('lastNameMax')),
    email: yup
      .string()
      .email(t('validEmail'))
      .required(t('emailRequired')),
    phone: yup
      .string()
      .required(t('phoneRequired'))
      .test('phone-length', t('phoneLength') || 'Phone number must be exactly 11 digits', function(value) {
        if (!value) return false;
        // Remove all non-digit characters (including +, spaces, hyphens)
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length === 11;
      }),
    address: yup.string().max(200, t('addressMax')),
    password: yup
      .string()
      .required(t('passwordRequired'))
      .min(6, t('passwordMin'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        t('passwordStrength')
      ),
    confirmPassword: yup
      .string()
      .required(t('confirmPasswordRequired'))
      .min(6, t('confirmPasswordMin'))
      .oneOf([yup.ref("password")], t('passwordsMatch')),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const onSubmit = async (data) => {
    try {
      // Backend expects confirmPassword, so send all fields
      const response = await registerMutation.mutateAsync(data);
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
        <h4 className="mb-0">{t('registerTitle')}</h4>
      </Modal.Header>

      <Modal.Body className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t('firstNamePlaceholder')}
                  style={{ border: "1px solid #ddd" }}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <small className="text-danger d-block mt-1">
                    {errors.firstName.message}
                  </small>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t('lastNamePlaceholder')}
                  style={{ border: "1px solid #ddd" }}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <small className="text-danger d-block mt-1">
                    {errors.lastName.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder={t('emailPlaceholder')}
              style={{ border: "1px solid #ddd" }}
              {...register("email")}
            />
            {errors.email && (
              <small className="text-danger d-block mt-1">
                {errors.email.message}
              </small>
            )}
          </div>

          <div className="form-group">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  onChange={(value) => {
                    if (!value) {
                      field.onChange("");
                      return;
                    }

                    // Extract only digits and limit to 11
                    const digitsOnly = value.replace(/\D/g, '');

                    // If more than 11 digits, truncate to 11
                    if (digitsOnly.length > 11) {
                      const truncatedDigits = digitsOnly.slice(0, 11);
                      const newValue = value.startsWith('+') ? '+' + truncatedDigits : truncatedDigits;
                      field.onChange(newValue);
                      return;
                    }

                    field.onChange(value);
                  }}
                  international
                  defaultCountry="US"
                  placeholder={t('phonePlaceholder')}
                  className="form-control"
                  style={{ border: "1px solid #ddd" }}
                  inputComponent={CustomPhoneInput}
                  smartCaret={false}
                />
              )}
            />
            {errors.phone && (
              <small className="text-danger d-block mt-1">
                {errors.phone.message}
              </small>
            )}
          </div>

          {/* <div className="form-group">
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
          </div> */}

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder={t('passwordPlaceholder')}
                  style={{ border: "1px solid #ddd" }}
                  {...register("password")}
                />
                {errors.password && (
                  <small className="text-danger d-block mt-1">
                    {errors.password.message}
                  </small>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder={t('confirmPasswordPlaceholder')}
                  style={{ border: "1px solid #ddd" }}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <small className="text-danger d-block mt-1">
                    {errors.confirmPassword.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          {registerMutation.isError && (
            <div className="alert alert-danger" role="alert">
              {registerMutation.error?.message || t('registerFailed')}
            </div>
          )}

          <div className="form-group mb-0">
            <button
              type="submit"
              className="theme-btn w-100"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? t('creatingAccount')
                : t('createAccount')}{" "}
              <i className="far fa-arrow-alt-right" />
            </button>
          </div>

          <div className="text-center mt-3">
            <p className="mb-0">
              {t('haveAccount')}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                  onSwitchToLogin();
                }}
                style={{ color: "#ff3d00" }}
              >
                {t('loginHere')}
              </a>
            </p>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
