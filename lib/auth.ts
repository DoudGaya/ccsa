import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
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
  providers: [
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
    async jwt({ token, user }) {
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
}
