import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="page-container" style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ color: "#6b6b6b", marginBottom: "2rem" }}>
        La página que buscas no existe o fue movida.
      </p>
      <Link className="button" to="/">
        Volver al inicio
      </Link>
    </div>
  );
}
