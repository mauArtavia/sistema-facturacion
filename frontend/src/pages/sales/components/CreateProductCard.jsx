/**
 * CreateProductCard
 *
 * Componente de formulario para creación de productos en el sistema POS.
 *
 * Permite ingresar:
 * - Nombre del producto
 * - Precio del producto
 *
 * El estado no es interno:
 * - El nombre y precio se manejan desde el componente padre.
 * - Los cambios se notifican mediante setters externos.
 *
 * Props:
 * - newProductName: string (valor actual del nombre)
 * - setNewProductName: function (actualiza el nombre)
 * - newProductPrice: string/number (valor actual del precio)
 * - setNewProductPrice: function (actualiza el precio)
 * - handleCreateProduct: function (ejecuta creación del producto)
 * - styles: objeto de estilos globales
 *
 * Comportamiento:
 * - Inputs controlados (controlled components)
 * - Botón ejecuta la creación del producto
 * - No contiene lógica de API directamente
 *
 * Responsabilidad:
 * - Solo UI + captura de datos
 * - La lógica de negocio está en el componente padre
 */

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
