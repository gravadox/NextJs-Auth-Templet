// remember to style this page

import { CardWrapper } from "@/components/auth/cardWrapper";

export default function Error(){
    return(
    <CardWrapper
    headerLable="something went wrong!"
    backButtonHref="/auth/login"
    backButtonLable="Back to login?"
    center
    >
        <></>
    </CardWrapper>
    )
    
}