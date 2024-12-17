import React from "react";

const HomePage = ({ onStart }) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to Your Event Planner</h1>
        <p style={styles.subtitle}>Effortlessly plan, view, and manage your events.</p>
        <button style={styles.button} onClick={onStart}>
          Plan Events Now
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    maxWidth: "600px",
  },
  title: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "20px",
    marginBottom: "40px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#ff8c00",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default HomePage;
