# 🚀 GitHub Deployment Guide

## Step-by-Step Guide to Deploy on GitHub

### Prerequisites
- Git installed on your computer
- GitHub account created
- Project folder ready

---

## 📋 Method 1: Using Git Command Line

### Step 1: Initialize Git Repository

Open terminal in project folder:
```bash
cd "c:\Users\USER\OneDrive\Desktop\scratch project 4th year"
git init
```

### Step 2: Add All Files
```bash
git add .
```

### Step 3: Create First Commit
```bash
git commit -m "Initial commit: Gamified Learning Platform with games and certificates"
```

### Step 4: Create GitHub Repository

1. Go to https://github.com
2. Click **"New"** or **"+"** → **"New repository"**
3. Repository name: `gamified-learning-platform`
4. Description: `Interactive educational platform for rural students with AI tutor, games, and certificates`
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README (we already have one)
7. Click **"Create repository"**

### Step 5: Connect to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/gamified-learning-platform.git
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 6: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

---

## 📋 Method 2: Using GitHub Desktop (Easier)

### Step 1: Download GitHub Desktop
- Download from: https://desktop.github.com/
- Install and sign in with your GitHub account

### Step 2: Add Repository
1. Open GitHub Desktop
2. Click **"File"** → **"Add Local Repository"**
3. Browse to: `c:\Users\USER\OneDrive\Desktop\scratch project 4th year`
4. Click **"Add Repository"**

### Step 3: Create Repository on GitHub
1. Click **"Publish repository"** button
2. Name: `gamified-learning-platform`
3. Description: `Interactive educational platform for rural students`
4. Choose **Public** or **Private**
5. Uncheck **"Keep this code private"** if you want it public
6. Click **"Publish Repository"**

Done! Your code is now on GitHub.

---

## 📋 Method 3: Using VS Code (Recommended)

### Step 1: Open Project in VS Code
```bash
cd "c:\Users\USER\OneDrive\Desktop\scratch project 4th year"
code .
```

### Step 2: Initialize Git
1. Click **Source Control** icon (left sidebar)
2. Click **"Initialize Repository"**

### Step 3: Stage All Files
1. Click **"+"** next to "Changes" to stage all files
2. Or click **"+"** next to each file individually

### Step 4: Commit
1. Type commit message: `Initial commit: Complete platform with games and certificates`
2. Click **✓** (checkmark) or press `Ctrl+Enter`

### Step 5: Publish to GitHub
1. Click **"Publish to GitHub"** button
2. Choose repository name: `gamified-learning-platform`
3. Choose **Public** or **Private**
4. Click **"Publish"**

---

## 🔄 Update Repository (After Changes)

### Using Command Line
```bash
git add .
git commit -m "Description of changes"
git push
```

### Using GitHub Desktop
1. Write commit message
2. Click **"Commit to main"**
3. Click **"Push origin"**

### Using VS Code
1. Stage changes (click **+**)
2. Write commit message
3. Click **✓** (commit)
4. Click **"Sync Changes"** or **"Push"**

---

## 📝 Important Files to Update

### Before Pushing to GitHub

1. **Update README.md**
   - Replace `YOUR_USERNAME` with your GitHub username
   - Add your name in Authors section
   - Update support email

2. **Check .gitignore**
   - Ensure sensitive files are ignored
   - `.env` files should be in .gitignore
   - `node_modules/` should be ignored

3. **Update package.json**
   - Add repository URL:
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/YOUR_USERNAME/gamified-learning-platform.git"
   }
   ```

---

## 🌐 Deploy to GitHub Pages (Optional)

### For Frontend Only

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/gamified-learning-platform",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

4. **Enable GitHub Pages**
   - Go to repository → Settings → Pages
   - Source: `gh-pages` branch
   - Click Save

---

## 🔐 Environment Variables on GitHub

### For GitHub Actions or Deployment

1. Go to repository → Settings → Secrets and variables → Actions
2. Click **"New repository secret"**
3. Add secrets:
   - `VITE_API_BASE`
   - `OLLAMA_BASE_URL`
   - etc.

---

## 📊 Repository Settings

### Recommended Settings

1. **About Section**
   - Add description
   - Add website URL
   - Add topics: `education`, `react`, `typescript`, `ai`, `gamification`

2. **Branch Protection**
   - Settings → Branches → Add rule
   - Protect `main` branch
   - Require pull request reviews

3. **Issues**
   - Enable issues for bug reports
   - Create issue templates

4. **Discussions**
   - Enable discussions for community

---

## 📸 Add Screenshots

Create `screenshots/` folder and add:
- `teacher-dashboard.png`
- `student-dashboard.png`
- `games.png`
- `certificate.png`

Update README with actual screenshot paths.

---

## 🎯 Post-Deployment Checklist

- [ ] Repository is public/private as intended
- [ ] README.md is complete and accurate
- [ ] .gitignore is properly configured
- [ ] All sensitive data is removed
- [ ] Screenshots are added
- [ ] License file is included
- [ ] Repository description is set
- [ ] Topics/tags are added
- [ ] Repository URL is shared

---

## 🔗 Useful Links

- **GitHub Docs**: https://docs.github.com
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf
- **GitHub Desktop**: https://desktop.github.com
- **VS Code Git**: https://code.visualstudio.com/docs/sourcecontrol/overview

---

## 🆘 Troubleshooting

### "Permission denied" error
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### "Repository not found" error
- Check repository URL
- Ensure you have access rights
- Try HTTPS instead of SSH

### Large files error
- Files over 100MB need Git LFS
- Or add to .gitignore

### Merge conflicts
```bash
git pull origin main
# Resolve conflicts in files
git add .
git commit -m "Resolved conflicts"
git push
```

---

**Your project is now on GitHub! 🎉**

Share your repository URL:
`https://github.com/YOUR_USERNAME/gamified-learning-platform`
