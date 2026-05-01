/**
 * RegisterSaleCard
 *
 * Componente de formulario para registrar ventas manuales de forma directa.
 *
 * Permite seleccionar un producto o ingresar un monto personalizado,
 * elegir el método de pago y enviar la venta al sistema.
 *
 * FUNCIONALIDAD:
 *
 * Selección de producto:
 * - Permite elegir un producto existente desde un select.
 * - Al seleccionar un producto, puede deshabilitar el campo de monto
 *   si la lógica del padre así lo define.
 *
 * Monto manual:
 * - Permite ingresar un monto personalizado.
 * - Se deshabilita si hay un producto seleccionado.
 *
 * Método de pago:
 * - Permite seleccionar entre:
 *   - cash (efectivo)
 *   - card (tarjeta)
 *   - sinpe (SINPE móvil)
 *
 * Validación:
 * - El botón de registro se habilita solo si:
 *   - hay un monto válido mayor a 0
 *   - no está en estado de carga
 *
 * Envío:
 * - Ejecuta handleRegister al confirmar la venta.
 *
 * PROPS:
 * - products: lista de productos disponibles
 * - selectedProduct: producto seleccionado
 * - setSelectedProduct: setter del producto
 * - amount: monto manual
 * - setAmount: setter del monto
 * - method: método de pago seleccionado
 * - setMethod: setter del método de pago
 * - handleRegister: función para registrar la venta
 * - handleProductChange: handler de selección de producto
 * - loading: estado de carga del sistema
 * - styles: objeto de estilos globales
 * - formatCRC: función de formato de moneda
 *
 * RESPONSABILIDAD:
 * - UI de registro manual de ventas
 * - Validación básica de entrada
 * - NO contiene lógica de persistencia ni API directa
 */

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