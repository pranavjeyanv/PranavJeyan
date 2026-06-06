# Admin Dashboard - Complete Testing Guide

## 🧪 Testing Overview

This guide provides comprehensive testing procedures for all admin dashboard features.

---

## ✅ Pre-Testing Setup

### Prerequisites
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173 (or configured port)
- [ ] MongoDB running and connected
- [ ] Admin user account created
- [ ] Browser console open for debugging (F12)

### Test User
- **Email**: admin@example.com (or your admin email)
- **Password**: Your admin password
- **Role**: admin

---

## 🧪 Section-by-Section Testing

### 1. Dashboard Overview

**Test Cases:**

```
✓ Dashboard loads without errors
✓ Welcome message displays with admin email
✓ All feature cards are visible
✓ Statistics cards show correct layout
✓ Feature cards have icons and descriptions
✓ Desktop layout shows full sidebar
✓ Mobile layout shows hamburger menu
✓ Sidebar collapses on menu click
✓ All menu items are clickable
✓ Active menu item is highlighted
```

**How to Test:**
1. Navigate to `/admin`
2. Verify dashboard layout
3. Click each feature card
4. Resize browser to test mobile layout
5. Click hamburger menu on mobile

---

### 2. About/Profile Section

**Test Cases:**

```
✓ Page loads and shows form
✓ Can upload profile image
  - Image preview displays
  - Image is base64 encoded
✓ Can edit name field
✓ Can edit role field
✓ Can edit summary (textarea)
✓ Can edit bio (textarea)
✓ Can edit email
✓ Can edit phone number
✓ Can edit location
✓ Can edit all social links:
  - GitHub URL
  - LinkedIn URL
  - Twitter URL
  - Portfolio URL
  - Instagram URL
  - Discord handle
✓ Save button works
✓ Success toast appears after save
✓ Data persists after page reload
✓ Form shows existing data on load
```

**Test Data:**
```
Name: John Doe
Role: Full Stack Developer
Summary: Experienced developer...
Bio: Passionate about web...
Email: john@example.com
Phone: +1234567890
Location: New York, USA
GitHub: https://github.com/johndoe
LinkedIn: https://linkedin.com/in/johndoe
Twitter: https://twitter.com/johndoe
```

**How to Test:**
1. Navigate to Admin → About
2. Fill in all fields with test data
3. Upload an image
4. Click Save Changes
5. Verify toast notification
6. Refresh page and verify data persists

---

### 3. Skills Section

**Test Cases:**

```
✓ Skills list loads
✓ Add Skill button works
✓ Form appears when clicking Add
✓ Can enter skill name
✓ Category dropdown shows all options:
  - Frontend
  - Backend
  - Database
  - Tools
  - Security
  - Cloud
✓ Can enter percentage (0-100)
✓ Icon URL field works
✓ Percentage validation:
  - Rejects values < 0
  - Rejects values > 100
  - Accepts 0-100 range
✓ Skill name validation (required)
✓ Duplicate skill detection works
✓ Save creates skill successfully
✓ Skills display in grid format
✓ Progress bar shows correct percentage
✓ Can edit existing skill
✓ Can delete skill (with confirmation)
✓ Form resets after save
✓ Cancel button closes form
```

**Test Data:**
```
Skill 1: React | Category: Frontend | Percentage: 95 | Icon: React icon URL
Skill 2: Node.js | Category: Backend | Percentage: 90 | Icon: Node icon URL
Skill 3: MongoDB | Category: Database | Percentage: 85 | Icon: MongoDB icon URL
```

**How to Test:**
1. Navigate to Admin → Skills
2. Click "Add Skill"
3. Enter test data
4. Try invalid percentages (e.g., 150)
5. Try adding duplicate skill
6. Save and verify grid display
7. Edit a skill
8. Delete a skill

---

### 4. Projects Section

**Test Cases:**

```
✓ Projects list loads
✓ Add Project button works
✓ Can enter project title
✓ Title must be unique (duplicate prevention)
✓ Can enter description
✓ Can upload project image
  - Image preview displays
  - Image is base64 encoded
✓ Can enter technologies (comma-separated)
✓ Technologies display as tags
✓ Can enter GitHub URL
  - URL validation works
  - Rejects invalid URLs
✓ Can enter Live URL
  - URL validation works
  - Rejects invalid URLs
✓ Status dropdown works (Active/Draft)
✓ Featured toggle works
✓ Can save project
✓ Projects display in grid
✓ Project cards show:
  - Image
  - Title
  - Status badge
  - Featured badge
  - Description
  - Technology tags
✓ Can edit project
✓ Can delete project (with confirmation)
✓ Test All Links button appears
✓ Test All Links works:
  - Tests all project links
  - Shows status indicators
  - Shows HTTP status codes
  - Last checked time displays
✓ Test Single Link works for individual project
```

