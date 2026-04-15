function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type?.toLowerCase() === "error";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 16px",
        borderRadius: "6px",
        backgroundColor: isError ? "#dc2626" : "#16a34a",
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