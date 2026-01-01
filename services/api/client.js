const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
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
