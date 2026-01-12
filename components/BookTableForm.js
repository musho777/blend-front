"use client";
import { useState, forwardRef } from "react";
import { Modal } from "react-bootstrap";
import { useCreateBooking } from "@/hooks";
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

const BookTableForm = () => {
  const [formData, setFormData] = useState({
    person: "2",
    date: "",
    time: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const createBooking = useCreateBooking();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccessModal(false);

    try {
      await createBooking.mutateAsync(formData);
      setShowSuccessModal(true);
      // Reset form
      setFormData({ person: "2", date: "", time: "" });

      // Auto-close modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      // Error is logged in the mutation hook
    }
  };

  return (
    <div
      className="booking-table-form mb-0"
      style={{
        backgroundImage: "url(assets/images/background/form-bg.png)",
      }}
    >
      <div className="section-title">
        <h2>book a table</h2>
      </div>
      <p>Enjoy your food to book your table</p>
      {createBooking.isError && (
        <div className="alert alert-danger" role="alert">
          {createBooking.error?.message || "Booking failed. Please try again."}
        </div>
      )}
      <form
        id="booking-form"
        className="booking-form mt-25"
        name="booking-form"
        onSubmit={handleSubmit}
      >
        <div className="row gap-20">
          <div className="col-md-12 mb-20">
            <div className="form-group">
              <select
                name="person"
                id="person"
                value={formData.person}
                onChange={handleChange}
              >
                <option value="2">2 Person</option>
                <option value="3">3 Person</option>
                <option value="4">4 Person</option>
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="date">
                <i className="far fa-calendar-alt" />
              </label>
              <input
                type="text"
                id="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                placeholder="Date"
                required
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="time">
                <i className="far fa-clock" />
              </label>
              <input
                type="text"
                id="time"
                name="time"
                className="form-control"
                value={formData.time}
                onChange={handleChange}
                placeholder="Time"
                required
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-0">
              <button
                type="submit"
                className="theme-btn"
                disabled={createBooking.isLoading}
              >
                {createBooking.isLoading ? "Booking..." : "book your table"}{" "}
                <i className="far fa-arrow-alt-right" />
              </button>
            </div>
          </div>
        </div>
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
          <h4 className="mb-2">Booking Confirmed!</h4>
          <p className="text-muted">
            We look forward to seeing you. Your table is reserved!
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default BookTableForm;

export const BookTableForm2 = () => {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (value) => {
    if (!value) {
      setPhone("");
      setPhoneError("");
      return;
    }

    // Extract only digits and limit to 11
    const digitsOnly = value.replace(/\D/g, '');

    // If more than 11 digits, truncate to 11
    if (digitsOnly.length > 11) {
      const truncatedDigits = digitsOnly.slice(0, 11);
      const newValue = value.startsWith('+') ? '+' + truncatedDigits : truncatedDigits;
      setPhone(newValue);
      setPhoneError("");
      return;
    }

    setPhone(value);

    // Validate phone number length
    if (digitsOnly.length !== 11) {
      setPhoneError("Phone number must be exactly 11 digits");
    } else {
      setPhoneError("");
    }
  };

  return (
    <div
      className="booking-table-form rmt-50"
      style={{
        backgroundImage: "url(assets/images/background/form-bg.png)",
      }}
    >
      <div className="section-title">
        <h2>book a table</h2>
      </div>
      <p>Enjoy your food to book your table</p>
      <form
        id="booking-form"
        className="booking-form mt-25"
        name="booking-form"
        method="post"
      >
        <div className="row gap-20">
          <div className="col-md-6 mb-20">
            <div className="form-group">
              <select name="person" id="person">
                <option value="option1">Person</option>
                <option value="option2">Person 2</option>
                <option value="option3">Person 3</option>
                <option value="option4">Person 4</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="date">
                <i className="far fa-calendar-alt" />
              </label>
              <input
                type="text"
                id="date"
                name="date"
                className="form-control"
                defaultValue=""
                placeholder="Date"
                required=""
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="time">
                <i className="far fa-clock" />
              </label>
              <input
                type="text"
                id="time"
                name="time"
                className="form-control"
                defaultValue=""
                placeholder="Time"
                required=""
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="number" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <i className="far fa-phone" />
              </label>
              <PhoneInput
                international
                defaultCountry="US"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Phone"
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
          <div className="col-md-12">
            <div className="form-group mb-0">
              <button type="submit" className="theme-btn">
                book your table <i className="far fa-arrow-alt-right" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
