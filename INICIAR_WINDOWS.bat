@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo EL PORVENIR - Inicio local
where node >nul 2>nul
if errorlevel 1 (
 echo No se encontro Node.js. Instala Node.js 22 LTS desde nodejs.org
 pause
 exit /b 1
)
if not exist node_modules (
 echo Instalando dependencias npm. Se requiere conexion a Internet...
 call npm install
 if errorlevel 1 (
   echo No se pudo completar npm install.
   pause
   exit /b 1
 )
)
if not exist .env.local copy .env.example .env.local >nul
echo Abre http://localhost:3000 en tu navegador
call npm run dev
pause
