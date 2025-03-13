"use client"
import * as z from "zod"
import { ResetPasswordSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormItem, FormField, FormMessage, FormLabel} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "./cardWrapper";
import { FormError } from "../form-messages/form-error";
import { FormSuccess } from "../form-messages/form-success";

import { resetPassword } from "@/actions/reset-password";
import { useSearchParams } from "next/navigation";


export function ResetPasswordForm(){
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    function onSubmit(values:z.infer<typeof ResetPasswordSchema>){
        setError("")
        setSuccess("")
        
        startTransition(()=>{
            resetPassword(values,token)
            .then((data)=>{
                setSuccess(data?.success);
                setError(data?.error);
               
            })
        })
    }
    return(
        <CardWrapper headerLable="Enter new password" backButtonLable="Back to login?" backButtonHref="/auth/login">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="password"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl><Input {...field} placeholder="******" type="password" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                 />


                </div>
                <FormError message={error}  />
                <FormSuccess message={success}  />
                <Button type="submit" className="w-full">Reset password</Button>
            </form>
        </Form>
        </CardWrapper>
    )
}