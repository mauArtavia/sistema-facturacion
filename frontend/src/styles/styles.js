const styles = {
  container: {
    maxWidth: "1100px",
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

  // 🔥 NUEVO LAYOUT
  layout: {
    display: "flex",
    gap: "20px"
  },

  sidebar: {
    width: "200px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  sidebarButton: (active) => ({
    padding: "12px",
    background: active ? "#2c6e77" : "#3D848F",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "left"
  }),

  content: {
    flex: 1
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },

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

  // 🔥 FIX inputs overflow
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    boxSizing: "border-box"
  },

  select: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#3D848F",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  // 🔥 presets
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

  // 🔥 historial
  saleItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    borderBottom: "1px solid #e5e7eb"
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

  // 🔥 mini cards
  miniCard: {
    background: "#f9fafb",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center"
  }
};

export default styles;