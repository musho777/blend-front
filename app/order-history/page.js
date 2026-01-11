"use client";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import WellFoodLayout from "@/layout/WellFoodLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageBanner from "@/components/PageBanner";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { useMyOrders } from "@/hooks/queries/useOrdersQuery";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import Link from "next/link";

const OrderHistoryPage = () => {
  const t = useTranslations('orders');
  const { user } = useAuth();
  const { data: orders, isLoading, isError, error } = useMyOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && (
        <WellFoodLayout>
          <ProtectedRoute>
            <PageBanner pageName={t('pageTitle')} />
            <section className="py-5 mb-4 mb-4">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h2 className="mb-4 mt-4">{t('myOrders')}</h2>

                    {isError ? (
                      <div className="alert alert-danger" role="alert">
                        <i className="far fa-exclamation-circle me-2" />
                        {error?.message || t('loadError')}
                      </div>
                    ) : !orders || orders.length === 0 ? (
                      <div className="text-center py-5">
                        <i
                          className="far fa-shopping-bag"
                          style={{ fontSize: "64px", color: "#ccc" }}
                        />
                        <h4 className="mt-4">{t('noOrders')}</h4>
                        <p className="text-muted">
                          {t('startOrdering')}
                        </p>
                        <Link href="/" className="theme-btn mt-3">
                          {t('browseProducts')}{" "}
                          <i className="far fa-arrow-right ms-2" />
                        </Link>
                      </div>
                    ) : (
                      <div className="orders-list">
                        {orders.map((order) => {
                          const orderDate = new Date(order.createdAt);
                          const formattedDate = orderDate.toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          );

                          const itemCount = order.items?.length || 0;
                          const totalPrice = order.totalPrice || 0;

                          return (
                            <div
                              key={order.id}
                              className="order-card p-4 mb-3 border rounded shadow-sm"
                              style={{ backgroundColor: "#fff" }}
                            >
                              <div className="row align-items-center">
                                {/* Order ID and Status */}
                                <div className="col-12 col-md-3 mb-3 mb-md-0">
                                  <div className="d-flex align-items-center justify-content-between justify-content-md-start">
                                    <div>
                                      <small className="text-muted d-block">
                                        {t('orderId')}
                                      </small>
                                      <h5 className="mb-0 fw-bold">
                                        #{order.id}
                                      </h5>
                                    </div>
                                    {console.log(order.status)}
                                    <span
                                      className={`badge ms-2 ms-md-0 ${
                                        order.status === "completed" ||
                                        order.status === "success"
                                          ? "bg-success"
                                          : order.status === "pending"
                                          ? "bg-warning text-dark"
                                          : order.status === "processing"
                                          ? "bg-info"
                                          : order.status === "rejected"
                                          ? "bg-danger"
                                          : "bg-secondary"
                                      }`}
                                    >
                                      {order.status.charAt(0).toUpperCase() +
                                        order.status.slice(1)}
                                    </span>
                                  </div>
                                </div>

                                {/* Date */}
                                <div className="col-6 col-md-3 mb-2 mb-md-0">
                                  <small className="text-muted d-block">
                                    {t('date')}
                                  </small>
                                  <span className="d-block">
                                    {formattedDate}
                                  </span>
                                </div>

                                {/* Items Count */}
                                <div className="col-6 col-md-2 mb-2 mb-md-0 text-md-center">
                                  <small className="text-muted d-block">
                                    {t('items')}
                                  </small>
                                  <span className="d-block fw-bold">
                                    {itemCount} {itemCount !== 1 ? t('itemsPlural') : t('itemSingular')}
                                  </span>
                                </div>

                                {/* Total */}
                                <div className="col-6 col-md-2 mb-2 mb-md-0 text-md-center">
                                  <small className="text-muted d-block">
                                    {t('total')}
                                  </small>
                                  <span className="d-block fw-bold text-primary">
                                    {Number(totalPrice).toLocaleString()} AMD
                                  </span>
                                </div>

                                {/* Actions */}
                                <div className="col-6 col-md-2 text-md-end">
                                  <button
                                    className="btn btn-sm btn-primary w-100"
                                    onClick={() => handleViewDetails(order)}
                                  >
                                    <i className="far fa-eye me-1" />
                                    {t('viewDetails')}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ height: 80 }}></div>
            </section>

            {/* Order Details Modal */}
            <OrderDetailsModal
              show={showModal}
              onHide={handleCloseModal}
              order={selectedOrder}
            />
          </ProtectedRoute>
        </WellFoodLayout>
      )}
    </>
  );
};

export default OrderHistoryPage;
