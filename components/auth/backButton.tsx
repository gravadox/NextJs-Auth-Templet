"use client"

import { Button } from "../ui/button"
import Link from "next/link"

interface backButtonProps{
    lable: string,
    href: string
}

export function Bakcbutton({lable,href}:backButtonProps){

    return(
        <Button size={"sm"} variant={"link"} asChild className="font-normal w-full">
            <Link href={href}>{lable}</Link>
        </Button>
    )
}