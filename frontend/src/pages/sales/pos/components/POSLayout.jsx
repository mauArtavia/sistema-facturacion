import styles from "../../../../styles/styles";

function POSLayout({
  tables,
  activeTable,
  onCreateTable,
  onOpenTable,
  onBack,
  children,
}) {
  if (!activeTable) {
    return (
      <div style={styles.column}>
        <button style={styles.button} onClick={onCreateTable}>
          + Nueva Mesa
        </button>

        <div style={styles.card}>
          {tables.map((t) => (
            <div key={t.id} style={styles.saleItem}>
              <div>
                Mesa #{t.number} ₡{t.total}
              </div>

              <button
                style={styles.presetButton}
                onClick={() => onOpenTable(t)}
              >
                Abrir
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.column}>
      <button style={styles.button} onClick={onBack}>
        ← Volver
      </button>

      {children}
    </div>
  );
}

export default POSLayout;