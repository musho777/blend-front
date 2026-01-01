import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    return apiClient(ENDPOINTS.BOOKING.CREATE, {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
  },

  // Fetch all bookings
  getBookings: async () => {
    return apiClient(ENDPOINTS.BOOKING.LIST);
  },

  // Fetch single booking
  getBooking: async (id) => {
    return apiClient(ENDPOINTS.BOOKING.ITEM(id));
  },
};
