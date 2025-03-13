"use server";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/actions/data/user";
import { generateResetPasswordToken } from "@/lib/tokens";
import { sendResetPasswordEmail } from "@/lib/mail";
import { getResetPasswordByEmail } from "./data/reset-password-token";
import * as z from "zod"

export async function reset(values: z.infer<typeof ResetSchema>) {

    const validatedValues = ResetSchema.safeParse(values);
    if(!validatedValues.success){ return {error:"Invalid email"}}

    const {email} = validatedValues.data;
    const existingUser = await getUserByEmail(email);
    if(!existingUser){ return {error:"Email not found"}}
    
    const existingRequest = await getResetPasswordByEmail(email)
    if(existingRequest){
        const hasExpired = new Date(existingRequest.expires) < new Date()
        if(!hasExpired){ return { success: "Reset email already sent"}}    
    }


    const passwordResetToken = await generateResetPasswordToken(email);
    sendResetPasswordEmail(passwordResetToken.email, passwordResetToken.token)

    return {success:"Reset email sent"}
}