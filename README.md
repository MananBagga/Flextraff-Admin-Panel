# Flextraff Admin Panel — Frontend

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-Proprietary-red)
![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06b6d4?logo=tailwind-css)

A professional, responsive admin dashboard for **Flextraff**—an adaptive traffic light control system startup. This frontend provides real-time monitoring, control, and analytics for intelligent traffic management infrastructure.

**[Deployment](#deployment) • [Quick Start](#quick-start) • [Architecture](#architecture) • [API Integration](#api-integration) • [License](#license--proprietary)**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture & Components](#architecture--components)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Development Guide](#development-guide)
- [Build & Deployment](#build--deployment)
- [Environment Configuration](#environment-configuration)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing & Support](#contributing--support)
- [License](#license--proprietary)

---

## 📱 Overview

The **Flextraff Admin Panel** is a comprehensive management interface for controlling and monitoring an adaptive traffic light system. Built with modern React and Vite, it enables operators to:

- **Monitor live traffic data** across multiple intersections
- **Control traffic light sequences** in real-time
- **View system logs** and diagnostic information
- **Run traffic scanners** to analyze network health
- **Access analytics dashboards** with charts and KPIs
- **Manage user authentication** securely with Supabase

The frontend communicates with a **FastAPI backend** (deployed on Render) which orchestrates traffic light control logic and serves analytics data.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Real-time Dashboard** | Live monitoring of traffic metrics, system health, and performance indicators |
| **Adaptive Controls** | Manage traffic light sequences and timing strategies |
| **Traffic Analytics** | Detailed traffic flow data with filtering and export capabilities |
| **System Logs** | Comprehensive logging for debugging and auditing |
| **Network Scanners** | Monitor and validate device connectivity and system health |
| **Dark Mode** | Theme switching for comfortable viewing in any environment |
| **Authentication** | Secure login with Supabase, session management, and protected routes |
| **Responsive Design** | Mobile-friendly UI that works on desktop, tablet, and mobile devices |

---

## 🛠 Technology Stack

### Frontend Stack
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI Framework** | React 18.x | Component-based UI |
| **Build Tool** | Vite 5.x | Fast dev server and optimized builds |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Routing** | React Router | Client-side navigation |
| **Backend Client** | Supabase JS SDK | Authentication and real-time data |
| **HTTP Client** | Fetch API | RESTful API communication |

### Backend (External Service)
- **Framework**: FastAPI (Python)
- **Hosting**: Render.com
- **Purpose**: Traffic control logic, analytics, authentication integration

### Development Tools
- **Linting**: ESLint (config: `eslint.config.js`)
- **Code Formatting**: Configured via `postcss.config.js`, `tailwind.config.js`
- **Build**: Vite (config: `vite.config.js`)
- **Package Manager**: npm or yarn

---

## 🏗 Architecture & Components

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│   Flextraff Admin Panel (React/Vite)   │
│  Running on: http://localhost:5173     │
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────────────────────────┐  │
│  │   ThemeContext (Dark Mode)       │  │
│  └──────────────────────────────────┘  │
│                  ↓                      │
│  ┌──────────────────────────────────┐  │
│  │   React Router (Navigation)      │  │
│  │  • Login                         │  │
│  │  • Dashboard                     │  │
│  │  • Controls                      │  │
│  │  • Traffic Data                  │  │
│  │  • Logs                          │  │
│  │  • Scanners                      │  │
│  └──────────────────────────────────┘  │
│                  ↓                      │
│  ┌──────────────────────────────────┐  │
│  │  ProtectedRoute (Auth Guard)     │  │
│  │  • Session validation            │  │
│  │  • Token management              │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↓                  ↓
    ┌──────────────────┐  ┌──────────────┐
    │  Supabase Auth   │  │  FastAPI     │
    │  & Database      │  │  Backend     │
    │                  │  │ (on Render)  │
    └──────────────────┘  └──────────────┘
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **App.jsx** | `src/App.jsx` | Root component, Router setup, ThemeProvider wrapper |
| **Navbar** | `src/components/Navbar.jsx` | Top navigation, user menu, theme toggle |
| **Sidebar** | `src/components/Sidebar.jsx` | Main navigation menu, route links |
| **ProtectedRoute** | `src/components/ProtectedRoute.jsx` | Route guard, authentication check |
| **ThemeContext** | `src/components/ThemeContext.jsx` | Dark mode state management |
| **ChartCard** | `src/components/ChartCard.jsx` | Reusable chart component for dashboards |
| **Dashboard** | `src/pages/Dashboard.jsx` | Main dashboard with KPIs and metrics |
| **Controls** | `src/pages/controls.jsx` | Traffic light control interface |
| **Traffic_data** | `src/pages/Traffic_data.jsx` | Traffic analytics and data visualization |
| **Logs** | `src/pages/Logs.jsx` | System logs and event history |
| **Scanners** | `src/pages/Scanners.jsx` | Network health and device scanner |

---

## 📁 Project Structure

```
flextraff_frontend/
├── public/                          # Static assets
├── src/
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Root component & routing
│   ├── index.css                   # Global styles
│   ├── App.css                     # App-specific styles
│   ├── supabaseClient.js           # Supabase configuration
│   │
│   ├── components/
│   │   ├── Navbar.jsx              # Header navigation
│   │   ├── Sidebar.jsx             # Side navigation menu
│   │   ├── ProtectedRoute.jsx      # Auth-protected route wrapper
│   │   ├── ThemeContext.jsx        # Dark mode context provider
│   │   ├── ChartCard.jsx           # Reusable chart component
│   │   └── assets/                 # Component assets
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx           # Main dashboard page
│   │   ├── controls.jsx            # Traffic light controls
│   │   ├── Traffic_data.jsx        # Traffic analytics
│   │   ├── Logs.jsx                # System logs viewer
│   │   ├── Scanners.jsx            # Network scanner interface
│   │   └── Login.jsx               # Authentication page
│   │
│   └── assets/                     # Shared assets (images, icons, etc.)
│
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint configuration
├── vercel.json                     # Vercel deployment config
└── README.md                       # This file

```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16.x or higher (LTS recommended)
- **npm** 8.x or yarn 1.22.x or higher
- **Git** for version control
- Access to Supabase credentials (provided in `.env`)

### Installation & Setup

1. **Clone the repository** (if needed)
   ```powershell
   git clone <repository-url>
   cd Panel_Frontend/flextraff_frontend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_API_BASE_URL=https://your-fastapi-backend.render.com
   ```

4. **Start the development server**
   ```powershell
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL printed by Vite)

### First-Time Login

- Use credentials provided by your system administrator
- Credentials are validated against the Supabase authentication backend
- Upon successful login, your session is stored and protected routes become accessible

---

## 💻 Development Guide

### Running in Development Mode

```powershell
npm run dev
```

- Starts the Vite dev server with Hot Module Replacement (HMR)
- Auto-reloads on file changes
- Available at `http://localhost:5173`

### Project Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **dev** | `npm run dev` | Start development server |
| **build** | `npm run build` | Create optimized production build |
| **preview** | `npm run preview` | Preview production build locally |
| **lint** | `npm run lint` | Run ESLint checks (if configured) |

Check `package.json` for complete list of available scripts.

### Development Workflow

1. **Create a feature branch**
   ```powershell
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** and test locally with `npm run dev`

3. **Build and test** the production bundle
   ```powershell
   npm run build
   npm run preview
   ```

4. **Commit changes** with descriptive messages
   ```powershell
   git add .
   git commit -m "feat: describe your changes"
   ```

5. **Push and create a pull request** (if applicable to your workflow)

### Debugging Tips

- **Browser DevTools**: Open with F12, check Console for errors
- **React DevTools**: Install React DevTools extension for debugging component state
- **Network Tab**: Monitor API calls to FastAPI backend
- **Application Tab**: Inspect Supabase session storage and tokens

---

## 🔨 Build & Deployment

### Building for Production

```powershell
npm run build
```

This creates an optimized production bundle in the `dist/` directory:
- Minified JavaScript and CSS
- Optimized images and assets
- Source maps (if enabled)

### Production Build Preview

To test the production build locally:

```powershell
npm run preview
```

This serves the `dist/` folder and simulates the production environment.

### Deployment Targets

#### Vercel Deployment (Recommended)

The project includes `vercel.json` for seamless Vercel deployment:

1. **Connect your repository** to Vercel (via GitHub, GitLab, or Bitbucket)
2. **Set environment variables** in Vercel Dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_BASE_URL`
3. **Deploy**: Vercel auto-deploys on push to `main` branch

#### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting provider (AWS S3, Netlify, etc.)

### Performance Optimization

- **Lazy loading** via React Router Code Splitting
- **Image optimization** (use modern formats like WebP)
- **CSS purging** via Tailwind (unused styles removed in production)
- **Bundle analysis** (check `dist/` size before deploying)

---

## ⚙️ Environment Configuration

### Required Environment Variables

Create a `.env` file in the project root with the following:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-supabase-instance.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key

# FastAPI Backend Configuration
VITE_API_BASE_URL=https://your-fastapi-app.render.com
VITE_API_TIMEOUT=30000  # Optional: API timeout in milliseconds
```

### Obtaining Credentials

**Supabase:**
1. Go to [supabase.com](https://supabase.com)
2. Navigate to your project settings
3. Copy `URL` and `Anon Key` from the API section

**FastAPI Backend:**
- Provided by your backend team
- Typically: `https://<app-name>.onrender.com`

### Security Best Practices

- ⚠️ **Never commit `.env` files** to git
- ✅ **Use `.env.example`** template in repository
- ✅ **Store secrets** in your hosting provider's environment variable settings
- ✅ **Rotate keys** periodically
- ✅ **Use separate credentials** for development and production

---

## 🔌 API Integration

### Backend Overview

The frontend communicates with a **FastAPI backend** deployed on Render that handles:
- Traffic light logic and state management
- Real-time traffic data collection
- User authentication coordination
- Analytics and reporting

### API Communication Flow

```
React Component
        ↓
Fetch API / HTTP Client
        ↓
FastAPI Backend (Render)
        ↓
Database / Traffic Control Logic
```

### Common API Endpoints (Example)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/login` | POST | User authentication |
| `/api/traffic/status` | GET | Current traffic status |
| `/api/lights/control` | POST | Send control commands |
| `/api/logs` | GET | Retrieve system logs |
| `/api/scanners/status` | GET | Network scanner status |

**Note**: Exact endpoints depend on your FastAPI implementation. Refer to backend documentation.

### Making API Calls

Example pattern used in components:

```javascript
// Fetching data from backend
const fetchTrafficData = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/traffic/status`,
    {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data;
};
```

### Error Handling

All API calls should include:
- Try/catch blocks for network errors
- Status code checking (200, 401, 500, etc.)
- User-friendly error messages
- Logging for debugging

---

## 🎨 Styling & Theme

### Tailwind CSS

This project uses **Tailwind CSS** for styling:

- **Configuration**: `tailwind.config.js`
- **Global Styles**: `src/index.css`
- **Component Styles**: Inline utility classes

### Dark Mode

Dark mode is managed via **ThemeContext** (`src/components/ThemeContext.jsx`):

```javascript
const { darkMode, toggleDarkMode } = useContext(ThemeContext);
```

Use the `darkMode` prop to conditionally apply dark styles:

```jsx
<div className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
  Content
</div>
```

### Tailwind IntelliSense in VS Code

If Tailwind class suggestions are not appearing:

1. **Install the Tailwind CSS IntelliSense extension**
   - Open VS Code Extensions Marketplace (Ctrl+Shift+X)
   - Search for "Tailwind CSS IntelliSense" by Bradleys
   - Click Install

2. **Enable suggestions in VS Code settings**
   ```json
   {
     "tailwindCSS.suggestions": true,
     "tailwindCSS.lint.cssConflict": "warning"
   }
   ```

3. **Verify configuration**
   - Ensure `tailwind.config.js` exists at project root
   - Check that `content` includes your JSX paths:
     ```javascript
     content: ['./src/**/*.{js,jsx,ts,tsx,html}']
     ```

4. **Reload VS Code**
   - Press `Ctrl+Shift+P` and run "Developer: Reload Window"

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. Tailwind CSS Suggestions Not Working

**Symptom**: Autocomplete for Tailwind classes doesn't appear in editor

**Solution**:
- Install Tailwind CSS IntelliSense extension
- Enable in settings: `tailwindCSS.suggestions.enabled: true`
- Verify `tailwind.config.js` has correct content paths
- Reload VS Code

#### 2. Supabase Connection Fails

**Symptom**: "Cannot connect to Supabase" or 401 Unauthorized errors

**Solution**:
- Verify `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check that credentials haven't expired
- Ensure Supabase project is active and not paused
- Check browser DevTools → Network tab for failed requests
- Verify CORS is configured on Supabase

#### 3. API Calls Timeout or Fail

**Symptom**: "Network error" when fetching from FastAPI backend

**Solution**:
- Verify `VITE_API_BASE_URL` is correct and accessible
- Check if backend is running and deployed (if on Render)
- Use browser DevTools → Network tab to inspect requests
- Increase `VITE_API_TIMEOUT` if needed
- Check for CORS issues (may require backend configuration)

#### 4. Build Fails

**Symptom**: `npm run build` produces errors

**Solution**:
```powershell
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
npm run build
```

#### 5. Hot Reload Not Working

**Symptom**: Changes don't reflect when editing files

**Solution**:
- Ensure you're running `npm run dev` (not build)
- Check that Vite dev server is running on correct port
- Reload browser page (Ctrl+R or Cmd+R)
- Check if firewall is blocking Vite

#### 6. Authentication Token Expired

**Symptom**: Redirected to login after some time

**Solution**:
- This is expected behavior for security
- Implement token refresh logic in `ProtectedRoute`
- Store refresh token in secure storage
- Coordinate with Supabase auth configuration

### Logging & Diagnostics

Enable debugging by adding this to `main.jsx`:

```javascript
// Enable detailed logging
console.log('Environment:', import.meta.env);
console.log('API Base:', import.meta.env.VITE_API_BASE_URL);
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
```

### Getting Help

- Check the [Vite Documentation](https://vitejs.dev)
- Check the [React Documentation](https://react.dev)
- Check the [Tailwind CSS Documentation](https://tailwindcss.com)
- Check the [Supabase Documentation](https://supabase.com/docs)
- Review FastAPI backend logs on Render dashboard

---

## 🤝 Contributing & Support

### Contribution Policy

This repository is **proprietary and closed-source**. Public contributions are not accepted.

If you are an authorized team member and need to contribute:
1. Request write access from the project owner
2. Follow the development workflow described in [Development Guide](#development-guide)
3. Create feature branches with descriptive names
4. Submit pull requests with clear descriptions

### Support & Questions

For issues, feature requests, or questions regarding this project:

- **Project Owner**: Manan Bagga
- **Email**: [Your email here]
- **Internal Documentation**: [Link to internal docs if available]

### Reporting Bugs

If you discover a bug:
1. Document the steps to reproduce
2. Capture error messages and logs
3. Note your environment (Node version, OS, browser)
4. Contact the project owner with details

---

## 📄 License — Proprietary (Not Open Source)

**© 2025 Flextraff. All rights reserved.**

This project is the proprietary and confidential work of **Flextraff** and **Manan Bagga**. It is **NOT** released under any open source license.

⚠️ **For the complete and legally binding license terms, see the [LICENSE](../LICENSE) file at the repository root.**

### Permitted Use

- Internal use by authorized Flextraff team members only
- Approved use for project development and deployment
- Use as defined in written agreements

### Prohibited Use

You **MAY NOT**, without express prior written permission from the copyright holder:

- ❌ Use, copy, publish, or distribute the code for any public or private purpose
- ❌ Claim authorship, ownership, or intellectual property rights
- ❌ Create derivative works, forks, or modified versions
- ❌ Sublicense, sell, or transfer usage rights
- ❌ Reverse engineer or attempt to extract proprietary logic
- ❌ Share code or documentation with unauthorized parties

### Permission & Licensing

Requests to use, modify, or distribute this project (or parts of it) **must be made in writing** to:

**Manan Bagga**  
[Your contact email]

Your request should include:
- Clear description of intended use
- Duration of requested license
- Any modifications or redistribution planned

If permission is granted, specific terms, scope, and licensing conditions will be provided in a formal written agreement.

### Public Repository ≠ Open Source

⚠️ **CRITICAL**: This repository may be publicly visible on GitHub, but **public visibility does NOT constitute an open source release**. The Software remains proprietary and confidential regardless of repository visibility.

### Enforcement

Unauthorized use may result in:
- Cease and desist notices
- Civil litigation and damages
- Criminal prosecution
- Injunctive relief
- Recovery of attorney fees and costs

---

**Read the full [LICENSE](../LICENSE) file for complete legally binding terms.**

By accessing or using this repository, you acknowledge that you have read, understood, and agree to comply with all terms in the LICENSE file.

---

## 📞 Quick Reference

| Resource | Link |
|----------|------|
| **Repository** | [GitHub](https://github.com/MananBagga/Flextraff-Admin-Panel) |
| **License** | [LICENSE](../LICENSE) — Proprietary, all rights reserved |
| **Frontend Deploy** | Vercel |
| **Backend API** | Render.com |
| **Auth Service** | Supabase |
| **Project Owner** | Manan Bagga | Ajay Pratap Singh | Rakshit Vyas | Himang Bhatia |

---

**Last Updated**: November 2025  
**Version**: 1.0.0
