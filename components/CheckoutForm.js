"use client";
import { useState, useEffect, forwardRef } from "react";
import { Accordion, Modal } from "react-bootstrap";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/mutations/useOrderMutation";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
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

const CheckoutForm = () => {
  const t = useTranslations("checkout");
  const { cart, subtotal, grandTotal, clearCart, closeCartModal } = useCart();
  const createOrder = useCreateOrder();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    phone: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auto-fill form fields when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        name: user.firstName || "",
        surname: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    if (!value) {
      setFormData((prev) => ({ ...prev, phone: "" }));
      setPhoneError("");
      return;
    }

    // Extract only digits and limit to 11
    const digitsOnly = value.replace(/\D/g, '');

    // If more than 11 digits, truncate to 11
    if (digitsOnly.length > 11) {
      const truncatedDigits = digitsOnly.slice(0, 11);
      // Reconstruct the phone number with country code
      const newValue = value.startsWith('+') ? '+' + truncatedDigits : truncatedDigits;
      setFormData((prev) => ({ ...prev, phone: newValue }));
      setPhoneError("");
      return;
    }

    setFormData((prev) => ({ ...prev, phone: value }));

    // Validate phone number length
    if (digitsOnly.length !== 11) {
      setPhoneError(t("phoneLength") || "Phone number must be exactly 11 digits");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowSuccessModal(false);

    // Validate phone number before submission
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 11) {
      setPhoneError(t("phoneLength") || "Phone number must be exactly 11 digits");
      return;
    }

    try {
      const orderData = {
        customer: formData,
        items: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
        paymentMethod,
      };

      await createOrder.mutateAsync(orderData);
      setShowSuccessModal(true);

      // Clear cart and close modal after short delay
      setTimeout(() => {
        setShowSuccessModal(false);
        clearCart();
        closeCartModal();
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-form-wrapper">
      <h5 className="mb-20">{t("title")}</h5>

      {error && <div className="alert alert-danger mb-20">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder={t("firstNamePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                style={{ border: "1px solid #ddd" }}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                id="surname"
                name="surname"
                className="form-control"
                placeholder={t("lastNamePlaceholder")}
                value={formData.surname}
                onChange={handleChange}
                style={{ border: "1px solid #ddd" }}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <PhoneInput
                international
                defaultCountry="US"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder={t("phonePlaceholder")}
                className="form-control"
                style={{ border: phoneError ? "1px solid #dc3545" : "1px solid #ddd" }}
                inputComponent={CustomPhoneInput}
                smartCaret={false}
                required
              />
              {phoneError && (
                <small className="text-danger d-block mt-1">
                  {phoneError}
                </small>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder={t("emailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
                style={{ border: "1px solid #ddd" }}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            placeholder={t("addressPlaceholder")}
            value={formData.address}
            onChange={handleChange}
            style={{ border: "1px solid #ddd" }}
            required
          />
        </div>

        <div className="payment-method mb-30">
          <h6 className="mb-15">{t("selectPaymentMethod")}</h6>
          <div className="payment-options">
            <div
              className="custom-control custom-radio mb-10"
              style={{ gap: "10px" }}
            >
              <input
                type="radio"
                className="custom-control-input"
                id="cash_on_delivery"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={paymentMethod === "cash_on_delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: 10 }}
              />
              <Accordion.Toggle
                as="label"
                className="custom-control-label"
                htmlFor="cash_on_delivery"
                eventKey="cash_on_delivery"
              >
                {t("cashOnDelivery")}
              </Accordion.Toggle>
            </div>

            {/* <div className="custom-control custom-radio mb-10">
              <input
                type="radio"
                className="custom-control-input"
                id="credit_card"
                name="paymentMethod"
                value="credit_card"
                checked={paymentMethod === "credit_card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: 10 }}
              />
              <Accordion.Toggle
                as="label"
                className="custom-control-label"
                htmlFor="credit_card"
                eventKey="credit_card"
              >
                {t("creditCard")}
              </Accordion.Toggle>
            </div> */}

            <div className="custom-control custom-radio mb-10">
              <input
                type="radio"
                className="custom-control-input"
                id="bank_transfer"
                name="paymentMethod"
                value="bank_transfer"
                checked={paymentMethod === "bank_transfer"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: 10 }}
              />
              <Accordion.Toggle
                as="label"
                className="custom-control-label"
                htmlFor="bank_transfer"
                eventKey="bank_transfer"
              >
                {t("bankTransfer")}
              </Accordion.Toggle>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="theme-btn w-100"
          disabled={createOrder.isLoading}
        >
          {createOrder.isLoading ? t("processing") : t("placeOrder")}{" "}
          <i className="far fa-arrow-alt-right" />
        </button>
      </form>

      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Body className="text-center py-4">
          <div
            className="success-icon mb-3"
            style={{ fontSize: "64px", color: "#28a745" }}
          >
            <i className="far fa-check-circle" />
          </div>
          <h4 className="mb-2">{t("orderSuccess")}</h4>
          <p className="text-muted">{t("orderSuccessMessage")}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CheckoutForm;
