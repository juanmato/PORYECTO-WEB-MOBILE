import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Service, Quote, SupplyOffer, Supply } from "../types";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:3001";

export function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [supplyOffers, setSupplyOffers] = useState<SupplyOffer[]>([]);
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/services/${id}`).then((res) => res.json()),
      fetch(`${API_URL}/quotes?serviceId=${id}`).then((res) => res.json()),
      fetch(`${API_URL}/supplyOffers?serviceId=${id}`).then((res) =>
        res.json()
      ),
      fetch(`${API_URL}/supplies`).then((res) => res.json()),
    ])
      .then(([serviceData, quotesData, offersData, suppliesData]) => {
        setService(serviceData);
        setQuotes(quotesData);
        setSupplyOffers(offersData);
        setSupplies(suppliesData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsLoading(false);
      });
  }, [id]);

  const handleSelectQuote = async (quoteId: string) => {
    if (!service) return;

    try {
      await fetch(`${API_URL}/services/${service.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cotizacionSeleccionadaId: quoteId,
          estado: "ASIGNADO",
        }),
      });

      // Recargar servicio
      const updatedService = await fetch(
        `${API_URL}/services/${service.id}`
      ).then((res) => res.json());
      setService(updatedService);
      alert("Cotización seleccionada exitosamente!");
    } catch (err) {
      console.error("Error selecting quote:", err);
      alert("Error al seleccionar cotización");
    }
  };

  const getSupplyName = (supplyId: string) => {
    const supply = supplies.find((s) => s.id === supplyId);
    return supply?.nombre || "Desconocido";
  };

  if (isLoading) {
    return <div style={{ padding: "20px" }}>Cargando...</div>;
  }

  if (!service) {
    return <div style={{ padding: "20px" }}>Servicio no encontrado</div>;
  }

  const canSelectQuote =
    user?.id === service.solicitanteId &&
    (service.estado === "PUBLICADO" || service.estado === "EN_EVALUACION");

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Link to="/servicios" style={{ color: "#007bff", marginBottom: "20px", display: "inline-block" }}>
        ← Volver a servicios
      </Link>

      {/* Información del servicio */}
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "20px" }}>
        <h1>{service.titulo}</h1>
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "4px",
            fontSize: "14px",
            marginBottom: "15px",
          }}
        >
          {service.estado}
        </span>

        <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
          {service.descripcion}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
          <div>
            <strong>Categoría:</strong> {service.categoria}
          </div>
          <div>
            <strong>Dirección:</strong> {service.direccion}
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
          <div style={{ marginTop: "20px" }}>
            <h3>Insumos Requeridos:</h3>
            <ul>
              {service.insumosRequeridos.map((insumo, idx) => (
                <li key={idx}>
                  {insumo.nombre} - {insumo.cantidad} {insumo.unidad}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Cotizaciones */}
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h2>Cotizaciones ({quotes.length})</h2>
          {user?.rol === "PROVEEDOR_SERVICIO" && service.estado === "PUBLICADO" && (
            <Link
              to={`/servicios/${id}/cotizar`}
              style={{
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Enviar Cotización
            </Link>
          )}
        </div>

        {quotes.length === 0 ? (
          <p style={{ color: "#666" }}>
            No hay cotizaciones disponibles aún
          </p>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            {quotes.map((quote) => (
              <div
                key={quote.id}
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor:
                    service.cotizacionSeleccionadaId === quote.id
                      ? "#e7f3ff"
                      : "#f8f9fa",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div>
                    <h4 style={{ margin: "0 0 10px 0" }}>
                      Cotización de Proveedor {quote.proveedorId}
                    </h4>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Precio:</strong> ${quote.precio.toLocaleString()}
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Plazo:</strong> {quote.plazoDias} días
                    </p>
                    {quote.detalle && (
                      <p style={{ margin: "10px 0", color: "#666" }}>
                        {quote.detalle}
                      </p>
                    )}
                    {quote.ratingProveedorMock && (
                      <p style={{ margin: "5px 0" }}>
                        ⭐ Rating: {quote.ratingProveedorMock}/5
                      </p>
                    )}
                  </div>

                  {canSelectQuote &&
                    service.cotizacionSeleccionadaId !== quote.id && (
                      <button
                        onClick={() => handleSelectQuote(quote.id)}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Seleccionar
                      </button>
                    )}

                  {service.cotizacionSeleccionadaId === quote.id && (
                    <span
                      style={{
                        padding: "4px 12px",
                        backgroundColor: "#28a745",
                        color: "white",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      SELECCIONADA
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ofertas de Insumos */}
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h2>Ofertas de Insumos ({supplyOffers.length})</h2>
          {user?.rol === "PROVEEDOR_INSUMOS" && (
            <Link
              to={`/servicios/${id}/ofrecer-insumos`}
              style={{
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Ofrecer Insumos
            </Link>
          )}
        </div>

        {supplyOffers.length === 0 ? (
          <p style={{ color: "#666" }}>
            No hay ofertas de insumos disponibles
          </p>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            {supplyOffers.map((offer) => (
              <div
                key={offer.id}
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <h4 style={{ margin: "0 0 10px 0" }}>
                  Oferta de Proveedor {offer.vendedorId}
                </h4>
                <p style={{ margin: "5px 0" }}>
                  <strong>Precio Total:</strong> $
                  {offer.precioTotal.toLocaleString()}
                </p>

                <div style={{ marginTop: "10px" }}>
                  <strong>Items:</strong>
                  <ul style={{ marginTop: "5px" }}>
                    {offer.items.map((item, idx) => (
                      <li key={idx}>
                        {getSupplyName(item.supplyId)} - Cantidad:{" "}
                        {item.cantidad}
                      </li>
                    ))}
                  </ul>
                </div>

                {offer.notas && (
                  <p style={{ marginTop: "10px", color: "#666" }}>
                    <strong>Notas:</strong> {offer.notas}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
