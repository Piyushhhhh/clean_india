# 🔍 Debug Blank Page - Quick Fix Guide

Your deployment succeeded but you see a blank page? Here's how to fix it in 2 minutes!

---

## 🚨 The #1 Cause: Missing Firebase Secrets

**99% of blank pages are caused by missing Firebase configuration!**

---

## ✅ Quick Fix (2 Steps)

### Step 1: Check What's Wrong

1. Open your app: https://piyushhhhh.github.io/clean_india/
2. Press `F12` (or right-click → Inspect)
3. Click the **Console** tab
4. Look for red errors

**You'll probably see:**
```
Firebase: No Firebase App '[DEFAULT]' has been created
```
or
```
Uncaught SyntaxError: Unexpected token '<'
```

---

### Step 2: Add Firebase Secrets

This will fix the blank page!

#### 📍 Go Here:
https://github.com/Piyushhhhh/clean_india/settings/secrets/actions

#### ➕ Click "New repository secret"

#### Add Secret #1:
- **Name:** `VITE_FIREBASE_CONFIG`
- **Value:** Your Firebase config as **single-line JSON** (see below)

#### Add Secret #2:
- **Name:** `VITE_APP_ID`
- **Value:** `clean-connect-india`

---

## 🔥 How to Get Your Firebase Config

### Option A: From Firebase Console (Recommended)

1. Go to: https://console.firebase.google.com
2. Select your project (or create one)
3. Click the **⚙️ gear icon** → Project settings
4. Scroll to "Your apps" section
5. If no web app, click **</>** (web icon) to add one
6. Copy the `firebaseConfig` object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

### Option B: Convert to Single-Line JSON

Take the config above and convert to **one line** (remove spaces/newlines):

```json
{"apiKey":"AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX","authDomain":"your-app.firebaseapp.com","projectId":"your-project-id","storageBucket":"your-app.appspot.com","messagingSenderId":"123456789012","appId":"1:123456789012:web:abc123def456"}
```

**This is what you paste into the `VITE_FIREBASE_CONFIG` secret!**

---

## 🔄 After Adding Secrets

### Option 1: Trigger Manual Deployment

1. Go to: https://github.com/Piyushhhhh/clean_india/actions
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Click green "Run workflow"
5. Wait ~3 minutes

### Option 2: Push Empty Commit

```bash
cd /Users/piyushkumar/clean_india
git commit --allow-empty -m "Redeploy with Firebase config"
git push origin main
```

---

## 🎯 Verify It Worked

After redeployment:

1. Open: https://piyushhhhh.github.io/clean_india/
2. Press `F12` → Console tab
3. **No red errors?** ✅ Success!
4. You should see the app interface now

---

## ⚠️ One More Thing: Firebase Authorized Domains

If the app loads but you see this error:
```
Firebase: Error (auth/unauthorized-domain)
```

**Fix:**
1. Go to Firebase Console → Authentication → Settings
2. Click "Authorized domains" tab
3. Click "Add domain"
4. Add: `piyushhhhh.github.io`
5. Click "Add"

---

## 🧪 Test Checklist

After fixing, you should be able to:

- [ ] See the app interface (not blank page)
- [ ] Click "New Report" section
- [ ] Select waste type
- [ ] Use GPS or search location
- [ ] Upload an image
- [ ] Submit a report
- [ ] Switch to Driver view
- [ ] See the reports

---

## 🆘 Still Blank?

### Check These:

1. **Secrets are correctly named:**
   - Exactly: `VITE_FIREBASE_CONFIG` (not `FIREBASE_CONFIG`)
   - Exactly: `VITE_APP_ID`

2. **JSON is valid:**
   - Use https://jsonlint.com to validate
   - Must be single line
   - No extra spaces

3. **Firebase project is active:**
   - Go to Firebase Console
   - Ensure Firestore and Authentication are enabled

4. **Browser cache:**
   - Hard refresh: `Ctrl + Shift + R` (Windows/Linux)
   - Or: `Cmd + Shift + R` (Mac)
   - Or try incognito mode

---

## 📸 Visual Guide

### Before (Blank Page):
- White screen
- No interface visible
- Console shows Firebase errors

### After (Working):
- Green header with "CleanConnect India"
- "Keep India Clean" banner
- "New Report" form visible
- No errors in console

---

## 💡 Pro Tip

Save your Firebase config somewhere safe (like a password manager) so you don't have to look it up again!

---

## 📞 Need More Help?

- **Full troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Firebase setup guide:** [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **Environment setup:** [ENV_SETUP.md](./ENV_SETUP.md)

---

**Add those secrets and redeploy - your app will work! 🚀**

