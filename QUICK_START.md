# Quick Start Guide - 5 Minutes to Running

## Prerequisites Check

Before starting, ensure you have:
- Node.js installed (`node --version`)
- npm installed (`npm --version`)

## Step 1: Environment Setup (1 min)

### Backend .env
Backend `.env` file is already created. If using MongoDB Atlas:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Copy connection string
4. Update `/backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Frontend .env
Frontend `.env.local` is already created with correct API URL.

## Step 2: Install Dependencies (2 min)

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 3: Start Servers (1 min)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

### Terminal 2 - Frontend (New terminal/tab)
```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in 500 ms
  ➜  Local:   http://localhost:5173/
```

## Step 4: Open in Browser (1 min)

Visit: `http://localhost:5173`

You should see:
- ✅ Portfolio website loaded
- ✅ All sections visible
- ✅ Smooth scrolling works
- ✅ Contact form functional

## Admin Access

### First Time Login

**Option 1: Create user manually**

Use MongoDB Atlas interface or local MongoDB:
```bash
# Connect to MongoDB
mongo

# Use portfolio database
use portfolio

# Insert admin user
db.users.insertOne({
  email: "admin@example.com",
  password: "password123", // Will need to be hashed in production
  role: "admin",
  createdAt: new Date()
})
```

**Option 2: Use API (after backend is running)**
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### Login to Admin Dashboard

1. Go to `http://localhost:5173/login`
2. Enter credentials:
   - Email: `admin@example.com`
   - Password: `password123`
3. Access dashboard at `http://localhost:5173/admin`

## Test All Features

### 1. ✅ Home Page
- [ ] All sections load
- [ ] Scroll smoothly
- [ ] Animations play

### 2. ✅ Contact Form
- [ ] Fill and submit
- [ ] See success message
- [ ] Message appears in admin dashboard

### 3. ✅ Admin Dashboard
- [ ] Login works
- [ ] View messages
- [ ] Manage projects
- [ ] Manage resumes

### 4. ✅ Responsive Design
- [ ] Resize browser
- [ ] Mobile menu works
- [ ] All content visible

## Customize Your Portfolio

### Update Personal Info

**Name & Title** - `frontend/src/components/Hero.jsx`
```javascript
<h1 className="text-5xl md:text-7xl font-bold mb-4">
  Hi, I'm <span className="gradient-text">Your Name</span>
</h1>
```

**About Me** - `frontend/src/components/About.jsx`
```javascript
<p className="text-gray-300 mb-4">
  Your bio here...
</p>
```

**Social Links** - `frontend/src/components/Footer.jsx`
```javascript
{ name: 'LinkedIn', url: 'https://your-linkedin' },
{ name: 'GitHub', url: 'https://your-github' },
```

### Add Projects

Via Admin Dashboard:
1. Login to `/login`
2. Go to `/admin`
3. Projects tab → Add Project
4. Fill details and submit

Or via API - See [API_TESTING.md](./API_TESTING.md)

### Update Skills

Edit `frontend/src/components/Skills.jsx` to add/remove skills.

## Troubleshooting

### Backend Won't Start
```
Error: connect ECONNREFUSED
```
✅ Make sure MongoDB is running:
```bash
# macOS
brew services start mongodb-community

# Or use MongoDB Atlas (no local setup needed)
```

### Frontend Shows Error
```
Error: Failed to fetch from API
```
✅ Backend not running or wrong API URL:
1. Check backend is running on port 5000
2. Check `frontend/.env.local` has correct URL
3. Restart frontend dev server

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
✅ Kill the process using that port:
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Styles Not Loading
```
Tailwind classes not working
```
✅ Rebuild frontend:
```bash
cd frontend
npm install
npm run dev
```

## Next Steps

### 1. Customize Design
- Edit `frontend/tailwind.config.js` for colors
- Modify `frontend/src/globals.css` for styles
- Update components as needed

### 2. Deploy
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps
- Frontend: Vercel, Netlify, GitHub Pages
- Backend: Railway, Render, Heroku
- Database: MongoDB Atlas

### 3. Production Setup
- Use strong JWT secret
- Enable HTTPS
- Setup custom domain
- Configure CI/CD pipeline
- Monitor errors and performance

### 4. Add More Features
- Email notifications
- Social authentication
- Blog section
- Comments system
- Analytics

## Useful Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Framer Motion](https://www.framer.com/motion)

## Getting Help

- Check error messages in console/terminal
- See [Troubleshooting](#troubleshooting) section
- Read detailed docs in backend/README.md and frontend/README.md
- Check API_TESTING.md for API examples

## Common Commands

```bash
# Backend
npm install              # Install dependencies
npm run dev              # Start dev server
npm start                # Start production

# Frontend
npm install              # Install dependencies
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview build

# Stop servers
# Windows: stop-servers.bat
# macOS/Linux: chmod +x stop-servers.sh && ./stop-servers.sh
```

---

**You're all set! 🚀 Happy coding!**

Need more help? Check the full [README.md](./README.md)
