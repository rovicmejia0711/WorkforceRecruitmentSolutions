// Job Data Storage (using localStorage as fallback)
const JOBS_STORAGE_KEY = 'workforce_recruitment_jobs';

// Default job postings
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

// Initialize jobs if not exists
function initializeJobs() {
    if (!localStorage.getItem(JOBS_STORAGE_KEY)) {
        localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(defaultJobs));
    }
}

// Get all jobs
function getJobs() {
    const jobs = localStorage.getItem(JOBS_STORAGE_KEY);
    return jobs ? JSON.parse(jobs) : [];
}

// Get active jobs only
function getActiveJobs() {
    return getJobs().filter(job => job.status === 'active');
}

// Render jobs
function renderJobs() {
    const jobsContainer = document.getElementById('jobs-container');
    if (!jobsContainer) return; // Exit if jobs container doesn't exist on this page
    
    const activeJobs = getActiveJobs();
    
    if (activeJobs.length === 0) {
        jobsContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); grid-column: 1 / -1;">No job openings at this time. Please check back later.</p>';
        return;
    }
    
    jobsContainer.innerHTML = activeJobs.map(job => `
        <div class="job-card">
            <div class="job-image-container">
                ${job.imageUrl ? 
                    `<img src="${escapeHtml(job.imageUrl)}" alt="${escapeHtml(job.title)}" class="job-image" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'job-image-placeholder\\'><svg width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\' fill=\\'none\\' xmlns=\\'http://www.w3.org/2000/svg\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'#8B2635\\' opacity=\\'0.1\\'/><circle cx=\\'50\\' cy=\\'35\\' r=\\'12\\' fill=\\'#8B2635\\' opacity=\\'0.3\\'/><path d=\\'M25 75 Q25 60 50 60 Q75 60 75 75\\' stroke=\\'#8B2635\\' stroke-width=\\'8\\' stroke-linecap=\\'round\\' opacity=\\'0.3\\'/></svg><span class=\\'job-image-icon\\'>💼</span></div>';">` :
                    `<div class="job-image-placeholder">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100" height="100" fill="#8B2635" opacity="0.1"/>
                            <circle cx="50" cy="35" r="12" fill="#8B2635" opacity="0.3"/>
                            <path d="M25 75 Q25 60 50 60 Q75 60 75 75" stroke="#8B2635" stroke-width="8" stroke-linecap="round" opacity="0.3"/>
                        </svg>
                        <span class="job-image-icon">💼</span>
                    </div>`
                }
            </div>
            <div class="job-card-content">
                <span class="job-status active">Active</span>
                <h3>${escapeHtml(job.title)}</h3>
                <div class="job-meta">
                    <span>📍 ${escapeHtml(job.location)}</span>
                    <span>💼 ${escapeHtml(job.experience)}</span>
                </div>
                <div class="job-description">${escapeHtml(job.description)}</div>
                <div class="job-card-actions">
                    <button class="btn-primary" onclick="viewJobDetails(${job.id})">View Details</button>
                    <a href="apply.html?job=${job.id}" class="btn-secondary" onclick="selectJobForApplication(${job.id})">Apply Now</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Populate position dropdown
function populatePositionDropdown() {
    const select = document.getElementById('position-interest');
    if (!select) return; // Exit if position dropdown doesn't exist on this page
    
    const activeJobs = getActiveJobs();
    
    select.innerHTML = '<option value="">Select a position...</option>' +
        activeJobs.map(job => 
            `<option value="${job.id}">${escapeHtml(job.title)} - ${escapeHtml(job.location)}</option>`
        ).join('');
}

