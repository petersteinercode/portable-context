# Deployment Guide

## Deploying to Vercel with Blob Storage

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Vercel Project

1. **Create a Vercel account** (if you don't have one): https://vercel.com

2. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

### Step 3: Enable Blob Storage

1. **Deploy the project first** (to create the project):
   ```bash
   vercel
   ```

2. **Enable Blob Storage**:
   - Go to https://vercel.com/dashboard
   - Select your project
   - Go to the "Storage" tab
   - Click "Create Database" or "Add Integration"
   - Select "Blob Storage"
   - Follow the prompts to enable it
   - The `BLOB_READ_WRITE_TOKEN` environment variable will be automatically added

### Step 4: Redeploy

After enabling Blob Storage, redeploy your project:

```bash
vercel --prod
```

Or push to your connected Git repository for automatic deployment.

### Step 5: Verify Deployment

1. Visit your deployed URL (provided by Vercel)
2. The app should load and save data to Blob Storage
3. Check the browser console for any errors

## Local Development

To test locally with Vercel's development server:

```bash
npm run dev
```

This will use Vercel's local development environment which includes access to your Blob Storage.

## Troubleshooting

### Blob Storage Not Working

1. **Check Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Ensure `BLOB_READ_WRITE_TOKEN` is present

2. **Check API Route**:
   - Visit `https://your-domain.vercel.app/api/store` in your browser
   - You should see `{"groups":[]}` if working correctly

3. **Check Browser Console**:
   - Open browser DevTools → Console
   - Look for any error messages related to blob storage

### Fallback to localStorage

The app automatically falls back to localStorage if the API is unavailable. This ensures the app works even if Blob Storage has issues.

## Project Structure

```
portable-context/
├── index.html          # Main application file
├── api/
│   └── store.js        # API route for blob storage
├── package.json        # Dependencies
├── vercel.json         # Vercel configuration
└── README.md           # Project documentation
```

