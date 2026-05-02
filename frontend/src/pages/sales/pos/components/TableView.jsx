import styles from "@/styles/styles";

function TableView({ table, onCheckout }) {
  const sales = table?.sales || [];
  const payments = table?.payments || [];

  const paidTotal = payments.reduce((acc, p) => acc + p.amount, 0);
  const remaining = table.total - paidTotal;

  return (
    <div style={styles.card}>
      <h2>Mesa #{table.number}</h2>

      {sales.map((s) => (
        <div key={s.id} style={styles.saleItem}>
          {s.product?.name} ₡{s.amount}
        </div>
      ))}

      <div style={{ marginTop: 10 }}>
        <div><b>Total:</b> ₡{table.total}</div>
        <div><b>Pagado:</b> ₡{paidTotal}</div>
        <div><b>Restante:</b> ₡{remaining.toFixed(2)}</div>
      </div>

      <button style={styles.button} onClick={onCheckout}>
        💰 Cobrar
      </button>
    </div>
  );
}

export default TableView;