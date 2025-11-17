import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ServiceForm {
  titulo: string;
  descripcion: string;
  categoria: string;
  ciudad: string;
}

const initialFormState: ServiceForm = {
  titulo: "",
  descripcion: "",
  categoria: "",
  ciudad: "",
};

export function CreateServicePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ServiceForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // En este punto se puede integrar con el backend cuando esté listo
    setTimeout(() => {
      setIsSubmitting(false);
      setForm(initialFormState);
      navigate("/servicios");
    }, 600);
  };

  return (
    <div className="page-container">
      <h1>Crear servicio</h1>
      <p style={{ marginBottom: "1.5rem", color: "#6b6b6b" }}>
        Completa la información básica del servicio. Más adelante podrás
        conectar este formulario al backend.
      </p>

      <form className="card" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Título</span>
          <input
            name="titulo"
            type="text"
            placeholder="Ej: Mantenimiento de jardín"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-field">
          <span>Descripción</span>
          <textarea
            name="descripcion"
            rows={4}
            placeholder="Describe el trabajo a realizar"
            value={form.descripcion}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-field">
          <span>Categoría</span>
          <input
            name="categoria"
            type="text"
            placeholder="Ej: jardineria"
            value={form.categoria}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-field">
          <span>Ciudad</span>
          <input
            name="ciudad"
            type="text"
            placeholder="Ej: Buenos Aires"
            value={form.ciudad}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar servicio"}
        </button>
      </form>
    </div>
  );
}
