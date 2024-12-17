import React from "react";

import bg from '../images/top-view-wedding-planning-resources-arrangement.jpg'
const HomePage = ({ onStart }) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to EventHub</h1>
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
    background: `url(${bg}) no-repeat center center/cover`, // Image as background
    color: "#fff",
    textAlign: "center",
  },
  content: {
    maxWidth: "600px",
    padding: "20px",
    backdropFilter: "blur(5px)", // Optional: adds a blur effect to improve readability over the image
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: semi-transparent background to improve readability
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
    backgroundColor: "rgba(66, 40, 9, 0.63)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default HomePage;
