# Firebase Setup Guide

Complete guide to setting up Firebase for CleanConnect India.

---

## Part 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** or select existing project
3. Enter project name (e.g., "CleanConnect India")
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

---

## Part 2: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll add security rules later)
4. Select a Cloud Firestore location (choose closest to your users)
5. Click **"Enable"**

### Create Collection Structure

In Firestore, create the following structure:

```
📁 artifacts
  └── 📁 clean-connect-india (or your VITE_APP_ID)
      └── 📁 public
          └── 📁 data
              └── 📄 garbage_reports (collection)
```

To create this:
1. Click **"Start collection"**
2. Collection ID: `artifacts`
3. Add a document with ID: `clean-connect-india`
4. Inside that document, add a map field: `public`
5. Continue building the nested structure

**Alternative**: The structure will be created automatically when you submit your first report!

---

## Part 3: Enable Authentication

1. Click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click on **"Anonymous"**
5. Toggle **"Enable"**
6. Click **"Save"**

---

## Part 4: Get Firebase Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll to **"Your apps"** section
4. Click the web icon **`</>`** to add a web app
5. Register app with nickname (e.g., "CleanConnect Web")
6. Copy the `firebaseConfig` object

You'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

---

## Part 5: Configure Environment Variables

1. Create `.env` file in project root
2. Convert config to single-line JSON:

```env
VITE_FIREBASE_CONFIG={"apiKey":"AIzaSyXXX...","authDomain":"your-app.firebaseapp.com",...}
VITE_APP_ID=clean-connect-india
```

**See [ENV_SETUP.md](./ENV_SETUP.md) for detailed formatting instructions**

---

## Part 6: Set Up Security Rules

### Development Rules (Testing)

In Firestore → Rules tab:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

⚠️ **This is ONLY for development. Change before production!**

### Production Rules (Recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write garbage reports
    match /artifacts/{appId}/public/data/garbage_reports/{report} {
      // Anyone authenticated can read
      allow read: if request.auth != null;
      
      // Authenticated users can create reports
      allow create: if request.auth != null 
                    && request.resource.data.userId == request.auth.uid
                    && request.resource.data.status == 'pending';
      
      // Users can update their own reports
      allow update: if request.auth != null 
                    && (request.auth.uid == resource.data.userId 
                        || request.resource.data.status == 'completed');
      
      // Only allow deletion by report owner
      allow delete: if request.auth != null 
                    && request.auth.uid == resource.data.userId;
    }
  }
}
```

Click **"Publish"** to apply rules.

---

## Part 7: Configure Indexes (Optional but Recommended)

Firestore may prompt you to create indexes when running queries. Click the link in console errors to auto-create them.

Or manually create in Firestore → Indexes:

**Index 1: Sort reports by creation time**
- Collection: `garbage_reports`
- Fields: 
  - `status` (Ascending)
  - `createdAt` (Descending)

---

## Part 8: Test Your Setup

Run the app:

```bash
npm run dev
```

Try to:
1. ✅ Submit a report
2. ✅ View reports list
3. ✅ Switch to driver view
4. ✅ Mark report as completed

Check Firestore Console to see data appearing in real-time!

---

## Troubleshooting

### Error: "Missing or insufficient permissions"
**Fix**: Check security rules, ensure Anonymous auth is enabled

### Error: "Firebase: No Firebase App"
**Fix**: Verify `.env` file exists and has correct JSON format

### Error: "Failed to get document because the client is offline"
**Fix**: Check internet connection, verify Firebase project is active

### Error: "CORS policy blocked"
**Fix**: Check that your domain is authorized in Firebase Console

---

## Cost & Quotas (Free Tier)

Firebase Free Tier (Spark Plan) includes:

- **Firestore**: 1 GB storage, 50K reads/day, 20K writes/day
- **Authentication**: Unlimited anonymous auth
- **Hosting**: 10 GB storage, 360 MB/day transfer

This is MORE than enough for development and small-scale deployments!

---

## Upgrading to Production

When ready to deploy:

1. ✅ Switch to Blaze (Pay-as-you-go) plan
2. ✅ Update security rules to production version
3. ✅ Set up Firebase Hosting
4. ✅ Configure custom domain
5. ✅ Enable Firebase Analytics
6. ✅ Set up Cloud Functions (optional)
7. ✅ Configure backup strategy

---

## Additional Resources

- 📖 [Firebase Documentation](https://firebase.google.com/docs)
- 📖 [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- 📖 [Firebase Authentication](https://firebase.google.com/docs/auth)
- 🎥 [Firebase YouTube Channel](https://www.youtube.com/firebase)

---

## Next Steps

1. ✅ Complete Firebase setup above
2. ✅ Run `npm install` in project directory
3. ✅ Create `.env` file with your credentials
4. ✅ Run `npm run dev`
5. ✅ Start building! 🚀

---

**Need Help?** Check [QUICKSTART.md](./QUICKSTART.md) or open an issue on GitHub.

