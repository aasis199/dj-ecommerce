// constants.js
const localhost = "http://127.0.0.1:8000";
const productionHost = "https://your-production-url.com";

// Automatically use localhost for development, production URL for production
const baseURL = process.env.NODE_ENV === "development" ? localhost : productionHost;

const apiURL = "/api";
export const endpoint = `${baseURL}${apiURL}`;

// Product-related URLs
export const productListURL = `${endpoint}/products/`;
export const productDetailURL = (id) => `${endpoint}/products/${id}/`;

// Cart-related URLs
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const checkoutURL = `${endpoint}/checkout/`;

// Coupon URLs
export const addCouponURL = `${endpoint}/add-coupon/`;

// Miscellaneous URLs
export const countryListURL = `${endpoint}/countries/`;
export const userIDURL = `${endpoint}/user-id/`;

// Address-related URLs
export const addressListURL = (addressType) => `${endpoint}/addresses/?address_type=${addressType}`;
export const addressCreateURL = `${endpoint}/addresses/create/`;
export const addressUpdateURL = (id) => `${endpoint}/addresses/${id}/update/`;
export const addressDeleteURL = (id) => `${endpoint}/addresses/${id}/delete/`;

// Order item URLs
export const orderItemDeleteURL = (id) => `${endpoint}/order-items/${id}/delete/`;
export const orderItemUpdateQuantityURL = `${endpoint}/order-item/update-quantity/`;

// Payment-related URLs
export const paymentListURL = `${endpoint}/payments/`;
