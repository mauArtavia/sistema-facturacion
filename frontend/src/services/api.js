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
 * This allows global configuration for all HTTP requests
 */
const API = axios.create({
  baseURL: "http://127.0.0.1:3000"
});

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