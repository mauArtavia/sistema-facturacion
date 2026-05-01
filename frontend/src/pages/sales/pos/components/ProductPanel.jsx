import styles from "../../../../styles/styles";

function ProductPanel({ products = [], onAdd }) {
  return (
    <div style={styles.card}>
      <h3>Productos</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {products.map((p) => (
          <button
            key={p.id}
            style={styles.presetButton}
            onClick={() => onAdd(p)}
          >
            + {p.name} ₡{p.price}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductPanel;