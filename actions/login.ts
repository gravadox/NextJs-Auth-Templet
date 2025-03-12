"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "./data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getVerificationByEmail } from "./data/verification-token";

export async function login(values:z.infer<typeof LoginSchema>){
    const validatedValues = LoginSchema.safeParse(values);

    if(!validatedValues){ return {error: "invalid fields"}}
    const {email,password}:any = validatedValues.data;
    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password){ return {error: "Invalid credentials"}}
    if(!existingUser.emailVerified){
        const existingToken = await getVerificationByEmail(email)
        if(existingToken){
            const hasExpired = new Date(existingToken?.expires) < new Date()
            if(!hasExpired){ return{ success:"email verification already sent"}}
        }
        const verficationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verficationToken.email, verficationToken.token)
        return({success: "Verification email sent"})
    }

    try{
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        return {success:"logged in successfuly"}
    }catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "invalid credentials!"}
                default:
                    return {error: "something went wrong!"}
            }
        }
        throw error
    }

}