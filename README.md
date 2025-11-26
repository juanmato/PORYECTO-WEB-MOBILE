# 📱 ServiCombo Mobile App

**Aplicación React Native** del marketplace ServiCombo que conecta Solicitantes, Proveedores de Servicio y Proveedores de Insumos.

## 🚀 Inicio Rápido

### Ejecutar la Aplicación Móvil

```bash
cd mobile
npm install
npm start
```

Luego:
- **Android/iOS:** Escanea el QR con la app **Expo Go**
- **Emulador:** `npm run android` o `npm run ios`

## 👥 Usuarios de Prueba

- **Solicitante:** juan@solicitante.com / 123
- **Proveedor Servicio:** maria@proveedor.com / 123
- **Proveedor Insumos:** carlos@insumos.com / 123

## ✅ Funcionalidades Completas

### Autenticación
- ✅ Login con usuarios hardcodeados (3 roles)
- ✅ Persistencia de sesión con AsyncStorage
- ✅ Control de acceso por rol

### Gestión de Servicios (Solicitante)
- ✅ Dashboard personalizado con métricas
- ✅ Publicar nuevos servicios
- ✅ Ver y gestionar mis servicios
- ✅ Recibir y comparar cotizaciones
- ✅ Seleccionar mejor cotización
- ✅ Completar y calificar servicios
- ✅ Cancelar servicios

### Sistema de Cotizaciones (Proveedor Servicio)
- ✅ Dashboard con estadísticas
- ✅ Ver servicios disponibles
- ✅ Enviar cotizaciones
- ✅ Editar cotizaciones propias
- ✅ Eliminar cotizaciones
- ✅ Ver estado (pendiente/aceptada)

### CRUD de Insumos (Proveedor Insumos)
- ✅ Dashboard con inventario
- ✅ Crear, editar y eliminar insumos
- ✅ Gestión de catálogo
- ✅ Control de stock

## 🎨 Tecnologías

- **React Native** con **TypeScript**
- **Expo** para desarrollo y build
- **React Navigation** (Stack + Bottom Tabs)
- **Context API + useReducer** para estado global
- **AsyncStorage** para persistencia
- **Paleta de colores:** #2563EB (azul), #10B981 (verde), #F4A261 (naranja)

## 📂 Estructura del Proyecto

```
/
├── mobile/                      # 📱 APLICACIÓN MÓVIL COMPLETA
│   ├── App.tsx                  # Punto de entrada
│   ├── screens/                 # 9 pantallas funcionales
│   │   ├── LoginScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── ServicesScreen.tsx
│   │   ├── ServiceDetailScreen.tsx
│   │   ├── NewServiceScreen.tsx
│   │   ├── NewQuoteScreen.tsx
│   │   ├── MyQuotesScreen.tsx
│   │   ├── InsumosScreen.tsx
│   │   └── NewInsumoScreen.tsx
│   │
│   ├── context/                 # Estado global
│   │   ├── AuthContext.tsx      # Autenticación (useReducer)
│   │   └── DataContext.tsx      # Datos (useReducer)
│   │
│   ├── navigation/
│   │   └── AppNavigator.tsx     # Configuración navegación
│   │
│   ├── data/
│   │   └── mockData.ts          # Datos hardcodeados
│   │
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   │
│   ├── constants/
│   │   └── Colors.ts            # Paleta de colores
│   │
│   ├── README.md                # Documentación completa
│   ├── TESTING.md               # Guía de pruebas
│   └── package.json             # Dependencias móvil
│
└── [otros archivos de configuración]
```

## 📱 Scripts Disponibles (en /mobile)

```bash
npm start          # Inicia Expo Dev Server
npm run android    # Ejecuta en emulador Android
npm run ios        # Ejecuta en emulador iOS (solo Mac)
npm run web        # Ejecuta en navegador web
```

## 📖 Documentación Completa

- **`/mobile/README.md`** - Documentación detallada de la app móvil
- **`/mobile/TESTING.md`** - Guía completa de testing (15 casos de prueba)
- **`/ESTRUCTURA.md`** - Arquitectura del proyecto
- **`/INICIO_RAPIDO.md`** - Guía de inicio rápido
- **`/PROYECTO_COMPLETO.md`** - Resumen del proyecto

## 🎯 Requisitos Cumplidos

- ✅ React Native + TypeScript
- ✅ Context API + useReducer para estado global
- ✅ Autenticación hardcodeada (3 roles)
- ✅ Persistencia con AsyncStorage
- ✅ Todas las funcionalidades del marketplace
- ✅ Dashboard personalizado por rol
- ✅ Sistema de cotizaciones completo
- ✅ CRUD de servicios e insumos
- ✅ Control de permisos por rol
- ✅ React Navigation (Stack + Tabs)
- ✅ Paleta de colores específica

## 🔧 Requisitos Previos

- **Node.js** 18+
- **npm** o **yarn**
- **Expo CLI** (se instala automáticamente)
- **Expo Go** app en tu dispositivo móvil, o un emulador

## 💡 Notas Importantes

- La aplicación móvil completa está en la carpeta **`/mobile`**
- Usa **Context + Reducer pattern** para manejo de estado
- Persiste datos automáticamente con **AsyncStorage**
- Navegación dinámica por **tabs según el rol** del usuario
- Incluye datos de prueba hardcodeados para demostración

## 🚀 Próximos Pasos

1. Agregar validaciones más robustas
2. Implementar búsqueda y filtros avanzados
3. Agregar notificaciones push
4. Implementar chat entre usuarios
5. Agregar mapas para ubicaciones
6. Mejorar UX con animaciones
7. Agregar tests unitarios

---

**Desarrollado para el Trabajo Práctico de ServiCombo**

📱 **La aplicación móvil completa está en `/mobile`**