**Test Data:**
```
Project 1:
  Title: NovaCart
  Description: E-commerce platform...
  Technologies: React, Node.js, MongoDB
  GitHub: https://github.com/...
  Live: https://novacart.netlify.app
  Status: Active
  Featured: true

Project 2:
  Title: Note Maker
  Description: Note taking app...
  Technologies: React, Firebase
  GitHub: https://github.com/...
  Live: https://notemaker.vercel.app
  Status: Active
  Featured: false
```

**How to Test:**
1. Navigate to Admin → Projects
2. Click "Add Project"
3. Fill all fields with test data
4. Try invalid URLs
5. Try duplicate title
6. Upload image
7. Click "Save"
8. Verify grid display
9. Click "Test All Links"
10. Verify link status display
11. Edit and delete tests

---

### 5. Experience Section

**Test Cases:**

```
✓ Experiences list loads
✓ Add Experience button works
✓ Can enter company name
✓ Can enter job role
✓ Can select start date
✓ Can select end date
✓ Current Position toggle works
  - When enabled, end date disabled
  - When enabled, end date clears
✓ Can enter description
✓ Can enter technologies (comma-separated)
✓ Date validation:
  - End date must be after start date
  - Rejects invalid dates
✓ Form validates required fields
✓ Can save experience
✓ Experiences display as cards
✓ Cards show:
  - Company name
  - Job role
  - Date range
  - Current position indicator
  - Description
  - Technology tags
✓ Can edit experience
✓ Can delete experience (with confirmation)
✓ Experiences sorted by date (newest first)
```

**Test Data:**
```
Experience 1:
  Company: Tech Company A
  Role: Senior Developer
  Start: 2023-01-15
  End: Present (toggle current)
  Description: Led development...
  Technologies: React, Node.js, AWS

Experience 2:
  Company: Tech Company B
  Role: Full Stack Developer
  Start: 2021-06-01
  End: 2022-12-31
  Description: Built features...
  Technologies: Vue.js, Python, PostgreSQL
```

**How to Test:**
1. Navigate to Admin → Experience
2. Add experiences with test data
3. Test current position toggle
4. Try invalid date ranges
5. Verify sorting by date
6. Edit and delete experiences

---

### 6. Education Section

**Test Cases:**

```
✓ Education list loads
✓ Add Education button works
✓ Can enter institution name
✓ Can enter degree
✓ Can enter field of study
✓ Can enter start year
✓ Can enter end year
✓ Can enter CGPA
✓ Can enter description
✓ Year validation:
  - Accepts years 1900-future
  - End year > start year
✓ Form validates required fields
✓ Can save education
✓ Educations display as cards
✓ Cards show:
  - Institution name
  - Degree and field
  - Year range
  - CGPA
  - Description
✓ Can edit education
✓ Can delete education (with confirmation)
✓ Educations sorted by end year (newest first)
```

**Test Data:**
```
Education 1:
  Institution: University A
  Degree: Bachelor's
  Field: Computer Science
  Start Year: 2015
  End Year: 2019
  CGPA: 3.8/4.0
  Description: Focused on web development...

Education 2:
  Institution: Institute B
  Degree: Diploma
  Field: Full Stack Development
  Start Year: 2020
  End Year: 2021
  CGPA: 4.0/4.0
  Description: Intensive bootcamp...
```

**How to Test:**
1. Navigate to Admin → Education
2. Add educations with test data
3. Try invalid year ranges
4. Verify sorting by year
5. Edit and delete educations

---

### 7. Certifications Section

**Test Cases:**

```
✓ Certifications list loads
✓ Add Certification button works
✓ Can enter certificate name
✓ Can enter issuer name
✓ Can select issue date
✓ Can enter credential URL
  - URL validation works
  - Rejects invalid URLs
✓ Can upload certificate image
  - Image preview displays
✓ Form validates required fields
✓ Can save certification
✓ Certifications display as cards
✓ Cards show:
  - Certificate image (if uploaded)
  - Certificate name
  - Issuer name
  - Issue date
  - Credential link (if provided)
✓ Can edit certification
✓ Can delete certification (with confirmation)
✓ Certifications sorted by date (newest first)
```

**Test Data:**
```
Certification 1:
  Name: AWS Solutions Architect
  Issuer: Amazon Web Services
  Issue Date: 2023-06-15
  Credential URL: https://aws.amazon.com/verify/...
  
Certification 2:
  Name: React Advanced
  Issuer: Frontend Masters
  Issue Date: 2023-03-20
  Credential URL: https://frontendmasters.com/verify/...
```

