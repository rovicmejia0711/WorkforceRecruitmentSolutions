// Admin Dashboard JavaScript

const ADMIN_STORAGE_KEY = 'workforce_admin_credentials';
const JOBS_STORAGE_KEY = 'workforce_recruitment_jobs';
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin123'; // Change this in production!

// Initialize jobs if not exists (for admin dashboard, async)
async function initializeAdminJobs() {
    // Default jobs (same as in script.js)
    const defaultJobs = [
            {
                id: 1,
                title: 'Oracle HRMS Techno-Functional',
                location: 'KSA',
                experience: '8+ years, preferably in universities or large institutions',
                status: 'active',
                description: 'Looking for an experienced Oracle HRMS Techno-Functional Consultant with strong hands-on experience in Oracle EBS HRMS and Oracle Cloud Recruitment Platform.',
                responsibilities: [
                    'Implement, support, and enhance Oracle HRMS modules: Core HR, Payroll, Self-Service HR, Recruitment, and Performance Management.',
                    'Analyze university HR processes and provide effective Oracle HRMS solutions.',
                    'Customize reports, dashboards, and OTBI/BI Publisher outputs for management, audit, and compliance purposes.',
                    'Manage the full recruitment lifecycle using Oracle Cloud Recruitment Platform, including job requisitions, candidate sourcing, application tracking, interview scheduling, and selection processes.',
                    'Configure and optimize recruitment workflows, approvals, and notifications in the Oracle Cloud platform.',
                    'Enable integration between Oracle Cloud Recruitment Platform and on-premises Oracle EBS systems for centralized onboarding, offboarding, and employee data synchronization.',
                    'Maintain talent pools, candidate pipelines, and recruitment analytics for strategic hiring decisions.',
                    'Assist in performance evaluation cycles, promotions, employee transfers, and HR reporting.',
                    'Support HR audits, compliance, and regulatory reporting.',
                    'Participate in Oracle HRMS Cloud or EBS upgrades, patches, and module enhancements.',
                    'Provide functional and technical support to HR staff, faculty, and administrative departments.',
                    'Troubleshoot issues, develop workflows, reports, PL/SQL scripts, HCM Extracts, and OTBI dashboards.',
                    'Conduct training sessions and prepare user documentation for HR modules and recruitment processes.',
                    'Identify process improvements, automate recruitment and HR operations, and ensure a smooth employee lifecycle management.',
                    'Ensure accurate data migration during system upgrades or transitions.',
                    'Support management in generating HR KPIs and analytics for decision-making.',
                    'Experience in developing Oracle APEX–based modern HR forms integrated with Oracle EBS HRMS.',
                    'Ability to replace or extend legacy Oracle Forms using APEX for employee self-service, approvals, and HR requests.',
                    'Strong understanding of APEX security, role-based access, workflows, and REST integration'
                ],
                requiredSkills: [
                    'Strong functional knowledge of Oracle HRMS modules (Core HR, Payroll, Recruitment, Performance Management).',
                    'Deep expertise in Oracle Cloud Recruitment Platform, including configuration, workflows, approvals, integrations, and reporting.',
                    'Technical expertise in PL/SQL, OTBI, BI Publisher, Workflows, HCM Extracts, and recruitment data integrations.',
                    'Experience with integration between Oracle Cloud and on-premises Oracle EBS systems for centralized HR processes.',
                    'Understanding of university HR processes and employee lifecycle management.',
                    'Strong problem-solving, analytical, and communication skills.',
                    'Ability to work with cross-functional teams and manage multiple priorities.'
                ],
                additionalInfo: 'Interested candidates, please DM me directly.'
            },
            {
                id: 2,
                title: 'Oracle EBS Finance Techno-Functional Analyst',
                location: 'Al Khobar, Saudi Arabia',
                experience: 'Minimum 8 years',
                status: 'active',
                description: 'We are looking for an Oracle EBS Finance Techno-Functional Analyst to support and enhance Oracle E-Business Suite Financials in a university environment.',
                responsibilities: [
                    'Support Oracle EBS Financial modules (GL, AP, AR, FA, CM)',
                    'Gather and analyze finance business requirements',
                    'Configure and support Oracle EBS Financials',
                    'Develop and support reports, interfaces, and customizations (PL/SQL)',
                    'Experience with Oracle Forms or Oracle APEX is preferred',
                    'Support system integrations, including ZATCA e-invoicing',
                    'Provide production support and issue resolution'
                ],
                requiredSkills: [
                    'Bachelor\'s degree in IT, Finance, or related field',
                    '8+ years of Oracle EBS Finance experience',
                    'Strong knowledge of accounting and financial processes',
                    'Oracle EBS R12 experience',
                    'PL/SQL knowledge',
                    'ZATCA system and integration experience preferred'
                ],
                additionalInfo: ''
            }
        ];
    
    // Use Firebase if available, otherwise localStorage
    if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
        try {
            await window.firebaseService.initializeJobs(defaultJobs);
        } catch (error) {
            console.error('Error initializing jobs in Firebase:', error);
            // Fallback to localStorage
            if (!localStorage.getItem(JOBS_STORAGE_KEY)) {
                localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(defaultJobs));
            }
        }
    } else {
        // Fallback to localStorage
        if (!localStorage.getItem(JOBS_STORAGE_KEY)) {
            localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(defaultJobs));
        }
    }
}

