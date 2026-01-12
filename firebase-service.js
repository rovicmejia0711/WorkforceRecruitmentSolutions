// Firebase Service - Handles all Firebase operations
// Falls back to localStorage if Firebase is not configured

class FirebaseService {
    constructor() {
        this.isFirebaseAvailable = typeof firebase !== 'undefined' && 
                                   typeof window.firebaseDb !== 'undefined' && 
                                   window.firebaseDb !== null &&
                                   window.isFirebaseConfigured();
        
        if (this.isFirebaseAvailable) {
            this.db = window.firebaseDb;
        }
        
        // Collections
        this.JOBS_COLLECTION = 'jobs';
        this.PAGE_CONTENT_COLLECTION = 'page_content';
        this.SETTINGS_COLLECTION = 'settings';
        this.APPLICATIONS_COLLECTION = 'applications';
    }

    // ============ JOBS OPERATIONS ============
    
    async getJobs() {
        if (this.isFirebaseAvailable) {
            try {
                const snapshot = await this.db.collection(this.JOBS_COLLECTION).get();
                const jobs = [];
                snapshot.forEach(doc => {
                    jobs.push({ id: doc.id, ...doc.data() });
                });
                // Sort by ID to maintain order
                return jobs.sort((a, b) => {
                    const idA = parseInt(a.id) || 0;
                    const idB = parseInt(b.id) || 0;
                    return idA - idB;
                });
            } catch (error) {
                console.error('Error fetching jobs from Firebase:', error);
                return this.getJobsFromLocalStorage();
            }
        }
        return this.getJobsFromLocalStorage();
    }

    async getActiveJobs() {
        const jobs = await this.getJobs();
        return jobs.filter(job => job.status === 'active');
    }

    async saveJob(jobData) {
        if (this.isFirebaseAvailable) {
            try {
                if (jobData.id && typeof jobData.id === 'number') {
                    // Update existing job
                    const jobRef = this.db.collection(this.JOBS_COLLECTION).doc(jobData.id.toString());
                    const { id, ...data } = jobData;
                    await jobRef.set(data, { merge: true });
                    await this.syncJobsToLocalStorage();
                } else {
                    // Add new job
                    const jobRef = this.db.collection(this.JOBS_COLLECTION).doc();
                    const { id, ...data } = jobData;
                    await jobRef.set({ ...data, id: parseInt(jobRef.id) || Date.now() });
                    await this.syncJobsToLocalStorage();
                }
                return true;
            } catch (error) {
                console.error('Error saving job to Firebase:', error);
                return this.saveJobToLocalStorage(jobData);
            }
        }
        return this.saveJobToLocalStorage(jobData);
    }

    async deleteJob(jobId) {
        if (this.isFirebaseAvailable) {
            try {
                await this.db.collection(this.JOBS_COLLECTION).doc(jobId.toString()).delete();
                await this.syncJobsToLocalStorage();
                return true;
            } catch (error) {
                console.error('Error deleting job from Firebase:', error);
                return this.deleteJobFromLocalStorage(jobId);
            }
        }
        return this.deleteJobFromLocalStorage(jobId);
    }

    async initializeJobs(defaultJobs) {
        if (this.isFirebaseAvailable) {
            try {
                const snapshot = await this.db.collection(this.JOBS_COLLECTION).get();
                if (snapshot.empty) {
                    // Initialize with default jobs
                    const batch = this.db.batch();
                    defaultJobs.forEach((job, index) => {
                        const jobRef = this.db.collection(this.JOBS_COLLECTION).doc(job.id.toString());
                        batch.set(jobRef, job);
                    });
                    await batch.commit();
                    await this.syncJobsToLocalStorage();
                    return true;
                }
                // Sync Firebase data to localStorage for offline access
                await this.syncJobsToLocalStorage();
                return true;
            } catch (error) {
                console.error('Error initializing jobs in Firebase:', error);
                return this.initializeJobsInLocalStorage(defaultJobs);
            }
        }
        return this.initializeJobsInLocalStorage(defaultJobs);
    }

