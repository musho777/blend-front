import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const menuService = {
  // Fetch all menu items
  getMenuItems: async () => {
    return apiClient(ENDPOINTS.MENU.LIST);
  },

  // Fetch menu items by category
  getMenuByCategory: async (category) => {
    return apiClient(ENDPOINTS.MENU.BY_CATEGORY(category));
  },

  // Fetch single menu item
  getMenuItem: async (id) => {
    return apiClient(ENDPOINTS.MENU.ITEM(id));
  },
};
