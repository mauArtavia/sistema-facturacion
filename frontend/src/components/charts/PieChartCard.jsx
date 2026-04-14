import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function PieChartCard({ report, styles }) {
  const data = [
    { name: "Efectivo", value: report.totalCash },
    { name: "Tarjeta", value: report.totalCard },
    { name: "SINPE", value: report.totalSinpe }
  ];

  const COLORS = ["#3D848F", "#314245", "#B6B5B8"];

  return (
    <div style={styles.card}>
      <h2>Distribución</h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default PieChartCard;