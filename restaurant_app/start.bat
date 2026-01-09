@echo off
echo Iniciando Gulah Restaurant App...

start cmd /k "cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000"
start cmd /k "cd frontend && npm run dev"

echo Backend y Frontend se estan iniciando en ventanas separadas.
echo URL Backend: http://localhost:8000
echo URL Frontend: http://localhost:5173
echo.
echo Presiona cualquier tecla para cerrar este mensaje (las apps seguiran corriendo).
pause > nul
