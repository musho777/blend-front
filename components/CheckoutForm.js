"use client";
import { useState } from "react";
import { Accordion, Modal } from "react-bootstrap";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/mutations/useOrderMutation";

const CheckoutForm = () => {
  const { cart, subtotal, grandTotal, clearCart, closeCartModal } = useCart();
  const createOrder = useCreateOrder();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    phone: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowSuccessModal(false);

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
      <h5 className="mb-20">Checkout Information</h5>

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
                placeholder="First Name *"
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
                placeholder="Last Name *"
                value={formData.surname}
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
            placeholder="Address *"
            value={formData.address}
            onChange={handleChange}
            style={{ border: "1px solid #ddd" }}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9+\s\-()]+"
            style={{ border: "1px solid #ddd" }}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            style={{ border: "1px solid #ddd" }}
            required
          />
        </div>

        <div className="payment-method mb-30">
          <h6 className="mb-15">Select Payment Method</h6>
          <Accordion defaultActiveKey="cash_on_delivery">
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
                Cash on Delivery
              </Accordion.Toggle>
            </div>

            <div className="custom-control custom-radio mb-10">
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
                Credit/Debit Card
              </Accordion.Toggle>
            </div>

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
                Bank Transfer
              </Accordion.Toggle>
            </div>
          </Accordion>
        </div>

        <button
          type="submit"
          className="theme-btn w-100"
          disabled={createOrder.isLoading}
        >
          {createOrder.isLoading ? "Processing..." : "Place Order"}{" "}
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
          <h4 className="mb-2">Order Placed Successfully!</h4>
          <p className="text-muted">
            Thank you for your order. We'll prepare it right away!
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CheckoutForm;
