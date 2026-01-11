"use client";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from 'next-intl';
import { useLogin } from "@/hooks/mutations/useAuthMutations";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

const LoginModal = ({ show, onHide, onSwitchToRegister }) => {
  const t = useTranslations('auth');

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('validEmail'))
      .required(t('emailRequired')),
    password: yup
      .string()
      .min(6, t('passwordMin'))
      .required(t('passwordRequired')),
  });
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
          <h4 className="mb-0">{t('loginTitle')}</h4>
        </Modal.Header>

        <Modal.Body className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder={t('emailPlaceholder')}
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
                placeholder={t('passwordPlaceholder')}
                style={{ border: "1px solid #ddd" }}
                {...register("password")}
              />
              {errors.password && (
                <small className="text-danger d-block mt-1">{errors.password.message}</small>
              )}
            </div>

            {loginMutation.isError && (
              <div className="alert alert-danger" role="alert">
                {loginMutation.error?.message || t('loginFailed')}
              </div>
            )}

            <div className="form-group mb-0">
              <button
                type="submit"
                className="theme-btn w-100"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? t('loggingIn') : t('login')} <i className="far fa-arrow-alt-right" />
              </button>
            </div>

            <div className="text-center mt-3">
              <p className="mb-0">
                {t('noAccount')}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                    onSwitchToRegister();
                  }}
                  style={{ color: "#ff3d00" }}
                >
                  {t('registerHere')}
                </a>
              </p>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <SuccessModal
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
        title={t('loginSuccess')}
        message={t('loginSuccessMessage')}
      />
    </>
  );
};

export default LoginModal;
