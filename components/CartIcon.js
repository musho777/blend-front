"use client";
import { useCart } from "@/hooks/useCart";

const CartIcon = () => {
  const { itemCount, openCartModal } = useCart();

  return (
    <button
      className="cart-button"
      onClick={openCartModal}
      style={{ background: "transparent", border: "none", cursor: "pointer" }}
    >
      <i className="far fa-shopping-cart" style={{ fontSize: "20px", color: "#fff" }} />{" "}
      {itemCount > 0 && <span>{itemCount}</span>}
    </button>
  );
};

export default CartIcon;
