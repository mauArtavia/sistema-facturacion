import { useState } from "react";
import { groupSales } from "../../../utils/groupSales";
import { payment } from "../../../constants/colors";

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

          const methods = [...new Set(group.map((s) => s.method))];

          const methodLabel =
            methods.length === 1
              ? methodLabels[methods[0]]
              : "Mixto";

          const productMap = {};

          group.forEach((sale) => {
            const key = sale.product?.id || sale.id;
            const name = sale.product?.name || "Producto";

            if (!productMap[key]) {
              productMap[key] = {
                name,
                count: 0,
                total: 0
              };
            }

            productMap[key].count += 1;
            productMap[key].total += sale.amount;
          });

          return (
            <div key={index}>
              {/* HEADER */}
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
                      background: payment[first.method],
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      marginBottom: "4px",
                      textTransform: "uppercase"
                    }}
                  >
                    {methodLabels[first.method]}

                    <div
                      style={{
                        background: payment[first.method],
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        marginBottom: "4px",
                        textTransform: "uppercase"
                      }}
                    >
                      {methodLabel}
                    </div>

                    <div style={{ fontSize: "11px", color: "#666" }}>
                      Tx: {first.transactionId?.slice(0, 8)}
                    </div>
                  </div>

                  <div>{formatDate(first.createdAt)}</div>
                  <div>{formatTime(first.createdAt)}</div>
                </div>
              </div>

              {/* DETALLE */}
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