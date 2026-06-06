# Portfolio Website - Frontend

A modern, premium-level personal portfolio website built with React.js, Vite, and Tailwind CSS.

## Features

- **Hero Section**: Animated typing effect, professional introduction
- **About**: Personal information and experience summary
- **Skills**: Categorized technical skills with animations
- **Projects**: Showcase of completed projects with live demos and GitHub links
- **Experience**: Timeline of professional experience
- **Education**: Academic background and achievements
- **Certifications**: Professional certifications and verified skills
- **Achievements**: Awards and recognition
- **Contact Form**: Contact message submission
- **Authentication**: JWT-based admin login
- **Admin Dashboard**: Manage messages, projects, and resumes
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching capability
- **Animations**: Smooth animations with Framer Motion
- **Performance Optimized**: Fast loading and smooth interactions

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS3
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js >= 14
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   cd Portfolio/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create environment file
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your API endpoints

### Running Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Previewing Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # React components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── Education.jsx
│   ├── Certifications.jsx
│   ├── Achievements.jsx
│   ├── Contact.jsx
│   └── ScrollProgress.jsx
├── pages/             # Page components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── AdminDashboard.jsx
├── store/             # Zustand stores
│   └── index.js
├── services/          # API services
│   └── api.js
├── assets/            # Images, fonts, etc.
├── App.jsx
├── main.jsx
└── globals.css
```

## API Integration

The frontend connects to the backend API for:

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Messages**: `/api/messages` (POST, GET, DELETE)
- **Projects**: `/api/projects` (GET, POST, PUT, DELETE)
- **Resumes**: `/api/resumes` (GET, PUT)

## Features in Detail

### 1. Hero Section
- Animated typing effect
- CTA buttons for projects and contact
- Smooth scroll indicators

### 2. Skills Section
- Categorized technical skills
- Icon-based visual representation
- Hover animations

### 3. Projects Section
- Grid layout with responsive design
- Technology badges
- Live demo and GitHub links
- Glassmorphism effect

### 4. Contact Form
- Form validation
- Success/error messages
- Backend integration

### 5. Admin Dashboard
- Protected route with JWT authentication
- Message management
- Project management
- Resume upload capability

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Performance Optimization

- Code splitting with React Router
- Image optimization
- CSS minification
- JavaScript minification
- Lazy loading components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel Deployment

1. Connect GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Other Platforms

- Netlify
- GitHub Pages
- AWS Amplify
- DigitalOcean

## Contributing

Contributions are welcome! Please follow the project structure and coding standards.

## License

This project is licensed under the MIT License.

## Author

Pranav Jeyan V
- LinkedIn: https://www.linkedin.com/in/pranav-jeyan
- GitHub: https://github.com/pranavjeyan
- Email: pranavjeyan0@gmail.com
