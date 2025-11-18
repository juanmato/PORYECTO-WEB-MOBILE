# 🚀 Inicio Rápido - ServiCombo Mobile

## ⚡ En 3 Pasos

### 1️⃣ Instalar
```bash
cd mobile
npm install
```

### 2️⃣ Ejecutar
```bash
npm start
```

### 3️⃣ Abrir en tu dispositivo
- **Android:** Escanea el QR con Expo Go
- **iOS:** Escanea el QR con la cámara
- **Emulador:** Presiona `a` (Android) o `i` (iOS)

## 👥 Usuarios de Prueba

Usa los botones de acceso rápido o ingresa:

| Rol | Email | Password |
|-----|-------|----------|
| 👤 Solicitante | juan@solicitante.com | 123 |
| 🔧 Proveedor Servicio | maria@proveedor.com | 123 |
| 📦 Proveedor Insumos | carlos@insumos.com | 123 |

## 🎯 Qué Probar

### Como Juan (Solicitante):
1. Login → Dashboard
2. "Publicar Servicio" → Completar formulario
3. Ver servicio en "Mis Servicios"
4. Ver cotizaciones recibidas
5. Seleccionar mejor cotización
6. Completar y calificar

### Como María (Proveedor):
1. Login → Dashboard
2. Tab "Servicios" → Ver disponibles
3. Abrir servicio → "Enviar Cotización"
4. Tab "Cotizaciones" → Ver mis ofertas
5. Editar o eliminar cotización

### Como Carlos (Insumos):
1. Login → Dashboard
2. Tab "Insumos" → "+ Nuevo"
3. Agregar insumo al catálogo
4. Ver stock y métricas

## 📝 Funcionalidades Clave

✅ Context + Reducer para estado  
✅ AsyncStorage para persistencia  
✅ Tabs dinámicos por rol  
✅ CRUD completo de servicios, cotizaciones e insumos  
✅ Sistema de calificaciones  
✅ Control de permisos  

## 🐛 Si Algo Falla

```bash
# Limpiar y reiniciar
cd mobile
npx expo start --clear
```

## 📖 Más Información

- **Testing completo:** `/mobile/TESTING.md`
- **Estructura:** `/ESTRUCTURA.md`
- **README:** `/mobile/README.md`

---

**¡Listo para usar!** 🎉
