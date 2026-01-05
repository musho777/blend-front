import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const productsService = {
  getProductsByCategory: async (categoryId, page = 1, limit = 10, subcategoryId = null, search = null, sortBy = null) => {
    return apiClient(ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId, page, limit, subcategoryId, search, sortBy));
  },

  getProducts: async () => {
    return apiClient(ENDPOINTS.PRODUCTS.LIST);
  },

  getProductById: async (id) => {
    return apiClient(ENDPOINTS.PRODUCTS.ITEM(id));
  },

  searchProducts: async (query) => {
    return apiClient(`${ENDPOINTS.PRODUCTS.SEARCH}?q=${query}`);
  },

  getBestSellers: async () => {
    return apiClient(ENDPOINTS.PRODUCTS.BEST_SELLERS);
  },
};
