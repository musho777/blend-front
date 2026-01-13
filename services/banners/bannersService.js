import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const bannersService = {
  getBanners: async () => {
    return apiClient(`${ENDPOINTS.BANNERS.LIST}?activeOnly=true`);
  },
};
