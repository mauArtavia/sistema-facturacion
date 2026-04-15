function DateRangeCard({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  applyPreset,
  report,
  styles,
  formatCRC
}) {
  return (
    <>
      {/* RANGO */}
      <div style={styles.card}>
        <h2>Rango</h2>

        {/* 🔥 BOTONES BONITOS */}
        <div style={styles.presetContainer}>
          <button style={styles.presetButton} onClick={() => applyPreset("today")}>
            Hoy
          </button>
          <button style={styles.presetButton} onClick={() => applyPreset("week")}>
            Semana
          </button>
          <button style={styles.presetButton} onClick={() => applyPreset("month")}>
            Mes
          </button>
        </div>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* RESUMEN */}
      <div style={styles.card}>
        <h2>Resumen</h2>

        {/* 🔥 RESUMEN PRO */}
        <div style={{ marginTop: "15px" }}>
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>
            Total: {formatCRC(report.total || 0)}
          </div>

          <div style={{ fontSize: "13px", color: "#666" }}>
            Ventas: {report.count || 0}
          </div>
        </div>

        {/* 🔥 MINI CARDS */}
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <div style={{ flex: 1, ...styles.miniCard }}>
            <div>Efectivo</div>
            <strong>{formatCRC(report.totalCash || 0)}</strong>
          </div>

          <div style={{ flex: 1, ...styles.miniCard }}>
            <div>Tarjeta</div>
            <strong>{formatCRC(report.totalCard || 0)}</strong>
          </div>

          <div style={{ flex: 1, ...styles.miniCard }}>
            <div>SINPE</div>
            <strong>{formatCRC(report.totalSinpe || 0)}</strong>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateRangeCard;