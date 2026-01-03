export const queryKeys = {
  // Categories query keys
  categories: {
    all: ["categories"],
    lists: () => [...queryKeys.categories.all, "list"],
    detail: (id) => [...queryKeys.categories.all, "detail", id],
  },

  // Subcategories query keys
  subcategories: {
    all: ["subcategories"],
    lists: () => [...queryKeys.subcategories.all, "list"],
    byCategory: (categoryId) => [...queryKeys.subcategories.all, "category", categoryId],
  },

  // Menu query keys
  menu: {
    all: ["menu"],
    lists: () => [...queryKeys.menu.all, "list"],
    list: (filters) => [...queryKeys.menu.lists(), filters],
    category: (category) => [...queryKeys.menu.all, "category", category],
    detail: (id) => [...queryKeys.menu.all, "detail", id],
  },

  // Product query keys
  products: {
    all: ["products"],
    lists: () => [...queryKeys.products.all, "list"],
    list: (filters) => [...queryKeys.products.lists(), filters],
    detail: (id) => [...queryKeys.products.all, "detail", id],
    search: (query) => [...queryKeys.products.all, "search", query],
    byCategory: (categoryId, page, limit, subcategoryId = null) => [
      ...queryKeys.products.all,
      "category",
      categoryId,
      { page, limit, subcategoryId },
    ],
    bestSellers: () => [...queryKeys.products.all, "best-sellers"],
  },

  // Booking query keys
  bookings: {
    all: ["bookings"],
    lists: () => [...queryKeys.bookings.all, "list"],
    list: (filters) => [...queryKeys.bookings.lists(), filters],
    detail: (id) => [...queryKeys.bookings.all, "detail", id],
  },

  // Blog query keys
  blog: {
    all: ["blog"],
    lists: () => [...queryKeys.blog.all, "list"],
    list: (filters) => [...queryKeys.blog.lists(), filters],
    detail: (id) => [...queryKeys.blog.all, "detail", id],
  },

  // Gallery query keys
  gallery: {
    all: ["gallery"],
    lists: () => [...queryKeys.gallery.all, "list"],
    list: (filters) => [...queryKeys.gallery.lists(), filters],
    category: (category) => [...queryKeys.gallery.all, "category", category],
  },

  // Banner query keys
  banners: {
    all: ["banners"],
    lists: () => [...queryKeys.banners.all, "list"],
  },

  // Order query keys
  orders: {
    all: ["orders"],
    lists: () => [...queryKeys.orders.all, "list"],
    list: (filters) => [...queryKeys.orders.lists(), filters],
    detail: (id) => [...queryKeys.orders.all, "detail", id],
  },
};
