@echo off
echo ========================================
echo GitHub Deployment Script
echo Gamified Learning Platform
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git is installed. Proceeding...
echo.

REM Initialize git if not already initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo.
)

REM Configure git user if not set
git config user.name >nul 2>&1
if errorlevel 1 (
    echo.
    set /p USERNAME="Enter your GitHub username: "
    set /p EMAIL="Enter your GitHub email: "
    git config --global user.name "%USERNAME%"
    git config --global user.email "%EMAIL%"
    echo Git configured successfully!
    echo.
)

REM Add all files
echo Adding all files to git...
git add .
echo.

REM Create commit
set /p COMMIT_MSG="Enter commit message (or press Enter for default): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Initial commit: Gamified Learning Platform

echo Creating commit...
git commit -m "%COMMIT_MSG%"
echo.

REM Ask for repository URL
echo.
echo ========================================
echo IMPORTANT: Create a repository on GitHub first!
echo 1. Go to https://github.com/new
echo 2. Repository name: gamified-learning-platform
echo 3. Description: Interactive educational platform
echo 4. Choose Public or Private
echo 5. DO NOT initialize with README
echo 6. Click "Create repository"
echo ========================================
echo.
pause

set /p REPO_URL="Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): "

REM Add remote origin
echo.
echo Adding remote origin...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
echo.

REM Push to GitHub
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ERROR: Failed to push to GitHub!
    echo Please check:
    echo 1. Repository URL is correct
    echo 2. You have access to the repository
    echo 3. Repository exists on GitHub
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Your code is now on GitHub!
echo ========================================
echo.
echo Repository URL: %REPO_URL%
echo.
echo Next steps:
echo 1. Visit your repository on GitHub
echo 2. Add description and topics
echo 3. Add screenshots to README
echo 4. Share your repository!
echo.
pause
