# Workforce Recruitment Solutions Website

A clean, modern one-page hiring website with built-in job postings, application management, and admin dashboard.

**✅ Ready for Netlify Deployment** | **© 2026 All Rights Reserved** | **EST. 2023**

## ✨ Features

### 🎯 Main Features
- **Hero Section** - Clear identity and purpose statement
- **Job Openings Section** - Dynamic job postings with detailed information
- **About Section** - HR Officer profile and credentials
- **Quote Section** - Inspirational quote from HR Officer
- **Application Form** - Comprehensive candidate submission form with resume upload

### 🎨 Design
- **Modern Red/Maroon Theme** - Professional and friendly color scheme
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Elegant transitions and interactions
- **Clean UI/UX** - User-friendly interface following best practices

### 🛠️ Admin Dashboard
- **Secure Login** - Password-protected admin access
- **Job Management** - Add, edit, archive, and delete job postings
- **Application Viewer** - View all submitted applications
- **CSV Export** - Export applications to CSV for tracking
- **Settings Panel** - Configure email and Google Sheets integration

### 📧 Email Integration (Configure via CONFIGURATION.md)
- **HR Notifications** - Auto-send applications to HR team
- **Auto-Reply** - Automatic confirmation emails to applicants
- **Multiple Recipients** - Send to multiple HR email addresses
- **EmailJS Ready** - Easy setup with EmailJS service

### 📊 Data Management
- **Google Sheets Integration** - Auto-log applications (optional)
- **Local Storage** - Works offline with browser storage
- **CSV Export** - Export applications for external tracking
- **Spam Protection** - Honeypot field to prevent spam

### 📄 File Upload
- **Resume Upload** - Support for PDF and DOCX files
- **File Validation** - Size and type validation
- **Visual Feedback** - Clear upload status indicators

## 🚀 Quick Start

### 1. Basic Setup (No Configuration Required)
Simply open `WorkforceRecruitmentSolution.html` in your web browser to start using the website. All features work with localStorage by default.

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Important:** Change these credentials in the Admin Dashboard > Settings immediately!

### 2. Accessing Admin Dashboard
The admin dashboard is **not visible in the navigation menu** for security purposes. Access it directly via:
- **URL**: `admin.html` (e.g., `yoursite.com/admin.html`)
- **Direct URL only** - This keeps the admin panel hidden from public view

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Important:** Change these credentials in the Admin Dashboard > Settings immediately!

### 3. File Structure
```
.
├── WorkforceRecruitmentSolution.html  # Main website page
├── admin.html          # Admin dashboard
├── thank-you.html      # Thank you page after submission
├── styles.css          # Main stylesheet
├── admin-styles.css    # Admin dashboard styles
├── script.js           # Main website JavaScript
├── admin-script.js     # Admin dashboard JavaScript
├── README.md           # This file
└── CONFIGURATION.md    # Detailed configuration guide
```

### 3. Adding Your First Job

1. Open `WorkforceRecruitmentSolution.html` in your browser
2. Click **Admin** in the navigation
3. Login with default credentials
4. Click **"Add New Job"** button
5. Fill in the job details
6. Click **"Save Job"**

The job will automatically appear on the main website!

### 4. Testing the Application Form

1. Navigate to the **"Apply Now"** section
2. Fill in the application form
3. Select a position
4. Upload a resume (PDF or DOCX)
5. Submit the form

Applications are stored in localStorage and can be viewed in the Admin Dashboard under **"Applications"**.

## 📋 Default Job Postings

The website comes pre-loaded with two job postings:

1. **Oracle HRMS Techno-Functional** (KSA)
2. **Oracle EBS Finance Techno-Functional Analyst** (Al Khobar, Saudi Arabia)

You can edit, archive, or delete these from the Admin Dashboard.

## ⚙️ Advanced Configuration

For email notifications, Google Sheets integration, and other advanced features, please refer to **[CONFIGURATION.md](CONFIGURATION.md)**.

### Quick Email Setup
1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Create email templates
3. Update `script.js` with your credentials
4. Add EmailJS SDK to `WorkforceRecruitmentSolution.html`

See `CONFIGURATION.md` for detailed instructions.

## 🎨 Customization

### Changing Colors
Edit `styles.css` and modify the CSS variables:
```css
:root {
    --primary-red: #8B2635;      /* Main red color */
    --primary-maroon: #A52A2A;   /* Maroon accent */
    --dark-red: #6B1A22;         /* Dark red for backgrounds */
}
```

### Modifying Content
- **Company Info**: Edit the Hero section in `WorkforceRecruitmentSolution.html`
- **HR Officer Info**: Update the About section in `WorkforceRecruitmentSolution.html`
- **Quote**: Modify the quote section in `WorkforceRecruitmentSolution.html`
- **Jobs**: Manage via Admin Dashboard

## 📱 Responsive Design

The website is fully responsive and tested on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px - 1920px)
- ✅ Tablet (768px - 1366px)
- ✅ Mobile (320px - 768px)

## 🔒 Security Features

- **Honeypot Field** - Invisible field to catch spam bots
- **Form Validation** - Client-side validation for all fields
- **Secure Admin Login** - Session-based authentication
- **XSS Protection** - HTML escaping for all user inputs

## 📦 Deployment

### Static Hosting (Recommended)
1. **Netlify**:
   - Connect your Git repository
   - Deploy automatically
   - Add custom domain

2. **Vercel**:
   - Import project
   - One-click deployment
   - Free SSL included

3. **GitHub Pages**:
   - Push to GitHub
   - Enable Pages in repository settings
   - Access via `username.github.io/repo-name`

### Traditional Hosting
1. Upload all files to your web server
2. Ensure JavaScript is enabled
3. Configure email/Sheets endpoints if needed
4. Set up HTTPS (recommended)

## 🐛 Troubleshooting

### Admin login not working?
- Clear browser cache and localStorage
- Check if credentials are correctly set
- Try resetting credentials in Settings

### Applications not appearing?
- Check browser console for errors
- Ensure localStorage is enabled
- Verify form submission is completing

### Jobs not showing?
- Check Admin Dashboard > Job Manager
- Ensure jobs are set to "Active" status
- Refresh the main page

### Email not sending?
- Verify EmailJS configuration (see CONFIGURATION.md)
- Check browser console for errors
- Ensure templates are correctly named

## 📝 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 🔄 Updates and Maintenance

### Regular Maintenance
1. **Backup Applications**: Export to CSV regularly
2. **Update Jobs**: Archive filled positions
3. **Review Applications**: Check Admin Dashboard regularly
4. **Update Credentials**: Change admin password periodically

### Future Enhancements
- Database integration (replace localStorage)
- Email notifications (configure EmailJS)
- Google Sheets auto-sync (optional)
- Advanced analytics
- Candidate tracking system

## 📧 Support

For configuration help or issues, refer to:
- **[CONFIGURATION.md](CONFIGURATION.md)** - Detailed setup guide
- Browser console - Check for JavaScript errors
- EmailJS Documentation - [docs.emailjs.com](https://www.emailjs.com/docs/)

## 📄 License

This project is created for Workforce Recruitment Solutions. All rights reserved.

## 🙏 Credits

- **Design**: Modern, clean UI with Red/Maroon theme
- **Icons**: SVG-based icons
- **Fonts**: Inter (Google Fonts)
- **Built with**: Vanilla JavaScript, HTML5, CSS3

---

**Made with ❤️ for Workforce Recruitment Solutions**

For questions or customization requests, contact your development team.
