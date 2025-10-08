import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "@/db"
import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import authConfig from "./auth.config"
// Extend the `Session` interface to include `role` and `id`
declare module "next-auth" {
  
}

 
declare module "next-auth/jwt" {
  interface JWT {
    
  }
}




export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      return session
    },
    async jwt ({token, trigger, session}) {
      try {
        // Add any JWT logic here if needed
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
})