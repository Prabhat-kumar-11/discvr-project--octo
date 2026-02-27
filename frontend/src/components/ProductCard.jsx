function ProductCard({ product }) {
  return (
    <div
      style={{
        width: "320px",
        border: "1px solid #334155",
        borderRadius: "12px",
        padding: "18px 20px",
        backgroundColor: "#1e293b",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        transition: "transform 0.15s ease",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <h4 style={{ margin: 0, color: "#e2e8f0", fontSize: "1rem" }}>
        {product.name}
      </h4>
      <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8" }}>
        <span style={{ color: "#7c3aed", fontWeight: "600" }}>Category: </span>
        {product.category}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "0.9rem",
          color: "#a78bfa",
          fontWeight: "700",
        }}
      >
        ₹{product.price.toLocaleString("en-IN")}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "0.83rem",
          color: "#64748b",
          lineHeight: "1.5",
        }}
      >
        {product.description}
      </p>
    </div>
  );
}

export default ProductCard;
