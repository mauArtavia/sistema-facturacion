import { useState, useEffect } from "react";
import API from "../services/api";

function SalesPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("cash");
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const methodLabels = {
    cash: "Efectivo",
    card: "Tarjeta",
    simpe: "SINPE"
  };

  // Totales
  const total = sales.reduce((sum, s) => sum + s.amount, 0);
  const totalCash = sales.filter(s => s.method === "cash").reduce((sum, s) => sum + s.amount, 0);
  const totalCard = sales.filter(s => s.method === "card").reduce((sum, s) => sum + s.amount, 0);
  const totalSimpe = sales.filter(s => s.method === "simpe").reduce((sum, s) => sum + s.amount, 0);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await API.get("/sales");
        setSales(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSales();
  }, []);

  const handleRegister = async () => {
    if (!amount) return alert("Ingrese un monto");

    setLoading(true);
    try {
      const res = await API.post("/sales", {
        amount: Number(amount),
        method
      });

      setSales(prev => [...prev, res.data]);
      setAmount("");
    } catch (error) {
      alert("Error registrando");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💰 Sistema de Ventas</h1>

      {/* INPUT CARD */}
      <div style={styles.card}>
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={styles.input}
        />

        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          style={styles.select}
        >
          <option value="cash">Efectivo</option>
          <option value="card">Tarjeta</option>
          <option value="simpe">SINPE</option>
        </select>

        <button onClick={handleRegister} style={styles.button} disabled={loading}>
          {loading ? "Registrando..." : "Registrar Venta"}
        </button>
      </div>

      {/* RESUMEN */}
      <div style={styles.card}>
        <h2>📊 Resumen</h2>
        <p>Total: ₡{total}</p>
        <p>Efectivo: ₡{totalCash}</p>
        <p>Tarjeta: ₡{totalCard}</p>
        <p>SINPE: ₡{totalSimpe}</p>
      </div>

      {/* HISTORIAL */}
      <div style={styles.card}>
        <h2>📋 Historial</h2>

        {sales.length === 0 ? (
          <p>No hay ventas</p>
        ) : (
          sales.map(sale => (
            <div key={sale.id} style={styles.saleItem}>
              <strong>₡{sale.amount}</strong>
              <span>{methodLabels[sale.method]}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial"
  },
  title: {
    textAlign: "center"
  },
  card: {
    background: "#f5f5f5",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
    input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    height: "42px",
    fontSize: "16px",
    appearance: "none"
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    height: "42px",
    fontSize: "16px",
    backgroundColor: "white",
    appearance: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  saleItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    borderBottom: "1px solid #ddd"
  }
};

export default SalesPage;