@echo off
title Love QR Website

cd /d "%~dp0"

echo.
echo ==========================================
echo       LOVE QR WEBSITE - SETUP
echo ==========================================
echo.

REM Find Python launcher or Python executable
where py >nul 2>nul
if %errorlevel%==0 (
    set "PYTHON=py"
    goto python_found
)

where python >nul 2>nul
if %errorlevel%==0 (
    set "PYTHON=python"
    goto python_found
)

echo Python was not found.
echo.
echo Please install Python from:
echo https://www.python.org/downloads/
echo.
pause
exit /b 1

:python_found
echo Python found.
echo.

echo Installing the QR-code package...
%PYTHON% -m pip install "qrcode[pil]"

if %errorlevel% neq 0 (
    echo.
    echo Package installation failed.
    echo Try running this file again.
    pause
    exit /b 1
)

echo.
echo Starting the website...
echo Your browser should open automatically.
echo.

%PYTHON% run.py

echo.
echo Website stopped.
pause