**How to Test:**
1. Navigate to Admin → Certifications
2. Add certifications with test data
3. Upload certificate images
4. Try invalid URLs
5. Edit and delete certifications

---

### 8. Achievements Section

**Test Cases:**

```
✓ Achievements list loads
✓ Add Achievement button works
✓ Can enter achievement title
✓ Can enter description
✓ Can select date
✓ Can upload achievement image/badge
  - Image preview displays
✓ Form validates required fields
✓ Can save achievement
✓ Achievements display as cards
✓ Cards show:
  - Achievement image (if uploaded)
  - Title
  - Description
  - Date
✓ Can edit achievement
✓ Can delete achievement (with confirmation)
✓ Achievements sorted by date (newest first)
```

**Test Data:**
```
Achievement 1:
  Title: Led Team of 5 Developers
  Description: Successfully delivered...
  Date: 2023-12-01
  
Achievement 2:
  Title: Top Contributor on GitHub
  Description: Maintained streak of...
  Date: 2023-10-15
```

**How to Test:**
1. Navigate to Admin → Achievements
2. Add achievements with test data
3. Upload images
4. Edit and delete achievements

---

### 9. Messages Section

**Test Cases:**

```
✓ Messages list loads
✓ Messages display in cards
✓ Each message shows:
  - Name
  - Email
  - Subject
  - Message content
  - Date
  - New badge (if unread)
✓ Search functionality works:
  - Search by name
  - Search by email
  - Search by subject
✓ Filter dropdown works:
  - All Messages option
  - Unread Only option
  - Read Only option
✓ Mark as Read works
  - Changes badge state
  - Toast notification appears
✓ Mark as Unread works
  - Changes badge state
  - Toast notification appears
✓ Delete message works:
  - Shows confirmation
  - Removes from list
  - Toast notification appears
✓ Statistics cards show:
  - Total Messages count
  - Unread count
  - Read count
✓ Counts update after actions
```

**Test Procedure:**
1. Use contact form on homepage to send message
2. Navigate to Admin → Messages
3. Verify message appears
4. Test search functionality
5. Test filter options
6. Test mark as read/unread
7. Verify statistics update
8. Test delete with confirmation

---

### 10. Resume Manager Section

**Test Cases:**

```
✓ Page loads with two sections
✓ Latest Resume section:
  - Shows upload area if empty
  - Shows file info if uploaded
  - Shows download button
  - Shows delete button
  - File validation (PDF only)
✓ Old Resume (Archive) section:
  - Shows upload area if empty
  - Shows file info if uploaded
  - Shows download button
  - Shows delete button
✓ Upload file works:
  - Only accepts PDF files
  - Rejects other formats
  - Shows success message
✓ Download button works:
  - Downloads correct file
  - File has correct name
✓ Delete button works:
  - Shows confirmation
  - Removes file
  - Shows success message
✓ Multiple uploads:
  - Can have latest and old
  - Can replace either
  - File info displays correctly
✓ Info section displays:
  - Latest resume auto-displays
  - Old resume is archived
  - PDF only accepted
  - Updates take effect immediately
```

**Test Data:**
- Any PDF file (preferably actual resume)

**How to Test:**
1. Navigate to Admin → Resume Manager
2. Upload a PDF file as Latest Resume
3. Verify file info displays
4. Download the file
5. Upload different file as Old Resume
6. Delete Old Resume
7. Replace Latest Resume

---

### 11. Settings Section

**Test Cases:**

```
✓ Page loads with settings form
✓ Statistics cards display:
  - Total Skills count
  - Total Projects count
  - Experiences count
  - Messages count
  - Educations count
  - Certifications count
  - Achievements count
  - All Items count (total)
✓ Statistics update correctly
✓ General Settings section:
  - Can edit Site Title
  - Can edit Meta Description
  - Saves changes
✓ Visibility section:
  - Portfolio Visibility dropdown works
    - Public option
    - Private option
  - Maintenance Mode toggle works
  - Dark Mode toggle works
  - Setting descriptions are clear
✓ Save Settings button works:
  - Saves all changes
  - Shows success toast
  - Settings persist on reload
✓ Error handling:
  - Invalid data shows error
  - Validation messages appear
✓ Settings affect site:
  - Maintenance mode message displays
  - Visibility controls access
  - Dark mode applies to portfolio
```

**Test Data:**
```
Site Title: My Professional Portfolio
Meta Description: Full-stack developer showcasing projects...
Portfolio Visibility: Public
Maintenance Mode: Off
Dark Mode: On
```

