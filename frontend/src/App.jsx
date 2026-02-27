import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";

const API = "http://localhost:5000";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/api/products`)
      .then((res) => {
        setAllProducts(res.data);
        setProducts(res.data);
      })
      .catch(() =>
        setError("Failed to load products. Is the backend running?"),
      );
  }, []);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSummary("");
    try {
      const res = await axios.post(`${API}/api/ask`, { query });
      setProducts(res.data.products);
      setSummary(res.data.summary);
    } catch (err) {
      const msg =
        err.response?.data?.error || "AI request failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
    setQuery("");
  };

  const handleReset = () => {
    setQuery("");
    setSummary("");
    setError("");
    setProducts(allProducts);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAsk();
  };

  const styles = {
    wrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "32px 24px",
    },
    heading: {
      fontSize: "1.8rem",
      fontWeight: "700",
      marginBottom: "24px",
      color: "#a78bfa",
      letterSpacing: "0.5px",
    },
    searchRow: {
      display: "flex",
      gap: "10px",
      marginBottom: "16px",
    },
    input: {
      flex: 1,
      padding: "10px 14px",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "1px solid #334155",
      backgroundColor: "#1e293b",
      color: "#e2e8f0",
      outline: "none",
    },
    askBtn: {
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#7c3aed",
      color: "#fff",
      fontWeight: "600",
      cursor: "pointer",
      fontSize: "0.95rem",
    },
    resetBtn: {
      padding: "10px 20px",
      borderRadius: "8px",
      border: "1px solid #475569",
      backgroundColor: "#1e293b",
      color: "#94a3b8",
      fontWeight: "600",
      cursor: "pointer",
      fontSize: "0.95rem",
    },
    error: {
      color: "#f87171",
      background: "#2d1a1a",
      padding: "10px 14px",
      borderRadius: "8px",
      marginBottom: "12px",
      border: "1px solid #7f1d1d",
    },
    summary: {
      background: "#1e293b",
      border: "1px solid #334155",
      padding: "12px 16px",
      borderRadius: "8px",
      marginBottom: "16px",
      color: "#94a3b8",
      lineHeight: "1.6",
    },
    noProducts: {
      color: "#64748b",
      marginTop: "20px",
      textAlign: "center",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      justifyContent: "center",
      marginTop: "8px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}> Product Discovery AI</h2>

      <div style={styles.searchRow}>
        <input
          type="text"
          placeholder="Ask something… e.g. 'budget laptops and mobiles' or 'gaming under ₹80k'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <button onClick={handleAsk} disabled={loading} style={styles.askBtn}>
          {loading ? "Thinking…" : "Ask AI"}
        </button>
        {summary && (
          <button onClick={handleReset} style={styles.resetBtn}>
            Reset
          </button>
        )}
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {summary && <p style={styles.summary}>{summary}</p>}

      {products.length === 0 && !loading && (
        <p style={styles.noProducts}>No products found.</p>
      )}

      <div style={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default App;
