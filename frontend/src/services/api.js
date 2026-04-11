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
 * Create Axios instance
 */
const API = axios.create({
  baseURL: "http://127.0.0.1:3000"
});

/**
 * ========================
 * HELPER FUNCTIONS
 * ========================
 */

// ========================
// SALES
// ========================
API.getSales = () => API.get("/sales");
API.createSale = (data) => API.post("/sales", data);

// ========================
// PRODUCTS
// ========================
API.getProducts = () => API.get("/products");
API.createProduct = (data) => API.post("/products", data);

// ========================
// REPORTS
// ========================

// 🔥 Reporte por rango (principal)
API.getReportByRange = (start, end) =>
  API.get(`/reports/range?start=${start}&end=${end}`);

// Reporte diario
API.getDailyReport = () => API.get("/reports/daily");

// Reporte semanal
API.getWeeklyReport = () => API.get("/reports/weekly");

// Reporte por método de pago
API.getReportByMethod = () => API.get("/reports/by-method");

/**
 * (Optional - Future)
 * Example interceptor structure:
 *
 * API.interceptors.request.use((config) => {
 *   // Add auth token here
 *   return config;
 * });
 *
 * API.interceptors.response.use(
 *   (response) => response,
 *   (error) => {
 *     // Global error handling
 *     return Promise.reject(error);
 *   }
 * );
 */

export default API;