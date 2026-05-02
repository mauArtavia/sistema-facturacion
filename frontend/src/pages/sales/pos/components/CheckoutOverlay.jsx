import styles from "../../../../styles/styles";

function CheckoutOverlay({ onClose, onSingle, onSplit }) {
  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modalBox, ...styles.card }}>
        <h3>Tipo de pago</h3>

        <button style={styles.button} onClick={onSingle}>
          Cuenta única
        </button>

        <button style={styles.button} onClick={onSplit}>
          Dividir cuenta
        </button>

        <button style={styles.button} onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default CheckoutOverlay;