# GitHub Pages Deployment Guide

## Quick Steps to Deploy

### 1. Build the Project

Run this command in your terminal:

```bash
npm run build
```

This will create/update the `docs` folder with your production build.

### 2. Commit and Push to GitHub

Open your terminal (Git Bash, PowerShell, or Command Prompt) and run:

```bash
# Add all files
git add .

# Commit changes
git commit -m "Build and deploy to GitHub Pages"

# Push to main branch
git push origin main
```

### 3. Configure GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/docs`
5. Click **Save**

### 4. Access Your Site

Your site will be available at:
- `https://yourusername.github.io/bloxvault/`
- Or if using custom domain: `https://bloxvault.site`

## Important Notes

- The `docs` folder is **committed to git** (not in .gitignore) because GitHub Pages needs it
- After pushing, wait 1-2 minutes for GitHub Pages to update
- The admin panel is accessible at: `https://yourusername.github.io/bloxvault/admin`
- **Change the admin password** before deploying (in `src/components/Admin/AdminLogin.jsx`)

## Troubleshooting

### If the site shows 404:
- Make sure the `docs` folder is committed
- Check that GitHub Pages is set to `/docs` folder
- Wait a few minutes for the deployment to complete

### If routing doesn't work:
- The `404.html` file should handle client-side routing
- Make sure it's in the `docs` folder

## Updating the Site

Every time you make changes:

1. Make your changes
2. Run `npm run build`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update site"
   git push origin main
   ```

