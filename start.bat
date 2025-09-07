@echo off
title AI Resume Reviewer - Server
color 0A

echo ================================================
echo          AI RESUME REVIEWER - SERVER
echo ================================================
echo.
echo Starting server... Please wait.
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Check if package.json exists
if not exist "package.json" (
    echo ERROR: package.json not found
    echo Please make sure you're running this from the project directory
    echo.
    pause
    exit /b 1
)

:: Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo Installing dependencies... This may take a few minutes.
    echo.
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        echo.
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
)

:: Check if .env file exists
if not exist ".env" (
    echo WARNING: .env file not found
    echo Creating sample .env file...
    echo GROQ_API_KEY=your_groq_api_key_here> .env
    echo PORT=3000>> .env
    echo.
    echo Please edit .env file and add your Groq API key
    echo Get your free API key from: https://console.groq.com
    echo.
    pause
)

:: Create uploads directory if it doesn't exist
if not exist "uploads" (
    mkdir uploads
    echo Created uploads directory
    echo.
)

:: Start the server
echo Starting AI Resume Reviewer server...
echo.
echo ================================================
echo Server will start on: http://localhost:3000
echo Press Ctrl+C to stop the server
echo Close this window to exit completely
echo ================================================
echo.

:: Open browser automatically (after a small delay)
timeout /t 3 /nobreak >nul
start "" "http://localhost:3000"

:: Start the Node.js server
npm start

:: This will run when the server stops
echo.
echo ================================================
echo Server stopped. Press any key to exit.
echo ================================================
pause >nul