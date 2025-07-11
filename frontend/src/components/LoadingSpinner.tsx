export default function LoadingSpinner() {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.5rem",
          fontWeight: "bold",
          backgroundColor: "white",
          padding: "1rem 2rem",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
        Chargement...
      </div>
    );
  }
  