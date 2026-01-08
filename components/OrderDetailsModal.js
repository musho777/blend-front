"use client";
import { Modal } from "react-bootstrap";

const OrderDetailsModal = ({ show, onHide, order }) => {
  if (!order) return null;

  const orderDate = new Date(order.createdAt);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'success';
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Order Details - #{order.id}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Order Status */}
        <div className="mb-4 p-3 bg-light rounded">
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-muted mb-2">Order Status</h6>
              <span className={`badge bg-${getStatusColor(order.status)} fs-6`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="col-md-6">
              <h6 className="text-muted mb-2">Order Date</h6>
              <p className="mb-0">{formattedDate}</p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mb-4">
          <h5 className="mb-3">Customer Information</h5>
          <div className="row">
            <div className="col-md-6">
              <p className="mb-2">
                <strong>Name:</strong> {order.customerName} {order.customerSurname}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {order.customerEmail}
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-2">
                <strong>Phone:</strong> {order.customerPhone}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {order.customerAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <h5 className="mb-3">Payment Information</h5>
          <p className="mb-0">
            <strong>Payment Method:</strong>{" "}
            <span className="badge bg-primary">
              {order.paymentMethod === 'cash_on_delivery'
                ? 'Cash on Delivery'
                : order.paymentMethod.split('_').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')
              }
            </span>
          </p>
        </div>

        {/* Order Items */}
        <div className="mb-4">
          <h5 className="mb-3">Order Items</h5>
          <div className="order-items-list">
            {order.items.map((item, index) => (
              <div
                key={item.id}
                className="order-item-card p-3 mb-3 border rounded"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className="row align-items-center">
                  <div className="col-12 col-md-5 mb-2 mb-md-0">
                    <h6 className="mb-1 fw-bold">{item.name}</h6>
                    <small className="text-muted">Product ID: {item.productId.slice(0, 8)}...</small>
                  </div>
                  <div className="col-4 col-md-2 text-center">
                    <small className="text-muted d-block">Quantity</small>
                    <span className="badge bg-secondary">{item.quantity}x</span>
                  </div>
                  <div className="col-4 col-md-2 text-center">
                    <small className="text-muted d-block">Price</small>
                    <strong>{Number(item.price).toLocaleString()}</strong>
                  </div>
                  <div className="col-4 col-md-3 text-center text-md-end">
                    <small className="text-muted d-block">Subtotal</small>
                    <strong className="text-primary">
                      {Number(item.subtotal).toLocaleString()} AMD
                    </strong>
                  </div>
                </div>
              </div>
            ))}

            {/* Total Section */}
            <div className="border-top pt-3 mt-3">
              <div className="row">
                <div className="col-6 col-md-8 text-end">
                  <h5 className="mb-0">Total:</h5>
                </div>
                <div className="col-6 col-md-4 text-end">
                  <h4 className="mb-0 text-primary fw-bold">
                    {Number(order.totalPrice).toLocaleString()} AMD
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;
