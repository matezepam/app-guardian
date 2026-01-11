const API_URL = '/api';

export const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  get: async (endpoint) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        headers: getHeaders(),
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return { error: { message: "Session expired" } };
      }
      return await res.json();
    } catch (error) {
      console.error("API GET Error", error);
      return { error: { message: "Network Error" } };
    }
  },
  post: async (endpoint, data) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return { error: { message: "Session expired" } };
      }
      return await res.json();
    } catch (error) {
      console.error("API POST Error", error);
      return { error: { message: "Network Error" } };
    }
  },
};
