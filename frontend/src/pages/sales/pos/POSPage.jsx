import { useState } from "react";
import useProducts from "../../../hooks/useProducts";
import useSales from "../../../hooks/useSales";
import styles from "../../../styles/styles";

function POSPage() {
  const { products } = useProducts();
  const { createSale } = useSales();

  const [tables, setTables] = useState([]);
  const [activeTable, setActiveTable] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // ========================
  // 🍽️ CREAR MESA
  // ========================
  const handleCreateTable = () => {
    const tableNumber = prompt("Número de mesa:");
    if (!tableNumber) return;

    const newTable = {
      id: Date.now(),
      number: tableNumber,
      items: [],
      total: 0
    };

    setTables((prev) => [...prev, newTable]);
  };

  // ========================
  // 📂 ABRIR MESA
  // ========================
  const handleOpenTable = (table) => {
    setActiveTable(table);
  };

  // ========================
  // 🔙 VOLVER
  // ========================
  const handleBack = () => {
    setActiveTable(null);
  };

  // ========================
  // ➕ AGREGAR PRODUCTO
  // ========================
  const handleAddProduct = (product) => {
    const updatedTable = {
      ...activeTable,
      items: [...activeTable.items, product],
      total: activeTable.total + product.price
    };

    setActiveTable(updatedTable);

    setTables((prev) =>
      prev.map((t) => (t.id === updatedTable.id ? updatedTable : t))
    );
  };

  // ========================
  // 💰 COBRAR
  // ========================
  const handleCheckout = async () => {
    if (!activeTable || activeTable.items.length === 0) return;

    try {
      await Promise.all(
        activeTable.items.map((item) =>
          createSale({
            amount: item.price,
            method: paymentMethod,
            productId: item.id
          })
        )
      );

      // 🔥 eliminar mesa (cerrar)
      setTables((prev) =>
        prev.filter((t) => t.id !== activeTable.id)
      );

      setActiveTable(null);
      setPaymentMethod("cash");

    } catch (error) {
      console.error("Error cobrando:", error);
    }
  };

  // ========================
  // 🧾 VISTA: MESA ABIERTA
  // ========================
  if (activeTable) {
    return (
      <div style={styles.column}>
        {/* 🔙 VOLVER */}
        <button style={styles.button} onClick={handleBack}>
          ← Volver
        </button>

        {/* 🧃 PRODUCTOS */}
        <div style={styles.card}>
          <h3>Agregar producto</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {products.map((p) => (
              <button
                key={p.id}
                style={styles.presetButton}
                onClick={() => handleAddProduct(p)}
              >
                {p.name} | ₡{p.price}
              </button>
            ))}
          </div>
        </div>

        {/* 🧾 RESUMEN MESA */}
        <div style={styles.card}>
          <h2>Mesa #{activeTable.number}</h2>

          <div style={{ marginTop: "15px" }}>
            {activeTable.items.length === 0 && (
              <div style={{ color: "#888" }}>
                No hay productos agregados
              </div>
            )}

            {activeTable.items.map((item, i) => (
              <div key={i} style={styles.saleItem}>
                <div>{item.name}</div>
                <div>₡{item.price}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "15px", fontWeight: "bold" }}>
            Total: ₡{activeTable.total}
          </div>

          {/* 💳 MÉTODO DE PAGO */}
          <div style={{ marginTop: "15px" }}>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={styles.select}
            >
              <option value="cash">Efectivo</option>
              <option value="card">Tarjeta</option>
              <option value="sinpe">SINPE</option>
            </select>

            <button
              style={styles.button}
              onClick={handleCheckout}
              disabled={activeTable.items.length === 0}
            >
              💰 Cobrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================
  // 🧾 VISTA: LISTA DE MESAS
  // ========================
  return (
    <div style={styles.column}>
      {/* 🔥 ACCIONES */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={styles.button} onClick={handleCreateTable}>
          + Nueva Mesa
        </button>

        <button style={styles.button} disabled>
          ⚡ Venta Rápida
        </button>
      </div>

      {/* 🍽️ MESAS */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: "10px" }}>Mesas abiertas</h3>

        {tables.length === 0 && (
          <div style={{ color: "#888", textAlign: "center" }}>
            No hay mesas abiertas
          </div>
        )}

        {tables.map((table) => (
          <div key={table.id} style={styles.saleItem}>
            <div>
              <strong>Mesa #{table.number}</strong>
              <div style={styles.saleMeta}>
                Total: ₡{table.total}
              </div>
            </div>

            <button
              style={styles.presetButton}
              onClick={() => handleOpenTable(table)}
            >
              Abrir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default POSPage;