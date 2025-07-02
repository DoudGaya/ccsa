# SSO Setup Guide

## Overview
This application now supports Single Sign-On (SSO) with the following providers:
- Google OAuth
- GitHub OAuth  
- Microsoft Azure AD

## Setup Instructions

### 1. Environment Variables
Copy the `.env.example` file to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

### 2. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy Client ID and Client Secret to your `.env.local`

### 3. GitHub OAuth Setup
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in the application details:
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to your `.env.local`

### 4. Microsoft Azure AD Setup
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to Azure Active Directory → App registrations
3. Click "New registration"
4. Configure redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`
5. Go to "Certificates & secrets" → Create new client secret
6. Copy Application (client) ID, Client Secret, and Directory (tenant) ID to your `.env.local`

### 5. Database Schema
Make sure your User table in Prisma supports OAuth users. The current schema should work, but verify these fields exist:
- `id` (String, required)
- `email` (String, unique)
- `name` (String, optional)
- `image` (String, optional) - for profile pictures from SSO providers
- `emailVerified` (DateTime, optional)

### 6. NextAuth Configuration
The auth configuration has been updated in `lib/auth.ts` to include all SSO providers. Make sure you have these environment variables set:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
AZURE_AD_CLIENT_ID=your-azure-client-id
AZURE_AD_CLIENT_SECRET=your-azure-client-secret
AZURE_AD_TENANT_ID=your-azure-tenant-id
```

## Testing
1. Start your development server: `npm run dev`
2. Navigate to `/auth/signin`
3. You should see the new SSO buttons below the traditional login form
4. Click any SSO button to test the authentication flow

## Notes
- Users who sign in via SSO will be automatically created in your database
- The email from the SSO provider will be used as the unique identifier
- **Account Linking**: If a user has an existing account with email/password and tries to sign in with OAuth using the same email, the accounts will be automatically linked
- User roles can be assigned after SSO login through your admin interface
- Make sure to update redirect URIs for production deployment

## Troubleshooting Common Issues

### OAuthAccountNotLinked Error
This error occurs when:
1. A user has an existing account with email/password
2. They try to sign in with OAuth using the same email
3. NextAuth prevents linking for security

**Solution**: The configuration now includes `allowDangerousEmailAccountLinking: true` which allows automatic account linking based on email address.

### Redirect URI Mismatch
Make sure your OAuth apps have the correct redirect URIs:
- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`
- Azure: `http://localhost:3000/api/auth/callback/azure-ad`
