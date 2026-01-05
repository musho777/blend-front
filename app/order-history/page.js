"use client";
import WellFoodLayout from "@/layout/WellFoodLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageBanner from "@/components/PageBanner";
import { useAuth } from "@/hooks/useAuth";

const OrderHistoryPage = () => {
  const { user } = useAuth();

  // This is a placeholder - you'll need to create a hook to fetch user orders
  const orders = [];

  return (
    <WellFoodLayout>
      <ProtectedRoute>
        <PageBanner pageName="Order History" />
        <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="mb-4">My Orders</h2>

                {orders.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="far fa-shopping-bag" style={{ fontSize: "64px", color: "#ccc" }} />
                    <h4 className="mt-4">No orders yet</h4>
                    <p className="text-muted">Start ordering to see your order history here!</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.items}</td>
                            <td>${order.total}</td>
                            <td>{order.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </ProtectedRoute>
    </WellFoodLayout>
  );
};

export default OrderHistoryPage;
