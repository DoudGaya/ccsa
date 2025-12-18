import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import AzureADProvider from "next-auth/providers/azure-ad"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// Add these type imports and declarations
import { JWT } from "next-auth/jwt"
import { Session, User } from "next-auth"

// Extend types for proper typing
interface ExtendedUser extends User {
  role?: string
}

interface ExtendedSession extends Session {
  user: {
    id?: string
    name?: string | null
    email?: string | null
    role?: string
    image?: string | null
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow OAuth sign-in even if account exists with same email
      if (account?.provider === "google" || account?.provider === "github" || account?.provider === "azure-ad") {
        return true
      }
      // For credentials provider, check normally
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = (user as ExtendedUser).role
      }
      return token
    },
    async session({ session, token }) {
      const extendedSession = session as ExtendedSession
      if (token) {
        extendedSession.user.id = token.sub
        extendedSession.user.role = token.role as string
      }
      return extendedSession
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  debug: process.env.NODE_ENV === 'development',
}
