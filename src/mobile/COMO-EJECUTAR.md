# 🚀 Cómo Ejecutar la Aplicación Móvil ServiCombo

## ⚠️ PROBLEMA IDENTIFICADO

Metro Bundler no se inicia correctamente desde Git Bash en Windows. El servidor se queda esperando indefinidamente y por eso Expo Go muestra "could not connect to server".

## ✅ SOLUCIÓN: Usar CMD o PowerShell

### Método 1: Usar el script start-expo.bat (MÁS FÁCIL)

1. Abre el Explorador de Windows
2. Navega a: `C:\Users\juanm\Programacion\Marketplace-mobile (2)\src\mobile`
3. Haz doble clic en el archivo: **`start-expo.bat`**
4. Espera a que aparezca el código QR (puede tardar 1-3 minutos)
5. Escanea el QR con Expo Go en tu celular

### Método 2: Desde CMD o PowerShell

1. **Abre CMD o PowerShell** (click derecho → Ejecutar como Administrador)

2. **Navega a la carpeta:**
   ```cmd
   cd "C:\Users\juanm\Programacion\Marketplace-mobile (2)\src\mobile"
   ```

3. **Mata procesos Node anteriores:**
   ```cmd
   taskkill /F /IM node.exe
   ```

4. **Inicia Expo:**
   ```cmd
   npm start
   ```

5. **Espera 1-3 minutos** hasta que veas:
   ```
   Metro waiting on exp://...
   › Press s │ switch to development build
   › Press a │ open Android
   › Press w │ open web

   [QR CODE AQUÍ]
   ```

6. **En tu celular:**
   - Descarga **Expo Go** (Play Store o App Store)
   - Abre Expo Go
   - Escanea el código QR

### Método 3: Probar en navegador primero

```cmd
cd "C:\Users\juanm\Programacion\Marketplace-mobile (2)\src\mobile"
npm run web
```

Esto abrirá la app en tu navegador para que puedas probar si funciona antes de escanear el QR.

## 🔍 Verificar que Metro se inició correctamente

Cuando Metro Bundler se inicia CORRECTAMENTE, debes ver:

```
✅ CORRECTO:
Metro waiting on exp://192.168.x.x:8081
› Press a │ open Android
[QR CODE]

❌ INCORRECTO (problema):
Starting Metro Bundler
Waiting on http://localhost:8081
Logs for your project will appear below.
[SE QUEDA ESPERANDO AQUÍ - NO APARECE QR]
```

Si ves el mensaje incorrecto:
1. Presiona `Ctrl+C` para cancelar
2. Cierra la terminal
3. Vuelve a intentar desde CMD/PowerShell (NO Git Bash)

## 👥 Usuarios de Prueba

Una vez que la app cargue en tu celular:

- **Solicitante:** juan@solicitante.com / 123
- **Proveedor Servicio:** maria@proveedor.com / 123
- **Proveedor Insumos:** carlos@insumos.com / 123

## 🆘 Si sigue sin funcionar

1. **Asegúrate de que PC y celular estén en la misma red WiFi**

2. **Verifica el firewall:** Permite conexiones en el puerto 8081

3. **Usa túnel si estás en redes diferentes:**
   ```cmd
   cd "C:\Users\juanm\Programacion\Marketplace-mobile (2)\src\mobile"
   npm install -g @expo/ngrok
   npx expo start --tunnel
   ```

4. **Limpia la caché de Expo:**
   ```cmd
   npx expo start -c
   ```

## 📝 Notas Importantes

- ⚠️ **NO uses Git Bash** - tiene problemas con Metro Bundler en Windows
- ✅ **USA CMD o PowerShell** - funcionan correctamente
- ⏱️ **Sé paciente** - Metro puede tardar 1-3 minutos en iniciar la primera vez
- 📱 **Mantén Expo Go actualizado** en tu celular

---

**¿Sigue sin funcionar?** El problema es que Metro Bundler necesita iniciar completamente antes de que Expo Go pueda conectarse. Asegúrate de ver el código QR en la terminal antes de escanear.
