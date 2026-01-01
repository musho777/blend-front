import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const subcategoriesService = {
  getSubcategories: async () => {
    return apiClient(ENDPOINTS.SUBCATEGORIES.LIST);
  },
  getSubcategoriesByCategory: async (categoryId) => {
    return apiClient(ENDPOINTS.SUBCATEGORIES.BY_CATEGORY(categoryId));
  },
};
