@echo off
title Portal de Aplicativos de Suporte
echo ====================================================
echo Iniciando o Portal de Aplicativos de Suporte
echo ====================================================
echo.
echo O portal estara disponivel em: http://localhost:3040
echo.
echo Pressione CTRL+C para encerrar o servidor.
echo.
py --version >nul 2>&1
if %errorlevel% equ 0 (
    py -m http.server 3040
) else (
    python -m http.server 3040
)

if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Nao foi possivel iniciar o servidor usando 'py' ou 'python'.
    echo Certifique-se de que o Python esta instalado e configurado no PATH do sistema.
    echo.
)

pause
