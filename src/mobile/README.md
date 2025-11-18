# ServiCombo Mobile - Aplicación React Native

Aplicación móvil del marketplace ServiCombo que conecta Solicitantes, Proveedores de Servicio y Proveedores de Insumos.

## 🚀 Tecnologías

- **React Native** con **TypeScript**
- **Expo** para desarrollo y build
- **React Navigation** (Stack + Bottom Tabs)
- **Context API + useReducer** para manejo de estado
- **AsyncStorage** para persistencia de datos
- **React Native Gesture Handler** para interacciones

## 📱 Características Principales

### ✅ Autenticación
- Login con usuarios hardcodeados
- Persistencia de sesión con AsyncStorage
- Control de acceso por rol

### ✅ Tres Roles de Usuario

#### 👤 Solicitante (Juan Pérez)
- **Email:** juan@solicitante.com
- **Password:** 123
- Dashboard personalizado con métricas
- Publicar nuevos servicios
- Ver y gestionar mis servicios
- Recibir y comparar cotizaciones
- Seleccionar mejor cotización
- Completar y calificar servicios
- Cancelar servicios

#### 🔧 Proveedor de Servicio (María González)
- **Email:** maria@proveedor.com
- **Password:** 123
- Dashboard con estadísticas de cotizaciones
- Ver servicios disponibles
- Enviar cotizaciones
- Editar cotizaciones propias
- Eliminar cotizaciones
- Ver estado de cotizaciones (pendiente/aceptada)

#### 📦 Proveedor de Insumos (Carlos Rodríguez)
- **Email:** carlos@insumos.com
- **Password:** 123
- Dashboard con stock e inventario
- CRUD completo de insumos
- Gestión de catálogo
- Control de stock bajo

## 🎨 Paleta de Colores

- **Azul Primario:** #2563EB
- **Verde Secundario:** #10B981
- **Naranja Acento:** #F4A261

## 📂 Estructura del Proyecto

```
mobile/
├── App.tsx                      # Punto de entrada
├── app.json                     # Configuración de Expo
├── package.json                 # Dependencias
├── tsconfig.json               # Configuración TypeScript
│
├── context/                    # Estado global
│   ├── AuthContext.tsx         # Autenticación con useReducer
│   └── DataContext.tsx         # Datos con useReducer
│
├── data/
│   └── mockData.ts             # Datos iniciales hardcodeados
│
├── navigation/
│   └── AppNavigator.tsx        # Configuración de navegación
│
├── screens/                    # Pantallas
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── ServicesScreen.tsx
│   ├── ServiceDetailScreen.tsx
│   ├── NewServiceScreen.tsx
│   ├── NewQuoteScreen.tsx
│   ├── MyQuotesScreen.tsx
│   ├── InsumosScreen.tsx
│   └── NewInsumoScreen.tsx
│
├── types/
│   └── index.ts                # Tipos TypeScript
│
└── constants/
    └── Colors.ts               # Paleta de colores
```

## 🛠️ Instalación

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Expo CLI
- Expo Go app (en tu dispositivo móvil) o emulador

### Pasos

1. **Navegar a la carpeta mobile:**
```bash
cd mobile
```

2. **Instalar dependencias:**
```bash
npm install
# o
yarn install
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm start
# o
expo start
```

4. **Ejecutar en dispositivo:**
- Escanea el QR con la app **Expo Go** (Android)
- Escanea con la cámara del iPhone (iOS)

5. **Ejecutar en emulador:**
```bash
npm run android  # Para Android
npm run ios      # Para iOS (solo en Mac)
```

## 📱 Uso de la Aplicación

### Login
1. Abre la aplicación
2. Usa uno de los accesos rápidos o ingresa credenciales manualmente:
   - **Solicitante:** juan@solicitante.com / 123
   - **Proveedor Servicio:** maria@proveedor.com / 123
   - **Proveedor Insumos:** carlos@insumos.com / 123

### Flujo Principal - Solicitante
1. **Dashboard** → Ver resumen de servicios
2. **Publicar Servicio** → Completar formulario
3. **Esperar Cotizaciones** → Revisar ofertas
4. **Comparar y Seleccionar** → Elegir mejor opción
5. **Completar y Calificar** → Finalizar servicio

### Flujo Principal - Proveedor de Servicio
1. **Dashboard** → Ver estadísticas
2. **Servicios** → Buscar oportunidades
3. **Enviar Cotización** → Ofertar servicio
4. **Mis Cotizaciones** → Gestionar ofertas
5. **Seguimiento** → Ver estado (pendiente/aceptada)

### Flujo Principal - Proveedor de Insumos
1. **Dashboard** → Ver inventario
2. **Agregar Insumo** → Crear nuevo producto
3. **Gestionar Catálogo** → Editar/Eliminar
4. **Control de Stock** → Monitorear disponibilidad

## 🔄 Persistencia de Datos

- Usa **AsyncStorage** para guardar:
  - Usuario autenticado
  - Servicios
  - Cotizaciones
  - Insumos
  - Packs de insumos

- Los datos persisten entre sesiones
- Al cerrar y reabrir la app, todo se mantiene

## 🎯 Funcionalidades Implementadas

### ✅ Autenticación
- [x] Login con usuarios hardcodeados
- [x] Persistencia de sesión
- [x] Logout

### ✅ Gestión de Servicios
- [x] Listar servicios (filtrado por rol)
- [x] Ver detalle de servicio
- [x] Crear nuevo servicio (solicitante)
- [x] Cambiar estados (publicado → en_evaluacion → asignado → completado/cancelado)

### ✅ Sistema de Cotizaciones
- [x] Enviar cotización (proveedor servicio)
- [x] Editar cotización propia
- [x] Eliminar cotización propia
- [x] Listar cotizaciones por servicio
- [x] Seleccionar cotización ganadora (solicitante)
- [x] Ver mis cotizaciones (proveedor)

### ✅ CRUD de Insumos
- [x] Crear insumo
- [x] Listar insumos propios
- [x] Eliminar insumo
- [x] Ver detalles

### ✅ Dashboard por Rol
- [x] Métricas personalizadas
- [x] Acciones rápidas
- [x] Navegación contextual

### ✅ Control de Permisos
- [x] Vistas según rol
- [x] Acciones restringidas por rol
- [x] Validaciones de ownership

## 📊 Datos de Prueba

La aplicación incluye datos mock para demostración:
- 4 usuarios (1 solicitante, 2 proveedores servicio, 1 proveedor insumos)
- 4 servicios de ejemplo
- 4 cotizaciones de ejemplo
- 8 insumos de ejemplo
- 2 packs de insumos

## 🔧 Scripts Disponibles

```bash
npm start          # Inicia Expo Dev Server
npm run android    # Ejecuta en emulador Android
npm run ios        # Ejecuta en emulador iOS
npm run web        # Ejecuta en navegador web
```

## 📝 Notas Técnicas

### Context + Reducer Pattern
- **AuthContext:** Maneja autenticación con `useReducer`
- **DataContext:** Maneja todos los datos con `useReducer`
- Acciones: ADD, UPDATE, DELETE, SET para cada entidad
- Persistencia automática en AsyncStorage

### Navegación
- **Stack Navigator:** Para navegación entre pantallas
- **Bottom Tab Navigator:** Para navegación principal por rol
- Tabs dinámicos según el rol del usuario

### Estilos
- StyleSheet de React Native
- Sistema de colores centralizado
- Componentes reutilizables
- Diseño responsive

## ✅ Cumplimiento de Requisitos

- ✅ React Native + TypeScript
- ✅ Context API + useReducer para estado global
- ✅ Autenticación hardcodeada (3 roles)
- ✅ Persistencia con AsyncStorage
- ✅ Todas las funcionalidades del marketplace
- ✅ Dashboard personalizado por rol
- ✅ Sistema de cotizaciones completo
- ✅ CRUD de insumos
- ✅ Control de permisos por rol
- ✅ Paleta de colores específica (#2563EB, #10B981, #F4A261)
- ✅ Navegación con React Navigation

## 🎓 Trabajo Práctico

Esta aplicación móvil complementa la aplicación web y cumple con todos los requisitos del trabajo práctico:

1. **Aplicación Web (React.js)** → Carpeta raíz `/`
2. **Aplicación Móvil (React Native)** → Carpeta `/mobile`

Ambas comparten la misma lógica de negocio, tipos de datos y funcionalidades, adaptadas a cada plataforma.

## 📱 Próximos Pasos

Para continuar desarrollando:
1. Agregar validaciones más robustas
2. Implementar búsqueda y filtros avanzados
3. Agregar notificaciones push
4. Implementar chat entre usuarios
5. Agregar mapas para ubicaciones
6. Mejorar UX con animaciones
7. Agregar tests unitarios

---

**Desarrollado para el Trabajo Práctico de ServiCombo**
