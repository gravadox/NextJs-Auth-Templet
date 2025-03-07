"use client"
import * as z from "zod"
import { RegisterSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormItem, FormField, FormMessage, FormLabel} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "./cardWrapper";
import { FormError } from "../form-messages/form-error";
import { FormSuccess } from "../form-messages/form-success";

import {register} from "@/actions/register"

export function RegisterForm(){
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            userName:""
        }
    })

    function onSubmit(values:z.infer<typeof RegisterSchema>){
        setError("")
        setSuccess("")
        
        startTransition(()=>{
            register(values)
            .then((data)=>{
                setError(data.error);
                setSuccess(data.sucess)
            })
        })
    }
    return(
        <CardWrapper headerLable="Create an account" backButtonLable="Already have an account?" backButtonHref="/auth/login" showSocials>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">

                <FormField
                    control={form.control}
                    name="userName"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>username</FormLabel>
                            <FormControl><Input {...field} placeholder="username"  /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                 />

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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                    />

                </div>
                <FormError message={error}  />
                <FormSuccess message={success}  />
                <Button type="submit" className="w-full">create an account</Button>
            </form>
        </Form>
        </CardWrapper>
    )
}