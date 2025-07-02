// Debug script to check NextAuth configuration
// Run this with: node debug-auth.js

console.log('NextAuth Environment Variables:')
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'NOT SET')
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET')
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET')
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET')

console.log('\nExpected redirect URI for Google:')
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
console.log(`${baseUrl}/api/auth/callback/google`)

console.log('\nMake sure this exact URI is added to your Google OAuth app in Google Cloud Console.')
