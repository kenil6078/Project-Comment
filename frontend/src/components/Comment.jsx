import React, { useEffect, useState } from "react";
import axios from "axios";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const COMMENTS_PER_PAGE = 12;

  const getData = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    setComments(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredComments = comments.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.body.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredComments.length / COMMENTS_PER_PAGE);
  const startIndex = (page - 1) * COMMENTS_PER_PAGE;
  const currentComments = filteredComments.slice(
    startIndex,
    startIndex + COMMENTS_PER_PAGE
  );

  return (
    <div style={styles.page}>
      <div style={styles.glassContainer}>
        <h1 style={styles.heading}>💬 Community Comments</h1>

        {/* 🔍 Search */}
        <input
          style={styles.search}
          placeholder="Search comments..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* 🧊 Cards */}
        <div style={styles.grid}>
          {currentComments.map((item) => (
            <div
              key={item.id}
              style={styles.card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-6px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={styles.cardHeader}>
                <span style={styles.id}>#{item.id}</span>
                <span style={styles.email}>{item.email}</span>
              </div>
              <h3 style={styles.name}>{item.name}</h3>
              <p style={styles.body}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* ⏮ Pagination */}
        <div style={styles.pagination}>
          <button
            style={{
              ...styles.btn,
              opacity: page === 1 ? 0.4 : 1,
            }}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ⬅ Prev
          </button>

          <span style={styles.pageInfo}>
            {page} / {totalPages}
          </span>

          <button
            style={{
              ...styles.btn,
              opacity: page === totalPages ? 0.4 : 1,
            }}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;

/* 🎨 Ultra Modern Glassmorphism */
const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #6366f1, #0f172a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "32px",
  },
  glassContainer: {
    width: "100%",
    maxWidth: "1150px",
    padding: "32px",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
  },
  heading: {
    textAlign: "center",
    color: "#f8fafc",
    marginBottom: "26px",
    fontSize: "28px",
    letterSpacing: "1px",
  },
  search: {
    width: "100%",
    padding: "15px 18px",
    marginBottom: "28px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.25)",
    outline: "none",
    fontSize: "16px",
    background: "rgba(255,255,255,0.18)",
    color: "#fff",
    boxShadow: "0 0 0 rgba(99,102,241,0)",
    transition: "0.3s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "20px",
    borderRadius: "18px",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.28), rgba(255,255,255,0.08))",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    color: "#f8fafc",
    transition: "0.3s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  id: {
    fontWeight: "700",
    color: "#c7d2fe",
  },
  email: {
    fontSize: "12px",
    opacity: 0.85,
  },
  name: {
    margin: "10px 0",
    fontSize: "16px",
    fontWeight: "600",
  },
  body: {
    fontSize: "14px",
    lineHeight: "1.6",
    opacity: 0.9,
  },
  pagination: {
    marginTop: "34px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
  },
  btn: {
    padding: "11px 22px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    background:
      "linear-gradient(135deg, rgba(99,102,241,0.6), rgba(139,92,246,0.6))",
    color: "#fff",
    fontSize: "14px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    transition: "0.3s",
  },
  pageInfo: {
    color: "#e5e7eb",
    fontWeight: "600",
  },
};
