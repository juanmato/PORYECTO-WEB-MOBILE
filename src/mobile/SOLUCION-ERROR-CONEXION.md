# 🔧 Solución: Error de Conexión en Expo Go

## 🎯 Problema Actual

✅ Puedes escanear el código QR
❌ Expo Go muestra "Error desconocido" o "No se puede conectar al servidor"

**Causa:** El Firewall de Windows está bloqueando el puerto 8081/19000

---

## ✅ SOLUCIÓN PASO A PASO

### 1️⃣ Abrir el Firewall en Windows

**Opción A: Automática (Más Fácil)**

Ejecuta este comando en PowerShell **como Administrador**:

```powershell
New-NetFirewallRule -DisplayName "Expo Metro Bundler" -Direction Inbound -Protocol TCP -LocalPort 8081,19000,19001,19002 -Action Allow
```

**Opción B: Manual**

1. Presiona `Windows + R`
2. Escribe: `wf.msc` y presiona Enter
3. Click en "Reglas de entrada" (Inbound Rules)
4. Click derecho → "Nueva regla" (New Rule)
5. Selecciona "Puerto" → Siguiente
6. TCP → Puertos específicos: `8081,19000,19001,19002`
7. "Permitir la conexión" → Siguiente
8. Marca todas las casillas (Dominio, Privado, Público)
9. Nombre: "Expo Metro Bundler"
10. Finalizar

### 2️⃣ Verificar que estás en la misma red WiFi

**En tu PC:**
```cmd
ipconfig
```
Busca: `Dirección IPv4: 192.168.X.X`

**En tu celular:**
- Ve a Configuración → WiFi
- Toca en la red conectada
- Verifica que empiece con `192.168.X.X`

**IMPORTANTE:** Ambos deben estar en 192.168.X.X (la misma red)

### 3️⃣ Reiniciar Expo con la opción correcta

**Opción A: Usar LAN (Recomendado)**

```cmd
cd "C:\Users\juanm\Programacion\Marketplace-mobile (2)\src\mobile"
taskkill /F /IM node.exe
npx expo start --lan
```

**Opción B: Usar Túnel (si LAN no funciona)**

```cmd
cd "C:\Users\juanm\Programacion\Marketplace-mobile (2)\src\mobile"
npm install -g @expo/ngrok
npx expo start --tunnel
```

### 4️⃣ Verificar en la Terminal

Cuando Expo inicie correctamente debes ver:

```
✅ CORRECTO:
Metro waiting on exp://192.168.1.101:8081

› Press s │ switch to development build
› Press a │ open Android
› Press w │ open web

[CÓDIGO QR]

› Metro waiting on exp://192.168.1.101:8081
› Logs for your project will appear below.
```

**El dato importante:** `exp://192.168.1.101:8081`

### 5️⃣ Escanear el QR nuevamente

1. Abre Expo Go en tu celular
2. Escanea el nuevo código QR
3. Espera 30-60 segundos (la primera carga es lenta)

---

## 🔍 Diagnóstico de Problemas

### Si sigue sin funcionar:

**Prueba 1: Verificar que Metro está escuchando**

En otra terminal:
```cmd
curl http://localhost:8081/status
```

Debería responder: `{"packager":"running"}`

**Prueba 2: Probar en el navegador primero**

```cmd
cd "C:\Users\juanm\Programacion\Marketplace-mobile (2)\src\mobile"
npx expo start --web
```

Si funciona en web, el problema es de red/firewall.

**Prueba 3: Usar IP manual**

En Expo Go, en vez de escanear el QR:
1. Ve a "Enter URL manually"
2. Escribe: `exp://192.168.1.101:8081`
3. Presiona Connect

**Prueba 4: Desactivar Firewall temporalmente**

```cmd
netsh advfirewall set allprofiles state off
```

Intenta conectar. Si funciona, el problema es el firewall.

Vuelve a activarlo:
```cmd
netsh advfirewall set allprofiles state on
```

---

## 🆘 Errores Comunes

### Error: "Could not connect to Metro"
**Causa:** Metro Bundler no está corriendo completamente
**Solución:** Asegúrate de ver "Metro waiting on..." en la terminal

### Error: "Unable to resolve module"
**Causa:** Problema con las dependencias
**Solución:**
```cmd
cd "C:\Users\juanm\Programacion\Marketplace-mobile (2)\src\mobile"
rm -rf node_modules
npm install --legacy-peer-deps
npx expo start -c
```

### Error: "Network response timed out"
**Causa:** Firewall o red diferente
**Solución:** Usa `--tunnel` en vez de `--lan`

### Error: "DevToolsPluginClient: Failed to connect to Metro"
**Causa:** Metro se inició pero hay un problema de código
**Solución:** Revisa los errores en la terminal de Metro

---

## ✅ Lista de Verificación Final

Antes de escanear el QR, verifica:

- [ ] Metro Bundler muestra "Metro waiting on exp://..."
- [ ] Firewall permite puertos 8081, 19000, 19001, 19002
- [ ] PC y celular en la misma red WiFi (192.168.X.X)
- [ ] Expo Go está actualizado en el celular
- [ ] No hay errores rojos en la terminal de Metro

---

## 🎮 Una vez que funcione

Usuarios de prueba:
- juan@solicitante.com / 123
- maria@proveedor.com / 123
- carlos@insumos.com / 123

---

**💡 Consejo:** La primera carga siempre tarda más (30-90 segundos). Sé paciente. Si ves "Downloading JavaScript bundle" en Expo Go, ¡está funcionando!
