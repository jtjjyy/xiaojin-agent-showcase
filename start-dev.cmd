@echo off
REM ============================================================
REM  XiaoJin Agent - local development launcher
REM  Double-click this file, or run: start-dev.cmd
REM
REM  ASCII-only on purpose: cmd.exe parses .cmd files in the OEM
REM  codepage (GBK on this machine), so UTF-8 Chinese text corrupts
REM  the script into unparsable commands and it silently never runs.
REM ============================================================

REM Some hosts inject ELECTRON_RUN_AS_NODE=1, which makes electron.exe run as
REM plain Node and fail with: does not provide an export named 'BaseWindow'.
set "ELECTRON_RUN_AS_NODE="

set "REPO=%~dp0"
set "DESKTOP=%~dp0desktop"

if not exist "%DESKTOP%" (
  echo [ERROR] desktop folder not found: %DESKTOP%
  pause
  exit /b 1
)

if not exist "%DESKTOP%\node_modules\electron\dist\electron.exe" (
  echo [ERROR] Electron runtime missing:
  echo         %DESKTOP%\node_modules\electron\dist\electron.exe
  echo         Run npm install in the repo root and in desktop\ first.
  pause
  exit /b 1
)

echo ============================================================
echo  Starting XiaoJin Agent (dev)...
echo  Renderer dev server: http://127.0.0.1:5173/
echo  Close the app window or press Ctrl+C to stop.
echo ============================================================
echo.

cd /d "%DESKTOP%"
call npm run dev
set "CODE=%ERRORLEVEL%"

echo.
echo [exited] XiaoJin Agent stopped (exit code %CODE%).
pause
exit /b %CODE%
