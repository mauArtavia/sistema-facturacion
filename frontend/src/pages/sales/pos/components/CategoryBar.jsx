import styles from "../../../../styles/styles";

function CategoryBar({ categories = [], selected, onSelect }) {
  return (
    <div style={styles.card}>
      <h3>Categorías</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {categories.map((c) => (
          <button
            key={c.id}
            style={{
              ...styles.presetButton,
              backgroundColor:
                selected === c.id ? "#3D848F" : "#1E1E1E",
            }}
            onClick={() => onSelect(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;