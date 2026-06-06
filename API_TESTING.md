# API Testing Guide

## Testing with cURL

### 1. Register User (Optional - First time only)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

Response will include a token. Save it for next requests.

### 3. Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### 4. Create Project (Admin only)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "image": "image-url",
    "technologies": ["React", "Node.js"],
    "liveLink": "https://demo.com",
    "githubLink": "https://github.com/...",
    "featured": true
  }'
```

### 5. Send Contact Message
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "This is a test message"
  }'
```

### 6. Get Messages (Admin only)
```bash
curl http://localhost:5000/api/messages \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 7. Delete Message (Admin only)
```bash
curl -X DELETE http://localhost:5000/api/messages/MESSAGE_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 8. Get Resumes
```bash
curl http://localhost:5000/api/resumes
```

## Testing with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new collection "Portfolio API"
3. Add requests:

### Collection Variables
```json
{
  "base_url": "http://localhost:5000/api",
  "token": ""
}
```

### Requests

**1. Register**
- Method: POST
- URL: `{{base_url}}/auth/register`
- Body (JSON):
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**2. Login**
- Method: POST
- URL: `{{base_url}}/auth/login`
- Body (JSON):
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```
- Tests tab - Add script:
```javascript
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.token);
```

**3. Create Project**
- Method: POST
- URL: `{{base_url}}/projects`
- Headers:
  - Authorization: Bearer {{token}}
- Body (JSON):
```json
{
  "title": "NovaCart",
  "description": "E-commerce platform",
  "image": "image-url",
  "technologies": ["React", "Node.js", "MongoDB"],
  "liveLink": "https://nova-cart-client.vercel.app/",
  "githubLink": "https://github.com/...",
  "featured": true
}
```

**4. Get All Projects**
- Method: GET
- URL: `{{base_url}}/projects`

**5. Send Message**
- Method: POST
- URL: `{{base_url}}/messages`
- Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I would like to discuss a project"
}
```

## Browser Testing

### Frontend Routes
- Home: `http://localhost:5173/`
- Login: `http://localhost:5173/login`
- Admin: `http://localhost:5173/admin`

### Test Scenarios

1. **Home Page**
   - [ ] All sections load
   - [ ] Smooth scrolling works
   - [ ] Images/icons display
   - [ ] Animations play
   - [ ] Links work

2. **Contact Form**
   - [ ] Form validates input
   - [ ] Success message shows
   - [ ] Message appears in admin

3. **Admin Dashboard**
   - [ ] Can't access without login
   - [ ] Can access after login
   - [ ] Can view messages
   - [ ] Can delete messages
   - [ ] Can view projects
   - [ ] Can add/edit projects

4. **Mobile Responsiveness**
   - [ ] Menu collapses on mobile
   - [ ] Text is readable
   - [ ] Images scale properly
   - [ ] Touch interactions work

## Debugging

### Backend Logs
```bash
# Watch backend logs
cd backend
npm run dev
```

### Frontend Logs
- Open browser DevTools (F12)
- Console tab for errors
- Network tab for API requests

### MongoDB
```bash
# Access MongoDB
mongo

# Use portfolio database
use portfolio

# View collections
show collections

# View documents
db.messages.find()
db.projects.find()
db.users.find()
```

## Common Issues

### 401 Unauthorized
- Token expired or missing
- Re-login to get new token

### 403 Forbidden
- User is not admin
- Check user role in database

### 500 Internal Server Error
- Check backend console for error
- Verify database connection
- Check MongoDB is running

### CORS Errors
- Verify backend CORS_ORIGIN setting
- Should match frontend URL
- Restart backend after changes

---

**Happy Testing! 🧪**