// Get all jobs (async, uses Firebase if available)
async function getJobs() {
    if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
        try {
            return await window.firebaseService.getJobs();
        } catch (error) {
            console.error('Error fetching jobs from Firebase:', error);
            // Fallback to localStorage
            const jobs = localStorage.getItem(JOBS_STORAGE_KEY);
            return jobs ? JSON.parse(jobs) : [];
        }
    }
    // Fallback to localStorage
    const jobs = localStorage.getItem(JOBS_STORAGE_KEY);
    return jobs ? JSON.parse(jobs) : [];
}

// Initialize admin credentials
function initializeAdminCredentials() {
    if (!localStorage.getItem(ADMIN_STORAGE_KEY)) {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({
            username: DEFAULT_USERNAME,
            password: DEFAULT_PASSWORD
        }));
    }
}

// Check if user is logged in
function isLoggedIn() {
    return sessionStorage.getItem('admin_logged_in') === 'true';
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    const errorDiv = document.getElementById('login-error');
    
    const credentials = JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY));
    
    if (username === credentials.username && password === credentials.password) {
        sessionStorage.setItem('admin_logged_in', 'true');
        showDashboard();
    } else {
        errorDiv.textContent = 'Invalid username or password';
        errorDiv.style.display = 'block';
    }
}

// Show dashboard (async)
async function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    await initializeAdminJobs();
    await renderJobsList();
    await renderApplications();
    await loadSettings();
}

// Handle logout
function handleLogout() {
    sessionStorage.removeItem('admin_logged_in');
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('login-form').reset();
}

// Navigation menu
function setupAdminNavigation() {
    const menuItems = document.querySelectorAll('.admin-menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items and sections
            menuItems.forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Jobs List Management (async)
async function renderJobsList(filter = 'all') {
    const container = document.getElementById('jobs-list-container');
    const jobs = await getJobs();
    
    let filteredJobs = jobs;
    if (filter === 'active') {
        filteredJobs = jobs.filter(job => job.status === 'active');
    } else if (filter === 'archived') {
        filteredJobs = jobs.filter(job => job.status === 'archived');
    }
    
    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No jobs found</h3>
                <p>${filter === 'all' ? 'Click "Add New Job" to create your first job posting.' : `No ${filter} jobs at this time.`}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredJobs.map(job => `
        <div class="admin-job-card">
            <div class="admin-job-card-header">
                <div>
                    <h3>${escapeHtml(job.title)}</h3>
                    <div class="admin-job-card-meta">
                        <span>📍 ${escapeHtml(job.location)}</span>
                        <span>💼 ${escapeHtml(job.experience)}</span>
                        <span class="job-status ${job.status}">${job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span>
                    </div>
                </div>
                <div class="admin-job-card-actions">
                    <button class="btn-small btn-edit" onclick="editJob(${job.id})">Edit</button>
                    <button class="btn-small btn-archive" onclick="toggleArchiveJob(${job.id})">
                        ${job.status === 'active' ? 'Archive' : 'Activate'}
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteJob(${job.id})">Delete</button>
                </div>
            </div>
            <div class="admin-job-card-description">${escapeHtml(job.description)}</div>
        </div>
    `).join('');
}

// Filter jobs
function setupJobFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', async function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            await renderJobsList(filter);
        });
    });
}

