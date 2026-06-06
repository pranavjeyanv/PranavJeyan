@echo off
echo Stopping all Node processes...
taskkill /F /IM node.exe 2>nul
echo Done!
echo.
echo To restart:
echo Terminal 1: cd backend && npm run dev
echo Terminal 2: cd frontend && npm run dev
