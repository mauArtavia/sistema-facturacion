import { useEffect, useState, useMemo } from "react";
import API from "../../../services/api";
import useProducts from "../../../hooks/useProducts";

import styles from "../../../styles/styles";

import POSLayout from "./components/POSLayout";
import CategoryBar from "./components/CategoryBar";
import ProductPanel from "./components/ProductPanel";
import TableView from "./components/TableView";
import CheckoutOverlay from "./components/CheckoutOverlay";

function POSPage() {
  const { products } = useProducts();

  const [tables, setTables] = useState([]);
  const [activeTable, setActiveTable] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [checkoutMode, setCheckoutMode] = useState(null);
  const [splitCount, setSplitCount] = useState(0);
  const [splitPaidCount, setSplitPaidCount] = useState(0);

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

  const handleCreateTable = async () => {
    const number = prompt("Número de mesa:");
    if (!number) return;

    const res = await API.post("/tables", { number });
    setActiveTable(res.data);
    await fetchTables(true);
  };

  const handleOpenTable = (table) => {
    setActiveTable(table);
  };

  const handleBack = async () => {
    setActiveTable(null);
    setSelectedCategory(null);
    setCheckoutMode(null);
    await fetchTables();
  };

  const handleAddProduct = async (product) => {
    if (!activeTable) return;

    await API.post(`/tables/${activeTable.id}/items`, {
      productId: product.id,
    });

    await fetchTables(true);
  };

  const handleCheckoutSingle = async () => {
    await API.post(`/tables/${activeTable.id}/checkout`, {
      method: paymentMethod,
    });

    await handleBack();
  };

  const handleSplitAmount = () => {
    const count = Number(prompt("Cantidad de personas"));

    if (!count || count <= 1) return;

    setSplitCount(count);
    setSplitPaidCount(0); // 👈 importante
    setCheckoutMode("split-amount");
  };

  const handlePaySplitPart = async () => {
    try {
      const unpaidSales = activeTable.sales.filter(
        (s) => !s.transactionId
      );

      if (unpaidSales.length === 0) {
        alert("Nada pendiente");
        await handleBack(); // 👈 salir limpio
        return;
      }

      const remainingTotal = unpaidSales.reduce(
        (acc, s) => acc + s.amount,
        0
      );

      const amountPerPerson = remainingTotal / (splitCount - splitPaidCount);

      await API.post(`/tables/${activeTable.id}/checkout`, {
        method: paymentMethod,
        amount: Number(amountPerPerson.toFixed(2)),
      });

      setSplitPaidCount((prev) => prev + 1);

      await fetchTables(true);

    } catch (err) {
      alert(err?.response?.data?.message || "Error en pago");
    }
  };

  return (
    <POSLayout
      tables={tables}
      activeTable={activeTable}
      onCreateTable={handleCreateTable}
      onOpenTable={handleOpenTable}
      onBack={handleBack}
    >
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
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onCheckout={() => setCheckoutMode("confirm")}
          />
        </>
      )}

      {checkoutMode === "confirm" && (
        <CheckoutOverlay
          onClose={() => setCheckoutMode(null)}
          onSingle={handleCheckoutSingle}
          onSplit={handleSplitAmount}
        />
      )}

      {checkoutMode === "split-amount" && (
        <div style={styles.overlay}>
          <div style={{ ...styles.modalBox, ...styles.card }}>
            <h3>
              Pago {splitPaidCount + 1} de {splitCount}
            </h3>

            <button style={styles.button} onClick={handlePaySplitPart}>
              💰 Cobrar parte
            </button>

            <button
              style={styles.button}
              onClick={() => setCheckoutMode(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </POSLayout>
  );
}

export default POSPage;