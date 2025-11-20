# 🚀 Quick Start Guide

Get CleanConnect India running in 5 minutes!

## Prerequisites Check

```bash
node --version  # Should be 16+
npm --version   # Should be 8+
```

If you don't have Node.js, download it from [nodejs.org](https://nodejs.org)

---

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including React, Firebase, Tailwind CSS, and more.

---

## Step 2: Set Up Firebase

### Option A: Use Firebase (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Enable **Firestore Database**
4. Enable **Anonymous Authentication**
5. Get your config from Project Settings → General → Your apps

### Option B: Create Environment File

Create a `.env` file in the root directory:

```bash
touch .env
```

Add your Firebase configuration:

```env
VITE_FIREBASE_CONFIG={"apiKey":"YOUR_KEY","authDomain":"YOUR_APP.firebaseapp.com","projectId":"YOUR_PROJECT","storageBucket":"YOUR_APP.appspot.com","messagingSenderId":"123456","appId":"YOUR_APP_ID"}
VITE_APP_ID=clean-connect-india
```

**Don't have Firebase setup yet?** See detailed instructions in [ENV_SETUP.md](./ENV_SETUP.md)

---

## Step 3: Run the App

```bash
npm run dev
```

The app will open at `http://localhost:3000` 🎉

---

## Step 4: Explore the Features

### As a Citizen
1. The app opens in **Citizen View** by default
2. Click "New Report" section
3. Select waste type (Dry/Wet/Hazardous)
4. Upload a photo or take one
5. Add location (use GPS or search)
6. Submit the report

### As a Driver
1. Click the "Citizen View" button in navbar to switch to **Driver View**
2. See all pending collection tasks
3. Tasks are sorted by priority
4. Click "Navigate" to open in Google Maps
5. Click "Collect" to mark as completed

---

## Common Issues & Solutions

### Issue: "Module not found" error
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Firebase connection error
**Solution**: 
- Check your `.env` file exists and has correct format
- Verify Firebase config is valid JSON
- Ensure Firestore and Auth are enabled in Firebase Console

### Issue: "Cannot read property of undefined"
**Solution**: 
- Clear browser cache and reload
- Check browser console for specific errors
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

### Issue: Blank screen
**Solution**: 
```bash
npm run build
npm run preview
```

---

## Project Structure Overview

```
src/
├── components/     # Reusable UI components
├── pages/          # Main page views
├── hooks/          # Custom React hooks
├── services/       # API services
├── utils/          # Helper functions
├── config/         # Configuration
└── data/           # Static data
```

---

## Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run linter
```

---

## Next Steps

- ✅ **Customize**: Edit `src/data/cities.js` to add more locations
- ✅ **Style**: Modify Tailwind config in `tailwind.config.js`
- ✅ **Deploy**: See deployment section in [README.md](./README.md)
- ✅ **Secure**: Set up Firestore security rules (see README.md)

---

## Getting Help

- 📖 Read the full [README.md](./README.md)
- 🔧 Check [ENV_SETUP.md](./ENV_SETUP.md) for Firebase setup
- 🐛 Found a bug? Open an issue on GitHub
- 💬 Need help? Email cleanconnectindia@example.com

---

**Happy Coding! Let's make India cleaner together! 🌿**

