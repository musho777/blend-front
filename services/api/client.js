const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

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

export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

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

      throw new Error(
        errorData.message || `API Error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("API Client Error:", error);
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
