# 📱💻 ServiCombo - Proyecto Completo

## Trabajo Práctico: Marketplace de Servicios e Insumos

Este repositorio contiene el proyecto completo de **ServiCombo**, un marketplace que conecta tres tipos de usuarios: Solicitantes, Proveedores de Servicio y Proveedores de Insumos.

---

## 🎯 Descripción del Proyecto

**ServiCombo** es una plataforma que permite:
- A los **Solicitantes**: Publicar servicios necesitados y recibir cotizaciones
- A los **Proveedores de Servicio**: Enviar cotizaciones a servicios publicados
- A los **Proveedores de Insumos**: Ofrecer materiales y crear packs de insumos

---

## 📂 Estructura del Proyecto

El proyecto está dividido en **DOS aplicaciones independientes**:

```
ServiCombo/
│
├── /                           # 💻 APLICACIÓN WEB (React.js)
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   ├── data/
│   └── types/
│
└── mobile/                     # 📱 APLICACIÓN MÓVIL (React Native)
    ├── App.tsx
    ├── screens/
    ├── context/
    ├── navigation/
    ├── data/
    └── types/
```

---

## 💻 APLICACIÓN WEB

### Tecnologías
- **React.js** + **TypeScript**
- **React Router** para navegación
- **Context API** + **useReducer** para estado global
- **Tailwind CSS** para estilos
- **localStorage** para persistencia
- **Vite** como build tool

### Características
✅ Landing page profesional  
✅ Sistema de autenticación hardcodeada (3 roles)  
✅ Dashboard personalizado por rol  
✅ Gestión completa de servicios (CRUD)  
✅ Sistema de cotizaciones con comparador  
✅ CRUD de insumos  
✅ Packs de insumos  
✅ Sistema de calificaciones  
✅ Control de permisos por rol  
✅ Persistencia total en localStorage  

### Usuarios de Prueba (Web)
- **Solicitante:** juan@solicitante.com / 123
- **Proveedor Servicio:** maria@proveedor.com / 123
- **Proveedor Insumos:** carlos@insumos.com / 123

### Cómo Ejecutar (Web)
```bash
# En la raíz del proyecto
npm install
npm run dev
# Abre http://localhost:5173
```

### Páginas Principales (Web)
1. **Landing Page** (`/`) - Presentación de la plataforma
2. **Login** (`/login`) - Autenticación
3. **Dashboard** (`/dashboard`) - Panel por rol
4. **Servicios** (`/servicios`) - Listado y gestión
5. **Detalle Servicio** (`/servicios/:id`) - Vista completa
6. **Nueva Cotización** (`/servicios/:id/cotizar`) - Formulario
7. **Comparador** (`/servicios/:id/comparar`) - Comparación de cotizaciones
8. **Mis Cotizaciones** (`/mis-cotizaciones`) - Panel de proveedor
9. **Insumos** (`/insumos`) - CRUD de insumos
10. **Demanda Insumos** (`/demanda`) - Análisis de demanda

---

## 📱 APLICACIÓN MÓVIL

### Tecnologías
- **React Native** + **TypeScript**
- **Expo** framework
- **React Navigation** (Stack + Bottom Tabs)
- **Context API** + **useReducer** para estado global
- **AsyncStorage** para persistencia
- **React Native Gesture Handler**

### Características
✅ Login con usuarios hardcodeados  
✅ Dashboard personalizado por rol  
✅ Navegación con tabs dinámicos por rol  
✅ Gestión completa de servicios  
✅ Sistema de cotizaciones (enviar, editar, eliminar)  
✅ CRUD de insumos  
✅ Persistencia con AsyncStorage  
✅ Control de permisos por rol  
✅ Diseño mobile-first responsive  

### Usuarios de Prueba (Mobile)
- **Solicitante:** juan@solicitante.com / 123
- **Proveedor Servicio:** maria@proveedor.com / 123
- **Proveedor Insumos:** carlos@insumos.com / 123

### Cómo Ejecutar (Mobile)
```bash
# Navegar a la carpeta mobile
cd mobile

# Instalar dependencias
npm install

# Iniciar Expo
npm start

# Opciones:
# - Escanear QR con Expo Go (Android)
# - Escanear con cámara iPhone (iOS)
# - Presionar 'a' para Android emulator
# - Presionar 'i' para iOS simulator (solo Mac)
```

### Pantallas Principales (Mobile)
1. **LoginScreen** - Autenticación
2. **DashboardScreen** - Panel por rol
3. **ServicesScreen** - Listado de servicios
4. **ServiceDetailScreen** - Detalle y cotizaciones
5. **NewServiceScreen** - Publicar servicio
6. **NewQuoteScreen** - Enviar/editar cotización
7. **MyQuotesScreen** - Mis cotizaciones (proveedor)
8. **InsumosScreen** - Catálogo de insumos
9. **NewInsumoScreen** - Agregar insumo

