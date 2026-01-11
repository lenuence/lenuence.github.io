# Blox Vault - Gaming Accounts Marketplace

A modern, animated React website for showcasing and selling gaming accounts with an integrated admin panel.

## Features

- 🎮 **Animated Website** - Beautiful animations and smooth transitions
- 🔐 **Admin Panel** - Secure admin dashboard for managing accounts
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Blue theme with dark background
- ⚡ **Fast Performance** - Built with Vite and React

## Tech Stack

- React 18
- Vite
- Framer Motion (animations)
- CSS3

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This will create a `docs` folder with the production build.

## Admin Panel

Access the admin dashboard at `/admin` or click the "🔐 Admin" link in the header.

**Default Password**: `bloxvault2024`

⚠️ **Important**: Change the password in `src/components/Admin/AdminLogin.jsx` before deploying!

## GitHub Pages Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Commit and push the `docs` folder:
   ```bash
   git add .
   git commit -m "Build for GitHub Pages"
   git push origin main
   ```

3. In GitHub repository settings:
   - Go to **Settings** → **Pages**
   - Set **Source** to `Deploy from a branch`
   - Select branch: `main`
   - Select folder: `/docs`
   - Click **Save**

4. Your site will be available at: `https://yourusername.github.io/bloxvault/`

## Project Structure

```
bloxvault/
├── src/
│   ├── components/       # React components
│   │   ├── Admin/       # Admin panel components
│   │   └── ...
│   ├── data/            # Account data (JSON)
│   ├── pages/           # Page components
│   └── styles/          # CSS files
├── public/              # Static assets
├── docs/                # Build output (for GitHub Pages)
└── package.json
```

## Admin Features

- Add new accounts with a form
- Edit existing accounts
- Delete admin-added accounts
- Export accounts as JSON
- Real-time updates on main site

## Customization

- **Change Admin Password**: Edit `src/components/Admin/AdminLogin.jsx`
- **Update Account Data**: Use admin panel or edit `src/data/accounts.json`
- **Modify Theme Colors**: Update CSS files in `src/styles/` and component CSS files

## License

Private project - All rights reserved