// View job details modal
function viewJobDetails(jobId) {
    const jobs = getJobs();
    const job = jobs.find(j => j.id === jobId);
    
    if (!job) return;
    
    const modal = document.getElementById('job-modal');
    const modalContent = document.getElementById('modal-job-details');
    
    modalContent.innerHTML = `
        <div class="modal-job-image">
            ${job.imageUrl ? 
                `<img src="${escapeHtml(job.imageUrl)}" alt="${escapeHtml(job.title)}" class="job-image-modal" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'job-image-placeholder\\'><svg width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\' fill=\\'none\\' xmlns=\\'http://www.w3.org/2000/svg\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'#8B2635\\' opacity=\\'0.1\\'/><circle cx=\\'50\\' cy=\\'35\\' r=\\'12\\' fill=\\'#8B2635\\' opacity=\\'0.3\\'/><path d=\\'M25 75 Q25 60 50 60 Q75 60 75 75\\' stroke=\\'#8B2635\\' stroke-width=\\'8\\' stroke-linecap=\\'round\\' opacity=\\'0.3\\'/></svg><span class=\\'job-image-icon\\'>💼</span></div>';">` :
                `<div class="job-image-placeholder">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="#8B2635" opacity="0.1"/>
                        <circle cx="50" cy="35" r="12" fill="#8B2635" opacity="0.3"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75" stroke="#8B2635" stroke-width="8" stroke-linecap="round" opacity="0.3"/>
                    </svg>
                    <span class="job-image-icon">💼</span>
                </div>`
            }
        </div>
        <h2>${escapeHtml(job.title)}</h2>
        <div class="job-meta">
            <span>📍 ${escapeHtml(job.location)}</span>
            <span>💼 ${escapeHtml(job.experience)}</span>
            <span class="job-status ${job.status}">${job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span>
        </div>
        <div class="job-details-content">
            <h3>Job Description</h3>
            <p>${escapeHtml(job.description)}</p>
            
            <h3>Key Responsibilities</h3>
            <ul>
                ${job.responsibilities.map(resp => `<li>${escapeHtml(resp)}</li>`).join('')}
            </ul>
            
            <h3>Required Skills</h3>
            <ul>
                ${job.requiredSkills.map(skill => `<li>${escapeHtml(skill)}</li>`).join('')}
            </ul>
            
            ${job.additionalInfo ? `<p><strong>Additional Information:</strong> ${escapeHtml(job.additionalInfo)}</p>` : ''}
        </div>
        <div style="margin-top: 2rem; text-align: center;">
            <a href="apply.html?job=${job.id}" class="btn-primary" onclick="selectJobForApplication(${job.id}); closeModal();" style="display: inline-block; text-decoration: none;">Apply Now</a>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('job-modal');
    modal.style.display = 'none';
}

// Select job for application
function selectJobForApplication(jobId) {
    const select = document.getElementById('position-interest');
    if (select) {
        select.value = jobId;
    }
}

// Auto-select job from URL parameter when on apply page
function autoSelectJobFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('job');
    if (jobId) {
        selectJobForApplication(jobId);
    }
}

// File upload handling
function setupFileUpload() {
    const fileInput = document.getElementById('resume-upload');
    const fileName = fileInput.parentElement.querySelector('.file-name');
    
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (file.size > maxSize) {
                alert('File size must be less than 5MB');
                e.target.value = '';
                fileName.textContent = '';
                return;
            }
            
            fileName.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        } else {
            fileName.textContent = '';
        }
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    const formMessage = document.getElementById('form-message');
    
    // Honeypot check
    const honeypot = form.querySelector('.honeypot').value;
    if (honeypot) {
        formMessage.textContent = 'Spam detected. Submission blocked.';
        formMessage.className = 'form-message error';
        return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const applicationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        position: formData.get('position'),
        experience: formData.get('experience'),
        coverLetter: formData.get('coverLetter'),
        resume: formData.get('resume'),
        timestamp: new Date().toISOString()
    };
    
    // Validation
    if (!applicationData.name || !applicationData.email || !applicationData.phone || !applicationData.position) {
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.className = 'form-message error';
        return;
    }
    
    // Get job title
    const jobs = getJobs();
    const selectedJob = jobs.find(j => j.id.toString() === applicationData.position);
    const jobTitle = selectedJob ? selectedJob.title : 'Unknown Position';
    
    // Disable form
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-block';
    formMessage.textContent = '';
    
    // Save to localStorage
    saveApplication(applicationData, jobTitle, formData.get('resume'))
        .then(() => {
            // Send email notification
            return sendEmailNotification(applicationData, jobTitle);
        })
        .then(() => {
            // Send auto-reply to applicant
            return sendAutoReply(applicationData, jobTitle);
        })
        .then(() => {
            // Success - redirect to thank you page
            window.location.href = `thank-you.html?name=${encodeURIComponent(applicationData.name)}&position=${encodeURIComponent(jobTitle)}`;
        })
        .catch(error => {
            console.error('Error submitting application:', error);
            formMessage.textContent = 'There was an error submitting your application. Please try again or contact us directly.';
            formMessage.className = 'form-message error';
            submitButton.disabled = false;
            buttonText.style.display = 'inline-block';
            buttonLoader.style.display = 'none';
        });
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Save application to storage
async function saveApplication(applicationData, jobTitle, resumeFile) {
    // Save to localStorage (for demo)
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    
    let resumeData = null;
    let resumeFileName = 'No file';
    let resumeFileType = null;
    
    if (resumeFile) {
        resumeFileName = resumeFile.name;
        resumeFileType = resumeFile.type;
        try {
            resumeData = await fileToBase64(resumeFile);
        } catch (error) {
            console.error('Error converting resume to base64:', error);
        }
    }
    
    applications.push({
        ...applicationData,
        jobTitle: jobTitle,
        resumeFileName: resumeFileName,
        resumeFileType: resumeFileType,
        resumeData: resumeData
    });
    localStorage.setItem('applications', JSON.stringify(applications));
    
    return Promise.resolve();
}

