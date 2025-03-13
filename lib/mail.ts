import { Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email:string, token:string){
    const confirmatinLink = `http://localhost:3000/auth/verification?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p> Click <a href="${confirmatinLink}">here</a> to confirm your email!</p>`
    })
}

export async function sendResetPasswordEmail(email:string, token:string){
    const resetLink = `http://localhost:3000/auth/resetPassword?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p> Click <a href="${resetLink}">here</a> to reset your password!</p>`
    })
}