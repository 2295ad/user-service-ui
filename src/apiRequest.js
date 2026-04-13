
const BASE_URL = "http://localhost:8080";

export const apiRequest = async (endpoint, method = "GET", data = null, headers = {}) => {
  try {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key":"D5F-9J2-LX7",
        ...headers,
      }
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};