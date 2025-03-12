"use client";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Socials } from "@/components/auth/socials";
import { Bakcbutton } from "@/components/auth/backButton";
interface CardWrapperProps{
    children: React.ReactNode,
    headerLable: string,
    backButtonLable: string,
    backButtonHref: string,
    showSocials?: boolean,
    center?: boolean
}

export function CardWrapper({children, headerLable, backButtonLable, backButtonHref, showSocials, center}: CardWrapperProps){

    return(
        <Card className="w-[400px] shadow-md flex flex-col gap-y-2">
            {(center && <CardTitle className="w-full flex items-center justify-center pt-5">{headerLable}</CardTitle>) || <CardTitle className="pt-5 pl-5">{headerLable}</CardTitle> }
            
            <CardContent>{children} </CardContent>
            {showSocials && <Socials />}
            <CardFooter className="pt-5 pl-5"> <Bakcbutton lable={backButtonLable} href={backButtonHref} /> </CardFooter>
        </Card>
    )
}