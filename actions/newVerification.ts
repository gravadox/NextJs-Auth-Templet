"use server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/actions/data/user";
import { getVerficationByToken } from "@/actions/data/verification-token";

export async function newVerification(token:string){

    const existingToken = await getVerficationByToken(token);
    if(!existingToken){ return {error:"Token does not exist"}}

    const hasExpired = new Date(existingToken.expires) < new Date()
    if(hasExpired){ return { error: "Verification token expired"}}

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){ return {error: "Email does not exist"}}

    await db.user.update({
        where: {id: existingUser.id},
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: {id: existingToken.id}
    })

    return { success: "Email verified"}
}