# 🎯 Admin Dashboard - Developer Quick Reference

## 🚀 Quick Access Commands

### Start Services
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Access Admin Panel
```
http://localhost:5173/admin
```

---

## 📁 File Quick Reference

### Backend Models Location
```
/backend/src/models/
├── About.js
├── Skill.js
├── Experience.js
├── Education.js
├── Certification.js
├── Achievement.js
├── Settings.js
└── Project.js (enhanced)
```

### Backend Controllers Location
```
/backend/src/controllers/
├── aboutController.js
├── skillController.js
├── experienceController.js
├── educationController.js
├── certificationController.js
├── achievementController.js
├── settingsController.js
└── projectController.js (enhanced)
```

### Backend Routes Location
```
/backend/src/routes/
├── about.js
├── skills.js
├── experience.js
├── education.js
├── certifications.js
├── achievements.js
├── settings.js
├── projects.js (enhanced)
└── index.js (updated)
```

### Frontend Components Location
```
/frontend/src/components/
├── AdminAbout.jsx
├── AdminSkills.jsx
├── AdminExperience.jsx
├── AdminEducation.jsx
├── AdminCertifications.jsx
├── AdminAchievements.jsx
├── AdminProjects.jsx
├── AdminMessages.jsx
├── AdminResume.jsx
├── AdminSettings.jsx
└── Toast.jsx
```

### Frontend Utilities Location
```
/frontend/src/utils/
├── toast.js
└── validation.js
```

---

## 🔗 API Endpoint Reference

### About Endpoints
```
GET    /api/about              - Get profile
PUT    /api/about              - Update profile (admin)
```

### Skills Endpoints
```
GET    /api/skills             - Get all skills
POST   /api/skills             - Create skill (admin)
PUT    /api/skills/:id         - Update skill (admin)
DELETE /api/skills/:id         - Delete skill (admin)
```

### Projects Endpoints
```
GET    /api/projects           - Get all projects
POST   /api/projects           - Create project (admin)
PUT    /api/projects/:id       - Update project (admin)
DELETE /api/projects/:id       - Delete project (admin)
POST   /api/projects/test-links/all   - Test all links (admin)
POST   /api/projects/test-links/:id   - Test single link (admin)
```

### Experience Endpoints
```
GET    /api/experience         - Get all experiences
POST   /api/experience         - Create experience (admin)
PUT    /api/experience/:id     - Update experience (admin)
DELETE /api/experience/:id     - Delete experience (admin)
```

### Education Endpoints
```
GET    /api/education          - Get all education
POST   /api/education          - Create education (admin)
PUT    /api/education/:id      - Update education (admin)
DELETE /api/education/:id      - Delete education (admin)
```

### Certifications Endpoints
```
GET    /api/certifications     - Get all certifications
POST   /api/certifications     - Create certification (admin)
PUT    /api/certifications/:id - Update certification (admin)
DELETE /api/certifications/:id - Delete certification (admin)
```

### Achievements Endpoints
```
GET    /api/achievements       - Get all achievements
POST   /api/achievements       - Create achievement (admin)
PUT    /api/achievements/:id   - Update achievement (admin)
DELETE /api/achievements/:id   - Delete achievement (admin)
```

### Messages Endpoints
```
GET    /api/messages           - Get all messages
PUT    /api/messages/:id/read  - Mark as read
DELETE /api/messages/:id       - Delete message
```

### Settings Endpoints
```
GET    /api/settings           - Get settings
PUT    /api/settings           - Update settings (admin)
```

### Resume Endpoints
```
POST   /api/resumes/upload     - Upload resume
GET    /api/resumes/download/:id - Download resume
DELETE /api/resumes/:id        - Delete resume
```

---

## 🎯 Component Quick Reference

### AdminAbout Component
- **File**: `/frontend/src/components/AdminAbout.jsx`
- **Features**: Profile image, name, role, summary, bio, contact, social links
- **API Used**: aboutAPI

### AdminSkills Component
- **File**: `/frontend/src/components/AdminSkills.jsx`
- **Features**: Create/edit/delete skills, category selection, percentage input
- **API Used**: skillAPI
- **Validation**: Percentage 0-100, duplicate prevention

### AdminProjects Component
- **File**: `/frontend/src/components/AdminProjects.jsx`
- **Features**: CRUD, image upload, technologies, URL validation, link testing
- **API Used**: projectAPI
- **Special**: Link testing with HTTP status indicators

### AdminExperience Component
- **File**: `/frontend/src/components/AdminExperience.jsx`
- **Features**: CRUD, date range, current position toggle, technologies
- **API Used**: experienceAPI
- **Validation**: End date > start date

### AdminEducation Component
- **File**: `/frontend/src/components/AdminEducation.jsx`
- **Features**: CRUD, institution, degree, field, years, CGPA
- **API Used**: educationAPI
- **Validation**: Year range validation

### AdminCertifications Component
- **File**: `/frontend/src/components/AdminCertifications.jsx`
- **Features**: CRUD, image upload, credential URL validation
- **API Used**: certificationAPI
- **Validation**: URL format checking

### AdminAchievements Component
- **File**: `/frontend/src/components/AdminAchievements.jsx`
- **Features**: CRUD, image upload, date selection
- **API Used**: achievementAPI

### AdminMessages Component
- **File**: `/frontend/src/components/AdminMessages.jsx`
- **Features**: View, search, filter, mark read/unread, delete
- **API Used**: messageAPI
- **Special**: Search highlighting, statistics display

