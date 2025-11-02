# SimasiaAI Website

Modern React.js website for SimasiaAI - Τεχνητή Νοημοσύνη που Συνδέει Ανθρώπους

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
simasiaAI_website/
├── public/
│   ├── index.html
│   └── fonts/           # Custom fonts (if you have them)
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Navbar.css
│   │   ├── Hero.js
│   │   ├── Hero.css
│   │   ├── Mission.js
│   │   ├── Mission.css
│   │   ├── Impact.js
│   │   ├── Impact.css
│   │   ├── Technology.js
│   │   ├── Technology.css
│   │   ├── Values.js
│   │   ├── Values.css
│   │   ├── CTA.js
│   │   ├── CTA.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── netlify.toml
└── README.md
```

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite

## 📦 Deployment

### Deploy to GitHub

1. **Initialize Git repository (if not done):**
   ```bash
   git init
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Commit your changes:**
   ```bash
   git commit -m "Initial commit: React version of SimasiaAI website"
   ```

4. **Create a new repository on GitHub:**
   - Go to [GitHub.com](https://github.com)
   - Click "New repository"
   - Name it (e.g., "simasiaai-website")
   - Don't initialize with README (we already have one)
   - Click "Create repository"

5. **Connect your local repository to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Deploy to Netlify

#### Option 1: Deploy via Netlify Dashboard (Easiest for beginners)

1. **Build your project first:**
   ```bash
   npm run build
   ```

2. **Go to Netlify:**
   - Visit [netlify.com](https://www.netlify.com)
   - Sign up or log in (free account works)

3. **Drag and Drop:**
   - Simply drag the `build` folder to Netlify's deploy area
   - Your site will be live in seconds!

#### Option 2: Deploy via Git (Continuous Deployment)

1. **Push your code to GitHub** (see GitHub deployment steps above)

2. **Connect to Netlify:**
   - Go to Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access your GitHub
   - Select your repository

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Click "Deploy site"

4. **Your site is live!**
   - Netlify will give you a URL like: `https://random-name-123.netlify.app`
   - You can customize the domain name in site settings

## 🎨 Features

- ✅ Modern React.js architecture
- ✅ Component-based structure
- ✅ Responsive design
- ✅ Mobile menu functionality
- ✅ Smooth scrolling navigation
- ✅ Beautiful animations and transitions
- ✅ Optimized for performance

## 📝 Notes

- The website uses Greek language (Ελληνικά)
- Custom fonts can be added to `public/fonts/` directory
- All styles are component-scoped using CSS modules pattern
- The site is fully responsive and works on all devices

## 🤝 Contributing

Feel free to submit issues or pull requests!

## 📄 License

© 2025 SimasiaAI. All rights reserved.

---

Made with ❤️ by SimasiaAI

