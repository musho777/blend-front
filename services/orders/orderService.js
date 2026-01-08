import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const orderService = {
  // Create a new order
  createOrder: async (orderData) => {
    return apiClient(ENDPOINTS.ORDERS.CREATE, {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  // Fetch all orders (admin)
  getOrders: async () => {
    return apiClient(ENDPOINTS.ORDERS.LIST);
  },

  // Fetch user's own orders
  getMyOrders: async () => {
    return apiClient(ENDPOINTS.ORDERS.MY_ORDERS);
  },

  // Fetch single order
  getOrder: async (id) => {
    return apiClient(ENDPOINTS.ORDERS.ITEM(id));
  },
};
