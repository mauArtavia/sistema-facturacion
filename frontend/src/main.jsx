/**
 * ============================================
 * Main Entry Point - Frontend Bootstrap
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * This is the main entry point of the React application.
 * It initializes the React DOM and mounts the root App component into the HTML
 * container.
 *
 * Responsibilities:
 * - Connect React with the DOM
 * - Wrap the application with development tools (StrictMode)
 *
 * Notes:
 * - StrictMode is used to highlight potential problems in development
 * - It does NOT affect production behavior
 *
 * Future Improvements:
 * - Add global providers (Context API, Redux, Theme, etc.)
 * - Integrate routing providers (React Router)
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

/**
 * Mount React application into the root DOM element
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);