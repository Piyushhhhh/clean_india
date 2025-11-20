# 🚀 GitHub Pages Deployment Guide

Your app is ready to deploy to GitHub Pages! Follow these steps:

---

## Step 1: Configure GitHub Secrets

Your app needs Firebase credentials to work. Add them as GitHub Secrets:

1. Go to your GitHub repository: `https://github.com/Piyushhhhh/clean_india`
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add the following secrets:

### Secret 1: VITE_FIREBASE_CONFIG

**Name:** `VITE_FIREBASE_CONFIG`

**Value:** Your Firebase config as a single-line JSON string:
```json
{"apiKey":"YOUR_API_KEY","authDomain":"YOUR_APP.firebaseapp.com","projectId":"YOUR_PROJECT_ID","storageBucket":"YOUR_APP.appspot.com","messagingSenderId":"YOUR_SENDER_ID","appId":"YOUR_APP_ID"}
```

### Secret 2: VITE_APP_ID

**Name:** `VITE_APP_ID`

**Value:** `clean-connect-india`

---

## Step 2: Enable GitHub Pages

1. Go to your repository: `https://github.com/Piyushhhhh/clean_india`
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **"Source"**, select:
   - Source: **GitHub Actions**
4. Click **"Save"**

---

## Step 3: Configure Firebase for GitHub Pages

In Firebase Console, update your app's authorized domains:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Add: `piyushhhhh.github.io`
5. Click **"Add"**

---

## Step 4: Trigger Deployment

The GitHub Actions workflow will automatically trigger when you push to main.

To manually trigger:
1. Go to **Actions** tab in your GitHub repo
2. Click on **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"**

---

## Step 5: Access Your App

Once deployed (takes 2-3 minutes), your app will be live at:

🌐 **https://piyushhhhh.github.io/clean_india/**

---

## Troubleshooting

### Build Fails with "Module not found"
- Check that all dependencies are in `package.json`
- Verify `npm ci` works locally

### Firebase Connection Error
- Ensure secrets are properly set in GitHub
- Verify Firebase config JSON is valid (no extra spaces/newlines)
- Check Firebase project is active

### 404 Page Not Found
- Verify `base` in `vite.config.js` matches your repo name
- Check GitHub Pages is enabled with "GitHub Actions" as source

### Blank Page After Deploy
- Open browser console (F12) to check for errors
- Verify Firebase authorized domains includes `piyushhhhh.github.io`
- Check that secrets are available during build

---

## Custom Domain (Optional)

To use a custom domain:

1. Buy a domain (GoDaddy, Namecheap, etc.)
2. In GitHub Pages settings, add your custom domain
3. Add DNS records:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   
   Type: A
   Host: @
   Value: 185.199.109.153
   
   Type: A
   Host: @
   Value: 185.199.110.153
   
   Type: A
   Host: @
   Value: 185.199.111.153
   
   Type: CNAME
   Host: www
   Value: piyushhhhh.github.io
   ```
4. Wait for DNS propagation (up to 48 hours)
5. Update Firebase authorized domains with your custom domain

---

## Monitoring Deployments

Check deployment status:
1. Go to **Actions** tab in GitHub
2. See latest workflow runs
3. Click on any run to see detailed logs

---

## Automatic Deployments

Every time you push to the `main` branch, GitHub Actions will:
1. ✅ Install dependencies
2. ✅ Build the app
3. ✅ Deploy to GitHub Pages

No manual steps needed after initial setup! 🎉

---

## Local Development vs Production

**Local:** Uses `.env` file for Firebase config

**Production:** Uses GitHub Secrets for Firebase config

Make sure your `.env` file is in `.gitignore` (it already is!)

---

## Updating Your App

To deploy changes:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

GitHub Actions will automatically build and deploy! ⚡

---

## Cost

GitHub Pages is **100% FREE** for public repositories!

**Limits:**
- 1 GB storage
- 100 GB bandwidth/month
- 10 builds per hour

This is more than enough for your app! 🎉

---

## Need Help?

- Check [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Check [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Review workflow logs in Actions tab
- Open an issue in your repository

---

**Ready to deploy? Add your Firebase secrets and watch the magic happen! 🚀**

