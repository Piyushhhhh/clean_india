# 🚀 Deployment Guide

Step-by-step instructions to deploy CleanConnect India to production.

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Firebase project is set up in production mode
- [ ] Firestore security rules are configured
- [ ] Environment variables are configured for production
- [ ] App has been tested locally
- [ ] All dependencies are up to date
- [ ] Build process completes without errors

---

## Option 1: Firebase Hosting (Recommended)

Firebase Hosting provides fast, secure hosting with automatic SSL.

### Step 1: Install Firebase Tools

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase Hosting

```bash
firebase init hosting
```

**Configuration:**
- What do you want to use as your public directory? **dist**
- Configure as a single-page app? **Yes**
- Set up automatic builds with GitHub? **No** (or Yes if you want CI/CD)
- File dist/index.html already exists. Overwrite? **No**

### Step 4: Build Your App

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 5: Deploy

```bash
firebase deploy --only hosting
```

Your app will be live at: `https://YOUR-PROJECT.web.app`

### Step 6: (Optional) Configure Custom Domain

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the instructions to verify domain ownership
4. Add DNS records provided by Firebase
5. Wait for SSL certificate provisioning (can take up to 24 hours)

---

## Option 2: Vercel (Alternative)

Vercel offers excellent performance and easy GitHub integration.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Select your account**
- Link to existing project? **No**
- Project name? **clean-connect-india**
- Directory? **./current-directory**
- Build command? **npm run build**
- Output directory? **dist**

### Step 3: Set Environment Variables

In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your Firebase config:
   - `VITE_FIREBASE_CONFIG`
   - `VITE_APP_ID`

### Step 4: Deploy to Production

```bash
vercel --prod
```

Your app will be live at: `https://your-project.vercel.app`

---

## Option 3: Netlify

Netlify is another excellent static hosting option.

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Build Your App

```bash
npm run build
```

### Step 3: Deploy

```bash
netlify deploy
```

Follow the prompts to create a new site.

### Step 4: Deploy to Production

```bash
netlify deploy --prod
```

### Step 5: Set Environment Variables

In Netlify Dashboard:
1. Go to Site settings → Build & deploy → Environment
2. Add your environment variables
3. Trigger a new deploy

---

## Option 4: Traditional Web Hosting

For shared hosting or VPS:

### Step 1: Build

```bash
npm run build
```

### Step 2: Upload

Upload the entire `dist/` folder contents to your web server's public directory (usually `public_html/` or `www/`).

### Step 3: Configure .htaccess (Apache)

Create `.htaccess` in your dist folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures client-side routing works correctly.

---

## Environment Variables in Production

### Firebase Hosting

Create `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### Vercel

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/",
      "status": 200
    }
  ]
}
```

---

## Production Firebase Configuration

### Update Security Rules

In Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artifacts/{appId}/public/data/garbage_reports/{report} {
      allow read: if request.auth != null;
      
      allow create: if request.auth != null 
                    && request.resource.data.userId == request.auth.uid
                    && request.resource.data.status == 'pending'
                    && request.resource.data.keys().hasAll(['location', 'wasteType', 'userId', 'status', 'createdAt']);
      
      allow update: if request.auth != null 
                    && (request.auth.uid == resource.data.userId 
                        || request.resource.data.status == 'completed');
      
      allow delete: if request.auth != null 
                    && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Enable App Check (Recommended)

1. Go to Firebase Console → App Check
2. Register your app
3. Choose a provider (reCAPTCHA recommended)
4. Enforce App Check on Firestore

---

## Performance Optimization

### Image Optimization
Already handled by `imageCompression.js` utility

### Code Splitting
Vite automatically handles code splitting

### Caching Strategy
Add cache headers in hosting config:

```json
{
  "headers": [
    {
      "source": "/static/**",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Monitoring & Analytics

### Firebase Analytics

Already configured if you enabled it during project creation.

### Google Analytics

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay

---

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_CONFIG: ${{ secrets.VITE_FIREBASE_CONFIG }}
          VITE_APP_ID: ${{ secrets.VITE_APP_ID }}
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: your-project-id
```

Add secrets in GitHub: Settings → Secrets → Actions

---

## Testing Production Build Locally

Before deploying:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

---

## Rollback Strategy

### Firebase Hosting

View previous deployments:
```bash
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL DESTINATION_SITE_ID:live
```

### Vercel

Use the Vercel Dashboard to revert to a previous deployment with one click.

---

## Post-Deployment Checklist

After deployment:

- [ ] Test all major features
- [ ] Verify Firebase connection
- [ ] Check that reports can be created
- [ ] Test driver view functionality
- [ ] Verify GPS location works
- [ ] Test image upload
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate is active
- [ ] Test on multiple browsers
- [ ] Monitor Firebase usage and quotas

---

## Troubleshooting

### Build Fails

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

Ensure they're prefixed with `VITE_` and restart build process.

### Firebase Connection Issues

Check Firebase config is correct and project is active.

### 404 Errors on Refresh

Configure rewrites in hosting config to always serve `index.html`.

---

## Cost Estimation

### Firebase Free Tier (Spark Plan)
- **Hosting**: 10 GB storage, 360 MB/day transfer
- **Firestore**: 1 GB storage, 50K reads, 20K writes per day
- **Auth**: Unlimited

### Firebase Blaze Plan (Pay-as-you-go)
- **Hosting**: $0.026 per GB stored, $0.15 per GB transferred
- **Firestore**: $0.18 per GB stored, $0.06 per 100K reads, $0.18 per 100K writes
- **Functions**: First 2M invocations free

**Estimated cost for 1000 daily active users**: ~$5-10/month

---

## Support

Need help with deployment?
- Check [Firebase Documentation](https://firebase.google.com/docs/hosting)
- Visit [Vercel Documentation](https://vercel.com/docs)
- Open an issue on GitHub

---

**Ready to go live? Let's make India cleaner! 🌿**

