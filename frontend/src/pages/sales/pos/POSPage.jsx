import { useEffect, useState, useMemo } from "react";
import API from "@/services/api";
import useProducts from "@/hooks/useProducts";
import styles from "@/styles/styles";

import POSLayout from "./components/POSLayout";
import CategoryBar from "./components/CategoryBar";
import ProductPanel from "./components/ProductPanel";
import TableView from "./components/TableView";
import CheckoutOverlay from "./components/CheckoutOverlay";
import Toast from "@/components/common/Toast";
import CreateTableCard from "./components/CreateTableCard";

function POSPage() {
  const { products } = useProducts();

  const [tables, setTables] = useState([]);
  const [activeTable, setActiveTable] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [checkoutStep, setCheckoutStep] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [toast, setToast] = useState(null);
  const [newTableNumber, setNewTableNumber] = useState("");

  // ========================
  // FETCH TABLES
  // ========================
  const fetchTables = async (keepActive = false) => {
    const res = await API.get("/tables");
    setTables(res.data);

    if (keepActive && activeTable) {
      const updated = res.data.find((t) => t.id === activeTable.id);
      setActiveTable(updated || null);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // ========================
  // TOAST
  // ========================
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ========================
  // CATEGORIES
  // ========================
  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.category) map.set(p.category.id, p.category);
    });
    return Array.from(map.values());
  }, [products]);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : [];

  // ========================
  // CREATE TABLE
  // ========================
  const handleCreateTable = async () => {
    if (!newTableNumber) {
      showToast("Ingrese número de mesa", "error");
      return;
    }

    try {
      const res = await API.post("/tables", { number: newTableNumber });
      setActiveTable(res.data);
      setNewTableNumber("");
      await fetchTables(true);
      showToast("Mesa creada");
    } catch (err) {
      showToast(err?.response?.data?.message || "Error creando mesa", "error");
    }
  };

  const handleOpenTable = (table) => setActiveTable(table);

  const handleBack = async () => {
    setActiveTable(null);
    setSelectedCategory(null);
    setCheckoutStep(null);
    await fetchTables();
  };

  const handleAddProduct = async (product) => {
    if (!activeTable) return;

    try {
      await API.post(`/tables/${activeTable.id}/items`, {
        productId: product.id,
      });

      await fetchTables(true);
    } catch {
      showToast("Error agregando producto", "error");
    }
  };

  // ========================
  // CHECKOUT
  // ========================
  const handleCheckout = async (method, amountOverride) => {
    try {
      const paidTotal = (activeTable.payments || []).reduce(
        (acc, p) => acc + p.amount,
        0
      );

      const remaining = activeTable.total - paidTotal;

      const amount = amountOverride ?? remaining;

      if (amount <= 0) {
        showToast("Nada pendiente por cobrar", "error");
        return;
      }

      await API.post(`/tables/${activeTable.id}/checkout`, {
        method,
        amount,
      });

      showToast("Pago completado");
      await handleBack();
    } catch (err) {
      showToast(err?.response?.data?.message || "Error en pago", "error");
    }
  };

  // ========================
  // UI
  // ========================
  return (
    <>
      <POSLayout
        tables={tables}
        activeTable={activeTable}
        onCreateTable={handleCreateTable}
        onOpenTable={handleOpenTable}
        onBack={handleBack}
      >
        {!activeTable && (
          <CreateTableCard
            value={newTableNumber}
            onChange={setNewTableNumber}
            onCreate={handleCreateTable}
          />
        )}

        {activeTable && (
          <>
            <CategoryBar
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />

            <ProductPanel
              products={filteredProducts}
              onAdd={handleAddProduct}
            />

            <TableView
              table={activeTable}
              onCheckout={() => setCheckoutStep("confirm")}
            />
          </>
        )}

        {checkoutStep === "confirm" && (
          <CheckoutOverlay
            table={activeTable}
            onClose={() => setCheckoutStep(null)}
            onSingle={handleCheckout}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onSplit={() => {
              showToast("Split deshabilitado por ahora", "error");
            }}
          />
        )}
      </POSLayout>

      <Toast toast={toast} />
    </>
  );
}

export default POSPage;