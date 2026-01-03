"use client";
import { useCart } from "@/hooks/useCart";

const CartIcon = () => {
  const { itemCount, openCartModal } = useCart();

  return (
    <button
      className="cart-button"
      onClick={openCartModal}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <i
        className="far fa-shopping-cart"
        style={{ fontSize: "20px", color: "#fff" }}
      />{" "}
      {itemCount > 0 && (
        <span
          style={{
            fontSize: "12px",
            color: "white",
          }}
        >
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
