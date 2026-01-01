export const ENDPOINTS = {
  // Categories endpoints
  CATEGORIES: {
    LIST: "/categories",
    ITEM: (id) => `/categories/${id}`,
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
    BY_CATEGORY: (categoryId, page = 1, limit = 10) =>
      `/categories/${categoryId}/products?page=${page}&limit=${limit}`,
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
