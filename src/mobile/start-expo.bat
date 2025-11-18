@echo off
echo Matando procesos Node anteriores...
taskkill /F /IM node.exe 2>nul

echo.
echo Esperando 3 segundos...
timeout /t 3 /nobreak >nul

echo.
echo Iniciando Expo en modo TUNNEL (puede tardar un poco)...
echo.
call npx expo start --tunnel

pause
