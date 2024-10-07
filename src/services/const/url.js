const BASE_URL = import.meta.env.VITE_BASE_URL;

// Auth Endpoints
export const AUTH_URL = `${BASE_URL}/auth/login`;
export const GET_USER_URL = `${BASE_URL}/auth/all`;
export const GET_USER_BY_ID_URL = (id) => `${BASE_URL}/auth/${id}`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;

// Vendor Endpoints
export const VENDOR_URL = `${BASE_URL}/vendor/login `;
export const VENDOR_REGISTER_URL = `${BASE_URL}/vendor/register`;
export const GET_VENDOR_URL = `${BASE_URL}/vendor`;
export const GET_VENDOR_BY_ID_URL = (id) => `${BASE_URL}/vendor/${id}`;
export const VENDOR_CUSTOM_URL = (id, action) => `${BASE_URL}/vendor/${action}/${id}`;

// Customer Endpoints
export const CUSTOMER_URL_LOGIN = `${BASE_URL}/customer/login`;
export const CUSTOMER_REGISTER_URL = `${BASE_URL}/customer/register`;
export const GET_CUSTOMER_URL = `${BASE_URL}/customer`;
export const GET_CUSTOMER_BY_ID_URL = (id) => `${BASE_URL}/customer/${id}`;
export const CUSTOMER_CUSTOM_URL = (id, action) => `${BASE_URL}/customer/${action}/${id}`;

// Product Endpoints
export const PRODUCT_URL = `${BASE_URL}/product`;
export const PRODUCT_BY_ID = (id) => `${BASE_URL}/product/${id}`;
export const GET_PRODUCT_BY_VENDORID = (id) => `${BASE_URL}/product/vendor/${id}`;

// Category Endpoints
export const CATEGORY_URL = `${BASE_URL}/category`;
export const CATEGORY_BY_ID_URL = (id) => `${BASE_URL}/category/${id}`;

//Customer Endpoints
export const CUSTOMER_URL = `${BASE_URL}/customer`;
export const CUSTOMER_BY_ID_URL = (id) => `${BASE_URL}/customer/${id}`;

// Order Endpoints
export const ORDER_URL = `${BASE_URL}/order`;
export const ORDER_BY_ID = (id) => `${BASE_URL}/order/${id}`;
export const ORDER_BY_VENDOR_ID = (id) => `${BASE_URL}/order/vendor/${id}`;
export const ORDER_UPDATE_VENDOR_STATUS = (orderId, vendorId, status) => `${BASE_URL}/order/${orderId}/vendor/${vendorId}/${status}`;

// Notification Endpoints
export const NOTIFICATION_URL = `${BASE_URL}/notification`;
export const NOTIFICATION_BY_ID = (id) => `${BASE_URL}/notification/${id}`;
export const NOTIFICATION_VENDOR_ID = (id) => `${BASE_URL}/notification/vendor/${id}`;
