import styles from "@/styles/styles";

function CreateTableCard({ value, onChange, onCreate }) {
  return (
    <div style={styles.card}>
      <h3>Nueva mesa</h3>

      <input
        style={styles.input}
        placeholder="Número de mesa"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button style={styles.button} onClick={onCreate}>
        + Crear mesa
      </button>
    </div>
  );
}

export default CreateTableCard;