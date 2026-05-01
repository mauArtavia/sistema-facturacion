import styles from "../../../../styles/styles";

function CheckoutOverlay({ onClose, onSingle, onAuto, onManual }) {
  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modalBox, ...styles.card }}>
        <h3>Tipo de cuenta</h3>

        <button style={styles.button} onClick={onSingle}>
          Cuenta única
        </button>

        <button style={styles.button} onClick={onAuto}>
          Split automático
        </button>

        <button style={styles.button} onClick={onManual}>
          División manual
        </button>

        <button style={styles.button} onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default CheckoutOverlay;