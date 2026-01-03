"use client";
import { memo } from "react";

const QuantityControl = ({ value, onChange, min = 1, max = 99 }) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value) || min;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="quantity-input">
      <button
        className="quantity-down"
        onClick={handleDecrease}
        disabled={value <= min}
        type="button"
      >
        -
      </button>
      <input
        className="quantity"
        type="text"
        value={value}
        onChange={handleChange}
        name="quantity"
        readOnly
      />
      <button
        className="quantity-up"
        onClick={handleIncrease}
        disabled={value >= max}
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default memo(QuantityControl);
