/**
 * DateRangeCard
 *
 * Componente de control y visualización de reportes de ventas por rango de fechas.
 *
 * Funciona como combinación de:
 * 1. Selector de rango de fechas (preset + manual)
 * 2. Panel de resumen de ventas
 *
 * FUNCIONALIDAD:
 *
 * Control de fechas:
 * - Permite seleccionar rango mediante presets:
 *   - today (hoy)
 *   - week (semana actual)
 *   - month (mes actual)
 *
 * - Permite selección manual mediante inputs tipo date.
 *
 * Resumen de ventas:
 * - Muestra el total general de ventas en el rango.
 * - Muestra la cantidad total de ventas realizadas.
 * - Desglosa ventas por método de pago:
 *   - efectivo (cash)
 *   - tarjeta (card)
 *   - SINPE
 *
 * PROPS:
 * - startDate: string (fecha inicio)
 * - endDate: string (fecha fin)
 * - setStartDate: function
 * - setEndDate: function
 * - applyPreset: function (maneja presets de rango)
 * - report: object (datos agregados de ventas)
 * - styles: objeto de estilos globales
 * - formatCRC: function (formateo de moneda)
 *
 * RESPONSABILIDAD:
 * - UI de filtros de tiempo
 * - Visualización de métricas
 * - NO contiene lógica de negocio ni API directa
 */

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