# Deployment Guide

## Table of Contents
1. [Frontend Deployment](#frontend-deployment)
2. [Backend Deployment](#backend-deployment)
3. [Database Setup](#database-setup)
4. [Domain Configuration](#domain-configuration)
5. [SSL/HTTPS](#ssl-https)
6. [Monitoring](#monitoring)

## Frontend Deployment

### Vercel (Recommended)

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

**Step 2: Deploy on Vercel**
1. Go to https://vercel.com/signup
2. Sign up with GitHub
3. Click "New Project"
4. Select your Portfolio repository
5. Set framework to "Other"
6. Deploy

**Step 3: Configure Environment Variables**
1. Go to Project Settings → Environment Variables
2. Add: `VITE_API_BASE_URL=https://your-backend-domain/api`
3. Redeploy

### Netlify

**Step 1: Connect Git**
1. Go to https://netlify.com
2. Click "New site from Git"
3. Select GitHub repository

**Step 2: Configure Build**
- Build command: `npm run build`
- Publish directory: `dist`

**Step 3: Add Environment Variables**
Settings → Build & Deploy → Environment Variables
Add: `VITE_API_BASE_URL=https://your-backend-domain/api`

### GitHub Pages

**Step 1: Update vite.config.js**
```javascript
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
```

**Step 2: Deploy**
```bash
npm run build
git add dist
git commit -m "Deploy to GitHub Pages"
git push origin main
```

**Step 3: Enable GitHub Pages**
Repository Settings → Pages → Select `main` branch

## Backend Deployment

### Railway (Simple & Recommended)

**Step 1: Create Account**
- Go to https://railway.app
- Sign up with GitHub

**Step 2: Create New Service**
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your portfolio repository

**Step 3: Configure Environment Variables**
1. Go to Variables tab
2. Add all variables from `.env`:
   - PORT=5000
   - MONGODB_URI=your_mongodb_connection_string
   - JWT_SECRET=your_secret
   - CORS_ORIGIN=https://your-frontend-domain
   - NODE_ENV=production

**Step 4: Deploy**
Railway auto-deploys on push to main

### Render

**Step 1: Create Account & Service**
1. Go to https://render.com
2. Sign up with GitHub
3. Create new "Web Service"
4. Select your repository

**Step 2: Configure**
- Build command: `npm install`
- Start command: `npm start`
- Environment: Node
- Plan: Free tier available

**Step 3: Add Environment Variables**
Environment tab → Add variables from `.env`

**Step 4: Deploy**
Click "Create Web Service" - auto deploys

### Heroku

**Step 1: Install Heroku CLI**
```bash
npm install -g heroku
heroku login
```

**Step 2: Create App**
```bash
heroku create your-portfolio-api
```

**Step 3: Add MongoDB**
```bash
heroku addons:create mongolab:sandbox
```

**Step 4: Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your_secret
heroku config:set CORS_ORIGIN=https://your-frontend-domain
```

**Step 5: Deploy**
```bash
git push heroku main
```

### AWS Elastic Beanstalk

**Step 1: Install EB CLI**
```bash
pip install awsebcli
```

**Step 2: Initialize**
```bash
cd backend
eb init -p "Node.js 18" portfolio
```

**Step 3: Create Environment**
```bash
eb create portfolio-env
```

**Step 4: Set Environment Variables**
```bash
eb setenv JWT_SECRET=your_secret MONGODB_URI=your_uri CORS_ORIGIN=your_domain
```

**Step 5: Deploy**
```bash
eb deploy
```

## Database Setup

### MongoDB Atlas (Cloud - Recommended)

**Step 1: Create Account**
- Go to https://www.mongodb.com/cloud/atlas
- Sign up with Google/GitHub

**Step 2: Create Organization & Project**
1. Create new organization
2. Create new project
3. Create new cluster (Free tier available)

**Step 3: Get Connection String**
1. Click "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace username and password
5. Update backend `.env`: `MONGODB_URI=your_connection_string`

**Step 4: Create Database User**
1. Go to "Database Access"
2. Add new database user
3. Use this username/password in connection string

**Step 5: Whitelist IP**
1. Go to "Network Access"
2. Add IP Address (0.0.0.0/0 for development, specific IP for production)

### Local MongoDB

**Installation:**
```bash
# macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo apt-get install -y mongodb

# Windows
# Download installer from https://www.mongodb.com/try/download/community
```

**Connection String:**
```
mongodb://localhost:27017/portfolio
```

## Domain Configuration

### Update Frontend API URL

1. **For Vercel/Netlify:**
   - Environment Variables: `VITE_API_BASE_URL=https://your-backend-domain/api`

2. **For GitHub Pages:**
   - Update `vite.config.js` base path
   - Build and commit

### Setup Custom Domain

**Vercel:**
1. Settings → Domains
2. Add domain
3. Update DNS records at domain registrar

**Netlify:**
1. Domain settings
2. Add custom domain
3. Update DNS records

**Railway/Render:**
1. Project settings → Custom Domain
2. Use provided DNS values

## SSL/HTTPS

### Automatic (Recommended)

Most platforms (Vercel, Netlify, Railway) provide free SSL automatically.

### Manual Certificate

**Let's Encrypt (Free):**
```bash
sudo apt install certbot
sudo certbot certonly --standalone -d yourdomain.com
```

Update server config to use certificate files.

## Monitoring

### Error Tracking

**Sentry:**
1. Sign up at https://sentry.io
2. Create new project
3. Install SDK:
   ```bash
   npm install @sentry/react @sentry/tracing
   ```
4. Initialize in frontend:
   ```javascript
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "YOUR_DSN",
     environment: "production",
   });
   ```

### Performance Monitoring

**Vercel Analytics:**
- Automatic on Vercel
- No setup needed

**Datadog:**
1. Sign up at https://www.datadog.com
2. Add monitoring code
3. View metrics

### Logs

**Railway/Render:**
- Built-in log viewer
- View in dashboard

**Heroku:**
```bash
heroku logs --tail
```

## Security Checklist

- [ ] All environment variables are set
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] MongoDB IP whitelist is configured
- [ ] CORS_ORIGIN is set to production domain
- [ ] SSL/HTTPS is enabled
- [ ] Sensitive files are in .gitignore
- [ ] Dependencies are up to date
- [ ] Rate limiting is enabled
- [ ] HTTPS redirects are configured
- [ ] Monitoring is active

## Post-Deployment

1. **Test all functionality:**
   - Frontend loads correctly
   - API endpoints respond
   - Database operations work
   - Login/admin dashboard works

2. **Monitor:**
   - Check error logs
   - Monitor performance
   - Watch error tracking

3. **Backup:**
   - Regular MongoDB backups
   - Export database periodically
   - Version control all code

## Troubleshooting

### Frontend Won't Load

1. Check environment variables
2. Verify API URL is correct
3. Check browser console for errors
4. Check network tab in DevTools

### API Returns 502/503

1. Check backend logs
2. Verify database connection
3. Check environment variables
4. Restart backend service

### CORS Errors

1. Check backend CORS_ORIGIN setting
2. Verify it matches frontend domain
3. Check credentials setting

### Database Connection Fails

1. Verify connection string
2. Check IP whitelist (MongoDB Atlas)
3. Verify database user credentials
4. Check network connectivity

## Performance Optimization

### Frontend
- Use CDN for static assets
- Enable gzip compression
- Minimize JavaScript/CSS
- Optimize images
- Use lazy loading

### Backend
- Enable caching headers
- Use database indexes
- Implement pagination
- Monitor query performance
- Use Redis for caching (optional)

---

**Happy Deploying! 🚀**
