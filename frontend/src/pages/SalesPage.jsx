/**
 * ============================================
 * Sales Management System - Frontend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Complete sales management interface with products.
 * - Register new sales (product or manual amount)
 * - Create and list products
 * - Filter sales by date
 * - Visualize data using charts
 * - View summarized financial data
 * - Inspect detailed sales history
 *
 * Technologies:
 * - React (Hooks: useState, useEffect, useMemo)
 * - Recharts (Data visualization)
 * - Custom API service (Axios-based)
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

import { useState, useEffect, useMemo } from "react";
import API from "../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function SalesPage() {
  // ========================
  // STATE MANAGEMENT
  // ========================
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("cash");
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Nuevo producto
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");

  const methodLabels = { cash: "Efectivo", card: "Tarjeta", simpe: "SINPE" };

  // ========================
  // FORMATTERS
  // ========================
  const formatCRC = (amount) =>
    new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0
    }).format(amount);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("es-CR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(date));

  const formatTime = (date) =>
    new Intl.DateTimeFormat("es-CR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(date));

  // ========================
  // API INTEGRATION (USING HELPERS)
  // ========================
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await API.getSales(); // <-- helper
        setSales(res.data);
      } catch (err) {
        console.error("Error fetching sales:", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await API.getProducts(); // <-- helper
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchSales();
    fetchProducts();
  }, []);

  // ========================
  // PRODUCT SELECTION
  // ========================
  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);

    const product = products.find((p) => p.id === Number(productId));
    if (product) setAmount(product.price);
    else setAmount("");
  };

  // ========================
  // REGISTER SALE
  // ========================
  const handleRegister = async () => {
    if (!amount) return alert("Ingrese un monto");

    setLoading(true);
    try {
      const res = await API.createSale({ // <-- helper
        amount: Number(amount),
        method,
        productId: selectedProduct ? Number(selectedProduct) : null
      });

      // Agregar nombre del producto al objeto de venta para frontend
      const saleData = { ...res.data };
      if (selectedProduct) {
        const prod = products.find((p) => p.id === Number(selectedProduct));
        if (prod) saleData.product = { ...prod };
      }

      setSales((prev) => [...prev, saleData]);
      setAmount("");
      setSelectedProduct("");
    } catch (err) {
      alert("Error registrando");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // CREATE PRODUCT
  // ========================
  const handleCreateProduct = async () => {
    if (!newProductName || !newProductPrice) {
      return alert("Ingrese nombre y precio del producto");
    }

    try {
      const res = await API.createProduct({ // <-- helper
        name: newProductName,
        price: Number(newProductPrice)
      });

      setProducts((prev) => [...prev, res.data]);
      setNewProductName("");
      setNewProductPrice("");
    } catch (err) {
      alert("Error creando producto");
      console.error(err);
    }
  };

  // ========================
  // DATA PROCESSING
  // ========================
  const filteredSales = useMemo(
    () =>
      sales.filter(
        (sale) =>
          new Date(sale.createdAt).toISOString().split("T")[0] ===
          selectedDate
      ),
    [sales, selectedDate]
  );

  const { total, totalCash, totalCard, totalSimpe } = useMemo(() => {
    let total = 0,
      totalCash = 0,
      totalCard = 0,
      totalSimpe = 0;
    for (const s of filteredSales) {
      total += s.amount;
      if (s.method === "cash") totalCash += s.amount;
      else if (s.method === "card") totalCard += s.amount;
      else if (s.method === "simpe") totalSimpe += s.amount;
    }
    return { total, totalCash, totalCard, totalSimpe };
  }, [filteredSales]);

  const chartData = [
    { name: "Efectivo", value: totalCash },
    { name: "Tarjeta", value: totalCard },
    { name: "SINPE", value: totalSimpe }
  ];
  const COLORS = ["#3D848F", "#314245", "#B6B5B8"];

  // ========================
  // UI RENDER
  // ========================
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Ventas</h1>

      <div style={styles.grid}>
        {/* LEFT PANEL */}
        <div>
          {/* Create Product */}
          <div style={styles.card}>
            <h2>Nuevo Producto</h2>
            <input
              type="text"
              placeholder="Nombre del producto"
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
              Crear Producto
            </button>
          </div>

          {/* Sales Input */}
          <div style={styles.card}>
            <select
              value={selectedProduct}
              onChange={handleProductChange}
              style={styles.select}
            >
              <option value="">-- Seleccione producto --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} | {formatCRC(p.price)}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />

            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={styles.select}
            >
              <option value="cash">Efectivo</option>
              <option value="card">Tarjeta</option>
              <option value="simpe">SINPE</option>
            </select>

            <button
              onClick={handleRegister}
              style={styles.button}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar Venta"}
            </button>
          </div>

          {/* Date Filter */}
          <div style={styles.card}>
            <h2>Fecha</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Chart Visualization */}
          <div style={styles.card}>
            <h2 style={{ textAlign: "center" }}>Métodos de pago</h2>
            <div style={styles.chartContainer}>
              <PieChart width={320} height={280}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCRC(value)} />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div>
          {/* Summary */}
          <div style={styles.card}>
            <h2>Resumen</h2>
            <p>
              <b>Total:</b> {formatCRC(total)}
            </p>
            <p>
              <b>Efectivo:</b> {formatCRC(totalCash)}
            </p>
            <p>
              <b>Tarjeta:</b> {formatCRC(totalCard)}
            </p>
            <p>
              <b>SINPE:</b> {formatCRC(totalSimpe)}
            </p>
          </div>

          {/* Sales History */}
          <div style={{ ...styles.card, ...styles.cardScrollable }}>
            <h2>Historial</h2>
            {filteredSales.length === 0 ? (
              <p>No hay ventas</p>
            ) : (
              filteredSales.map((sale) => (
                <div key={sale.id} style={styles.saleItem}>
                  <div>
                    <strong>{formatCRC(sale.amount)}</strong>
                    <div style={styles.saleMeta}>
                      {methodLabels[sale.method]}{" "}
                      {sale.product?.name ? `| ${sale.product.name}` : ""}
                    </div>
                  </div>
                  <div style={styles.saleMetaRight}>
                    <div>{formatDate(sale.createdAt)}</div>
                    <div>{formatTime(sale.createdAt)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>© 2026 mArtavia.dev — All rights reserved.</div>
    </div>
  );
}

/**
 * ============================================
 * STYLES (INLINE CSS OBJECTS)
 * ============================================
 */

const baseField = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #3D848F",
  height: "42px",
  fontSize: "16px",
  boxSizing: "border-box"
};

const styles = {
  container: { maxWidth: "900px", margin: "auto", padding: "20px", fontFamily: "Arial" },
  title: { textAlign: "center", marginBottom: "20px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  card: { background: "#f5f5f5", padding: "15px", borderRadius: "10px", marginBottom: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  chartContainer: { display: "flex", justifyContent: "center", alignItems: "center" },
  cardScrollable: { maxHeight: "300px", overflowY: "auto" },
  input: { ...baseField },
  select: { ...baseField, backgroundColor: "white" },
  button: { width: "100%", padding: "12px", background: "#3D848F", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" },
  saleItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #3D848F" },
  saleMeta: { fontSize: "12px", color: "#666" },
  saleMetaRight: { fontSize: "12px", color: "#666", textAlign: "right" },
  footer: { marginTop: "20px", textAlign: "center", fontSize: "12px", color: "#888" }
};

export default SalesPage;