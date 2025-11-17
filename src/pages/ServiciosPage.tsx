import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Service, ServiceCategory } from "../types";

const API_URL = "http://localhost:3001";

export function ServiciosPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredAndSortedServices, setFilteredAndSortedServices] = useState<
    Service[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterCategory, setFilterCategory] = useState<
    ServiceCategory | undefined
  >(undefined);

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setIsLoading(false);
      });
  }, []);

  // Implementación de filtrado y sorting como en clase
  useEffect(() => {
    setFilteredAndSortedServices(() => {
      const sortedServices = [...services];

      // Sorting por fecha
      sortedServices.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        if (sortOrder === "desc") {
          return dateB - dateA;
        }
        return dateA - dateB;
      });

      // Filtering por categoría
      let filtered = sortedServices;
      if (filterCategory !== undefined) {
        filtered = sortedServices.filter((service) => {
          return service.categoria === filterCategory;
        });
      }

      return filtered;
    });
  }, [services, sortOrder, filterCategory]);

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleFilterCategory = (category: ServiceCategory | undefined) => {
    setFilterCategory(category);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLICADO":
        return "#28a745";
      case "EN_EVALUACION":
        return "#ffc107";
      case "ASIGNADO":
        return "#007bff";
      case "COMPLETADO":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  if (isLoading) {
    return <div style={{ padding: "20px" }}>Cargando servicios...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Servicios Disponibles</h1>
        <Link
          to="/servicios/crear"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          + Crear Servicio
        </Link>
      </div>

      {/* Controles de filtrado y ordenamiento */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={handleToggleSort}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Ordenar: {sortOrder === "desc" ? "Más recientes" : "Más antiguos"}
        </button>

        <button
          onClick={() => handleFilterCategory(undefined)}
          style={{
            padding: "8px 16px",
            backgroundColor: filterCategory === undefined ? "#007bff" : "#f8f9fa",
            color: filterCategory === undefined ? "white" : "black",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Todos
        </button>

        <button
          onClick={() => handleFilterCategory("jardineria")}
          style={{
            padding: "8px 16px",
            backgroundColor:
              filterCategory === "jardineria" ? "#007bff" : "#f8f9fa",
            color: filterCategory === "jardineria" ? "white" : "black",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Jardinería
        </button>

        <button
          onClick={() => handleFilterCategory("piscinas")}
          style={{
            padding: "8px 16px",
            backgroundColor:
              filterCategory === "piscinas" ? "#007bff" : "#f8f9fa",
            color: filterCategory === "piscinas" ? "white" : "black",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Piscinas
        </button>

        <button
          onClick={() => handleFilterCategory("limpieza")}
          style={{
            padding: "8px 16px",
            backgroundColor:
              filterCategory === "limpieza" ? "#007bff" : "#f8f9fa",
            color: filterCategory === "limpieza" ? "white" : "black",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Limpieza
        </button>
      </div>

      {/* Listado de servicios */}
      {filteredAndSortedServices.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
          No hay servicios disponibles en esta categoría
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {filteredAndSortedServices.map((service) => (
            <div
              key={service.id}
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "10px",
                }}
              >
                <h2 style={{ margin: 0 }}>{service.titulo}</h2>
                <span
                  style={{
                    padding: "4px 12px",
                    backgroundColor: getStatusColor(service.estado),
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {service.estado}
                </span>
              </div>

              <p style={{ color: "#666", marginBottom: "10px" }}>
                {service.descripcion}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "10px",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                <div>
                  <strong>Categoría:</strong> {service.categoria}
                </div>
                <div>
                  <strong>Ciudad:</strong> {service.ciudad}
                </div>
                <div>
                  <strong>Fecha preferida:</strong>{" "}
                  {new Date(service.fechaPreferida).toLocaleDateString()}
                </div>
              </div>

              {service.insumosRequeridos.length > 0 && (
                <div style={{ marginBottom: "15px" }}>
                  <strong>Insumos requeridos:</strong>
                  <ul style={{ marginTop: "5px", marginLeft: "20px" }}>
                    {service.insumosRequeridos.map((insumo, idx) => (
                      <li key={idx}>
                        {insumo.nombre} - {insumo.cantidad} {insumo.unidad}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                to={`/servicios/${service.id}`}
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                Ver detalles
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
