import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const offersService = {
  getOffers: async () => {
    return apiClient(ENDPOINTS.OFFERS.LIST);
  },
};
