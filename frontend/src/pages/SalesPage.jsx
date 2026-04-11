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
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("cash");
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedProduct, setSelectedProduct] = useState("");
  const [toast, setToast] = useState(null);

  // Nuevo producto
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");

  const methodLabels = { cash: "Efectivo", card: "Tarjeta", sinpe: "SINPE" };

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

    const showToast = (message, type = "success") => {
    setToast({message, type});

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }

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
    if (!amount || Number(amount) <= 0) {
      return showToast("Ingrese un monto mayor a 0.", "Error");
    }

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
      showToast("Venta registrada correctamente");
    } catch (err) {
      showToast("Error registrando", "Error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // CREATE PRODUCT
  // ========================
  const handleCreateProduct = async () => {
    if (!newProductName || Number(newProductPrice) <= 0 ) {
      return showToast("Ingrese nombre y precio del producto mayor a 0.", "Error");
    }

    try {
      const res = await API.createProduct({ // <-- helper
        name: newProductName,
        price: Number(newProductPrice)
      });

      setProducts((prev) => [...prev, res.data]);
      setNewProductName("");
      setNewProductPrice("");
      showToast("Producto creado correctamente");
    } catch (err) {
      showToast("Error creando producto", "Error");
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

  const { total, totalCash, totalCard, totalSinpe } = useMemo(() => {
    let total = 0,
      totalCash = 0,
      totalCard = 0,
      totalSinpe = 0;
    for (const s of filteredSales) {
      total += s.amount;
      if (s.method === "cash") totalCash += s.amount;
      else if (s.method === "card") totalCard += s.amount;
      else if (s.method === "sinpe") totalSinpe += s.amount;
    }
    return { total, totalCash, totalCard, totalSinpe };
  }, [filteredSales]);

  const chartData = [
    { name: "Efectivo", value: totalCash },
    { name: "Tarjeta", value: totalCard },
    { name: "SINPE", value: totalSinpe }
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
              min="1"
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
              min="1"
              placeholder="Monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                ...styles.input,
                backgroundColor: selectedProduct ? "#e5e7eb" : "white",
                cursor: selectedProduct ? "not-allowed" : "text"
              }}
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
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                ...styles.button,
                ...(isHovering ? styles.buttonHover : {}),
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
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
              <b>SINPE:</b> {formatCRC(totalSinpe)}
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

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "12px 16px",
            borderRadius: "6px",
            backgroundColor: toast.type === "Error" ? "#dc2626" : "#16a34a",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
          }}
        >
          {toast.message}
        </div>
      )}

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
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  height: "44px",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none",
  transition: "border 0.2s ease, box-shadow 0.2s ease"
};

const styles = {
  container: {
    maxWidth: "960px",
    margin: "auto",
    padding: "25px",
    fontFamily: "Arial"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
  },

  chartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  cardScrollable: {
    maxHeight: "320px",
    overflowY: "auto"
  },

  input: {
    ...baseField
  },

  select: {
    ...baseField,
    backgroundColor: "white",
    cursor: "pointer"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#3D848F",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },

  buttonHover: {
    background: "#326e77"
  },

  saleItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    borderBottom: "1px solid #3D848F"
  },

  saleMeta: {
    fontSize: "12px",
    color: "#666",
    marginTop: "4px"
  },

  saleMetaRight: {
    fontSize: "12px",
    color: "#666",
    textAlign: "right"
  },

  footer: {
    marginTop: "25px",
    textAlign: "center",
    fontSize: "12px",
    color: "#888"
  }
};

export default SalesPage;