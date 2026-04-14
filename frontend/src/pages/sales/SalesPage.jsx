/**
 * ============================================
 * Sales Management System - Frontend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 * ============================================
 */

import { useState, useMemo } from "react";

// hooks
import useSales from "../../hooks/useSales";
import useProducts from "../../hooks/useProducts";
import useReport from "../../hooks/useReport";

// components
import CreateProductCard from "./components/CreateProductCard";
import RegisterSaleCard from "./components/RegisterSaleCard";
import DateRangeCard from "./components/DateRangeCard";
import SalesHistoryCard from "./components/SalesHistoryCard";
import PieChartCard from "../../components/charts/PieChartCard";
import Toast from "../../components/common/Toast";

// utils
import { METHOD_LABELS } from "../../constants/paymentMethods";
import { getPresetRange } from "../../utils/datePresets";
import { formatCRC, formatDate, formatTime } from "../../utils/formatters";
import { filterSalesByDate } from "../../utils/filterSales";

function SalesPage() {
  // ========================
  // STATE
  // ========================
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("cash");

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [selectedProduct, setSelectedProduct] = useState("");
  const [toast, setToast] = useState(null);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");

  // ========================
  // HOOKS
  // ========================
  const { sales, createSale, loading } = useSales();
  const { products, createProduct } = useProducts();
  const { report, refetchReport } = useReport(startDate, endDate);

  // ========================
  // TOAST
  // ========================
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ========================
  // HANDLERS
  // ========================
  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);

    const product = products.find((p) => p.id === Number(productId));
    setAmount(product ? product.price : "");
  };

  const handleRegister = async () => {
    if (!amount || Number(amount) <= 0) {
      return showToast("Ingrese un monto mayor a 0.", "Error");
    }

    try {
      await createSale({
        amount: Number(amount),
        method,
        productId: selectedProduct ? Number(selectedProduct) : null
      });

      await refetchReport();

      setAmount("");
      setSelectedProduct("");

      showToast("Venta registrada correctamente");
    } catch {
      showToast("Error registrando", "Error");
    }
  };

  const handleCreateProduct = async () => {
    if (!newProductName || Number(newProductPrice) <= 0) {
      return showToast("Ingrese datos válidos", "Error");
    }

    try {
      await createProduct({
        name: newProductName,
        price: Number(newProductPrice)
      });

      setNewProductName("");
      setNewProductPrice("");

      showToast("Producto creado correctamente");
    } catch {
      showToast("Error creando producto", "Error");
    }
  };

  const applyPreset = (type) => {
    const range = getPresetRange(type);
    if (!range) return;

    setStartDate(range.start);
    setEndDate(range.end);
  };

  // ========================
  // FILTER
  // ========================
  const filteredSales = useMemo(() => {
    return filterSalesByDate(sales, startDate, endDate);
  }, [sales, startDate, endDate]);

  // ========================
  // UI
  // ========================
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Ventas</h1>

      {/* 🔥 GRID PRINCIPAL */}
      <div style={styles.grid}>
        
        {/* ================= LEFT COLUMN ================= */}
        <div style={styles.column}>
          <CreateProductCard
            newProductName={newProductName}
            setNewProductName={setNewProductName}
            newProductPrice={newProductPrice}
            setNewProductPrice={setNewProductPrice}
            handleCreateProduct={handleCreateProduct}
            styles={styles}
          />

          <RegisterSaleCard
            products={products}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            amount={amount}
            setAmount={setAmount}
            method={method}
            setMethod={setMethod}
            handleRegister={handleRegister}
            handleProductChange={handleProductChange}
            loading={loading}
            styles={styles}
            formatCRC={formatCRC}
          />

          <PieChartCard report={report} styles={styles} />
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div style={styles.column}>
          <DateRangeCard
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            applyPreset={applyPreset}
            report={report}
            styles={styles}
            formatCRC={formatCRC}
          />

          <SalesHistoryCard
            filteredSales={filteredSales}
            methodLabels={METHOD_LABELS}
            styles={styles}
            formatCRC={formatCRC}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
}

// ========================
// STYLES
// ========================
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

  // 🔥 GRID PRINCIPAL
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },

  // 🔥 COLUMNA (CLAVE)
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
  },

  cardScrollable: {
    maxHeight: "320px",
    overflowY: "auto"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db"
  },

  select: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "6px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#3D848F",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold"
  },

  saleItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    borderBottom: "1px solid #3D848F"
  },

  saleMeta: {
    fontSize: "12px",
    color: "#666"
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
    fontWeight: "bold"
  }
};

export default SalesPage;
