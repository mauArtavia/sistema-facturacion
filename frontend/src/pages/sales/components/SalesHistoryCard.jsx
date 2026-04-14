function SalesHistoryCard({
  filteredSales,
  methodLabels,
  styles,
  formatCRC,
  formatDate,
  formatTime
}) {
  return (
    <div style={{ ...styles.card, ...styles.cardScrollable }}>
      <h2>Historial</h2>

      {filteredSales.map((s) => (
        <div key={s.id} style={styles.saleItem}>
          <div>
            <strong>{formatCRC(s.amount)}</strong>
            <div style={styles.saleMeta}>
              {methodLabels[s.method]}{" "}
              {s.product?.name && `| ${s.product.name}`}
            </div>
          </div>

          <div style={styles.saleMetaRight}>
            <div>{formatDate(s.createdAt)}</div>
            <div>{formatTime(s.createdAt)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SalesHistoryCard;