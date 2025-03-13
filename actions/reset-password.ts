"use server"
import * as z from "zod";
import bcrypt from "bcryptjs";
import { ResetPasswordSchema } from "@/schemas";
import { getResetPasswordByToken } from "./data/reset-password-token";
import { getUserByEmail } from "./data/user";
import { db } from "@/lib/db";
export async function resetPassword(
    values:z.infer<typeof ResetPasswordSchema>,
    token?: string | null
){
    if(!token){ return {error:"Missing token"}}

    const validatedValues = ResetPasswordSchema.safeParse(values);
    if(!validatedValues.success){return {error:"Invalid values"}}
    const {password} = validatedValues.data

    const existingToken = await getResetPasswordByToken(token)
    if(!existingToken){return {error:"Invalid token"}}

    const hasExpired = new Date(existingToken.expires) < new Date()
    if(hasExpired){ return { error: "Reset token expired"}}

    const existingUser = await getUserByEmail(existingToken.email)
    if(!existingUser){ return {error:"User was not found"}}

    const hashedPassword = await bcrypt.hash(password,10)

    await db.user.update({
        where:{id: existingUser.id},
        data: {password: hashedPassword}
    })

    await db.resetPasswordToken.delete({
        where:{id: existingToken.id}
    })

    return { success:"Password updated successfuly"}
}