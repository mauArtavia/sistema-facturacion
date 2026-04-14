import { useState, useEffect, useCallback } from "react";
import API from "../services/api";

export default function useSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ========================
  // FETCH SALES
  // ========================
  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await API.getSales();
      setSales(res.data);
    } catch (err) {
      console.error("Error fetching sales:", err);
      setError("Error cargando ventas");
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================
  // INITIAL LOAD
  // ========================
  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // ========================
  // CREATE SALE
  // ========================
  const createSale = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await API.createSale(data);

      // 🔥 update optimista del estado
      setSales((prev) => [...prev, res.data]);

      return res.data; // importante para la UI
    } catch (err) {
      console.error("Error creating sale:", err);
      setError("Error creando venta");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // RETURN
  // ========================
  return {
    sales,
    setSales, // 👈 lo dejamos porque lo estás usando en SalesPage
    loading,
    error,
    fetchSales,
    createSale
  };
}