import { logMobileError, checkNetworkStatus } from "@/utils/errorHandler";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// Timeout for API requests (especially important for mobile with slow connections)
const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Get the auth token from localStorage
 * @returns {string|null} JWT token or null
 */
function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

/**
 * Create a fetch request with timeout
 */
function fetchWithTimeout(url, options, timeout = REQUEST_TIMEOUT) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout - slow connection')), timeout)
    ),
  ]);
}

export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  const startTime = Date.now();

  // Check network status before making request
  const networkStatus = checkNetworkStatus();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    // Use fetch with timeout
    const response = await fetchWithTimeout(url, config);
    const duration = Date.now() - startTime;

    // Log slow requests (might indicate mobile/network issues)
    if (duration > 5000) {
      console.warn(`⚠️ Slow API Request: ${endpoint} took ${duration}ms`, {
        network: networkStatus,
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        // Clear auth data from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }

      // Log mobile-specific error details
      logMobileError(errorData.message || response.statusText, {
        endpoint,
        status: response.status,
        duration,
        network: networkStatus,
      });

      throw new Error(
        errorData.message || `API Error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    const duration = Date.now() - startTime;

    // Enhanced error logging for debugging
    const errorDetails = {
      endpoint,
      duration,
      network: networkStatus,
      errorType: error.name,
      errorMessage: error.message,
    };

    console.error("API Client Error:", errorDetails);

    // Log mobile-specific details
    logMobileError(error, errorDetails);

    // Provide better error messages
    if (!networkStatus.online) {
      throw new Error('No internet connection. Please check your network and try again.');
    }

    if (error.message === 'Request timeout - slow connection') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }

    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }

    throw error;
  }
}

// Convenience methods
apiClient.get = (endpoint, options = {}) => {
  return apiClient(endpoint, { ...options, method: "GET" });
};

apiClient.post = (endpoint, data, options = {}) => {
  return apiClient(endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
};

apiClient.put = (endpoint, data, options = {}) => {
  return apiClient(endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
};

apiClient.delete = (endpoint, options = {}) => {
  return apiClient(endpoint, { ...options, method: "DELETE" });
};
