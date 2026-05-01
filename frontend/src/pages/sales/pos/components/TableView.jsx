import styles from "../../../../styles/styles";

function TableView({ table, paymentMethod, setPaymentMethod, onCheckout }) {
  const sales = table?.sales || [];

  return (
    <div style={styles.card}>
      <h2>Mesa #{table.number}</h2>

      {sales.map((s) => (
        <div key={s.id} style={styles.saleItem}>
          {s.product?.name} ₡{s.amount}
        </div>
      ))}

      <b>Total: ₡{table.total}</b>

      <button style={styles.button} onClick={onCheckout}>
        💰 Cobrar
      </button>

      <select
        style={styles.select}
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="cash">Efectivo</option>
        <option value="card">Tarjeta</option>
        <option value="sinpe">SINPE</option>
      </select>
    </div>
  );
}

export default TableView;