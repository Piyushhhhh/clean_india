# Environment Setup Guide

This guide will help you set up your environment variables for the CleanConnect India application.

## Step 1: Create .env file

Create a file named `.env` in the root of your project (same level as `package.json`).

## Step 2: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (or create a new one)
3. Click on the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. If you haven't added a web app, click on the web icon `</>`
7. Copy the `firebaseConfig` object

## Step 3: Format Your Config

Your Firebase config will look like this:

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

## Step 4: Convert to Environment Variable Format

Convert the above config to a single-line JSON string and add to your `.env` file:

```env
VITE_FIREBASE_CONFIG={"apiKey":"AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX","authDomain":"your-app.firebaseapp.com","projectId":"your-project-id","storageBucket":"your-app.appspot.com","messagingSenderId":"123456789012","appId":"1:123456789012:web:abcdef1234567890"}
```

## Step 5: Add App ID

```env
VITE_APP_ID=clean-connect-india
```

You can change this to any unique identifier for your app.

## Step 6: (Optional) Add Custom Auth Token

If you want to use custom authentication tokens for testing:

```env
VITE_INITIAL_AUTH_TOKEN=your-custom-token-here
```

Otherwise, the app will use anonymous authentication.

## Complete .env File Example

```env
# Firebase Configuration
VITE_FIREBASE_CONFIG={"apiKey":"AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX","authDomain":"your-app.firebaseapp.com","projectId":"your-project-id","storageBucket":"your-app.appspot.com","messagingSenderId":"123456789012","appId":"1:123456789012:web:abcdef1234567890"}

# App Configuration
VITE_APP_ID=clean-connect-india

# Optional: Custom auth token
VITE_INITIAL_AUTH_TOKEN=
```

## Firebase Setup Checklist

After setting up your `.env` file, make sure to:

- [ ] Enable Firestore Database in Firebase Console
- [ ] Enable Anonymous Authentication in Firebase Console
- [ ] Set up Firestore Security Rules (see README.md)
- [ ] Create the required Firestore collections structure

## Troubleshooting

### Config Not Loading
- Make sure your `.env` file is in the root directory
- Restart your development server after creating/editing `.env`
- Check that environment variable names start with `VITE_`

### Firebase Connection Errors
- Verify your Firebase config is valid JSON
- Check that your Firebase project is active
- Ensure you've enabled the required Firebase services

### Authentication Issues
- Enable Anonymous Authentication in Firebase Console
- Check Firebase Auth settings and quota limits

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit your `.env` file to version control
- The `.env` file is already listed in `.gitignore`
- Keep your Firebase credentials secure
- Use Firebase Security Rules to protect your data

## Need Help?

If you're still having issues:
1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review the main README.md file
3. Open an issue on GitHub

