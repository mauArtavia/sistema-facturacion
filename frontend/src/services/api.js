/**
 * ============================================
 * API Service - Frontend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Centralized API configuration using Axios.
 * This module creates a reusable HTTP client for all backend requests.
 *
 * Updates:
 * - Now backend products and sales are stored in a shared in-memory array,
 *   ensuring product consistency when registering sales.
 *
 * Purpose:
 * - Avoid repeating base URLs across the app
 * - Provide a single point for configuration (headers, auth, interceptors)
 *
 * Current Configuration:
 * - Base URL points to local backend server
 *
 * Future Improvements:
 * - Add authentication headers (JWT)
 * - Implement request/response interceptors
 * - Environment-based URLs (development / production)
 *
 * Example Usage:
 * API.get("/sales")
 * API.post("/sales", data)
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

import axios from "axios";

/**
 * ========================
 * AXIOS INSTANCE
 * ========================
 */
const API = axios.create({
  baseURL: "http://127.0.0.1:3000"
});

/**
 * ========================
 * SALES
 * ========================
 */
API.getSales = () => API.get("/sales");
API.createSale = (data) => API.post("/sales", data);

/**
 * ========================
 * PRODUCTS
 * ========================
 */
API.getProducts = () => API.get("/products");
API.createProduct = (data) => API.post("/products", data);

/**
 * ========================
 * CATEGORIES 🔥
 * ========================
 */
API.getCategories = () => API.get("/categories");
API.createCategory = (data) => API.post("/categories", data);

/**
 * ========================
 * REPORTS
 * ========================
 */
API.getReportByRange = (start, end) =>
  API.get(`/reports/range?start=${start}&end=${end}`);

API.getDailyReport = () => API.get("/reports/daily");
API.getWeeklyReport = () => API.get("/reports/weekly");
API.getReportByMethod = () => API.get("/reports/by-method");

/**
 * ========================
 * TABLES / ORDERS
 * ========================
 */

API.getTables = () => API.get("/tables");
API.createTable = (data) => API.post("/tables", data);
API.addItemToTable = (tableId, data) =>
  API.post(`/tables/${tableId}/items`, data);

API.checkoutTable = (tableId, method) =>
  API.post(`/tables/${tableId}/checkout`, { method });

API.quickSale = (data) =>
  API.post("/orders/quick", data);

/**
 * ========================
 * EXPORT
 * ========================
 */
export default API;
