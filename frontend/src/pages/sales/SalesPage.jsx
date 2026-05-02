import { useState } from "react";
import styles from "@/styles/styles";

import POSPage from "./pos/POSPage";
import HistoryPage from "./history/HistoryPage";
import ReportsPage from "./reports/ReportsPage";

function SalesPage() {
  const [tab, setTab] = useState("pos");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Ventas</h1>

      {/* 🔥 LAYOUT PRINCIPAL */}
      <div style={styles.layout}>
        
        {/* SIDEBAR */}
        <div style={styles.sidebar}>
          <button
            style={styles.sidebarButton(tab === "pos")}
            onClick={() => setTab("pos")}
          >
            ⚡ Ventas
          </button>

          <button
            style={styles.sidebarButton(tab === "history")}
            onClick={() => setTab("history")}
          >
            🕒 Historial
          </button>

          <button
            style={styles.sidebarButton(tab === "reports")}
            onClick={() => setTab("reports")}
          >
            📊 Reportes
          </button>
        </div>

        {/* CONTENIDO */}
        <div style={styles.content}>
          {tab === "pos" && <POSPage />}
          {tab === "history" && <HistoryPage />}
          {tab === "reports" && <ReportsPage />}
        </div>

      </div>
    </div>
  );
}

export default SalesPage;