// Add/Edit Job Modal (async)
async function openJobModal(jobId = null) {
    const modal = document.getElementById('job-modal-admin');
    const form = document.getElementById('job-form');
    const modalTitle = document.getElementById('modal-title');
    
    if (jobId) {
        const jobs = await getJobs();
        const job = jobs.find(j => j.id === jobId || j.id === parseInt(jobId));
        if (job) {
            modalTitle.textContent = 'Edit Job';
            document.getElementById('job-id').value = job.id;
            document.getElementById('job-title').value = job.title;
            document.getElementById('job-location').value = job.location;
            document.getElementById('job-experience').value = job.experience;
            document.getElementById('job-status').value = job.status;
            document.getElementById('job-description').value = job.description;
            // Handle image (could be URL or base64)
            if (job.imageUrl) {
                document.getElementById('job-image-data').value = job.imageUrl;
                // Check if it's a base64 image or URL
                if (job.imageUrl.startsWith('data:image')) {
                    // It's base64, show preview
                    document.getElementById('job-image-preview-img').src = job.imageUrl;
                    document.getElementById('job-image-preview').style.display = 'block';
                    document.getElementById('job-image-file-name').textContent = 'Image loaded';
                } else {
                    // It's a URL (legacy), convert to preview
                    document.getElementById('job-image-preview-img').src = job.imageUrl;
                    document.getElementById('job-image-preview').style.display = 'block';
                    document.getElementById('job-image-file-name').textContent = 'Legacy URL image';
                }
            } else {
                document.getElementById('job-image-data').value = '';
                document.getElementById('job-image-preview').style.display = 'none';
                document.getElementById('job-image-file-name').textContent = '';
            }
            document.getElementById('job-responsibilities').value = job.responsibilities.join('\n');
            document.getElementById('job-required-skills').value = job.requiredSkills.join('\n');
            document.getElementById('job-additional-info').value = job.additionalInfo || '';
        }
    } else {
        modalTitle.textContent = 'Add New Job';
        form.reset();
        document.getElementById('job-id').value = '';
        document.getElementById('job-status').value = 'active';
        document.getElementById('job-image-data').value = '';
        document.getElementById('job-image-preview').style.display = 'none';
        document.getElementById('job-image-file-name').textContent = '';
    }
    
    modal.style.display = 'block';
}

function closeJobModal() {
    document.getElementById('job-modal-admin').style.display = 'none';
    document.getElementById('job-form').reset();
    document.getElementById('job-image-data').value = '';
    document.getElementById('job-image-preview').style.display = 'none';
    document.getElementById('job-image-file-name').textContent = '';
}

// Handle job image file upload
function handleJobImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
        showNotification('Please select a valid image file (JPG, PNG, GIF, WebP, or SVG).', 'error', 'Invalid File Type');
        event.target.value = '';
        return;
    }
    
    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
        showNotification('Image size must be less than 2MB. Please compress the image and try again.', 'error', 'File Too Large');
        event.target.value = '';
        return;
    }
    
    // Read file as base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Image = e.target.result;
        document.getElementById('job-image-data').value = base64Image;
        document.getElementById('job-image-preview-img').src = base64Image;
        document.getElementById('job-image-preview').style.display = 'block';
        document.getElementById('job-image-file-name').textContent = file.name;
        document.getElementById('job-image-file-name').style.display = 'block';
    };
    reader.onerror = function() {
        showNotification('Error reading image file. Please try again.', 'error', 'Upload Error');
        event.target.value = '';
    };
    reader.readAsDataURL(file);
}

// Remove job image
function removeJobImage() {
    document.getElementById('job-image-upload').value = '';
    document.getElementById('job-image-data').value = '';
    document.getElementById('job-image-preview').style.display = 'none';
    document.getElementById('job-image-file-name').textContent = '';
    document.getElementById('job-image-file-name').style.display = 'none';
}

