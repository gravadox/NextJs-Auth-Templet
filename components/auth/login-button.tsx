"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface loginButtonProps{
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
}

export function LoginButton({children, mode = "redirect", asChild}:loginButtonProps){

    const router = useRouter()
    function buttonClicked(){
        router.push("/auth/login")
    }
    return(
        <span onClick={buttonClicked}>
            {children}
        </span>
    )
}