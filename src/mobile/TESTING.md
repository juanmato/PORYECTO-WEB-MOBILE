# 📱 Guía de Prueba - ServiCombo Mobile

## 🚀 Cómo Probar la Aplicación

### Paso 1: Instalación
```bash
cd mobile
npm install
```

### Paso 2: Iniciar Expo
```bash
npm start
```

### Paso 3: Ejecutar en Dispositivo/Emulador

#### Opción A: Dispositivo Físico
1. Instala **Expo Go** desde:
   - Android: Google Play Store
   - iOS: App Store
2. Escanea el QR que aparece en la terminal
3. La app se abrirá automáticamente

#### Opción B: Emulador Android
```bash
npm run android
```

#### Opción C: Simulador iOS (solo Mac)
```bash
npm run ios
```

## 🧪 Casos de Prueba

### Test 1: Login como Solicitante

1. **Abrir la app**
2. **Tap en "👤 Solicitante"** (acceso rápido)
3. **Verificar:**
   - ✅ Redirige al Dashboard
   - ✅ Muestra "Hola, Juan Pérez"
   - ✅ Muestra métricas (Servicios Activos, Cotizaciones Recibidas, etc.)
   - ✅ Tabs: Inicio, Mis Servicios

### Test 2: Publicar Nuevo Servicio

1. **Login como Juan** (solicitante)
2. **Tap en "Publicar Servicio"** (Dashboard)
3. **Completar formulario:**
   - Título: "Limpieza de piscina"
   - Descripción: "Limpieza completa de piscina..."
   - Categoría: "Piscinas"
   - Dirección: "Av. Test 123"
   - Ciudad: "Santiago"
   - Fecha: "2025-12-01"
4. **Tap "Publicar Servicio"**
5. **Verificar:**
   - ✅ Mensaje "Servicio publicado correctamente"
   - ✅ Vuelve a la pantalla anterior
   - ✅ El servicio aparece en "Mis Servicios"

### Test 3: Login como Proveedor de Servicio

1. **Cerrar sesión** (Tap "Salir" en Dashboard)
2. **Tap en "🔧 Proveedor de Servicio"**
3. **Verificar:**
   - ✅ Muestra "Hola, María González"
   - ✅ Dashboard con métricas (Cotizaciones Enviadas, Pendientes, etc.)
   - ✅ Tabs: Inicio, Servicios, Cotizaciones

### Test 4: Enviar Cotización

1. **Login como María** (proveedor_servicio)
2. **Tap en tab "Servicios"**
3. **Tap en un servicio publicado**
4. **Scroll down, tap "Enviar Cotización"**
5. **Completar formulario:**
   - Precio: "75000"
   - Plazo: "3"
   - Detalles: "Servicio profesional con garantía..."
6. **Tap "Enviar Cotización"**
7. **Verificar:**
   - ✅ Mensaje "Cotización enviada correctamente"
   - ✅ Vuelve al detalle del servicio
   - ✅ La cotización aparece en la lista

### Test 5: Ver Mis Cotizaciones

1. **Login como María**
2. **Tap en tab "Cotizaciones"**
3. **Verificar:**
   - ✅ Muestra todas las cotizaciones enviadas
   - ✅ Cada cotización muestra: servicio, precio, plazo
   - ✅ Botón "Ver Servicio"
   - ✅ Botón eliminar (🗑️)

### Test 6: Editar Cotización

1. **Login como María**
2. **Tap en tab "Servicios"**
3. **Tap en un servicio donde ya cotizaste**
4. **Tap "Editar"** en tu cotización
5. **Modificar datos:**
   - Cambiar precio a "80000"
6. **Tap "Actualizar Cotización"**
7. **Verificar:**
   - ✅ Mensaje "Cotización actualizada"
   - ✅ Los cambios se reflejan inmediatamente

### Test 7: Eliminar Cotización

1. **Login como María**
2. **Tap en tab "Cotizaciones"**
3. **Tap botón 🗑️** en una cotización
4. **Confirmar eliminación**
5. **Verificar:**
   - ✅ Mensaje "Cotización eliminada"
   - ✅ La cotización desaparece de la lista

### Test 8: Seleccionar Cotización (Solicitante)

1. **Login como Juan**
2. **Tap en tab "Mis Servicios"**
3. **Tap en un servicio con cotizaciones**
4. **Tap "Seleccionar"** en una cotización
5. **Confirmar selección**
6. **Verificar:**
   - ✅ Mensaje "Cotización seleccionada"
   - ✅ El estado del servicio cambia a "Asignado"
   - ✅ La cotización muestra badge "✓ Seleccionada"
   - ✅ Aparecen botones "Completar y Calificar" / "Cancelar Servicio"

### Test 9: Completar Servicio

1. **Login como Juan**
2. **Tap en servicio asignado**
3. **Tap "Completar y Calificar"**
4. **Ingresar calificación en el prompt**
5. **Verificar:**
   - ✅ Mensaje "Servicio completado y calificado"
   - ✅ Estado cambia a "Completado"

