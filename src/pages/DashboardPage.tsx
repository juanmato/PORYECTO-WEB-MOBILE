import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const { user } = useAuth();

  const getDashboardContent = () => {
    switch (user?.rol) {
      case "SOLICITANTE":
        return {
          title: "Dashboard - Solicitante",
          description: "Gestiona tus servicios y cotizaciones",
          actions: [
            { label: "Ver Servicios", path: "/servicios" },
            { label: "Crear Servicio", path: "/servicios/crear" },
            { label: "Mis Servicios", path: "/mis-servicios" },
          ],
        };
      case "PROVEEDOR_SERVICIO":
        return {
          title: "Dashboard - Proveedor de Servicio",
          description: "Encuentra servicios y envía cotizaciones",
          actions: [
            { label: "Ver Servicios Disponibles", path: "/servicios" },
            { label: "Mis Cotizaciones", path: "/mis-cotizaciones" },
          ],
        };
      case "PROVEEDOR_INSUMOS":
        return {
          title: "Dashboard - Proveedor de Insumos",
          description: "Gestiona tu catálogo y ofertas",
          actions: [
            { label: "Ver Servicios", path: "/servicios" },
            { label: "Mi Catálogo", path: "/insumos" },
            { label: "Mis Ofertas", path: "/mis-ofertas" },
          ],
        };
      default:
        return {
          title: "Dashboard",
          description: "Bienvenido al marketplace",
          actions: [],
        };
    }
  };

  const content = getDashboardContent();

  return (
    <div style={{ padding: "20px" }}>
      <h1>{content.title}</h1>
      <p style={{ color: "#666", fontSize: "18px", marginBottom: "30px" }}>
        {content.description}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {content.actions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            style={{
              padding: "20px",
              backgroundColor: "#f8f9fa",
              border: "2px solid #ddd",
              borderRadius: "8px",
              textAlign: "center",
              textDecoration: "none",
              color: "#333",
              transition: "all 0.2s",
            }}
          >
            <h3>{action.label}</h3>
          </Link>
        ))}
      </div>

      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          backgroundColor: "#e7f3ff",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Información de usuario</h3>
        <p>
          <strong>Nombre:</strong> {user?.nombre}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Rol:</strong> {user?.rol}
        </p>
      </div>
    </div>
  );
}
