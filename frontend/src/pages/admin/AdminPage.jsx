import { useState, useEffect } from "react";
import API from "@/services/api";
import styles from "@/styles/styles";

function AdminPage() {
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ========================
  // 🎨 FORMAT DISPLAY
  // ========================
  const formatDisplay = (text) => {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // ========================
  // 📦 LOAD CATEGORIES
  // ========================
  const fetchCategories = async () => {
    try {
      const res = await API.getCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ========================
  // 🗂️ CREATE CATEGORY
  // ========================
  const handleCreateCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      await API.createCategory({ name: categoryName.trim() });

      setCategoryName("");
      await fetchCategories();
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  // ========================
  // 🧃 CREATE PRODUCT
  // ========================
  const handleCreateProduct = async () => {
    if (
      !productName.trim() ||
      Number(productPrice) <= 0 ||
      !selectedCategory
    )
      return;

    try {
      await API.createProduct({
        name: productName.trim(),
        price: Number(productPrice),
        categoryId: Number(selectedCategory)
      });

      setProductName("");
      setProductPrice("");
      setSelectedCategory("");
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin (Temporal)</h1>

      <div style={styles.grid}>
        {/* ======================== */}
        {/* 📁 CATEGORÍAS */}
        {/* ======================== */}
        <div style={styles.card}>
          <h3>Crear Categoría</h3>

          <input
            style={styles.input}
            placeholder="Nombre de categoría"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <button style={styles.button} onClick={handleCreateCategory}>
            Crear categoría
          </button>

          <div style={{ marginTop: "15px" }}>
            {categories.length === 0 && (
              <div style={{ color: "#888" }}>
                No hay categorías
              </div>
            )}

            {categories.map((c) => (
              <div key={c.id} style={styles.saleItem}>
                {formatDisplay(c.name)}
              </div>
            ))}
          </div>
        </div>

        {/* ======================== */}
        {/* 🧃 PRODUCTOS */}
        {/* ======================== */}
        <div style={styles.card}>
          <h3>Crear Producto</h3>

          <input
            style={styles.input}
            placeholder="Nombre"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Precio"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />

          <select
            style={styles.select}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Seleccionar categoría</option>

            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {formatDisplay(c.name)}
              </option>
            ))}
          </select>

          <button style={styles.button} onClick={handleCreateProduct}>
            Crear producto
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;