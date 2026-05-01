const PRIMARY = "#3D848F";
const PRIMARY_DARK = "#2F6B73";
const HOVER_DARK = "#2A2A2A";

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

  // ========================
  // LAYOUT
  // ========================
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
    background: active ? PRIMARY_DARK : PRIMARY,
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s ease",
    transform: "scale(1)"
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

  // ========================
  // CARDS
  // ========================
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

  // ========================
  // INPUTS
  // ========================
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    boxSizing: "border-box",
    transition: "all 0.15s ease"
  },

  select: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    boxSizing: "border-box",
    transition: "all 0.15s ease"
  },

  // ========================
  // BUTTONS BASE
  // ========================
  button: {
    width: "100%",
    padding: "12px",
    background: PRIMARY,
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.15s ease",
    transform: "scale(1)"
  },

  buttonHover: {
    background: HOVER_DARK
  },

  buttonActive: {
    background: PRIMARY,
    boxShadow: "0 0 12px rgba(61, 132, 143, 0.55)",
    transform: "scale(1.05)"
  },

  // ========================
  // PRESETS (CATEGORÍAS / LISTAS)
  // ========================
  presetContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px"
  },

  presetButton: {
    flex: 1,
    padding: "10px",
    background: PRIMARY,
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.15s ease",
    transform: "scale(1)"
  },

  presetButtonActive: {
    background: PRIMARY,
    boxShadow: "0 0 12px rgba(61, 132, 143, 0.55)",
    transform: "scale(1.05)"
  },

  presetButtonHover: {
    background: HOVER_DARK,
    transform: "scale(1.03)"
  },

  // ========================
  // SALES / LISTS
  // ========================
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

  // ========================
  // MINI CARDS
  // ========================
  miniCard: {
    background: "#f9fafb",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center"
  },

  // ========================
  // POS ESPECÍFICO
  // ========================

  // Header tipo POS
  posHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },

  // Categorías
  categoryBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },

  // Productos
  productList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxHeight: "250px",
    overflowY: "auto"
  },

  // Mesa
  tableHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  tableTotal: {
    fontWeight: "bold",
    marginTop: "10px",
    fontSize: "16px"
  },

  // ========================
  // OVERLAYS
  // ========================
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  overlayBox: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
  },

  // ========================
  // BOTONES VARIANTES
  // ========================
  buttonSecondary: {
    background: "#6b7280",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  buttonDanger: {
    background: "#dc2626",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  buttonSuccess: {
    background: "#16a34a",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  overlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
},

modalBox: {
  padding: 20,
  margin: "10% auto",
  width: 300,
},
};

export default styles;