---

## 🎨 Diseño y Paleta de Colores

Ambas aplicaciones comparten la misma identidad visual:

- **Azul Primario:** `#2563EB` - Acciones principales, botones, links
- **Verde Secundario:** `#10B981` - Confirmaciones, éxitos
- **Naranja Acento:** `#F4A261` - Alertas, destacados

### Tipografía
- **Web:** Sistema sans-serif moderno (Tailwind default)
- **Mobile:** Sistema nativo (San Francisco en iOS, Roboto en Android)

---

## 🔐 Sistema de Autenticación

### Usuarios Hardcodeados (Ambas Aplicaciones)

#### 1️⃣ Juan Pérez - Solicitante
- **Email:** juan@solicitante.com
- **Password:** 123
- **ID:** 1
- **Funcionalidades:**
  - Publicar servicios
  - Ver mis servicios
  - Recibir cotizaciones
  - Comparar cotizaciones
  - Seleccionar cotización ganadora
  - Completar y calificar servicios
  - Cancelar servicios

#### 2️⃣ María González - Proveedor de Servicio
- **Email:** maria@proveedor.com
- **Password:** 123
- **ID:** 2
- **Rating:** 4.8
- **Funcionalidades:**
  - Ver servicios disponibles
  - Enviar cotizaciones
  - Editar mis cotizaciones
  - Eliminar mis cotizaciones
  - Ver estado de cotizaciones

#### 3️⃣ Carlos Rodríguez - Proveedor de Insumos
- **Email:** carlos@insumos.com
- **Password:** 123
- **ID:** 3
- **Rating:** 4.5
- **Funcionalidades:**
  - Gestionar catálogo de insumos (CRUD)
  - Ver demanda de insumos
  - Crear packs de insumos
  - Control de stock

#### 4️⃣ Ana Silva - Proveedor de Servicio
- **Email:** ana@proveedor.com
- **Password:** 123
- **ID:** 4
- **Rating:** 4.9

---

## 📊 Modelo de Datos

### Tipos Principales (Compartidos entre Web y Mobile)

```typescript
// Usuario
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'solicitante' | 'proveedor_servicio' | 'proveedor_insumos';
  rating?: number;
  phone?: string;
}

// Servicio
interface Service {
  id: string;
  solicitanteId: string;
  solicitanteName: string;
  title: string;
  description: string;
  category: 'jardineria' | 'piscinas' | 'limpieza' | 'otros';
  address: string;
  city: string;
  preferredDate: string;
  insumos: ServiceInsumo[];
  status: 'publicado' | 'en_evaluacion' | 'asignado' | 'completado' | 'cancelado';
  assignedQuoteId?: string;
  rating?: number;
  ratingComment?: string;
  createdAt: string;
}

// Cotización
interface Quote {
  id: string;
  serviceId: string;
  providerId: string;
  providerName: string;
  price: number;
  deadline: number; // días
  details: string;
  createdAt: string;
}

// Insumo
interface Insumo {
  id: string;
  name: string;
  category: string;
  unit: string;
  unitPrice: number;
  stock: number;
  providerId: string;
}

// Pack de Insumos
interface InsumoPack {
  id: string;
  name: string;
  serviceId: string;
  providerId: string;
  providerName: string;
  items: {
    insumoId: string;
    insumoName: string;
    quantity: number;
    unitPrice: number;
    unit?: string;
  }[];
  totalPrice: number;
  notes?: string;
  createdAt: string;
}
```

---

## 🔄 Flujos Principales

### Flujo Completo de un Servicio

```
1. PUBLICACIÓN (Solicitante)
   Juan publica "Limpieza de jardín"
   Estado: publicado

2. COTIZACIÓN (Proveedores)
   María envía cotización: $85,000 - 2 días
   Ana envía cotización: $95,000 - 1 día
   Estado: en_evaluacion

3. COMPARACIÓN (Solicitante)
   Juan compara cotizaciones
   Juan selecciona cotización de María
   Estado: asignado

4. EJECUCIÓN (Proveedor)
   María realiza el servicio

5. FINALIZACIÓN (Solicitante)
   Juan completa y califica: 5 estrellas
   Estado: completado
```

### Flujo de Insumos

```
1. REGISTRO (Proveedor Insumos)
   Carlos agrega "Fertilizante orgánico"
   Precio: $3,500/kg
   Stock: 150 kg

2. DEMANDA
   Sistema detecta que 3 servicios requieren fertilizante
   Total demandado: 15 kg

3. PACK (Opcional)
   Carlos crea "Pack Jardín Completo"
   Incluye: fertilizante + semillas + bolsas
   Precio total: $38,500
```

