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
  // 🔥 VALIDACIÓN
  const isValid = amount && Number(amount) > 0;

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

      {/* 🔥 BOTÓN MEJORADO + VALIDACIÓN */}
      <button
        onClick={handleRegister}
        disabled={loading || !isValid}
        style={{
          ...styles.button,
          opacity: loading || !isValid ? 0.6 : 1,
          cursor: loading || !isValid ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Registrando..." : "Registrar Venta"}
      </button>
    </div>
  );
}

export default RegisterSaleCard;