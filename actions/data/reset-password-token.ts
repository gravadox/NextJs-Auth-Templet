import { db } from "@/lib/db";

export async function getResetPasswordByEmail(email:string) {
    try{
        const resetPasswordToken = await db.resetPasswordToken.findFirst({ where: {email}})
        return resetPasswordToken;
    }catch{
        return null;
    }
}

export async function getResetPasswordByToken(token:string) {
    try{
        const resetPasswordToken = await db.resetPasswordToken.findUnique({ where: {token}})
        return resetPasswordToken;
    }catch{
        return null;
    }
}