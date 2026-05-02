import styles from "@/styles/styles";

function ManualSplitOverlay({
  bills = [],
  setBills,
  currentBillIndex,
  setCurrentBillIndex,
  sales = [],
  onFinish,
  onClose,
}) {
  const current = bills[currentBillIndex];

  if (!current) return null; // 🔥 evita crash

  const assign = (sale) => {
    setBills((prev) =>
      prev.map((b, i) => {
        if (i !== currentBillIndex) return b;

        return {
          ...b,
          items: [...b.items, sale],
          total: b.total + sale.amount,
        };
      })
    );
  };

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modalBox, ...styles.card }}>
        <h3>{current.name}</h3>

        {sales.map((s) => (
          <button
            key={s.id}
            style={styles.presetButton}
            onClick={() => assign(s)}
          >
            {s.product?.name}
          </button>
        ))}

        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={styles.button}
            onClick={() =>
              setCurrentBillIndex((p) => Math.max(0, p - 1))
            }
          >
            ←
          </button>

          <button
            style={styles.button}
            onClick={() =>
              setCurrentBillIndex((p) =>
                Math.min(bills.length - 1, p + 1)
              )
            }
          >
            →
          </button>
        </div>

        <button style={styles.button} onClick={onFinish}>
          Cobrar todo
        </button>

        <button style={styles.button} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ManualSplitOverlay;