### AdminResume Component
- **File**: `/frontend/src/components/AdminResume.jsx`
- **Features**: Upload latest/old, download, delete, PDF validation
- **API Used**: resumeAPI

### AdminSettings Component
- **File**: `/frontend/src/components/AdminSettings.jsx`
- **Features**: Configuration, statistics, visibility, maintenance, dark mode
- **API Used**: settingsAPI + all section APIs
- **Special**: Real-time statistics from all sections

---

## 🛠️ Utility Functions Reference

### toast.js Functions
```javascript
notify.success(message)     // Green toast
notify.error(message)       // Red toast
notify.warning(message)     // Yellow toast
notify.info(message)        // Blue toast
subscribe(callback)         // Listen for toast events
```

### validation.js Functions
```javascript
validateEmail(email)        // Returns boolean
validateUrl(url)           // Returns boolean
validateForm(fields, data)  // Returns {isValid, errors}
validatePercentage(num)    // Returns boolean
validateYear(year)         // Returns boolean
formatDate(isoString)      // Returns YYYY-MM-DD
formatDateDisplay(isoString) // Returns locale date string
```

---

## 🔑 Important Configuration

### Environment Variables (Backend)
```
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret-key
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

### Environment Variables (Frontend)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🧪 Common Testing Commands

### Test API Endpoints with cURL
```bash
# Get all skills
curl http://localhost:5000/api/skills

# Get about section
curl http://localhost:5000/api/about

# Create skill with token
curl -X POST http://localhost:5000/api/skills \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"React","category":"Frontend","percentage":95}'

# Test all project links
curl -X POST http://localhost:5000/api/projects/test-links/all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🎨 Common UI Patterns

### Form Submit Pattern
```javascript
const handleSave = async () => {
  try {
    setLoading(true);
    await api.create(formData);
    notify.success("Item created successfully");
    resetForm();
  } catch (error) {
    notify.error(error.response?.data?.message || "Failed to save");
  } finally {
    setLoading(false);
  }
};
```

### Delete with Confirmation Pattern
```javascript
const handleDelete = async (id) => {
  if (window.confirm("Are you sure?")) {
    try {
      await api.delete(id);
      notify.success("Item deleted successfully");
      fetchData();
    } catch (error) {
      notify.error("Failed to delete");
    }
  }
};
```

### Image Upload Pattern
```javascript
const handleImageChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    setFormData({...formData, image: reader.result});
  };
  reader.readAsDataURL(file);
};
```

---

## 🔐 Security Reminders

1. **Always validate on backend** - Never trust frontend validation
2. **Use environment variables** - Don't hardcode secrets
3. **Check admin role** - Verify in middleware before sensitive operations
4. **Sanitize URLs** - Test format before storing
5. **Handle errors safely** - Don't expose internal details
6. **Use HTTPS in production** - Encrypt data in transit
7. **Implement rate limiting** - Prevent abuse
8. **Keep tokens short-lived** - Implement refresh tokens

---

## 📱 Responsive Breakpoints

```
Mobile: < 640px   (md: breakpoint in Tailwind)
Tablet: 640-1024px (lg: breakpoint in Tailwind)
Desktop: > 1024px
```

---

## 🐛 Debugging Tips

### Frontend
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Use React DevTools extension
5. Check localStorage for tokens

### Backend
1. Check server console logs
2. Verify MongoDB connection
3. Test endpoints with Postman
4. Check middleware chain
5. Verify JWT token validity

### Common Issues
```
"401 Unauthorized" → Token missing or invalid
"403 Forbidden" → Not admin role
"404 Not Found" → Endpoint doesn't exist
"500 Server Error" → Check server logs
"CORS error" → Check CORS configuration
```

---

## 📊 Database Schema Quick Reference

### About Collection (Single Doc)
```javascript
{
  name, role, summary, bio, profileImage,
  email, phone, location,
  socialLinks: {github, linkedin, twitter, portfolio, instagram, discord}
}
```

### Skills Collection
```javascript
{
  name, category, percentage, icon
}
```

### Projects Collection
```javascript
{
  title, description, image, technologies,
  liveLink, githubLink, featured, status,
  linkStatus: {live, github}
}
```

### Experience Collection
```javascript
{
  company, role, startDate, endDate, currentPosition,
  description, technologies
}
```

### Education Collection
```javascript
{
  institution, degree, field, startYear, endYear, cgpa, description
}
```

### Certification Collection
```javascript
{
  name, issuer, issueDate, credentialUrl, certificateImage
}
```

### Achievement Collection
```javascript
{
  title, description, date, achievementImage
}
```

### Settings Collection (Single Doc)
```javascript
{
  siteTitle, metaDescription, portfolioVisibility,
  maintenanceMode, darkMode
}
```

---

## 🚀 Deployment Checklist

```
✅ All environment variables set
✅ Database connection tested
✅ CORS configured
✅ JWT secret changed
✅ Error handling verified
✅ Security audit passed
✅ Performance optimized
✅ Backups configured
✅ Monitoring setup
✅ SSL certificate installed
```

---

## 📞 Quick Support

### Check These Files:
1. **Setup Help** → ADMIN_QUICKSTART.md
2. **Detailed Docs** → ADMIN_DASHBOARD_GUIDE.md
3. **Testing** → TESTING_GUIDE.md
4. **Implementation** → IMPLEMENTATION_SUMMARY.md
5. **Overview** → README_ADMIN.md

---

**Last Updated**: January 2024
**Version**: 1.0.0

**Remember**: Everything is documented. Check the docs before asking questions!
