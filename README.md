# Marketplace de Servicios con Insumos

Trabajo práctico de desarrollo web - Sistema de marketplace que conecta solicitantes con proveedores de servicios e insumos.

## 🎯 Características

- **3 Roles de Usuario:**
  - **Solicitante:** Publica servicios y selecciona cotizaciones
  - **Proveedor de Servicio:** Cotiza servicios publicados
  - **Proveedor de Insumos:** Ofrece packs de insumos

- **Funcionalidades Implementadas:**
  - ✅ Autenticación con localStorage
  - ✅ Rutas protegidas por rol
  - ✅ CRUD completo de servicios
  - ✅ Sistema de cotizaciones
  - ✅ Sistema de ofertas de insumos
  - ✅ Comparador de cotizaciones (ordenar por precio, plazo, rating)
  - ✅ Filtrado y búsqueda de servicios
  - ✅ Gestión de estados (Publicado → En Evaluación → Asignado → Completado)

## 🛠️ Stack Tecnológico

- **Frontend:** React 18 + TypeScript + Vite
- **Routing:** React Router DOM v6
- **Estado:** React Context + Hooks
- **API Mock:** json-server
- **Estilos:** CSS Modules

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ y npm

### Pasos

1. **Instalar dependencias:**
```bash
npm install
```

2. **Iniciar json-server (en una terminal):**
```bash
npm run server
```
Esto iniciará el servidor en `http://localhost:3001`

3. **Iniciar la aplicación (en otra terminal):**
```bash
npm run dev
```
La app estará disponible en `http://localhost:5173`

## 👥 Usuarios de Prueba

### Solicitante
- Email: `solicitante@test.com`
- Password: `123456`

### Proveedor de Servicio
- Email: `proveedor@test.com`
- Password: `123456`

### Proveedor de Insumos
- Email: `insumos@test.com`
- Password: `123456`

### Proveedor de Servicio Adicional
- Email: `ana@test.com`
- Password: `123456`

## 🗂️ Estructura del Proyecto

```
marketplace-servicios/
├── src/
│   ├── api/              # Cliente API para json-server
│   ├── components/       # Componentes reutilizables
│   │   └── layout/       # Layouts y navegación
│   ├── context/          # Contextos de React (Auth)
│   ├── pages/            # Páginas de la aplicación
│   ├── routes/           # Componentes de rutas protegidas
│   ├── styles/           # Archivos CSS
│   ├── types/            # Tipos de TypeScript
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Punto de entrada
├── db.json               # Base de datos mock
├── package.json
└── README.md
```

## 🚀 Flujo de Uso

### Como Solicitante:
1. Iniciar sesión con credenciales de solicitante
2. Ir a "Dashboard" → "Publicar Servicio"
3. Completar formulario con insumos requeridos
4. Ver cotizaciones recibidas en detalle del servicio
5. Comparar y seleccionar cotización
6. El servicio pasa a estado "Asignado"

### Como Proveedor de Servicio:
1. Iniciar sesión con credenciales de proveedor
2. Explorar servicios publicados
3. Ver detalle y enviar cotización
4. Gestionar cotizaciones enviadas

### Como Proveedor de Insumos:
1. Iniciar sesión con credenciales de insumos
2. Gestionar catálogo de insumos
3. Ver servicios y ofrecer packs de insumos
4. Gestionar ofertas enviadas

## 📋 Conceptos Implementados del Curso

### Según Slack:
- ✅ **AuthContext con localStorage** (como mostró el profe Luis)
- ✅ **Rutas protegidas** (ProtectedRoute y PublicRoute)
- ✅ **Filtrado y Sorting** (como el ejemplo de ServiceTable)
- ✅ **useEffect para cargar datos**
- ✅ **Estado local con useState**
- ✅ **Formularios controlados**

### Adicionales:
- TypeScript para type safety
- API REST con json-server
- Arquitectura escalable por features
- Componentes reutilizables
- CSS modular
- Validaciones de formularios

## 🎨 Características del Comparador

El comparador de cotizaciones permite:
- Ordenar por **precio** (menor a mayor)
- Ordenar por **plazo** (más rápido primero)
- Ordenar por **rating** (mejor valorado primero)
- Ver detalles completos de cada cotización
- Seleccionar cotización con un click
- Visual feedback de cotización seleccionada

## 📝 API Endpoints (json-server)

- `GET /users` - Obtener usuarios
- `GET /services` - Obtener servicios
- `POST /services` - Crear servicio
- `PATCH /services/:id` - Actualizar servicio
- `GET /quotes` - Obtener cotizaciones
- `POST /quotes` - Crear cotización
- `GET /supplies` - Obtener insumos
- `POST /supplies` - Crear insumo
- `GET /supplyOffers` - Obtener ofertas
- `POST /supplyOffers` - Crear oferta

## 🔒 Seguridad

- Autenticación hardcodeada (solo para desarrollo)
- Rutas protegidas por rol
- Validaciones en frontend
- Password no se expone en localStorage

## 🚧 Futuras Mejoras

- [ ] Backend real con autenticación JWT
- [ ] Subida de imágenes
- [ ] Chat entre usuarios
- [ ] Sistema de ratings real
- [ ] Notificaciones
- [ ] Pago integrado
- [ ] App móvil con React Native

## 👨‍💻 Desarrollo

### Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza build de producción
- `npm run server` - Inicia json-server
- `npm run lint` - Ejecuta linter

## 📞 Soporte

Para dudas o problemas:
1. Revisar la consola del navegador
2. Verificar que json-server esté corriendo
3. Limpiar localStorage si hay problemas de auth

## 📄 Licencia

Proyecto académico - Trabajo Práctico 2025