// Handle job form submission (async)
async function handleJobFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const jobId = document.getElementById('job-id').value;
    
    const jobData = {
        id: jobId ? parseInt(jobId) : Date.now(),
        title: document.getElementById('job-title').value,
        location: document.getElementById('job-location').value,
        experience: document.getElementById('job-experience').value,
        status: document.getElementById('job-status').value,
        description: document.getElementById('job-description').value,
        imageUrl: document.getElementById('job-image-data').value || null,
        responsibilities: document.getElementById('job-responsibilities').value.split('\n').filter(r => r.trim()),
        requiredSkills: document.getElementById('job-required-skills').value.split('\n').filter(s => s.trim()),
        additionalInfo: document.getElementById('job-additional-info').value.trim()
    };
    
    // Save to Firebase or localStorage
    if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
        try {
            await window.firebaseService.saveJob(jobData);
        } catch (error) {
            console.error('Error saving job to Firebase:', error);
            // Fallback to localStorage
            const jobs = await getJobs();
            if (jobId) {
                const index = jobs.findIndex(j => j.id === parseInt(jobId));
                if (index !== -1) {
                    jobs[index] = { ...jobs[index], ...jobData };
                }
            } else {
                jobs.push(jobData);
            }
            localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
        }
    } else {
        // Fallback to localStorage
        const jobs = await getJobs();
        if (jobId) {
            const index = jobs.findIndex(j => j.id === parseInt(jobId));
            if (index !== -1) {
                jobs[index] = { ...jobs[index], ...jobData };
            }
        } else {
            jobs.push(jobData);
        }
        localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    }
    
    // Update main site jobs
    if (typeof renderJobs === 'function') {
        await renderJobs();
    }
    
    closeJobModal();
    await renderJobsList();
    
    // Show success message
    showNotification('Job saved successfully!', 'success');
}

// Edit job (async)
async function editJob(jobId) {
    await openJobModal(jobId);
}

// Delete job (async)
async function deleteJob(jobId) {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
        return;
    }
    
    // Delete from Firebase or localStorage
    if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
        try {
            await window.firebaseService.deleteJob(jobId);
        } catch (error) {
            console.error('Error deleting job from Firebase:', error);
            // Fallback to localStorage
            const jobs = await getJobs();
            const filteredJobs = jobs.filter(j => j.id !== jobId);
            localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(filteredJobs));
        }
    } else {
        const jobs = await getJobs();
        const filteredJobs = jobs.filter(j => j.id !== jobId);
        localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(filteredJobs));
    }
    
    await renderJobsList();
    
    // Update main site
    if (typeof renderJobs === 'function') {
        await renderJobs();
    }
}

// Toggle archive status (async)
async function toggleArchiveJob(jobId) {
    const jobs = await getJobs();
    const job = jobs.find(j => j.id === jobId || j.id === parseInt(jobId));
    
    if (job) {
        job.status = job.status === 'active' ? 'archived' : 'active';
        
        // Save to Firebase or localStorage
        if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
            try {
                await window.firebaseService.saveJob(job);
            } catch (error) {
                console.error('Error updating job in Firebase:', error);
                localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
            }
        } else {
            localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
        }
        
        await renderJobsList();
        
        // Update main site
        if (typeof renderJobs === 'function') {
            await renderJobs();
        }
    }
}

