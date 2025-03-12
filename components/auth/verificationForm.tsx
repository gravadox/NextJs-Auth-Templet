"use client"
import { newVerification } from "@/actions/newVerification";
import { CardWrapper } from "@/components/auth/cardWrapper";
import { useSearchParams } from "next/navigation";
import { useEffect, useState ,useCallback } from "react";
import { PropagateLoader, SyncLoader,BarLoader } from "react-spinners"
import { FormError } from "@/components/form-messages/form-error";
import { FormSuccess } from "@/components/form-messages/form-success";

export function VerificationForm(){
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const params = useSearchParams()
    const token = params.get("token")

    const OnSubmit = useCallback(()=>{
        if(!token){ 
            setError("Token is missing")
            return;
        }
        newVerification(token)
        .then((data)=>{
            setSuccess(data.success)
            setError(data.error)
        })
        .catch(()=>{
            setError("Something went wrong!")
        })
    },[token])

    useEffect(()=>{
        OnSubmit()
    },[OnSubmit])
    return(
    <CardWrapper headerLable="Confirming your email" backButtonHref="/auth/login" backButtonLable="Back to login?" center  >
        <br></br><br></br>
        <div className="flex items-center w-full justify-center">
        {!success && !error && ( <PropagateLoader />) }
        {/* <SyncLoader /> */}
        {/* <BarLoader  width={250} /> */}
        <br></br>
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
        </div>
    </CardWrapper>
    )
}