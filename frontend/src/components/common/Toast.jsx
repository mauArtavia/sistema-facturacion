function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 16px",
        borderRadius: "6px",
        backgroundColor: toast.type === "Error" ? "#dc2626" : "#16a34a",
        color: "white",
        fontWeight: "bold",
        zIndex: 9999
      }}
    >
      {toast.message}
    </div>
  );
}

export default Toast;