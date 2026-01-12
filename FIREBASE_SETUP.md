# Firebase Setup Guide

This guide will help you set up Firebase for your Workforce Recruitment Solutions website. Firebase enables real-time data synchronization across all devices, ensuring that all users see the same jobs and content.

## Why Firebase?

- **Shared Data**: All devices and visitors see the same jobs and content
- **Real-time Sync**: Changes made by one admin are instantly visible to all users
- **Cloud Storage**: Data is stored securely in the cloud, not just in browser localStorage
- **Automatic Backups**: Firebase automatically backs up your data
- **Scalable**: Can handle thousands of visitors and jobs

## Prerequisites

1. A Google account
2. Access to Firebase Console (free tier is sufficient)

## Step-by-Step Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name: `Workforce Recruitment Solutions` (or any name you prefer)
4. Click **"Continue"**
5. **Disable** Google Analytics (optional, not needed for basic setup) OR enable it if you want analytics
6. Click **"Create project"**
7. Wait for Firebase to set up your project (takes about 30 seconds)
8. Click **"Continue"** when ready

### Step 2: Enable Firestore Database

1. In your Firebase project, click on **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (for now, you can secure it later)
4. Choose a location closest to your users (e.g., `us-central` for North America, `asia-southeast1` for Asia)
5. Click **"Enable"**
6. Wait for Firestore to initialize

**Important**: Test mode allows read/write access to anyone for 30 days. After setup, you should configure security rules (see Security Rules section below).

### Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`) to add a web app
5. Register your app with a nickname (e.g., "Workforce Recruitment Website")
6. **DO NOT** check "Also set up Firebase Hosting" (we're using Netlify)
7. Click **"Register app"**
8. **Copy** the Firebase configuration object. It will look like this:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

### Step 4: Configure Your Website

1. Open `firebase-config.js` in your project
2. **Replace** the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};
```

3. Save the file

### Step 5: Test the Setup

1. Open your website in a browser
2. Open the browser's Developer Console (F12 or Right-click > Inspect > Console)
3. You should see: `Firebase initialized successfully` (no errors)
4. Add a job in the Admin Dashboard
5. Open the website in another browser or device
6. The job should appear on all devices

### Step 6: Configure Firestore Security Rules (Important!)

After setup, secure your database:

1. Go to **Firestore Database** in Firebase Console
2. Click on the **"Rules"** tab
3. **Replace** the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Jobs collection - readable by all, writable by authenticated users only
    match /jobs/{jobId} {
      allow read: if true;  // Anyone can read jobs
      allow write: if request.auth != null;  // Only authenticated users can write
      // For now, allow writes without auth (you'll need to set up authentication later)
      // Or remove this line and set up Firebase Authentication
      allow write: if true;  // TEMPORARY - Remove this in production!
    }
    
    // Page content - readable by all, writable by authenticated users
    match /page_content/{pageName} {
      allow read: if true;
      allow write: if request.auth != null;
      // TEMPORARY - Remove this in production!
      allow write: if true;
    }
    
    // Settings - readable by all, writable by authenticated users
    match /settings/{settingId} {
      allow read: if true;
      allow write: if request.auth != null;
      // TEMPORARY - Remove this in production!
      allow write: if true;
    }
    
    // Applications - only readable/writable by authenticated users
    match /applications/{applicationId} {
      allow read, write: if request.auth != null;
      // TEMPORARY - Allow all access for now
      allow read, write: if true;  // TEMPORARY - Remove this in production!
    }
  }
}
```

4. Click **"Publish"**

**⚠️ Security Warning**: The rules above allow public write access for testing. For production, you should:
- Set up Firebase Authentication
- Restrict write access to authenticated admin users only
- Use Firebase Admin SDK for server-side operations

### Step 7: Migration from localStorage (Automatic)

When you first load the Admin Dashboard with Firebase configured, the system will automatically:
- Migrate existing jobs from localStorage to Firebase
- Migrate page content to Firebase
- Migrate settings to Firebase
- Migrate applications to Firebase

This happens automatically and only once. After migration, all data will be stored in Firebase.

## Troubleshooting

### Issue: "Firebase not configured. Using localStorage fallback."

**Solution**: Check that you've replaced all placeholder values in `firebase-config.js` with your actual Firebase configuration.

### Issue: "Error initializing Firebase"

**Solution**: 
1. Check your browser console for specific error messages
2. Verify your Firebase configuration is correct
3. Ensure Firestore Database is enabled in Firebase Console

### Issue: "Permission denied" errors

**Solution**: 
1. Check Firestore Security Rules
2. Ensure rules allow read/write access (for testing)
3. Make sure Firestore is in "test mode" or rules allow your operations

### Issue: Data not syncing across devices

**Solution**:
1. Check browser console for errors
2. Verify Firebase is initialized correctly
3. Check Firestore Database in Firebase Console to see if data is being saved
4. Ensure both devices have internet connection

## Firebase Pricing

**Free Tier (Spark Plan)**:
- 1 GB storage
- 10 GB/month network egress
- 20,000 writes/day
- 50,000 reads/day

**For a recruitment website**, the free tier is usually sufficient unless you have:
- Thousands of daily visitors
- Hundreds of job applications per day
- Large file uploads

Upgrade to **Blaze Plan** (pay-as-you-go) if needed. The first 50,000 reads/day and 20,000 writes/day remain free.

## Next Steps

1. ✅ Set up Firebase Authentication for admin login (optional, but recommended)
2. ✅ Configure proper security rules (replace test mode rules)
3. ✅ Set up Firebase Storage for resume file uploads (optional)
4. ✅ Monitor usage in Firebase Console

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Review Firebase Console for database errors
3. Verify your Firebase configuration
4. Check Firestore Security Rules

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)

---

**Note**: After Firebase setup, your website will use Firebase for storage. localStorage will be used as a fallback if Firebase is not configured or if there's an error.
