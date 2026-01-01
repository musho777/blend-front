export const ENDPOINTS = {
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
