# Portfolio Website - Backend

A robust backend API server built with Node.js, Express, and MongoDB for managing portfolio content.

## Features

- **Authentication**: JWT-based authentication system
- **Message Management**: Store and manage contact form submissions
- **Project Management**: CRUD operations for portfolio projects
- **Resume Management**: Upload and manage resume documents
- **Role-Based Access Control**: Admin-only endpoints
- **Error Handling**: Comprehensive error handling middleware
- **CORS Support**: Cross-origin requests handling
- **Input Validation**: Express validator for form validation
- **Security**: Bcrypt password hashing, JWT tokens

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **File Upload**: multer
- **Environment Variables**: dotenv
- **CORS**: cors

## Getting Started

### Prerequisites

- Node.js >= 14
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Navigate to backend directory
   ```bash
   cd Portfolio/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create environment file
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration

### Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will start on `http://localhost:5000`

## Project Structure

```
src/
├── config/
│   └── database.js        # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── messageController.js
│   ├── projectController.js
│   └── resumeController.js
├── models/
│   ├── User.js
│   ├── Message.js
│   ├── Project.js
│   └── Resume.js
├── routes/
│   ├── auth.js
│   ├── messages.js
│   ├── projects.js
│   ├── resumes.js
│   └── index.js
├── middleware/
│   └── auth.js
└── server.js
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Messages

- `GET /api/messages` - Get all messages (admin only)
- `POST /api/messages` - Create new message
- `DELETE /api/messages/:id` - Delete message (admin only)
- `PUT /api/messages/:id/read` - Mark message as read (admin only)

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Resumes

- `GET /api/resumes` - Get all resumes
- `PUT /api/resumes` - Update resume (admin only)

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Database Models

### User Model
```javascript
{
  email: String (unique, required),
  password: String (required),
  role: String (admin/user),
  createdAt: Date
}
```

### Message Model
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  read: Boolean,
  createdAt: Date
}
```

### Project Model
```javascript
{
  title: String,
  description: String,
  image: String,
  technologies: [String],
  liveLink: String,
  githubLink: String,
  featured: Boolean,
  createdAt: Date
}
```

### Resume Model
```javascript
{
  type: String (latest/old),
  filename: String,
  url: String,
  updatedAt: Date
}
```

## Middleware

### Authentication Middleware
Validates JWT token and extracts user information.

### Admin Middleware
Checks if user has admin role.

## Error Handling

All endpoints return standardized error responses:
```json
{
  "message": "Error description"
}
```

## Security Features

- Password hashing with bcryptjs (10 rounds)
- JWT token authentication
- CORS protection
- Input validation
- Role-based access control
- MongoDB injection prevention via Mongoose

## Production Deployment

### Heroku
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Railway, Render, DigitalOcean
Follow similar environment variable setup for these platforms.

### MongoDB Atlas
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Set in `MONGODB_URI` environment variable

## Performance Optimization

- Connection pooling with MongoDB
- Efficient queries with Mongoose
- CORS caching
- Request body size limits
- Compression middleware (recommended)

## Testing

Create test files in a `tests/` directory:
```bash
npm install --save-dev jest supertest
```

## Contributing

Follow the existing code structure and naming conventions.

## License

This project is licensed under the MIT License.

## Author

Pranav Jeyan V
- LinkedIn: https://www.linkedin.com/in/pranav-jeyan
- GitHub: https://github.com/pranavjeyan
- Email: pranavjeyan0@gmail.com
