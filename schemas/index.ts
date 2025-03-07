import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1,{
        message: "password is required!"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "emails is required"
    }),
    password: z.string().min(1,{
        message: "password is required!"
    }),
    userName: z.string().min(1,{
        message: "username is required"
    })
})