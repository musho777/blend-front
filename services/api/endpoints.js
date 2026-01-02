export const ENDPOINTS = {
  // Categories endpoints
  CATEGORIES: {
    LIST: "/categories",
    ITEM: (id) => `/categories/${id}`,
  },

  // Subcategories endpoints
  SUBCATEGORIES: {
    LIST: "/subcategories",
    BY_CATEGORY: (categoryId) => `/subcategories?categoryId=${categoryId}`,
  },

  // Menu endpoints
  MENU: {
    LIST: "/menu",
    BY_CATEGORY: (category) => `/menu/category/${category}`,
    ITEM: (id) => `/menu/${id}`,
  },

  // Booking endpoints
  BOOKING: {
    CREATE: "/bookings",
    LIST: "/bookings",
    ITEM: (id) => `/bookings/${id}`,
  },

  // Product endpoints
  PRODUCTS: {
    LIST: "/products",
    ITEM: (id) => `/products/${id}`,
    SEARCH: "/products/search",
    BY_CATEGORY: (categoryId, page = 1, limit = 10, subcategoryId = null) => {
      let url = `/categories/${categoryId}/products?page=${page}&limit=${limit}`;
      if (subcategoryId) {
        url += `&subcategoryId=${subcategoryId}`;
      }
      return url;
    },
    BEST_SELLERS: "/home/best-seller",
  },

  // Blog endpoints
  BLOG: {
    LIST: "/blog",
    POST: (id) => `/blog/${id}`,
  },

  // Contact endpoints
  CONTACT: {
    SUBMIT: "/contact",
  },

  // Gallery endpoints
  GALLERY: {
    LIST: "/gallery",
    BY_CATEGORY: (category) => `/gallery/category/${category}`,
  },
};