**How to Test:**
1. Navigate to Admin → Settings
2. Verify statistics are displayed
3. Update Site Title
4. Update Meta Description
5. Change Portfolio Visibility
6. Toggle Maintenance Mode
7. Toggle Dark Mode
8. Click Save Settings
9. Verify success toast
10. Refresh page and verify persistence

---

## 🎯 Feature Testing

### Form Validation Testing

```
✓ Required field validation:
  - Shows error when empty
  - Prevents submission
  - Error disappears when filled

✓ URL validation:
  - Accepts valid URLs (http/https)
  - Rejects invalid formats
  - Shows helpful error message

✓ Email validation:
  - Accepts valid emails
  - Rejects invalid formats

✓ Number validation:
  - Percentage: 0-100 only
  - Years: 1900-future only
  - Shows range error

✓ Duplicate prevention:
  - Project titles must be unique
  - Skills per category unique
  - Error message is clear
```

### Toast Notifications Testing

```
✓ Success toast:
  - Appears after successful action
  - Shows for 3 seconds
  - Can be dismissed manually
  - Green color with checkmark

✓ Error toast:
  - Appears when action fails
  - Shows error message
  - Stays until dismissed or 3 seconds
  - Red color with X icon

✓ Multiple toasts:
  - Stack vertically
  - Don't overlap
  - Each can be dismissed
```

### Image Upload Testing

```
✓ Profile image:
  - Accepts image files
  - Shows preview
  - Stores as base64
  - Loads on page reload

✓ Project image:
  - Accepts image files
  - Shows preview
  - Grid display shows image
  - Persists after save

✓ Certificate/Achievement image:
  - Accepts image files
  - Shows preview in card
  - Optional field
  - Works correctly when empty
```

### Responsive Design Testing

```
Desktop (1920px):
✓ Sidebar always visible
✓ Full width forms
✓ 4-column grids for projects
✓ All features accessible

Tablet (768px):
✓ Sidebar still visible
✓ 2-column grids
✓ Forms readable
✓ Touch-friendly buttons

Mobile (375px):
✓ Sidebar collapses
✓ Hamburger menu visible
✓ 1-column layout
✓ Single column grids
✓ Touch-friendly interface
```

---

## 🔒 Security Testing

### Authentication Testing

```
✓ Unauthenticated users:
  - Cannot access /admin
  - Redirected to /login

✓ Regular users (non-admin):
  - Cannot access admin features
  - API calls rejected with 403

✓ Token expiration:
  - Expired tokens rejected
  - User redirected to login
```

### Input Sanitization Testing

```
✓ XSS Prevention:
  - HTML in text fields doesn't render
  - Script tags don't execute

✓ SQL Injection:
  - Special characters handled safely
  - Database operations use parameterized queries

✓ CSRF Protection:
  - Valid token required
  - Invalid requests rejected
```

---

## 📊 Performance Testing

### Load Time Testing

```
✓ Dashboard loads in < 2 seconds
✓ Section pages load in < 1 second
✓ Forms are responsive
✓ No lag on input
✓ Animations are smooth
```

### Data Loading Testing

```
✓ Lists load correctly
✓ Large datasets handled (pagination ready)
✓ No loading freezes
✓ Smooth transitions between pages
```

---

## 🐛 Bug Hunting Checklist

```
General:
✓ No console errors
✓ No console warnings
✓ No broken links
✓ All buttons clickable
✓ All forms submittable

Specific Issues to Check:
✓ Page refreshes don't lose session
✓ Back button works correctly
✓ Navigating away and returning works
✓ Multiple windows/tabs work
✓ Timezone handling correct
✓ Sorting works consistently
✓ Filtering works correctly
✓ Search is case-insensitive
✓ Pagination works (if implemented)
```

---

## 📝 Test Report Template

```
Date: ___________
Tester: ___________
Environment: Development / Staging / Production

PASSED: __/__ tests
FAILED: __/__ tests
SKIPPED: __/__ tests

Issues Found:
1. [Description, Steps to Reproduce, Expected vs Actual]
2. [...]

Notes:
[Any observations or comments]

Sign-off: __________
```

---

## ✅ Final Checklist

Before deploying to production:

```
✓ All test cases passed
✓ No console errors
✓ Mobile responsive verified
✓ Security checks passed
✓ Performance acceptable
✓ All features working
✓ Documentation reviewed
✓ Team sign-off obtained
✓ Backup created
✓ Deployment plan ready
```

---

**Testing Status**: Ready
**Last Updated**: January 2024
**Version**: 1.0.0
