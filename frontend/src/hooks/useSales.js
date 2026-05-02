import { useState, useEffect, useCallback } from "react";
import API from "@/services/api";

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

      // 🔥 defensivo
      if (!res || !res.data) {
        throw new Error("Respuesta inválida del servidor");
      }

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

      // 🔥 VALIDACIÓN REAL (esto es lo importante)
      if (!res || !res.data) {
        throw new Error("Respuesta inválida al crear venta");
      }

      const newSale = res.data;

      // 🔥 UPDATE OPTIMISTA + ORDENADO
      setSales((prev) =>
        [newSale, ...prev].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );

      return newSale;
    } catch (err) {
      console.error("Error creating sale:", err);

      // 🔥 importante: mensaje más claro
      setError(err?.message || "Error creando venta");

      throw err; // 👈 esto mantiene el control en el frontend
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // RETURN
  // ========================
  return {
    sales,
    setSales,
    loading,
    error,
    fetchSales,
    createSale,
    refetchSales: fetchSales // 🔥 alias limpio
  };
}