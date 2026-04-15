import { useState } from "react";
import { groupSales } from "../../../utils/groupSales";

function SalesHistoryCard({
  filteredSales,
  methodLabels,
  styles,
  formatCRC,
  formatDate,
  formatTime
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const groupedSales = groupSales(filteredSales);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 🎨 colores por método
  const methodColors = {
    cash: "#16a34a",
    card: "#2563eb",
    sinpe: "#9333ea"
  };

  return (
    <div style={styles.card}>
      <h3 style={{ marginBottom: "15px" }}>Historial</h3>

      <div style={styles.cardScrollable}>
        {groupedSales.length === 0 && (
          <div style={{ textAlign: "center", color: "#888" }}>
            Sin ventas
          </div>
        )}

        {groupedSales.map((group, index) => {
          const total = group.reduce((acc, s) => acc + s.amount, 0);
          const first = group[0];
          const isOpen = openIndex === index;

          // 🧠 agrupar productos
          const productMap = {};

          group.forEach((sale) => {
            const name = sale.product?.name || "Producto";

            if (!productMap[name]) {
              productMap[name] = {
                count: 0,
                total: 0
              };
            }

            productMap[name].count += 1;
            productMap[name].total += sale.amount;
          });

          return (
            <div key={index}>
              {/* 🔥 HEADER */}
              <div
                style={{
                  ...styles.saleItem,
                  cursor: "pointer",
                  background: isOpen ? "#f3f4f6" : "transparent",
                  transition: "all 0.2s ease"
                }}
                onClick={() => toggle(index)}
              >
                {/* LEFT */}
                <div>
                  <div style={{ fontWeight: "bold" }}>
                    {formatCRC(total)}
                  </div>

                  <div style={styles.saleMeta}>
                    {group.length} producto{group.length > 1 ? "s" : ""}
                  </div>
                </div>

                {/* RIGHT */}
                <div style={styles.saleMetaRight}>
                  <div
                    style={{
                      background: methodColors[first.method],
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      marginBottom: "4px"
                    }}
                  >
                    {methodLabels[first.method]}
                  </div>

                  <div>{formatDate(first.createdAt)}</div>
                  <div>{formatTime(first.createdAt)}</div>
                </div>
              </div>

              {/* 🔽 DETALLE ANIMADO */}
              <div
                style={{
                  maxHeight: isOpen ? "300px" : "0px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  background: "#fafafa"
                }}
              >
                <div style={{ padding: isOpen ? "10px 15px" : "0 15px" }}>
                  {Object.entries(productMap).map(([name, data], i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "13px",
                        padding: "4px 0"
                      }}
                    >
                      <div>
                        {name} x{data.count}
                      </div>
                      <div>{formatCRC(data.total)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SalesHistoryCard;