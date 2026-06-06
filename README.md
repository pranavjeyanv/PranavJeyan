# Portfolio Website - Complete Setup Guide

A premium full-stack portfolio website built with React, Node.js, Express, and MongoDB.

## Project Overview

This is a production-ready personal portfolio website featuring:
- Modern, responsive UI with glassmorphism effects
- Full-stack MERN (MongoDB, Express, React, Node.js) architecture
- JWT authentication for admin access
- Admin dashboard for content management
- Contact form with email notifications
- Project portfolio showcase
- Skills, experience, education, and achievements sections

## Prerequisites

Before you start, ensure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Either [local installation](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)
3. **npm** or **yarn** - Comes with Node.js
4. **Git** - For version control
5. **VS Code** or any code editor

## Project Structure

```
Portfolio/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand state management
│   │   ├── services/        # API integration
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── globals.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth middleware
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
└── README.md (this file)
```

## Quick Start

### Step 1: Clone or Setup Project

```bash
# Navigate to your desired directory
cd ~/Desktop/Portfolio
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `.env` file with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**For MongoDB Atlas (Cloud):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`
4. Update `MONGODB_URI` in `.env`

```bash
# Start backend server
npm run dev
```

Server should be running on `http://localhost:5000`

### Step 3: Setup Frontend

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Verify `.env.local` (or create if not exists):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
# Start development server
npm run dev
```

Frontend should be running on `http://localhost:5173`

## Configuration

### Backend Configuration

#### Database Setup

**Option A: Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Update `.env`: `MONGODB_URI=mongodb://localhost:27017/portfolio`

**Option B: MongoDB Atlas**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Update `.env` with connection string

#### Creating Admin User

After backend is running, create initial admin:

```bash
# Use MongoDB Atlas interface or local MongoDB client
db.users.insertOne({
  email: "admin@example.com",
  password: "$2a$10/...", // Hashed password using bcryptjs
  role: "admin",
  createdAt: new Date()
})
```

Or use a script to create user via API.

### Frontend Configuration

- Update `VITE_API_BASE_URL` if backend runs on different port
- Update resume links in Footer component
- Update social media links throughout
- Customize color scheme in `tailwind.config.js`

## Features & Implementation

### 1. Home Page
- Hero section with typing animation
- Scroll progress indicator
- CTA buttons (Projects, Contact, Resume)
- Responsive design

### 2. About Section
- Personal introduction
- Professional summary
- Key competencies

### 3. Skills Section
- Categorized skills (Frontend, Backend, Database, Tools)
- Animated skill cards
- Icon representations

### 4. Projects Section
- Project cards with images
- Technology badges
- Live demo links
- GitHub repository links

### 5. Experience Timeline
- Timeline design
- Company names and roles
- Responsibilities and achievements
- Technology stack used

### 6. Education
- Academic information
- CGPA and achievements
- Key accomplishments

### 7. Certifications
- Certification cards with icons
- Verified skills

### 8. Achievements
- Awards and recognition
- Statistics counter
- Achievement details

### 9. Contact Form
- Form validation
- Backend integration
- Success/error messages
- Message storage in MongoDB

### 10. Admin Dashboard
- Protected route (login required)
- View contact messages
- Manage projects
- Upload resumes
- Delete/edit functionality

### 11. Authentication
- JWT-based login
- Secure password hashing
- Protected routes
- Token refresh capability

## API Integration

### Login
```javascript
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

### Send Contact Message
```javascript
POST /api/messages
Body: { name, email, subject, message }
```

### Get Projects
```javascript
GET /api/projects
Response: [{ title, description, technologies, liveLink, githubLink }]
```

### Admin Operations
All admin endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

## Customization

### Update Personal Information

**Frontend:**
1. `src/components/Hero.jsx` - Name and title
2. `src/components/About.jsx` - Bio and summary
3. `src/components/Contact.jsx` - Email and location
4. `src/components/Footer.jsx` - Social links

**Backend:**
- Add your projects via admin dashboard or API
- Update education and certifications

### Customize Styling

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  // ... customize colors
}
```

### Add New Projects

Via Admin Dashboard:
1. Login at `/login`
2. Navigate to Admin Dashboard at `/admin`
3. Go to "Projects" tab
4. Click "Add Project"
5. Fill in details and submit

Or via API:
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Name",
    "description": "Project description",
    "image": "image-url",
    "technologies": ["React", "Node.js"],
    "liveLink": "https://...",
    "githubLink": "https://..."
  }'
```

## Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Set environment variables
5. Deploy

### Backend Deployment (Railway/Render/Heroku)

1. Push code to GitHub
2. Create account on chosen platform
3. Create new project from GitHub
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CORS_ORIGIN` (frontend URL)
5. Deploy

### Database (MongoDB Atlas)

Already setup in MongoDB Atlas cloud.

## Environment Variables Checklist

### Backend `.env`
- [ ] PORT
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] JWT_EXPIRE
- [ ] NODE_ENV
- [ ] CORS_ORIGIN

### Frontend `.env.local`
- [ ] VITE_API_BASE_URL

## Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED
```
Solution: Ensure MongoDB service is running or use MongoDB Atlas

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS
```
Solution: Update CORS_ORIGIN in backend .env to match frontend URL

### Port Already in Use
```
Error: listen EADDRINUSE
```
Solution: Change PORT in .env or kill process using that port

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Performance Tips

1. **Backend:**
   - Enable caching headers
   - Use database indexes
   - Implement rate limiting
   - Optimize MongoDB queries

2. **Frontend:**
   - Code splitting with React.lazy()
   - Image optimization
   - Lazy load components
   - Minimize bundle size

## Security Best Practices

1. Never commit `.env` files to git
2. Use strong JWT secret (random string)
3. Enable HTTPS in production
4. Validate all inputs
5. Use environment variables for sensitive data
6. Keep dependencies updated
7. Implement rate limiting
8. Use CORS wisely

## Development Workflow

1. **Feature Development:**
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

2. **Testing:**
   ```bash
   # Backend
   npm test
   
   # Frontend
   npm run build
   ```

3. **Deployment:**
   ```bash
   git push origin main
   # Vercel/Railway auto-deploys
   ```

## Testing the Application

### Manual Testing Checklist
- [ ] Hero page loads correctly
- [ ] Smooth scrolling works
- [ ] All sections render properly
- [ ] Contact form submits
- [ ] Login page accessible
- [ ] Admin dashboard protected
- [ ] Mobile responsive
- [ ] Dark/light mode works
- [ ] Links point to correct URLs
- [ ] Projects display correctly

## Useful Commands

```bash
# Backend
npm install              # Install dependencies
npm run dev              # Run in development mode
npm start                # Run in production mode

# Frontend
npm install              # Install dependencies
npm run dev              # Start dev server
npm run build            # Create production build
npm run preview          # Preview production build
```

## Additional Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion)

## Support & Contact

- LinkedIn: https://www.linkedin.com/in/pranav-jeyan
- GitHub: https://github.com/pranavjeyan
- Email: pranavjeyan0@gmail.com

## License

MIT License - feel free to use this project for personal and commercial use.

---

**Happy Coding! 🚀**
