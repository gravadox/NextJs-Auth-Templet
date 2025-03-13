"use client"
import * as z from "zod"
import { ResetSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormItem, FormField, FormMessage, FormLabel} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "./cardWrapper";
import { FormError } from "../form-messages/form-error";
import { FormSuccess } from "../form-messages/form-success";

import { reset } from "@/actions/reset";


export function ResetForm(){
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    function onSubmit(values:z.infer<typeof ResetSchema>){
        setError("")
        setSuccess("")
        
        startTransition(()=>{
            reset(values)
            .then((data)=>{
                setSuccess(data?.success);
                setError(data?.error);
               
            })
        })
    }
    return(
        <CardWrapper headerLable="Forgot your password?" backButtonLable="Back to login?" backButtonHref="/auth/login">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>email</FormLabel>
                            <FormControl><Input {...field} placeholder="email@exmaple.com" type="email" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                 />


                </div>
                <FormError message={error}  />
                <FormSuccess message={success}  />
                <Button type="submit" className="w-full">Send reset email</Button>
            </form>
        </Form>
        </CardWrapper>
    )
}