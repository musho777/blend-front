import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const authService = {
  /**
   * Login user with email and password
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} User data and token
   */
  login: async (credentials) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return response;
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User first name
   * @param {string} userData.surname - User last name
   * @param {string} userData.email - User email
   * @param {string} userData.phoneNumber - User phone number
   * @param {string} userData.password - User password
   * @param {string} [userData.address] - User address (optional)
   * @returns {Promise<Object>} Registration response
   */
  register: async (userData) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
    return response;
  },

  /**
   * Verify OTP code
   * @param {Object} data - OTP verification data
   * @param {string} data.email - User email
   * @param {string} data.otp - OTP code
   * @returns {Promise<Object>} User data and token
   */
  verifyOTP: async (data) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.VERIFY_OTP, data);
    return response;
  },

  /**
   * Resend OTP code
   * @param {Object} data - Resend OTP data
   * @param {string} data.email - User email
   * @returns {Promise<Object>} Success message
   */
  resendOTP: async (data) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.RESEND_OTP, data);
    return response;
  },

  /**
   * Logout user
   * @returns {Promise<Object>} Logout response
   */
  logout: async () => {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    return response;
  },

  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile data
   */
  me: async () => {
    const response = await apiClient.get(ENDPOINTS.AUTH.ME);
    return response;
  },
};
