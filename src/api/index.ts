import { Service, Quote, Supply, SupplyOffer, User } from "../types";

const API_URL = "http://localhost:3001";

// Helper para hacer fetch
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// SERVICES
export const servicesAPI = {
  getAll: () => fetchAPI<Service[]>("/services"),
  
  getById: (id: string) => fetchAPI<Service>(`/services/${id}`),
  
  getByUserId: (userId: string) =>
    fetchAPI<Service[]>(`/services?solicitanteId=${userId}`),
  
  create: (service: Omit<Service, "id" | "createdAt">) =>
    fetchAPI<Service>("/services", {
      method: "POST",
      body: JSON.stringify({
        ...service,
        createdAt: new Date().toISOString(),
      }),
    }),
  
  update: (id: string, service: Partial<Service>) =>
    fetchAPI<Service>(`/services/${id}`, {
      method: "PATCH",
      body: JSON.stringify(service),
    }),
  
  delete: (id: string) =>
    fetchAPI<void>(`/services/${id}`, {
      method: "DELETE",
    }),
};

// QUOTES
export const quotesAPI = {
  getAll: () => fetchAPI<Quote[]>("/quotes"),
  
  getById: (id: string) => fetchAPI<Quote>(`/quotes/${id}`),
  
  getByServiceId: (serviceId: string) =>
    fetchAPI<Quote[]>(`/quotes?serviceId=${serviceId}`),
  
  getByProviderId: (providerId: string) =>
    fetchAPI<Quote[]>(`/quotes?proveedorId=${providerId}`),
  
  create: (quote: Omit<Quote, "id" | "createdAt">) =>
    fetchAPI<Quote>("/quotes", {
      method: "POST",
      body: JSON.stringify({
        ...quote,
        createdAt: new Date().toISOString(),
      }),
    }),
  
  update: (id: string, quote: Partial<Quote>) =>
    fetchAPI<Quote>(`/quotes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(quote),
    }),
  
  delete: (id: string) =>
    fetchAPI<void>(`/quotes/${id}`, {
      method: "DELETE",
    }),
};

// SUPPLIES
export const suppliesAPI = {
  getAll: () => fetchAPI<Supply[]>("/supplies"),
  
  getById: (id: string) => fetchAPI<Supply>(`/supplies/${id}`),
  
  getByVendorId: (vendorId: string) =>
    fetchAPI<Supply[]>(`/supplies?vendedorId=${vendorId}`),
  
  create: (supply: Omit<Supply, "id">) =>
    fetchAPI<Supply>("/supplies", {
      method: "POST",
      body: JSON.stringify(supply),
    }),
  
  update: (id: string, supply: Partial<Supply>) =>
    fetchAPI<Supply>(`/supplies/${id}`, {
      method: "PATCH",
      body: JSON.stringify(supply),
    }),
  
  delete: (id: string) =>
    fetchAPI<void>(`/supplies/${id}`, {
      method: "DELETE",
    }),
};

// SUPPLY OFFERS
export const supplyOffersAPI = {
  getAll: () => fetchAPI<SupplyOffer[]>("/supplyOffers"),
  
  getById: (id: string) => fetchAPI<SupplyOffer>(`/supplyOffers/${id}`),
  
  getByServiceId: (serviceId: string) =>
    fetchAPI<SupplyOffer[]>(`/supplyOffers?serviceId=${serviceId}`),
  
  getByVendorId: (vendorId: string) =>
    fetchAPI<SupplyOffer[]>(`/supplyOffers?vendedorId=${vendorId}`),
  
  create: (offer: Omit<SupplyOffer, "id" | "createdAt">) =>
    fetchAPI<SupplyOffer>("/supplyOffers", {
      method: "POST",
      body: JSON.stringify({
        ...offer,
        createdAt: new Date().toISOString(),
      }),
    }),
  
  update: (id: string, offer: Partial<SupplyOffer>) =>
    fetchAPI<SupplyOffer>(`/supplyOffers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(offer),
    }),
  
  delete: (id: string) =>
    fetchAPI<void>(`/supplyOffers/${id}`, {
      method: "DELETE",
    }),
};

// USERS (solo para admin/debugging, no exponer en producción)
export const usersAPI = {
  getAll: () => fetchAPI<User[]>("/users"),
  
  getById: (id: string) => fetchAPI<User>(`/users/${id}`),
};
