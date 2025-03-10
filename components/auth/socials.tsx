"use client"
import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { googleLogin } from "@/actions/googleLogin"
export function Socials(){


    return(
        <div className="w-full flex  pl-5 pr-5">
            <Button onClick={ async()=> googleLogin()} variant={"outline"} className="w-full"> <FcGoogle /> Login with google</Button>
        </div>
    )
}