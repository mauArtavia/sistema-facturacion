import styles from "../../../../styles/styles";

function SplitAutoOverlay({ bills = [], onPay, onFinish, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modalBox, ...styles.card }}>
        <h3>Split automático</h3>

        {bills.map((b, i) => (
          <div key={b.id} style={styles.saleItem}>
            <div>
              {b.name} — ₡{b.total}
            </div>

            <button
              style={{
                ...styles.presetButton,
                opacity: b.paid ? 0.5 : 1,
                cursor: b.paid ? "not-allowed" : "pointer"
              }}
              onClick={() => !b.paid && onPay(i)}
              disabled={b.paid}
            >
              {b.paid ? "Pagado" : "Cobrar"}
            </button>
          </div>
        ))}

        <button style={styles.button} onClick={onFinish}>
          Finalizar mesa
        </button>

        <button style={styles.button} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default SplitAutoOverlay;