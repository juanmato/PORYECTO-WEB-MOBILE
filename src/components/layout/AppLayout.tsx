import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/AppLayout.css";

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <Link to="/dashboard" className="logo">
            🛠️ Marketplace
          </Link>

          <nav className="main-nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/servicios">Servicios</Link>

            {user.rol === "SOLICITANTE" && (
              <Link to="/servicios/mis-servicios">Mis Servicios</Link>
            )}

            {user.rol === "PROVEEDOR_SERVICIO" && (
              <Link to="/cotizaciones">Mis Cotizaciones</Link>
            )}

            {user.rol === "PROVEEDOR_INSUMOS" && (
              <>
                <Link to="/insumos/catalogo">Catálogo</Link>
                <Link to="/insumos/ofertas">Mis Ofertas</Link>
              </>
            )}
          </nav>

          <div className="user-menu">
            <span className="user-name">{user.nombre}</span>
            <span className="user-role">
              ({user.rol.replace("_", " ")})
            </span>
            <button onClick={handleLogout} className="btn-logout">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>© 2025 Marketplace de Servicios - Trabajo Práctico</p>
      </footer>
    </div>
  );
}
