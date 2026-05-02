/**
 * PieChartCard
 *
 * Componente de visualización simple de distribución de ventas por método de pago.
 *
 * Recibe un objeto "report" con la estructura:
 *
 * report.byMethod = {
 *   cash: number,
 *   card: number,
 *   sinpe: number
 * }
 *
 * Funcionalidad:
 * - Calcula el total de ventas entre todos los métodos.
 * - Convierte cada método en porcentaje del total.
 * - Renderiza una barra horizontal proporcional por método.
 *
 * UI:
 * - Muestra el nombre del método en mayúsculas.
 * - Muestra el porcentaje correspondiente.
 * - Representa visualmente el porcentaje con una barra de progreso.
 *
 * Caso sin datos:
 * - Si no existe report o byMethod, muestra "Sin datos".
 *
 * Uso:
 * <PieChartCard report={report} />
 */

import Card from "@components/ui/Card";

function PieChartCard({ report }) {
  if (!report || !report.byMethod) {
    return <Card title="Distribución">Sin datos</Card>;
  }

  const total = Object.values(report.byMethod).reduce((a, b) => a + b, 0);

  return (
    <Card title="Distribución por Método">
      {Object.entries(report.byMethod).map(([key, value]) => {
        const percent = total ? ((value / total) * 100).toFixed(1) : 0;

        return (
          <div key={key} style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "14px", marginBottom: "4px" }}>
              {key.toUpperCase()} - {percent}%
            </div>

            <div
              style={{
                height: "8px",
                background: "#e5e7eb",
                borderRadius: "4px"
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  background: "#3D848F",
                  borderRadius: "4px"
                }}
              />
            </div>
          </div>
        );
      })}
    </Card>
  );
}

export default PieChartCard;