### Test 10: Login como Proveedor de Insumos

1. **Cerrar sesión**
2. **Tap en "📦 Proveedor de Insumos"**
3. **Verificar:**
   - ✅ Muestra "Hola, Carlos Rodríguez"
   - ✅ Dashboard con métricas (Insumos Registrados, Stock Total, etc.)
   - ✅ Tabs: Inicio, Servicios, Insumos

### Test 11: Agregar Insumo

1. **Login como Carlos**
2. **Tap en tab "Insumos"**
3. **Tap "+ Nuevo"**
4. **Completar formulario:**
   - Nombre: "Cloro en polvo"
   - Categoría: "piscinas"
   - Unidad: "kg"
   - Precio: "15000"
   - Stock: "100"
5. **Tap "Agregar Insumo"**
6. **Verificar:**
   - ✅ Mensaje "Insumo agregado correctamente"
   - ✅ El insumo aparece en la lista

### Test 12: Eliminar Insumo

1. **Login como Carlos**
2. **Tap en tab "Insumos"**
3. **Tap botón 🗑️** en un insumo
4. **Confirmar eliminación**
5. **Verificar:**
   - ✅ Mensaje "Insumo eliminado"
   - ✅ El insumo desaparece

### Test 13: Persistencia de Datos

1. **Login como Juan**
2. **Crear un nuevo servicio**
3. **Cerrar la app completamente** (forzar cierre)
4. **Reabrir la app**
5. **Login nuevamente como Juan**
6. **Verificar:**
   - ✅ El servicio creado sigue apareciendo
   - ✅ Todos los datos se mantienen
   - ✅ AsyncStorage funciona correctamente

### Test 14: Filtrado por Rol

1. **Login como Juan** (solicitante)
2. **Ir a "Mis Servicios"**
3. **Verificar:**
   - ✅ Solo muestra servicios creados por Juan
   - ✅ No muestra servicios de otros usuarios

4. **Cerrar sesión, login como María**
5. **Ir a "Servicios"**
6. **Verificar:**
   - ✅ Muestra todos los servicios disponibles
   - ✅ No muestra servicios cancelados

### Test 15: Navegación

1. **Login como María**
2. **Tap en tab "Servicios"**
3. **Tap en un servicio**
4. **Verificar:**
   - ✅ Muestra header con "Detalle del Servicio"
   - ✅ Botón "Atrás" funciona
   - ✅ Navegación Stack funciona correctamente

5. **Tap "Enviar Cotización"**
6. **Verificar:**
   - ✅ Abre pantalla modal
   - ✅ Botón "Atrás" vuelve al detalle

## ✅ Checklist de Funcionalidades

### Autenticación
- [ ] Login con usuarios hardcodeados funciona
- [ ] Accesos rápidos funcionan
- [ ] Logout funciona
- [ ] Persistencia de sesión funciona

### Dashboard
- [ ] Métricas se calculan correctamente por rol
- [ ] Acciones rápidas son dinámicas
- [ ] Navegación desde dashboard funciona

### Servicios (Solicitante)
- [ ] Crear servicio
- [ ] Ver mis servicios
- [ ] Ver detalles de servicio
- [ ] Seleccionar cotización
- [ ] Completar servicio
- [ ] Cancelar servicio

### Cotizaciones (Proveedor Servicio)
- [ ] Ver servicios disponibles
- [ ] Enviar cotización
- [ ] Editar mi cotización
- [ ] Eliminar mi cotización
- [ ] Ver mis cotizaciones

### Insumos (Proveedor Insumos)
- [ ] Crear insumo
- [ ] Ver catálogo
- [ ] Eliminar insumo
- [ ] Ver métricas de stock

### Persistencia
- [ ] Datos persisten al cerrar app
- [ ] AsyncStorage guarda correctamente
- [ ] Carga inicial desde AsyncStorage

### Navegación
- [ ] Tabs dinámicos por rol
- [ ] Stack navigation funciona
- [ ] Back button funciona
- [ ] Deep linking funciona

## 🐛 Problemas Conocidos

Si encuentras algún error, verifica:

1. **Expo no inicia:**
   ```bash
   # Limpiar cache
   npx expo start --clear
   ```

2. **Error de dependencias:**
   ```bash
   # Reinstalar
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Error de AsyncStorage:**
   - Verifica que la dependencia está instalada
   - Reinicia la app

4. **Tabs no aparecen:**
   - Verifica que el usuario está logueado
   - Verifica el rol del usuario

## 📝 Notas

- La app usa datos mock iniciales
- Todos los cambios se guardan en AsyncStorage
- Para resetear datos: desinstala y reinstala la app
- Los emojis en tabs funcionan mejor en dispositivos reales

---

**¡Lista para probar!** 🎉