// Applications Management (async)
async function renderApplications() {
    const container = document.getElementById('applications-container');
    let applications = [];
    
    if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
        try {
            applications = await window.firebaseService.getApplications();
        } catch (error) {
            console.error('Error fetching applications from Firebase:', error);
            applications = JSON.parse(localStorage.getItem('applications') || '[]');
        }
    } else {
        applications = JSON.parse(localStorage.getItem('applications') || '[]');
    }
    
    if (applications.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No applications yet</h3>
                <p>Applications will appear here once candidates submit their information.</p>
            </div>
        `;
        return;
    }
    
    // Sort by date (newest first)
    const sortedApplications = [...applications].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    container.innerHTML = sortedApplications.map((app, index) => `
        <div class="application-card">
            <div class="application-card-header">
                <div>
                    <h3>${escapeHtml(app.name)}</h3>
                    <div class="application-card-date">Applied on: ${formatDate(app.timestamp)}</div>
                </div>
            </div>
            <div class="application-card-info">
                <div class="application-info-item">
                    <span class="application-info-label">Position</span>
                    <span class="application-info-value">${escapeHtml(app.jobTitle || 'N/A')}</span>
                </div>
                <div class="application-info-item">
                    <span class="application-info-label">Email</span>
                    <span class="application-info-value">${escapeHtml(app.email)}</span>
                </div>
                <div class="application-info-item">
                    <span class="application-info-label">Phone</span>
                    <span class="application-info-value">${escapeHtml(app.phone)}</span>
                </div>
                <div class="application-info-item">
                    <span class="application-info-label">Experience</span>
                    <span class="application-info-value">${escapeHtml(app.experience || 'N/A')} years</span>
                </div>
            </div>
            ${app.coverLetter ? `
                <div class="application-cover-letter">
                    <strong>Cover Letter:</strong><br>
                    ${escapeHtml(app.coverLetter)}
                </div>
            ` : ''}
            <div class="application-card-actions">
                <a href="mailto:${app.email}" class="btn-small btn-edit">Email Candidate</a>
                ${app.resumeFileName && app.resumeFileName !== 'No file' && app.resumeData ? 
                    `<div class="resume-actions">
                        <span class="application-info-label" style="margin-right: 0.5rem;">Resume: ${escapeHtml(app.resumeFileName)}</span>
                        <button class="btn-small btn-view-resume" onclick="viewResume(${index})" title="View Resume">👁️ View</button>
                        <button class="btn-small btn-download-resume" onclick="downloadResume(${index})" title="Download Resume">📥 Download</button>
                    </div>` : 
                    app.resumeFileName && app.resumeFileName !== 'No file' ?
                    `<span class="application-info-label">Resume: ${escapeHtml(app.resumeFileName)} (File not available)</span>` :
                    '<span class="application-info-label">No resume uploaded</span>'
                }
            </div>
        </div>
    `).join('');
}

// View resume in new window
function viewResume(applicationIndex) {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const sortedApplications = [...applications].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    if (applicationIndex >= 0 && applicationIndex < sortedApplications.length) {
        const app = sortedApplications[applicationIndex];
        if (app.resumeData) {
            const newWindow = window.open('', '_blank');
            if (newWindow) {
                const isPDF = app.resumeFileType && app.resumeFileType.includes('pdf');
                const fileExtension = app.resumeFileName ? app.resumeFileName.split('.').pop().toLowerCase() : '';
                const isPDFByExtension = fileExtension === 'pdf';
                
                if (isPDF || isPDFByExtension) {
                    // For PDFs, use embed
                    newWindow.document.write(`
                        <html>
                            <head>
                                <title>Resume - ${escapeHtml(app.name)}</title>
                                <style>
                                    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
                                    .header { padding: 15px 20px; background: #f5f5f5; border-bottom: 2px solid #ddd; }
                                    .header h2 { margin: 0; color: #333; font-size: 1.2rem; }
                                    .header p { margin: 5px 0 0 0; color: #666; font-size: 0.9rem; }
                                    embed { width: 100%; height: calc(100vh - 80px); border: none; }
                                </style>
                            </head>
                            <body>
                                <div class="header">
                                    <h2>${escapeHtml(app.name)} - Resume</h2>
                                    <p>Position: ${escapeHtml(app.jobTitle || 'N/A')} | Applied: ${formatDate(app.timestamp)}</p>
                                </div>
                                <embed src="${app.resumeData}" type="application/pdf" />
                            </body>
                        </html>
                    `);
                } else {
                    // For images or other files, use img or iframe
                    newWindow.document.write(`
                        <html>
                            <head>
                                <title>Resume - ${escapeHtml(app.name)}</title>
                                <style>
                                    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #f5f5f5; }
                                    .header { padding: 15px; background: white; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                                    .header h2 { margin: 0; color: #333; font-size: 1.2rem; }
                                    .header p { margin: 5px 0 0 0; color: #666; font-size: 0.9rem; }
                                    .content { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                                    img { max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px; }
                                    iframe { width: 100%; min-height: 600px; border: 1px solid #ddd; border-radius: 4px; }
                                </style>
                            </head>
                            <body>
                                <div class="header">
                                    <h2>${escapeHtml(app.name)} - Resume</h2>
                                    <p>Position: ${escapeHtml(app.jobTitle || 'N/A')} | Applied: ${formatDate(app.timestamp)}</p>
                                </div>
                                <div class="content">
                                    ${app.resumeFileType && app.resumeFileType.includes('image') ? 
                                        `<img src="${app.resumeData}" alt="Resume" />` : 
                                        `<iframe src="${app.resumeData}"></iframe>`
                                    }
                                </div>
                            </body>
                        </html>
                    `);
                }
                newWindow.document.close();
            } else {
                showNotification('Please allow pop-ups to view the resume in a new window.', 'warning', 'Pop-up Blocked');
            }
        } else {
            showNotification('Resume file data is not available.', 'error', 'Resume Not Found');
        }
    }
}

// Download resume
function downloadResume(applicationIndex) {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const sortedApplications = [...applications].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    if (applicationIndex >= 0 && applicationIndex < sortedApplications.length) {
        const app = sortedApplications[applicationIndex];
        if (app.resumeData) {
            try {
                // Convert base64 to blob
                const base64Data = app.resumeData.split(',')[1];
                const byteCharacters = atob(base64Data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: app.resumeFileType || 'application/pdf' });
                
                // Create download link
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = app.resumeFileName || 'resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error downloading resume:', error);
                showNotification('Error downloading resume. Please try again.', 'error', 'Download Failed');
            }
        } else {
            showNotification('Resume file data is not available.', 'error', 'Resume Not Found');
        }
    }
}

// Export applications to CSV
function exportApplicationsToCSV() {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    
    if (applications.length === 0) {
        showNotification('No applications to export.', 'warning', 'Export Failed');
        return;
    }
    
    const headers = ['Name', 'Email', 'Phone', 'Position', 'Experience', 'Cover Letter', 'Resume', 'Date'];
    const rows = applications.map(app => [
        app.name || '',
        app.email || '',
        app.phone || '',
        app.jobTitle || '',
        app.experience || '',
        (app.coverLetter || '').replace(/,/g, ';').replace(/\n/g, ' '),
        app.resumeFileName || 'No file',
        formatDate(app.timestamp)
    ]);
    
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Settings Management (async)
async function loadSettings() {
    let settings = {};
    
    if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
        try {
            settings = await window.firebaseService.getSettings();
        } catch (error) {
            console.error('Error fetching settings from Firebase:', error);
            settings = JSON.parse(localStorage.getItem('admin_settings') || '{}');
        }
    } else {
        settings = JSON.parse(localStorage.getItem('admin_settings') || '{}');
    }
    
    if (settings.hrEmail) {
        document.getElementById('hr-email').value = settings.hrEmail;
    }
    if (settings.hrEmails) {
        document.getElementById('hr-emails').value = settings.hrEmails;
    }
}

async function saveEmailSettings() {
    const hrEmail = document.getElementById('hr-email').value;
    const hrEmails = document.getElementById('hr-emails').value;
    
    const settings = {
        hrEmail: hrEmail,
        hrEmails: hrEmails
    };
    
    // Save to Firebase or localStorage
    if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
        try {
            await window.firebaseService.saveSettings(settings);
        } catch (error) {
            console.error('Error saving settings to Firebase:', error);
            localStorage.setItem('admin_settings', JSON.stringify(settings));
        }
    } else {
        localStorage.setItem('admin_settings', JSON.stringify(settings));
    }
    
    showNotification('Email settings saved successfully!', 'success');
}


function changeAdminCredentials() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    
    if (!newUsername || !newPassword) {
        showNotification('Please enter both username and password.', 'error', 'Invalid Input');
        return;
    }
    
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({
        username: newUsername,
        password: newPassword
    }));
    
    showNotification('Credentials updated successfully! You will be logged out. Please login with your new credentials.', 'success', 'Credentials Updated');
    setTimeout(() => {
        handleLogout();
    }, 2000);
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Notification System
function showNotification(message, type = 'info', title = '') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">${icons[type] || icons.info}</div>
        <div class="notification-content">
            ${title ? `<strong>${escapeHtml(title)}</strong>` : ''}
            <p>${escapeHtml(message)}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('hiding');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Page Content Management (async)
async function loadPageContent(pageName) {
    if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
        try {
            return await window.firebaseService.getPageContent(pageName);
        } catch (error) {
            console.error('Error fetching page content from Firebase:', error);
            const content = JSON.parse(localStorage.getItem(`page_content_${pageName}`) || '{}');
            return content;
        }
    }
    const content = JSON.parse(localStorage.getItem(`page_content_${pageName}`) || '{}');
    return content;
}

async function savePageContent(pageName) {
    let content = {};
    
    if (pageName === 'home') {
        content = {
            heroTitle: document.getElementById('home-hero-title').value,
            heroSubtitle: document.getElementById('home-hero-subtitle').value,
            whoWeAre: document.getElementById('home-who-we-are').value,
            ourPurpose: document.getElementById('home-our-purpose').value,
            quoteLabel: document.getElementById('home-quote-label').value,
            quoteText: document.getElementById('home-quote-text').value,
            quoteAuthor: document.getElementById('home-quote-author').value
        };
    } else if (pageName === 'about') {
        content = {
            sectionLabel: document.getElementById('about-section-label').value,
            sectionTitle: document.getElementById('about-section-title').value,
            sectionSubtitle: document.getElementById('about-section-subtitle').value,
            name: document.getElementById('about-name').value,
            jobTitle: document.getElementById('about-job-title').value,
            experience: document.getElementById('about-experience').value,
            description1: document.getElementById('about-description-1').value,
            description2: document.getElementById('about-description-2').value,
            description3: document.getElementById('about-description-3').value,
            profileImage: document.getElementById('about-profile-image').value
        };
    } else if (pageName === 'apply') {
        content = {
            label: document.getElementById('apply-section-label').value,
            title: document.getElementById('apply-section-title').value,
            subtitle: document.getElementById('apply-section-subtitle').value,
            formUrl: document.getElementById('apply-form-url').value
        };
        
        // Also save form URL globally for Apply Now buttons
        if (content.formUrl) {
            localStorage.setItem('apply_form_url', content.formUrl);
        }
    }
    
    // Save to Firebase or localStorage
    if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
        try {
            await window.firebaseService.savePageContent(pageName, content);
        } catch (error) {
            console.error('Error saving page content to Firebase:', error);
            localStorage.setItem(`page_content_${pageName}`, JSON.stringify(content));
        }
    } else {
        localStorage.setItem(`page_content_${pageName}`, JSON.stringify(content));
    }
    
    showNotification(`${pageName.charAt(0).toUpperCase() + pageName.slice(1)} page content saved successfully!`, 'success', 'Content Saved');
}

async function loadPageContentIntoEditor(pageName) {
    const content = await loadPageContent(pageName);
    
    if (pageName === 'home') {
        if (content.heroTitle) document.getElementById('home-hero-title').value = content.heroTitle;
        if (content.heroSubtitle) document.getElementById('home-hero-subtitle').value = content.heroSubtitle;
        if (content.whoWeAre) document.getElementById('home-who-we-are').value = content.whoWeAre;
        if (content.ourPurpose) document.getElementById('home-our-purpose').value = content.ourPurpose;
        if (content.quoteLabel) document.getElementById('home-quote-label').value = content.quoteLabel;
        if (content.quoteText) document.getElementById('home-quote-text').value = content.quoteText;
        if (content.quoteAuthor) document.getElementById('home-quote-author').value = content.quoteAuthor;
    } else if (pageName === 'about') {
        if (content.sectionLabel) document.getElementById('about-section-label').value = content.sectionLabel;
        if (content.sectionTitle) document.getElementById('about-section-title').value = content.sectionTitle;
        if (content.sectionSubtitle) document.getElementById('about-section-subtitle').value = content.sectionSubtitle;
        if (content.name) document.getElementById('about-name').value = content.name;
        if (content.jobTitle) document.getElementById('about-job-title').value = content.jobTitle;
        if (content.experience) document.getElementById('about-experience').value = content.experience;
        if (content.description1) document.getElementById('about-description-1').value = content.description1;
        if (content.description2) document.getElementById('about-description-2').value = content.description2;
        if (content.description3) document.getElementById('about-description-3').value = content.description3;
        if (content.profileImage) document.getElementById('about-profile-image').value = content.profileImage;
    } else if (pageName === 'apply') {
        if (content.label) document.getElementById('apply-section-label').value = content.label;
        if (content.title) document.getElementById('apply-section-title').value = content.title;
        if (content.subtitle) document.getElementById('apply-section-subtitle').value = content.subtitle;
        if (content.formUrl) document.getElementById('apply-form-url').value = content.formUrl;
        else {
            // Set default Google Form URL if not set
            document.getElementById('apply-form-url').value = 'https://forms.gle/xPnqiE2Cytt9VyuAA';
        }
    }
}

function setupPageTabs() {
    const pageTabs = document.querySelectorAll('.page-tab-btn');
    const pageEditors = document.querySelectorAll('.page-editor');
    
    pageTabs.forEach(tab => {
        tab.addEventListener('click', async function() {
            const pageName = this.getAttribute('data-page');
            
            // Remove active class from all tabs and editors
            pageTabs.forEach(t => t.classList.remove('active'));
            pageEditors.forEach(e => e.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding editor
            this.classList.add('active');
            const editor = document.getElementById(`page-editor-${pageName}`);
            if (editor) {
                editor.classList.add('active');
                // Load content when switching to a page editor
                await loadPageContentIntoEditor(pageName);
            }
        });
    });
    
    // Load home page content initially
    loadPageContentIntoEditor('home');
}

// Make functions globally available
window.editJob = editJob;
window.deleteJob = deleteJob;
window.toggleArchiveJob = toggleArchiveJob;
window.closeJobModal = closeJobModal;
window.handleJobImageUpload = handleJobImageUpload;
window.removeJobImage = removeJobImage;
window.viewResume = viewResume;
window.downloadResume = downloadResume;
window.saveEmailSettings = saveEmailSettings;
window.changeAdminCredentials = changeAdminCredentials;
window.savePageContent = savePageContent;
window.showNotification = showNotification;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    initializeAdminCredentials();
    
    // Check if already logged in
    if (isLoggedIn()) {
        await showDashboard();
    } else {
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('admin-dashboard').style.display = 'none';
    }
    
    // Migrate localStorage data to Firebase if Firebase is configured (one-time)
    if (typeof window.firebaseService !== 'undefined' && window.firebaseService.isFirebaseAvailable) {
        const migrationDone = sessionStorage.getItem('firebase_migration_done');
        if (!migrationDone) {
            try {
                    const migrated = await window.firebaseService.migrateFromLocalStorage();
                if (migrated) {
                    sessionStorage.setItem('firebase_migration_done', 'true');
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        console.log('Data migrated to Firebase successfully');
                    }
                }
            } catch (error) {
                console.error('Error migrating data to Firebase:', error);
            }
        }
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Navigation
    setupAdminNavigation();
    
    // Page tabs
    setupPageTabs();
    
    // Job filters
    setupJobFilters();
    
    // Add job button
    const addJobBtn = document.getElementById('add-job-btn');
    if (addJobBtn) {
        addJobBtn.addEventListener('click', () => openJobModal());
    }
    
    // Job form
    const jobForm = document.getElementById('job-form');
    if (jobForm) {
        jobForm.addEventListener('submit', handleJobFormSubmit);
    }
    
    // Job image upload handler
    const jobImageUpload = document.getElementById('job-image-upload');
    if (jobImageUpload) {
        jobImageUpload.addEventListener('change', handleJobImageUpload);
    }
    
    // Job image remove button (use event delegation since button is in preview)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'job-image-remove') {
            removeJobImage();
        }
    });
    
    // Export applications
    const exportBtn = document.getElementById('export-applications-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportApplicationsToCSV);
    }
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('job-modal-admin');
        if (e.target === modal) {
            closeJobModal();
        }
    });
});
