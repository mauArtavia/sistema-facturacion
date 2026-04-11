/**
 * ============================================
 * Sales Management System - Frontend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Complete sales management interface with products.
 *
 *  - Register new sales (product or manual amount)
 *  - Create and list products
 *  - Filter sales by date
 *  - Visualize data using charts
 *  - View summarized financial data
 *  - Inspect detailed sales history
 *
 * Technologies:
 *  - React (Hooks: useState, useEffect, useMemo)
 *  - Recharts (Data visualization)
 *  - Custom API service (Axios-based)
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

import { useState, useEffect, useMemo } from "react";
import API from "../../services/api";
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

  // 🔥 RANGO DE FECHAS (REPORTE REAL)
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [selectedProduct, setSelectedProduct] = useState("");
  const [toast, setToast] = useState(null);

  // Reporte backend
  const [report, setReport] = useState({
    total: 0,
    totalCash: 0,
    totalCard: 0,
    totalSinpe: 0
  });

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
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // ========================
  // API INTEGRATION (USING HELPERS)
  // ========================
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await API.getSales();
        setSales(res.data);
      } catch (err) {
        console.error("Error fetching sales:", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await API.getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchSales();
    fetchProducts();
  }, []);

  // ========================
  // DATE PRESETS 🔥
  // ========================
  const getTodayRange = () => {
    const today = new Date();
    const date = today.toISOString().split("T")[0];
    return { start: date, end: date };
  };

  const getWeekRange = () => {
    const today = new Date();
    const day = today.getDay();

    const diffToMonday = day === 0 ? -6 : 1 - day;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
      start: monday.toISOString().split("T")[0],
      end: sunday.toISOString().split("T")[0]
    };
  };

  const getMonthRange = () => {
    const today = new Date();

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      start: firstDay.toISOString().split("T")[0],
      end: lastDay.toISOString().split("T")[0]
    };
  };

  const getLast7DaysRange = () => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 6);

    return {
      start: past.toISOString().split("T")[0],
      end: today.toISOString().split("T")[0]
    };
  };  

  const getLast30DaysRange = () => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 29);

    return {
      start: past.toISOString().split("T")[0],
      end: today.toISOString().split("T")[0]
    };
  };

  const getYesterdayRange = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const date = yesterday.toISOString().split("T")[0];

    return { start: date, end: date };
  };

  const applyPreset = (type) => {
    let range;

    if (type === "today") range = getTodayRange();
    if (type === "week") range = getWeekRange();
    if (type === "month") range = getMonthRange();
    if (type === "last7") range = getLast7DaysRange();
    if (type === "last30") range = getLast30DaysRange();
    if (type === "yesterday") range = getYesterdayRange();

    setStartDate(range.start);
    setEndDate(range.end);
  };

  const fetchReport = async () => {
    try {
      const res = await API.getReportByRange(startDate, endDate);
      setReport(res.data);
    } catch (err) {
      console.error("Error fetching report:", err);
    }
  };

  // FETCH REPORT DESDE BACKEND
  useEffect(() => {
    fetchReport();
  }, [startDate, endDate]);

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
      const res = await API.createSale({
        amount: Number(amount),
        method,
        productId: selectedProduct ? Number(selectedProduct) : null
      });

      const saleData = { ...res.data };

      if (selectedProduct) {
        const prod = products.find((p) => p.id === Number(selectedProduct));
        if (prod) saleData.product = { ...prod };
      }

      setSales((prev) => [...prev, saleData]);

      await fetchReport();

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
    if (!newProductName || Number(newProductPrice) <= 0) {
      return showToast(
        "Ingrese nombre y precio del producto mayor a 0.",
        "Error"
      );
    }

    try {
      const res = await API.createProduct({
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
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const saleDate = new Date(sale.createdAt);

      const [yearS, monthS, dayS] = startDate.split("-");
      const start = new Date(yearS, monthS - 1, dayS, 0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);

      const [yearE, monthE, dayE] = endDate.split("-");
      const end = new Date(yearE, monthE - 1, dayE, 23, 59, 59, 999);
      end.setHours(23, 59, 59, 999);

      return saleDate >= start && saleDate <= end;
    });
  }, [sales, startDate, endDate]);

  const chartData = [
    { name: "Efectivo", value: report.totalCash },
    { name: "Tarjeta", value: report.totalCard },
    { name: "SINPE", value: report.totalSinpe }
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
              style={styles.input}
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
              style={styles.button}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar Venta"}
            </button>
          </div>

          {/* Chart */}
          <div style={styles.card}>
            <h2 style={{ textAlign: "center" }}>Métodos de pago</h2>
            <PieChart width={320} height={280}>
              <Pie data={chartData} dataKey="value" label>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatCRC(v)} />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div>
          {/* DATE RANGE */}
          <div style={styles.card}>
            <h2>Rango de fechas</h2>

            {/* PRESETS */}
            <div style={styles.presetContainer}>
              <button onClick={() => applyPreset("today")} style={styles.presetButton}>
                Hoy
              </button>
              <button onClick={() => applyPreset("yesterday")} style={styles.presetButton}>
                Ayer
              </button>
              <button onClick={() => applyPreset("week")} style={styles.presetButton}>
                Semana
              </button>
              <button onClick={() => applyPreset("month")} style={styles.presetButton}>
                Mes
              </button>
            </div>
            
            <div style={styles.presetContainer}>
              <button onClick={() => applyPreset("last7")} style={styles.presetButton}>
                Últimos 7 días
              </button>
              <button onClick={() => applyPreset("last30")} style={styles.presetButton}>
                Últimos 30 días
              </button>
            </div>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={styles.input}
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.card}>
            <h2>Resumen</h2>
            <p><b>Total:</b> {formatCRC(report.total)}</p>
            <p><b>Efectivo:</b> {formatCRC(report.totalCash)}</p>
            <p><b>Tarjeta:</b> {formatCRC(report.totalCard)}</p>
            <p><b>SINPE:</b> {formatCRC(report.totalSinpe)}</p>
          </div>

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
            fontWeight: "bold"
          }}
        >
          {toast.message}
        </div>
      )}

      <div style={styles.footer}>
        © 2026 mArtavia.dev — All rights reserved.
      </div>
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

  presetContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px"
  },

  presetButton: {
    flex: 1,
    padding: "10px",
    background: "#3D848F",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  footer: {
    marginTop: "25px",
    textAlign: "center",
    fontSize: "12px",
    color: "#888"
  }
};


export default SalesPage;