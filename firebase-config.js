// Firebase Configuration
// Replace these values with your Firebase project configuration
// Get these from: https://console.firebase.google.com/ > Project Settings > General > Your apps

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
