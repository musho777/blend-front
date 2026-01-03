"use client";
import { Modal } from "react-bootstrap";
import { useCart } from "@/hooks/useCart";
import QuantityControl from "./QuantityControl";
import CheckoutForm from "./CheckoutForm";

const CartModal = () => {
  const {
    cart,
    isModalOpen,
    closeCartModal,
    removeFromCart,
    updateQuantity,
    subtotal,
    grandTotal,
  } = useCart();

  return (
    <Modal show={isModalOpen} onHide={closeCartModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {cart.items.length === 0 ? (
          <div className="empty-cart text-center py-5">
            <i
              className="far fa-shopping-cart"
              style={{ fontSize: "64px", color: "#ccc", marginBottom: "20px" }}
            />
            <h4>Your cart is empty</h4>
            <p>Add some delicious items to get started!</p>
          </div>
        ) : (
          <>
            <div className="cart-items-list mb-4">
              {cart.items.map((item) => (
                <div
                  key={item.productId}
                  className="cart-item d-flex align-items-center mb-3 pb-3"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <div className="cart-item-image me-3">
                    <img
                      src={
                        item.imageUrl
                          ? `http://localhost:3000/${item.imageUrl}`
                          : "/assets/images/products/product-details.jpg"
                      }
                      alt={item.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  <div className="cart-item-details flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="mb-2" style={{ color: "#666" }}>
                      ${item.price.toFixed(2)}
                    </p>
                    <QuantityControl
                      value={item.quantity}
                      onChange={(newQuantity) =>
                        updateQuantity(item.productId, newQuantity)
                      }
                    />
                  </div>

                  <div className="cart-item-total text-end">
                    <div className="item-total mb-2">
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.productId)}
                      style={{ fontSize: "12px", padding: "4px 8px" }}
                    >
                      <i className="far fa-trash-alt" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary mb-4 p-3" style={{ background: "#f8f9fa", borderRadius: "4px" }}>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <div
                className="d-flex justify-content-between pt-2"
                style={{ borderTop: "2px solid #dee2e6", fontSize: "18px" }}
              >
                <span>
                  <strong>Grand Total:</strong>
                </span>
                <strong style={{ color: "#ff6b6b" }}>
                  ${grandTotal.toFixed(2)}
                </strong>
              </div>
            </div>

            <CheckoutForm />
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
