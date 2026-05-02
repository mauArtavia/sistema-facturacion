import styles from "@/styles/styles";

function POSLayout({
  tables,
  activeTable,
  onOpenTable,
  onBack,
  children,
}) {
  return (
    <div style={styles.column}>
      {!activeTable ? (
        <>
          {children}

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
        </>
      ) : (
        <>
          <button style={styles.button} onClick={onBack}>
            ← Volver
          </button>

          {children}
        </>
      )}
    </div>
  );
}

export default POSLayout;