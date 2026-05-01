import { useEffect, useState, useMemo } from "react";
import API from "../../../services/api";
import useProducts from "../../../hooks/useProducts";
import { v4 as uuidv4 } from "uuid";

import POSLayout from "./components/POSLayout";
import CategoryBar from "./components/CategoryBar";
import ProductPanel from "./components/ProductPanel";
import TableView from "./components/TableView";

import CheckoutOverlay from "./components/CheckoutOverlay";
import SplitAutoOverlay from "./components/SplitAutoOverlay";
import ManualSplitOverlay from "./components/ManualSplitOverlay";

function POSPage() {
  const { products } = useProducts();

  const [tables, setTables] = useState([]);
  const [activeTable, setActiveTable] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [checkoutMode, setCheckoutMode] = useState(null);
  const [bills, setBills] = useState([]);
  const [currentBillIndex, setCurrentBillIndex] = useState(0);

  // ========================
  // DATA
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
  // ACTIONS
  // ========================
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
    setBills([]);
    setCurrentBillIndex(0);
    await fetchTables();
  };

  const handleAddProduct = async (product) => {
    if (!activeTable) return;

    await API.post(`/tables/${activeTable.id}/items`, {
      productId: product.id,
    });

    await fetchTables(true);
  };

  // ========================
  // CHECKOUT SIMPLE
  // ========================
  const handleCheckoutSingle = async () => {
    await API.post(`/tables/${activeTable.id}/checkout`, {
      method: paymentMethod,
    });

    await handleBack();
  };

  // ========================
  // SPLIT AUTOMÁTICO (FIXED)
  // ========================
  const handleSplitAutomatic = () => {
    const count = Number(prompt("Cantidad de cuentas"));
    if (!count || count <= 0) return;

    const unpaidSales = activeTable?.sales?.filter(
      (s) => !s.transactionId
    ) || [];

    if (unpaidSales.length === 0) {
      alert("No hay productos para dividir");
      return;
    }

    const chunkSize = Math.ceil(unpaidSales.length / count);

    const newBills = Array.from({ length: count }).map((_, i) => {
      const start = i * chunkSize;
      const slice = unpaidSales.slice(start, start + chunkSize);

      const total = slice.reduce(
        (acc, s) => acc + (s.amount || 0),
        0
      );

      return {
        id: uuidv4(),
        name: `Cuenta ${i + 1}`,
        total,
        paid: false,
        salesIds: slice.map((s) => s.id),
      };
    });

    setBills(newBills);
    setCheckoutMode("split-auto");
  };

  // ========================
  // PAGAR CUENTA (FIXED LOGIC)
  // ========================
  const handlePayBill = async (index) => {
    try {
      const bill = bills[index];

      if (!bill || bill.paid) return;

      if (!bill.salesIds || bill.salesIds.length === 0) {
        alert("Esta cuenta no tiene items asignados");
        return;
      }

      await API.post(`/tables/${activeTable.id}/checkout`, {
        method: paymentMethod,
        salesIds: bill.salesIds,
      });

      setBills((prev) =>
        prev.map((b, i) => (i === index ? { ...b, paid: true } : b))
      );

      await fetchTables(true);
    } catch (err) {
      console.error(err);

      alert(err?.response?.data?.message || "Error al cobrar cuenta");
    }

    console.log("PAY BILL:", bills);
  };

  // ========================
  // FINALIZAR SPLIT
  // ========================
  const handleFinishSplit = async () => {
    const unpaid = bills.some((b) => !b.paid);

    if (unpaid) {
      alert("Faltan cuentas por pagar");
      return;
    }

    await handleBack();
  };

  // ========================
  // UI
  // ========================
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
            onCheckout={() => setCheckoutMode("select")}
          />
        </>
      )}

      {checkoutMode === "select" && (
        <CheckoutOverlay
          onClose={() => setCheckoutMode(null)}
          onSingle={handleCheckoutSingle}
          onAuto={handleSplitAutomatic}
          onManual={() => setCheckoutMode("manual")}
        />
      )}

      {checkoutMode === "split-auto" && (
        <SplitAutoOverlay
          bills={bills}
          onPay={handlePayBill}
          onFinish={handleFinishSplit}
          onClose={() => setCheckoutMode(null)}
        />
      )}

      {checkoutMode === "manual" && (
        <ManualSplitOverlay
          bills={bills}
          setBills={setBills}
          currentBillIndex={currentBillIndex}
          setCurrentBillIndex={setCurrentBillIndex}
          sales={activeTable?.sales}
          onFinish={handleFinishSplit}
          onClose={() => setCheckoutMode(null)}
        />
      )}
    </POSLayout>
  );
}

export default POSPage;