function Card({ children, style }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default Card;