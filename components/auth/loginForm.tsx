"use client"
import * as z from "zod"
import { LoginSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormItem, FormField, FormMessage, FormLabel} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "./cardWrapper";
import { FormError } from "../form-messages/form-error";
import { FormSuccess } from "../form-messages/form-success";
import Link from "next/link";

import {login} from "@/actions/login"

import { useSearchParams } from "next/navigation";

export function LoginForm(){
    // manage params errors later
    const searchParams = useSearchParams();
    const isUrlError = searchParams.get("error")
    let urlError = ""
    if(isUrlError){ urlError = isUrlError}
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values:z.infer<typeof LoginSchema>){
        setError("")
        setSuccess("")
        
        startTransition(()=>{
            login(values)
            .then((data)=>{
                setSuccess(data?.success);
                setError(data?.error);
               
            })
        })
    }
    return(
        <CardWrapper headerLable="Welcom back" backButtonLable="Don't have an account?" backButtonHref="/auth/register" showSocials>
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

                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field})=>(
                                            <FormItem>
                                                <FormLabel>password</FormLabel>
                                                <FormControl><Input {...field} placeholder="********" type="password" /></FormControl>
                                                <Button size="sm" variant="link" asChild className="px-0 font-normal"><Link href="/auth/reset">forgot password?</Link></Button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                    />

                </div>
                <FormError message={error || urlError}  />
                <FormSuccess message={success}  />
                <Button type="submit" className="w-full">login</Button>
            </form>
        </Form>
        </CardWrapper>
    )
}