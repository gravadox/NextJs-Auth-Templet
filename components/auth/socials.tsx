"use client"
import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"

export function Socials(){

    return(
        <div className="w-full flex  pl-5 pr-5">
            <Button variant={"outline"} className="w-full"> <FcGoogle /> Login with google</Button>
        </div>
    )
}