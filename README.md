# Finnovative Financial Solutions - Vercel Deployment Guide

This project is a high-performance React + TypeScript SPA styled with Tailwind CSS and bundled using Vite. It has been pre-configured with a `vercel.json` file to support seamless routing, clean URLs, and browser refresh handling when deployed on Vercel.

---

## 🚀 How to Deploy to Vercel

You can deploy this website to Vercel using either **GitHub Integration** (Recommended) or the **Vercel CLI**.

### Method 1: Using GitHub Integration (Highly Recommended)

This is the easiest method and enables automated deployments whenever you push changes to your repository.

1. **Export/Push your code to GitHub**:
   - Initialize a Git repository in your project:
     ```bash
     git init
     git add .
     git commit -m "Initial commit for Vercel deployment"
     ```
   - Create a new repository on [GitHub](https://github.com) and push your code.

2. **Connect to Vercel**:
   - Visit the [Vercel Dashboard](https://vercel.com/dashboard) and log in with your GitHub account.
   - Click **Add New** and select **Project**.

3. **Import and Configure**:
   - Find your repository in the list and click **Import**.
   - Vercel will automatically detect **Vite** as the Framework Preset.
   - Keep the default settings:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build` or `vite build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **Deploy**.

4. **Done!**
   - Vercel will build and launch your application, providing you with a production-ready `https://your-project.vercel.app` domain.

---

### Method 2: Using the Vercel CLI (Local Command Line)

If you have the project files locally and prefer to deploy directly from your terminal:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   - Run the following command from the project root:
     ```bash
     vercel
     ```
   - Follow the interactive prompts to link and set up your project.
   - To deploy to production, run:
     ```bash
     vercel --prod
     ```

---

## 🛠️ Configuration Details

We have added a custom `vercel.json` configuration file at the root of the project to ensure:
* **Clean URLs**: Automatically strips trailing slashes for prettier routes.
* **Client-Side Routing Fallback**: Maps all routes back to `/index.html` to prevent standard `404` errors when refreshing subpages or navigating deep paths in a Single Page Application (SPA).

```json
{
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
