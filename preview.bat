@echo off
title WitchCraftMC - Jekyll Preview
color 0A
cd /d "%~dp0"

echo.
echo  ==========================================
echo   WitchCraftMC Wiki - Local Preview Server
echo  ==========================================
echo.

:: Check Ruby is installed
where ruby >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo  [ERROR] Ruby not found.
    echo.
    echo  Install Ruby from: https://rubyinstaller.org/downloads/
    echo  Make sure to check "Add Ruby to PATH" during install.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('ruby -v') do echo  Ruby found: %%v

:: Install/update bundler if needed
echo.
echo  Checking Bundler...
where bundle >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo  Installing Bundler...
    gem install bundler
)

:: Install gems if Gemfile.lock is missing or outdated
echo.
echo  Installing gem dependencies (first run may take a minute)...
call bundle install
if %ERRORLEVEL% neq 0 (
    echo.
    echo  [ERROR] bundle install failed. Check the output above for details.
    pause
    exit /b 1
)

:: Start Jekyll
echo.
echo  ==========================================
echo   Starting server at http://localhost:4000
echo   Pages auto-reload when you save a file.
echo   Press Ctrl+C to stop.
echo  ==========================================
echo.

bundle exec jekyll serve --livereload --baseurl "" --open-url
if %ERRORLEVEL% neq 0 (
    echo.
    echo  [ERROR] Jekyll failed to start. Check the output above.
    pause
)