---

## 💾 Persistencia de Datos

### Web (localStorage)
```javascript
// Guardado automático en DataContext
localStorage.setItem('services', JSON.stringify(services));
localStorage.setItem('quotes', JSON.stringify(quotes));
localStorage.setItem('insumos', JSON.stringify(insumos));
localStorage.setItem('insumoPacks', JSON.stringify(insumoPacks));
```

### Mobile (AsyncStorage)
```javascript
// Guardado automático en DataContext
await AsyncStorage.setItem('services', JSON.stringify(services));
await AsyncStorage.setItem('quotes', JSON.stringify(quotes));
await AsyncStorage.setItem('insumos', JSON.stringify(insumos));
await AsyncStorage.setItem('insumoPacks', JSON.stringify(insumoPacks));
```

---

## ✅ Requisitos Cumplidos

### Requisitos Generales
- ✅ Marketplace con 3 tipos de usuarios
- ✅ Autenticación hardcodeada
- ✅ Control de permisos por rol
- ✅ Paleta de colores específica (#2563EB, #10B981, #F4A261)
- ✅ Tipografía sans-serif moderna

### Aplicación Web
- ✅ React.js + TypeScript
- ✅ Context + Reducer para estado
- ✅ Landing page profesional
- ✅ Dashboard personalizado por rol
- ✅ Gestión de servicios (CRUD)
- ✅ Sistema de cotizaciones completo
- ✅ Comparador de cotizaciones
- ✅ CRUD de insumos
- ✅ Persistencia con localStorage

### Aplicación Móvil
- ✅ React Native + TypeScript
- ✅ Context + Reducer para estado
- ✅ Expo framework
- ✅ React Navigation
- ✅ Dashboard personalizado por rol
- ✅ Gestión de servicios
- ✅ Sistema de cotizaciones
- ✅ CRUD de insumos
- ✅ Persistencia con AsyncStorage

---

## 🚀 Guía de Inicio Rápido

### Opción 1: Solo Web
```bash
# En la raíz del proyecto
npm install
npm run dev
# Visita http://localhost:5173
```

### Opción 2: Solo Mobile
```bash
# Navegar a mobile
cd mobile

# Instalar
npm install

# Ejecutar
npm start
# Escanea QR con Expo Go
```

### Opción 3: Ambas Aplicaciones
```bash
# Terminal 1 - Web
npm install
npm run dev

# Terminal 2 - Mobile
cd mobile
npm install
npm start
```

---

## 📝 Testing Manual

### Casos de Prueba Principales

#### Test 1: Publicar Servicio (Solicitante)
1. Login como Juan
2. Dashboard → "Publicar Servicio"
3. Completar formulario
4. Verificar que aparece en "Mis Servicios"

#### Test 2: Enviar Cotización (Proveedor)
1. Login como María
2. Servicios → Seleccionar servicio
3. "Enviar Cotización"
4. Completar formulario
5. Verificar en "Mis Cotizaciones"

#### Test 3: Seleccionar Cotización (Solicitante)
1. Login como Juan
2. Servicios → Ver servicio con cotizaciones
3. Comparar cotizaciones
4. Seleccionar una
5. Verificar estado "Asignado"

#### Test 4: Completar Servicio (Solicitante)
1. Login como Juan
2. Servicios → Servicio asignado
3. "Completar y Calificar"
4. Ingresar calificación
5. Verificar estado "Completado"

#### Test 5: CRUD Insumos (Proveedor Insumos)
1. Login como Carlos
2. Insumos → "Agregar Insumo"
3. Completar formulario
4. Editar insumo
5. Eliminar insumo

---

## 🎓 Entrega del Trabajo Práctico

### Archivos a Entregar
1. **Código Fuente Completo** (carpeta raíz + mobile)
2. **README.md** (este archivo)
3. **README_MOBILE.md** (en carpeta mobile)
4. **Documentación de instalación**
5. **Screenshots de la aplicación** (opcional)

### Instrucciones para el Profesor
1. Clonar repositorio
2. Ejecutar `npm install` en raíz
3. Ejecutar `npm run dev` para web
4. Para mobile: `cd mobile && npm install && npm start`
5. Usar usuarios de prueba listados arriba

---

## 📞 Información de Contacto

**Proyecto:** ServiCombo  
**Tipo:** Trabajo Práctico - Marketplace  
**Tecnologías:** React.js + React Native + TypeScript  
**Arquitectura:** Context + Reducer Pattern  

---

## 📄 Licencia

Este proyecto es parte de un trabajo práctico académico.

---

**🎉 ¡Proyecto Completo y Funcional!**

Ambas aplicaciones (Web y Mobile) están 100% operativas con todas las funcionalidades del marketplace implementadas y probadas.
