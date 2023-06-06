@echo off

REM Inicia o servidor backend em segundo plano
start "" cmd /c "cd /d C:\Users\Eduardo\Documents\pi-iii-backend && npm run dev"

REM Aguarda um curto período de tempo para permitir que o servidor backend inicie
timeout /t 10

REM Inicia o servidor frontend
cd /d C:\Users\Eduardo\Documents\pi-iii-frontend
npm start