// Send email notification to HR team
async function sendEmailNotification(applicationData, jobTitle) {
    // EmailJS configuration (replace with your actual EmailJS credentials)
    // You'll need to set up EmailJS at https://www.emailjs.com/
    
    const emailConfig = {
        serviceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        templateId: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        publicKey: 'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    };
    
    // For demo purposes, we'll just log it
    // In production, uncomment and configure EmailJS:
    
    /*
    if (typeof emailjs !== 'undefined' && emailConfig.serviceId !== 'YOUR_SERVICE_ID') {
        try {
            await emailjs.send(
                emailConfig.serviceId,
                emailConfig.templateId,
                {
                    to_name: 'HR Team',
                    applicant_name: applicationData.name,
                    applicant_email: applicationData.email,
                    applicant_phone: applicationData.phone,
                    position: jobTitle,
                    experience: applicationData.experience,
                    cover_letter: applicationData.coverLetter,
                    timestamp: applicationData.timestamp,
                    reply_to: applicationData.email
                },
                emailConfig.publicKey
            );
        } catch (error) {
            console.error('Error sending email notification:', error);
            throw error;
        }
    } else {
        console.log('Email notification (demo):', {
            to: 'hr@workforcerecruitment.com',
            subject: `New Application: ${jobTitle}`,
            body: `New application received for ${jobTitle} from ${applicationData.name}`
        });
    }
    */
    
    console.log('Email notification (demo):', {
        to: 'hr@workforcerecruitment.com',
        subject: `New Application: ${jobTitle}`,
        body: `New application received for ${jobTitle} from ${applicationData.name}`
    });
    
    return Promise.resolve();
}

// Send auto-reply to applicant
async function sendAutoReply(applicationData, jobTitle) {
    // EmailJS configuration for auto-reply
    // Similar to sendEmailNotification, but with auto-reply template
    
    console.log('Auto-reply email (demo):', {
        to: applicationData.email,
        subject: `Thank you for your application - ${jobTitle}`,
        body: `Dear ${applicationData.name},\n\nThank you for your interest in the ${jobTitle} position...`
    });
    
    return Promise.resolve();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Mobile navigation toggle
function setupMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Close modal when clicking outside
function setupModalClose() {
    const modal = document.getElementById('job-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // Navbar height
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeJobs();
    renderJobs();
    populatePositionDropdown();
    setupFileUpload();
    setupMobileNav();
    setupModalClose();
    setupSmoothScroll();
    autoSelectJobFromURL();
    
    // Form submission
    const applicationForm = document.getElementById('application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', handleFormSubmit);
    }
});

// Make functions available globally for onclick handlers
window.viewJobDetails = viewJobDetails;
window.selectJobForApplication = selectJobForApplication;
window.closeModal = closeModal;
