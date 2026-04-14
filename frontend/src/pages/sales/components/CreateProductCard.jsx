function CreateProductCard({
  newProductName,
  setNewProductName,
  newProductPrice,
  setNewProductPrice,
  handleCreateProduct,
  styles
}) {
  return (
    <div style={styles.card}>
      <h2>Nuevo Producto</h2>

      <input
        placeholder="Nombre"
        value={newProductName}
        onChange={(e) => setNewProductName(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Precio"
        value={newProductPrice}
        onChange={(e) => setNewProductPrice(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleCreateProduct} style={styles.button}>
        Crear
      </button>
    </div>
  );
}

export default CreateProductCard;