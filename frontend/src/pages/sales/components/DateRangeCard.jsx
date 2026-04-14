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
      <div style={styles.card}>
        <h2>Rango</h2>

        <div style={styles.presetContainer}>
          <button onClick={() => applyPreset("today")} style={styles.presetButton}>Hoy</button>
          <button onClick={() => applyPreset("week")} style={styles.presetButton}>Semana</button>
          <button onClick={() => applyPreset("month")} style={styles.presetButton}>Mes</button>
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

      <div style={styles.card}>
        <h2>Resumen</h2>
        <p>Total: {formatCRC(report.total)}</p>
        <p>Efectivo: {formatCRC(report.totalCash)}</p>
        <p>Tarjeta: {formatCRC(report.totalCard)}</p>
        <p>SINPE: {formatCRC(report.totalSinpe)}</p>
      </div>
    </>
  );
}

export default DateRangeCard;