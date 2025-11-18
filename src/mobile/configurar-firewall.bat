@echo off
echo ============================================
echo   Configurando Firewall para Expo
echo ============================================
echo.
echo IMPORTANTE: Ejecuta este archivo como ADMINISTRADOR
echo (Click derecho - Ejecutar como Administrador)
echo.
pause

echo.
echo Agregando regla de firewall para Metro Bundler...
netsh advfirewall firewall add rule name="Expo Metro Bundler" dir=in action=allow protocol=TCP localport=8081,19000,19001,19002

echo.
echo ============================================
echo   Configuracion completada!
echo ============================================
echo.
echo Puertos abiertos: 8081, 19000, 19001, 19002
echo.
echo Ahora puedes ejecutar: start-expo.bat
echo.
pause
