/**
 * ============================================
 * App Entry Point - Frontend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 * ============================================
 */

import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

/**
 * ============================================
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */