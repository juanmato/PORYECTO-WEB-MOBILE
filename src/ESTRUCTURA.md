# 📁 Estructura del Proyecto ServiCombo Mobile

## 🎯 Descripción

Este proyecto contiene **ÚNICAMENTE la aplicación móvil** de ServiCombo en React Native, ubicada en la carpeta `/mobile`.

## 📂 Estructura Completa

```
/
├── README.md                            # Instrucciones principales
├── ESTRUCTURA.md                        # Este archivo
│
└── mobile/                              # 📱 APLICACIÓN MÓVIL
    │
    ├── App.tsx                          # ⚡ Punto de entrada principal
    ├── app.json                         # Configuración de Expo
    ├── package.json                     # Dependencias npm
    ├── tsconfig.json                    # Configuración TypeScript
    ├── README.md                        # Documentación mobile
    ├── TESTING.md                       # Guía de pruebas
    │
    ├── context/                         # 🔄 Estado Global (Context + Reducer)
    │   ├── AuthContext.tsx              # Autenticación con useReducer
    │   └── DataContext.tsx              # Datos del marketplace con useReducer
    │
    ├── screens/                         # 📱 Pantallas de la Aplicación
    │   ├── LoginScreen.tsx              # Pantalla de login
    │   ├── DashboardScreen.tsx          # Dashboard personalizado por rol
    │   ├── ServicesScreen.tsx           # Listado de servicios
    │   ├── ServiceDetailScreen.tsx      # Detalle de servicio + cotizaciones
    │   ├── NewServiceScreen.tsx         # Crear nuevo servicio
    │   ├── NewQuoteScreen.tsx           # Crear/editar cotización
    │   ├── MyQuotesScreen.tsx           # Mis cotizaciones (proveedor)
    │   ├── InsumosScreen.tsx            # Catálogo de insumos
    │   └── NewInsumoScreen.tsx          # Crear nuevo insumo
    │
    ├── navigation/                      # 🧭 Navegación
    │   └── AppNavigator.tsx             # Stack + Bottom Tabs Navigator
    │
    ├── data/                            # 💾 Datos Mock
    │   └── mockData.ts                  # Usuarios, servicios, cotizaciones, insumos
    │
    ├── types/                           # 📘 TypeScript
    │   └── index.ts                     # Interfaces y tipos
    │
    └── constants/                       # 🎨 Constantes
        └── Colors.ts                    # Paleta de colores
```

## 🔑 Archivos Principales

### 1. App.tsx
```typescript
// Punto de entrada con Providers
- GestureHandlerRootView
- AuthProvider (Context)
- DataProvider (Context)
- AppNavigator (Navigation)
```

### 2. Context/AuthContext.tsx
```typescript
// Autenticación con useReducer
- Estado: user, isLoading
- Acciones: LOGIN, LOGOUT, SET_LOADING
- Funciones: login(), logout()
- Persistencia: AsyncStorage
```

### 3. Context/DataContext.tsx
```typescript
// Datos con useReducer
- Estado: services, quotes, insumos, insumoPacks
- Acciones: ADD, UPDATE, DELETE, SET para cada entidad
- Funciones: addService(), updateService(), selectQuote(), etc.
- Persistencia: AsyncStorage
```

### 4. Navigation/AppNavigator.tsx
```typescript
// Navegación completa
- Stack Navigator (pantallas)
- Bottom Tab Navigator (tabs principales)
- Tabs dinámicos según rol de usuario
```

## 📱 Pantallas por Rol

### 👤 Solicitante (Juan)
- ✅ LoginScreen
- ✅ DashboardScreen
- ✅ ServicesScreen (Mis Servicios)
- ✅ ServiceDetailScreen
- ✅ NewServiceScreen

### 🔧 Proveedor Servicio (María)
- ✅ LoginScreen
- ✅ DashboardScreen
- ✅ ServicesScreen (Servicios Disponibles)
- ✅ ServiceDetailScreen
- ✅ NewQuoteScreen (Crear/Editar)
- ✅ MyQuotesScreen

### 📦 Proveedor Insumos (Carlos)
- ✅ LoginScreen
- ✅ DashboardScreen
- ✅ ServicesScreen (Ver demanda)
- ✅ InsumosScreen
- ✅ NewInsumoScreen

## 🔄 Flujo de Datos

```
1. Usuario hace acción (ej: crear servicio)
   ↓
2. Screen llama a función del Context (ej: addService())
   ↓
3. DataContext dispatch acción al Reducer
   ↓
4. Reducer actualiza estado inmutablemente
   ↓
5. useEffect detecta cambio en estado
   ↓
6. Estado se guarda en AsyncStorage
   ↓
7. Componentes se re-renderizan con nuevo estado
```

## 📦 Dependencias Clave

### Producción
```json
{
  "react": "18.2.0",
  "react-native": "0.74.1",
  "expo": "~51.0.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "react-native-gesture-handler": "~2.16.1",
  "@react-native-async-storage/async-storage": "1.23.1"
}
```

### Desarrollo
```json
{
  "@types/react": "~18.2.45",
  "typescript": "^5.3.0"
}
```

## 🎨 Sistema de Diseño

### Paleta de Colores (constants/Colors.ts)
```typescript
{
  primary: '#2563EB',      // Azul - acciones principales
  secondary: '#10B981',    // Verde - confirmaciones
  accent: '#F4A261',       // Naranja - destacados
  
  gray50-900: ...         // Escala de grises
  success/warning/danger: ...  // Estados
}
```

### Componentes de UI
- Todos los componentes usan StyleSheet de React Native
- Diseño mobile-first
- Responsive donde aplica
- Iconos: Emojis nativos

## 💾 Modelo de Datos

### User
```typescript
{
  id: string
  name: string
  email: string
  password: string
  role: 'solicitante' | 'proveedor_servicio' | 'proveedor_insumos'
  rating?: number
  phone?: string
}
```

### Service
```typescript
{
  id: string
  solicitanteId: string
  title: string
  description: string
  category: 'jardineria' | 'piscinas' | 'limpieza' | 'otros'
  address: string
  city: string
  preferredDate: string
  insumos: ServiceInsumo[]
  status: ServiceStatus
  assignedQuoteId?: string
  rating?: number
  createdAt: string
}
```

### Quote
```typescript
{
  id: string
  serviceId: string
  providerId: string
  providerName: string
  price: number
  deadline: number
  details: string
  createdAt: string
}
```

### Insumo
```typescript
{
  id: string
  name: string
  category: string
  unit: string
  unitPrice: number
  stock: number
  providerId: string
}
```

## 🚀 Comandos

```bash
# Instalación
cd mobile
npm install

# Desarrollo
npm start          # Inicia Expo Dev Server
npm run android    # Ejecuta en Android
npm run ios        # Ejecuta en iOS

# Testing
# Ver mobile/TESTING.md para casos de prueba
```

## ✅ Checklist de Implementación

### Requisitos del Proyecto
- [x] React Native + TypeScript
- [x] Expo Framework
- [x] Context API + useReducer
- [x] Autenticación hardcodeada (3 roles)
- [x] Persistencia con AsyncStorage
- [x] Dashboard personalizado por rol
- [x] Sistema completo de cotizaciones
- [x] CRUD de insumos
- [x] Control de permisos por rol
- [x] Navegación con React Navigation
- [x] Paleta de colores (#2563EB, #10B981, #F4A261)

### Funcionalidades
- [x] Login con usuarios hardcodeados
- [x] Logout y persistencia de sesión
- [x] Publicar servicio (solicitante)
- [x] Ver y buscar servicios
- [x] Enviar cotización (proveedor)
- [x] Editar cotización propia
- [x] Eliminar cotización propia
- [x] Seleccionar cotización (solicitante)
- [x] Completar y calificar servicio
- [x] Cancelar servicio
- [x] CRUD completo de insumos
- [x] Dashboard con métricas por rol
- [x] Navegación por tabs dinámicos

### Calidad del Código
- [x] TypeScript estricto
- [x] Patrones de diseño (Context, Reducer)
- [x] Código limpio y organizado
- [x] Componentes reutilizables
- [x] Manejo de errores
- [x] Validaciones de formularios

## 📝 Notas Importantes

1. **Persistencia:**
   - Usa AsyncStorage para guardar todo
   - Se inicializa con mockData si no hay datos guardados
   - Guarda automáticamente en cada cambio

2. **Navegación:**
   - Tabs cambian según el rol del usuario
   - Stack Navigator para pantallas modales
   - Back button nativo funciona correctamente

3. **Estado:**
   - Todo centralizado en Context
   - useReducer para actualizaciones inmutables
   - Single source of truth

4. **Testing:**
   - Ver `/mobile/TESTING.md` para guía completa
   - 15 casos de prueba documentados
   - Checklist de funcionalidades

## 🎓 Para el Profesor

### Cómo Evaluar:

1. **Instalar:**
   ```bash
   cd mobile
   npm install
   npm start
   ```

2. **Probar con usuarios:**
   - juan@solicitante.com / 123
   - maria@proveedor.com / 123
   - carlos@insumos.com / 123

3. **Verificar funcionalidades:**
   - Seguir `/mobile/TESTING.md`
   - Probar cada rol
   - Verificar persistencia

4. **Revisar código:**
   - Estructura en `/mobile`
   - Context + Reducer implementado
   - TypeScript en todos los archivos

---

**Proyecto Completo y Funcional** ✅
**React Native + TypeScript + Context + Reducer + AsyncStorage**
