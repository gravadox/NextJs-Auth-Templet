import NextAuth from "next-auth";
import authConfig from "@/auth.config" ;
import { PrismaAdapter} from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/actions/data/user";
import { UserRole } from "@prisma/client";

export const { auth, handlers:{GET,POST}, signIn, signOut } = NextAuth({
            pages:{
                signIn: "/auth/login",
                error: "/auth/error"
            },
            events:{
               async linkAccount({user}){
                    await db.user.update({
                        where: {id: user.id},
                        data: {emailVerified: new Date()}
                    })
                }
            },
            callbacks: {
                async signIn({user, account}){
                    if(account?.provider !== "credentials") return true;
                    if(user && user.id){
                        const existingUser = await getUserById(user.id);
                        if(!existingUser?.emailVerified) return false

                    }
                    return true;
                },
                async session({token, session}){
                    session.user.id
                    if(token.sub && session.user){
                        session.user.id = token.sub;
                    }
                    if(token.role && session.user){
                        session.user.role = token.role as UserRole; // coudn't find solution for this
                    }
                    
                    return session;
                },
                async jwt({token}){
                    if(!token.sub) return token;
                    const existingUser = await getUserById(token.sub);
                    if(!existingUser) return token;
                    token.role = existingUser.role
                    return token;
                }
            },
            adapter: PrismaAdapter(db),
            session: {strategy:"jwt"},
            ...authConfig
})