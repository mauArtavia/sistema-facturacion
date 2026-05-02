import { useEffect, useState } from "react";
import API from "@/services/api";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Error cargando productos", err);
    }
  };

  const createProduct = async (data) => {
    try {
      const res = await API.createProduct(data);
      setProducts((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    products,
    createProduct
  };
}