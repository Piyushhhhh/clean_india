# 🔧 Troubleshooting Guide

Common issues and solutions for CleanConnect India deployment.

---

## 🚨 Blank White Page on GitHub Pages

### Symptoms
- App loads but shows only a white/blank page
- No error messages visible
- Browser console shows errors

### Solutions

#### 1. Check Firebase Secrets (Most Common Issue!)

**Problem:** Firebase credentials not configured in GitHub Secrets

**Solution:**
1. Go to: https://github.com/Piyushhhhh/clean_india/settings/secrets/actions
2. Verify you have these secrets:
   - `VITE_FIREBASE_CONFIG` - Your Firebase config JSON
   - `VITE_APP_ID` - Set to `clean-connect-india`
3. If missing, add them and redeploy

**How to check in browser:**
1. Open https://piyushhhhh.github.io/clean_india/
2. Press `F12` to open Developer Tools
3. Go to Console tab
4. Look for Firebase errors like:
   - "Firebase: No Firebase App '[DEFAULT]' has been created"
   - "Firebase: Error initializing app"

#### 2. Check Browser Console for Errors

Press `F12` in your browser and check the Console tab for:

**Common Errors:**

| Error | Cause | Solution |
|-------|-------|----------|
| `Firebase: No Firebase App` | Missing Firebase config | Add GitHub Secrets |
| `Failed to load module` | Asset path issue | Check base path in vite.config.js |
| `CORS error` | Firebase not configured | Add authorized domain in Firebase |
| `Network error` | Firebase project inactive | Check Firebase Console |

#### 3. Verify GitHub Pages is Enabled

1. Go to: https://github.com/Piyushhhhh/clean_india/settings/pages
2. Ensure **Source** is set to: **GitHub Actions**
3. Check that a deployment was successful in Actions tab

#### 4. Clear Browser Cache

Sometimes old cached files cause issues:

**Chrome/Edge:**
- Press `Ctrl + Shift + Delete` (or `Cmd + Shift + Delete` on Mac)
- Select "Cached images and files"
- Click "Clear data"
- Refresh the page

**Firefox:**
- Press `Ctrl + Shift + Delete`
- Select "Cache"
- Click "Clear Now"

#### 5. Check Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to: **Authentication** → **Settings** → **Authorized domains**
4. Ensure `piyushhhhh.github.io` is in the list
5. If not, click "Add domain" and add it

---

## 🔥 Firebase Connection Issues

### Error: "Firebase: Error (auth/invalid-api-key)"

**Cause:** Firebase API key is incorrect

**Solution:**
1. Go to Firebase Console → Project Settings
2. Copy the correct `firebaseConfig`
3. Update `VITE_FIREBASE_CONFIG` secret in GitHub
4. Trigger a new deployment

### Error: "Firebase: Error (auth/unauthorized-domain)"

**Cause:** Domain not authorized in Firebase

**Solution:**
1. Firebase Console → Authentication → Settings → Authorized domains
2. Add: `piyushhhhh.github.io`
3. Add: `localhost` (for local development)
4. Click Save

### Error: "Firestore: Missing or insufficient permissions"

**Cause:** Firestore security rules too restrictive

**Solution:**
1. Firebase Console → Firestore Database → Rules
2. Ensure anonymous users can read/write
3. Use the security rules from FIREBASE_SETUP.md

---

## 🏗️ Build Issues

### Error: "Dependencies lock file is not found"

**Cause:** `package-lock.json` missing

**Solution:**
```bash
npm install
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### Error: "Unexpected token 'export'"

**Cause:** Config files using ES modules syntax

**Solution:** Already fixed! Config files use CommonJS now.

### Build succeeds but app doesn't work

**Cause:** Environment variables not set during build

**Check:**
1. GitHub Secrets are properly named (with `VITE_` prefix)
2. Secrets are available in the repository (not organization)
3. Redeploy after adding secrets

---

## 📱 Mobile Issues

### App not working on mobile

**Solution:**
1. Check if the issue exists on desktop too
2. Ensure responsive design is working
3. Test on mobile browser (not in-app browsers)
4. Check console logs on mobile:
   - Chrome: Use Remote Debugging
   - Safari: Enable Web Inspector

### GPS not working

**Cause:** Location permissions not granted

**Solution:**
1. Enable location services in device settings
2. Grant permission when browser asks
3. Use HTTPS (GitHub Pages uses HTTPS by default)

---

## 🔒 Security Issues

### Error: "App Check token is invalid"

**Cause:** App Check enabled but not configured

**Solution:**
1. Disable App Check in Firebase Console (for development)
2. Or configure App Check properly for production

---

## 🚀 Deployment Issues

### GitHub Actions workflow fails

**Check:**
1. Go to: https://github.com/Piyushhhhh/clean_india/actions
2. Click on the failed workflow
3. Read the error logs
4. Common issues:
   - Missing dependencies → Run `npm install` locally first
   - Build errors → Test `npm run build` locally
   - Secrets not set → Add GitHub Secrets

### Deployment succeeds but shows old version

**Cause:** Browser cache or GitHub Pages CDN delay

**Solution:**
1. Hard refresh: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
2. Wait 5-10 minutes for GitHub Pages CDN to update
3. Clear browser cache
4. Try in incognito/private mode

---

## 🧪 Testing Locally

### Test production build locally:

```bash
npm run build
npm run preview
```

Visit: http://localhost:4173

### Test with production environment variables:

Create `.env.production`:
```env
VITE_FIREBASE_CONFIG={"your":"config"}
VITE_APP_ID=clean-connect-india
```

Then build:
```bash
npm run build
```

---

## 🔍 Debugging Steps

### Step 1: Check if it's a deployment issue
1. Does `npm run dev` work locally? → If yes, it's a deployment issue
2. Does `npm run build` succeed locally? → If no, fix build errors first

### Step 2: Check if it's a Firebase issue
1. Open browser console
2. Look for Firebase-related errors
3. Verify Firebase project is active in Firebase Console

### Step 3: Check if it's a GitHub Pages issue
1. Verify GitHub Pages is enabled
2. Check Actions tab for successful deployment
3. Check if other static files load (check Network tab in DevTools)

---

## 📞 Getting Help

If none of these solutions work:

1. **Check the logs:**
   - GitHub Actions logs
   - Browser console (F12)
   - Network tab in DevTools

2. **Collect information:**
   - What error messages do you see?
   - When did the issue start?
   - Does it work locally?

3. **Resources:**
   - [GitHub Pages Documentation](https://docs.github.com/en/pages)
   - [Firebase Documentation](https://firebase.google.com/docs)
   - [Vite Troubleshooting](https://vitejs.dev/guide/troubleshooting.html)

4. **Open an issue:**
   - Go to: https://github.com/Piyushhhhh/clean_india/issues
   - Include error messages and screenshots
   - Describe steps to reproduce

---

## ✅ Quick Checklist

When deploying, ensure:

- [ ] `package-lock.json` exists
- [ ] Firebase project is created and active
- [ ] Firestore and Authentication are enabled in Firebase
- [ ] GitHub Secrets are set (VITE_FIREBASE_CONFIG, VITE_APP_ID)
- [ ] GitHub Pages is enabled with "GitHub Actions" as source
- [ ] `piyushhhhh.github.io` is in Firebase authorized domains
- [ ] Build succeeds in GitHub Actions
- [ ] No errors in browser console
- [ ] Firebase security rules are configured

---

**Still stuck? Check [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for detailed setup instructions.**

