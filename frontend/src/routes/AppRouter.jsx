import { Routes, Route } from "react-router-dom";

import SalesPage from "../pages/sales/SalesPage";
import AdminPage from "../pages/admin/AdminPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default AppRouter;