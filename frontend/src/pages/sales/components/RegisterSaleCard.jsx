function RegisterSaleCard({
  products,
  selectedProduct,
  setSelectedProduct,
  amount,
  setAmount,
  method,
  setMethod,
  handleRegister,
  handleProductChange,
  loading,
  styles,
  formatCRC
}) {
  return (
    <div style={styles.card}>
      <select
        value={selectedProduct}
        onChange={handleProductChange}
        style={styles.select}
      >
        <option value="">Producto</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} | {formatCRC(p.price)}
          </option>
        ))}
      </select>

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
        placeholder="Monto"
        disabled={!!selectedProduct}
      />

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={styles.select}
      >
        <option value="cash">Efectivo</option>
        <option value="card">Tarjeta</option>
        <option value="sinpe">SINPE</option>
      </select>

      <button
        onClick={handleRegister}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Registrando..." : "Registrar"}
      </button>
    </div>
  );
}

export default RegisterSaleCard;