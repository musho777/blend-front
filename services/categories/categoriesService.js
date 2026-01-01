import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const categoriesService = {
  getCategories: async () => {
    return apiClient(ENDPOINTS.CATEGORIES.LIST);
  },
  getCategoryById: async (id) => {
    return apiClient(ENDPOINTS.CATEGORIES.ITEM(id));
  },
};