    // Real-time listener for jobs (optional, for live updates)
    subscribeToJobs(callback) {
        if (this.isFirebaseAvailable) {
            return this.db.collection(this.JOBS_COLLECTION)
                .onSnapshot(snapshot => {
                    const jobs = [];
                    snapshot.forEach(doc => {
                        jobs.push({ id: doc.id, ...doc.data() });
                    });
                    callback(jobs.sort((a, b) => {
                        const idA = parseInt(a.id) || 0;
                        const idB = parseInt(b.id) || 0;
                        return idA - idB;
                    }));
                });
        }
        return null;
    }

    // ============ PAGE CONTENT OPERATIONS ============

    async getPageContent(pageName) {
        if (this.isFirebaseAvailable) {
            try {
                const doc = await this.db.collection(this.PAGE_CONTENT_COLLECTION)
                    .doc(pageName).get();
                if (doc.exists) {
                    const content = doc.data();
                    // Also save to localStorage for offline access
                    localStorage.setItem(`page_content_${pageName}`, JSON.stringify(content));
                    return content;
                }
                return {};
            } catch (error) {
                console.error('Error fetching page content from Firebase:', error);
                return this.getPageContentFromLocalStorage(pageName);
            }
        }
        return this.getPageContentFromLocalStorage(pageName);
    }

    async savePageContent(pageName, content) {
        if (this.isFirebaseAvailable) {
            try {
                await this.db.collection(this.PAGE_CONTENT_COLLECTION)
                    .doc(pageName)
                    .set(content, { merge: true });
                // Also save to localStorage for offline access
                localStorage.setItem(`page_content_${pageName}`, JSON.stringify(content));
                return true;
            } catch (error) {
                console.error('Error saving page content to Firebase:', error);
                return this.savePageContentToLocalStorage(pageName, content);
            }
        }
        return this.savePageContentToLocalStorage(pageName, content);
    }

    // ============ SETTINGS OPERATIONS ============

    async getSettings() {
        if (this.isFirebaseAvailable) {
            try {
                const doc = await this.db.collection(this.SETTINGS_COLLECTION)
                    .doc('admin_settings').get();
                if (doc.exists) {
                    const settings = doc.data();
                    localStorage.setItem('admin_settings', JSON.stringify(settings));
                    return settings;
                }
                return {};
            } catch (error) {
                console.error('Error fetching settings from Firebase:', error);
                return this.getSettingsFromLocalStorage();
            }
        }
        return this.getSettingsFromLocalStorage();
    }

    async saveSettings(settings) {
        if (this.isFirebaseAvailable) {
            try {
                await this.db.collection(this.SETTINGS_COLLECTION)
                    .doc('admin_settings')
                    .set(settings, { merge: true });
                localStorage.setItem('admin_settings', JSON.stringify(settings));
                return true;
            } catch (error) {
                console.error('Error saving settings to Firebase:', error);
                return this.saveSettingsToLocalStorage(settings);
            }
        }
        return this.saveSettingsToLocalStorage(settings);
    }

    // ============ APPLICATIONS OPERATIONS ============

    async getApplications() {
        if (this.isFirebaseAvailable) {
            try {
                const snapshot = await this.db.collection(this.APPLICATIONS_COLLECTION)
                    .orderBy('timestamp', 'desc').get();
                const applications = [];
                snapshot.forEach(doc => {
                    applications.push({ id: doc.id, ...doc.data() });
                });
                // Also save to localStorage for backup
                localStorage.setItem('applications', JSON.stringify(applications));
                return applications;
            } catch (error) {
                console.error('Error fetching applications from Firebase:', error);
                return this.getApplicationsFromLocalStorage();
            }
        }
        return this.getApplicationsFromLocalStorage();
    }

    async saveApplication(applicationData) {
        if (this.isFirebaseAvailable) {
            try {
                await this.db.collection(this.APPLICATIONS_COLLECTION).add(applicationData);
                await this.syncApplicationsToLocalStorage();
                return true;
            } catch (error) {
                console.error('Error saving application to Firebase:', error);
                return this.saveApplicationToLocalStorage(applicationData);
            }
        }
        return this.saveApplicationToLocalStorage(applicationData);
    }

    // ============ LOCALSTORAGE FALLBACK METHODS ============

    getJobsFromLocalStorage() {
        const jobs = localStorage.getItem('workforce_recruitment_jobs');
        return jobs ? JSON.parse(jobs) : [];
    }

