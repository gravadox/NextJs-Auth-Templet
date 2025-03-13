import { getVerificationByEmail } from "@/actions/data/verification-token";
import { getResetPasswordByEmail } from "@/actions/data/reset-password-token";

import {v4 as uuidV4} from "uuid";
import { db } from "@/lib/db";

export async function generateVerificationToken(email:string) {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getVerificationByEmail(email);

    if( existingToken){
        await db.verificationToken.delete({
                where: {id: existingToken.id}
    })}
    const verficationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return verficationToken;
}

export async function generateResetPasswordToken(email:string) {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getResetPasswordByEmail(email);

    if( existingToken){
        await db.resetPasswordToken.delete({
                where: {id: existingToken.id}
    })}
    const passwordToken = await db.resetPasswordToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return passwordToken;
}