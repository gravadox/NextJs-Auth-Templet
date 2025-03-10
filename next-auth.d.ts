import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "@prisma/client";
// Extend the User object to include the `role` field
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role?: UserRole; 
  }

  interface Session {
    user: User & DefaultSession["user"];
  }

  interface JWT {
    role?: string;
  }
}
