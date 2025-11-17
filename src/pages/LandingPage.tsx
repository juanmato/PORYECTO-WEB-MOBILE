import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div style={{ padding: "50px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Marketplace de Servicios
      </h1>
      <p style={{ fontSize: "20px", color: "#666", marginBottom: "40px" }}>
        Conectamos solicitantes con proveedores de servicios y suministros
      </p>

      <div style={{ marginBottom: "40px" }}>
        <Link
          to="/login"
          style={{
            display: "inline-block",
            padding: "15px 30px",
            marginRight: "10px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            fontSize: "18px",
          }}
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/signup"
          style={{
            display: "inline-block",
            padding: "15px 30px",
            backgroundColor: "#28a745",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            fontSize: "18px",
          }}
        >
          Registrarse
        </Link>
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "60px",
        }}
      >
        <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ marginBottom: "10px" }}>Solicitantes</h3>
          <p style={{ color: "#666" }}>
            Publica servicios que necesitas y recibe cotizaciones de proveedores
            calificados
          </p>
        </div>

        <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ marginBottom: "10px" }}>Proveedores de Servicio</h3>
          <p style={{ color: "#666" }}>
            Cotiza servicios publicados y amplía tu cartera de clientes
          </p>
        </div>

        <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ marginBottom: "10px" }}>Proveedores de Insumos</h3>
          <p style={{ color: "#666" }}>
            Ofrece tus productos e insumos para los servicios que se necesitan
          </p>
        </div>
      </div>
    </div>
  );
}
