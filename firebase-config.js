// Firebase Configuration
// Workforce Recruitment Solutions - Production Configuration

const firebaseConfig = {
    apiKey: "AIzaSyBifCeDvZHUdvLVyJXdnFMwfAGmESU2Uw8",
    authDomain: "hr-workforcerecruitment.firebaseapp.com",
    databaseURL: "https://hr-workforcerecruitment-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hr-workforcerecruitment",
    storageBucket: "hr-workforcerecruitment.firebasestorage.app",
    messagingSenderId: "57361641284",
    appId: "1:57361641284:web:da8f42f5182eb3f174b111",
    measurementId: "G-1JNMTPE7H5"
};

// Check if Firebase is configured
const isFirebaseConfigured = () => {
    return firebaseConfig.apiKey !== "YOUR_API_KEY" && 
           firebaseConfig.projectId !== "YOUR_PROJECT_ID";
};

// Initialize Firebase only if configured
let firebaseApp = null;
let db = null;

if (typeof firebase !== 'undefined' && isFirebaseConfigured()) {
    try {
        firebaseApp = firebase.initializeApp(firebaseConfig);
        db = firebaseApp.firestore();
        // Firebase initialized successfully (silent in production)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Firebase initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }
} else {
    // Firebase not configured - using localStorage fallback (silent in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.warn('Firebase not configured. Using localStorage fallback.');
    }
}

// Export Firebase instances
window.firebaseApp = firebaseApp;
window.firebaseDb = db;
window.isFirebaseConfigured = isFirebaseConfigured;