    saveJobToLocalStorage(jobData) {
        const jobs = this.getJobsFromLocalStorage();
        const existingIndex = jobs.findIndex(j => j.id === jobData.id);
        
        if (existingIndex >= 0) {
            jobs[existingIndex] = jobData;
        } else {
            jobs.push(jobData);
        }
        
        localStorage.setItem('workforce_recruitment_jobs', JSON.stringify(jobs));
        return true;
    }

    deleteJobFromLocalStorage(jobId) {
        const jobs = this.getJobsFromLocalStorage();
        const filtered = jobs.filter(j => j.id !== jobId);
        localStorage.setItem('workforce_recruitment_jobs', JSON.stringify(filtered));
        return true;
    }

    initializeJobsInLocalStorage(defaultJobs) {
        if (!localStorage.getItem('workforce_recruitment_jobs')) {
            localStorage.setItem('workforce_recruitment_jobs', JSON.stringify(defaultJobs));
        }
        return true;
    }

    async syncJobsToLocalStorage() {
        try {
            const jobs = await this.getJobs();
            localStorage.setItem('workforce_recruitment_jobs', JSON.stringify(jobs));
        } catch (error) {
            console.error('Error syncing jobs to localStorage:', error);
        }
    }

    getPageContentFromLocalStorage(pageName) {
        const content = localStorage.getItem(`page_content_${pageName}`);
        return content ? JSON.parse(content) : {};
    }

    savePageContentToLocalStorage(pageName, content) {
        localStorage.setItem(`page_content_${pageName}`, JSON.stringify(content));
        return true;
    }

    getSettingsFromLocalStorage() {
        const settings = localStorage.getItem('admin_settings');
        return settings ? JSON.parse(settings) : {};
    }

    saveSettingsToLocalStorage(settings) {
        localStorage.setItem('admin_settings', JSON.stringify(settings));
        return true;
    }

    getApplicationsFromLocalStorage() {
        const applications = localStorage.getItem('applications');
        return applications ? JSON.parse(applications) : [];
    }

    saveApplicationToLocalStorage(applicationData) {
        const applications = this.getApplicationsFromLocalStorage();
        applications.push(applicationData);
        localStorage.setItem('applications', JSON.stringify(applications));
        return true;
    }

    async syncApplicationsToLocalStorage() {
        try {
            const applications = await this.getApplications();
            localStorage.setItem('applications', JSON.stringify(applications));
        } catch (error) {
            console.error('Error syncing applications to localStorage:', error);
        }
    }

    // ============ MIGRATION UTILITIES ============

    async migrateFromLocalStorage() {
        if (!this.isFirebaseAvailable) {
            console.warn('Firebase not available. Cannot migrate.');
            return false;
        }

        try {
            // Migrate jobs
            const jobs = this.getJobsFromLocalStorage();
            if (jobs.length > 0) {
                const batch = this.db.batch();
                jobs.forEach(job => {
                    const jobRef = this.db.collection(this.JOBS_COLLECTION).doc(job.id.toString());
                    batch.set(jobRef, job);
                });
                await batch.commit();
                console.log('Jobs migrated successfully');
            }

            // Migrate page content
            const pages = ['home', 'about', 'apply'];
            for (const page of pages) {
                const content = this.getPageContentFromLocalStorage(page);
                if (Object.keys(content).length > 0) {
                    await this.savePageContent(page, content);
                }
            }
            console.log('Page content migrated successfully');

            // Migrate settings
            const settings = this.getSettingsFromLocalStorage();
            if (Object.keys(settings).length > 0) {
                await this.saveSettings(settings);
            }
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('Settings migrated successfully');
            }

            // Migrate applications
            const applications = this.getApplicationsFromLocalStorage();
            if (applications.length > 0) {
                const batch = this.db.batch();
                applications.forEach(app => {
                    const appRef = this.db.collection(this.APPLICATIONS_COLLECTION).doc();
                    batch.set(appRef, app);
                });
                await batch.commit();
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('Applications migrated successfully');
                }
            }

            return true;
        } catch (error) {
            console.error('Error migrating from localStorage:', error);
            return false;
        }
    }
}

// Create and export singleton instance
window.firebaseService = new FirebaseService();
