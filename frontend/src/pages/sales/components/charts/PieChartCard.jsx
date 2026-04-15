import Card from "../ui/Card";

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