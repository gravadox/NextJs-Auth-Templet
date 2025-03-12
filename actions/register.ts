"use server"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schemas"
import { db } from "@/lib/db"
import { getUserByEmail } from "./data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"


export async function register(values:z.infer<typeof RegisterSchema>){
    const validatedValues = RegisterSchema.safeParse(values);

    if(!validatedValues){ return {error: "invalid fields"}}

    // remember to fix this type issue
    const { email, password, userName}:any = validatedValues.data
    
    const hashedPassword = await bcrypt.hash(password,10)
    const existingUserEmail = await getUserByEmail(email)
    // const existingUserUserName = await getUserByUserName(userName)
    if(existingUserEmail){
        return {error : "This email is already existing"}
    }
    // else if(existingUserUserName){ return {error: "This username is already existing"}}
    await db.user.create({
        data:{
            name: userName,
            email,
            password: hashedPassword
        }
    })

    const verficationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verficationToken.email, verficationToken.token)
    return {sucess: "Verification email sent"}
}