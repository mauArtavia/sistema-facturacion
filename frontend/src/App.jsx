/**
 * ============================================
 * App Entry Point - Frontend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Root component of the application.
 * This is the main entry point where all pages/components are mounted.
 *
 * Current Behavior:
 * - Renders the SalesPage as the main interface
 *
 * Architecture Notes:
 * - No routing system implemented yet (React Router)
 * - Single-page structure for MVP simplicity
 *
 * Future Improvements:
 * - Add routing (React Router) for multi-page navigation
 * - Global layout (Navbar, Sidebar, Footer)
 * - Authentication wrapper (Protected routes)
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

import SalesPage from "./pages/sales/SalesPage";

/**
 * Root Application Component
 */
function App() {
  return <SalesPage />;
}

export default App;