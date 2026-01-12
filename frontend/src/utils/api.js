const API_URL = '/api';

export const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  return headers;
};

const handleFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return { error: { message: "Session expired" } };
    }
    return await res.json();
  } catch (err) {
    return { error: { message: "Network Error" } };
  }
};

export const api = {
  get: async (endpoint) => handleFetch(`${API_URL}${endpoint}`, { headers: getHeaders() }),
  post: async (endpoint, data, isFormData = false) => handleFetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(isFormData),
    body: isFormData ? data : JSON.stringify(data),
  }),
  put: async (endpoint, data, isFormData = false) => handleFetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(isFormData),
    body: isFormData ? data : JSON.stringify(data),
  }),
  delete: async (endpoint) => handleFetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }),
};
