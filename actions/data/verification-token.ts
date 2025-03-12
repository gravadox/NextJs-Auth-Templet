import { db } from "@/lib/db";

export async function getVerificationByEmail(email:string) {
    try{
        const verficationToken = await db.verificationToken.findFirst({ where: {email}})
        return verficationToken;
    }catch{
        return null;
    }
}

export async function getVerficationByToken(token:string) {
    try{
        const verficationToken = await db.verificationToken.findUnique({ where: {token}})
        return verficationToken;
    }catch{
        return null;
    }
}