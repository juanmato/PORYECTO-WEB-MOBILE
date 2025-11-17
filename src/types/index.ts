// Tipos de roles
export type Role = "SOLICITANTE" | "PROVEEDOR_SERVICIO" | "PROVEEDOR_INSUMOS";

// Usuario
export interface User {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  rol: Role;
}

// Categorías de servicios
export type ServiceCategory = "jardineria" | "piscinas" | "limpieza" | "otros";

// Estados de servicio
export type ServiceStatus = "PUBLICADO" | "EN_EVALUACION" | "ASIGNADO" | "COMPLETADO";

// Insumo requerido en un servicio
export interface InsumoRequerido {
  nombre: string;
  cantidad: number;
  unidad: string;
}

// Servicio
export interface Service {
  id: string;
  solicitanteId: string;
  titulo: string;
  descripcion: string;
  categoria: ServiceCategory;
  direccion: string;
  ciudad: string;
  fechaPreferida: string; // ISO
  insumosRequeridos: InsumoRequerido[];
  estado: ServiceStatus;
  cotizacionSeleccionadaId?: string;
  createdAt: string;
}

// Cotización
export interface Quote {
  id: string;
  serviceId: string;
  proveedorId: string;
  precio: number;
  plazoDias: number;
  detalle?: string;
  ratingProveedorMock?: number; // 1-5
  createdAt: string;
}

// Insumo (catálogo)
export interface Supply {
  id: string;
  vendedorId: string;
  nombre: string;
  categoria: string;
  unidad: string; // ej. "lts", "kg", "unidad"
  precioUnit: number;
  stock: number;
}

// Item de un pack de insumos
export interface SupplyItem {
  supplyId: string;
  cantidad: number;
}

// Pack de insumos ofrecido a un servicio
export interface SupplyOffer {
  id: string;
  serviceId: string;
  vendedorId: string;
  items: SupplyItem[];
  precioTotal: number;
  notas?: string;
  createdAt: string;
}
