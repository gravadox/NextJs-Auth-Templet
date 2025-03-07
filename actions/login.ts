"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function login(values:z.infer<typeof LoginSchema>){
    const validatedValues = LoginSchema.safeParse(values);

    if(!validatedValues){ return {error: "invalid fields"}}
    const {email,password}:any = validatedValues.data;
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