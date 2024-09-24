const BASE_URL = import.meta.env.VITE_BASE_URL;

// Auth Endpoints
export const AUTH_URL = `${BASE_URL}/auth/login`;
export const GET_USER_URL = `${BASE_URL}/auth/all`;
export const GET_USER_BY_ID_URL = (id) => `${BASE_URL}/auth/${id}`;

// Vendor Endpoints
export const VENDOR_URL = `${BASE_URL}/vendor/login `;
export const GET_VENDOR_URL = `${BASE_URL}/vendor`;
export const GET_VENDOR_BY_ID_URL = (id) => `${BASE_URL}/vendor/${id}`;

