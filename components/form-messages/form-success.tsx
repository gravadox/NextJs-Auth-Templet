import { BsCheckCircle } from "react-icons/bs";

interface FormSuccessProps{
    message?: string
}

export function FormSuccess({message}:FormSuccessProps){
    if(!message) return null;
    return(
        <div className="bg-emerald-500/15 flex p-3 rounded-md items-center gap-x-2 text-sm text-emerald-500">
            <BsCheckCircle className="h-4 w-4" />
            <p>{message}</p>
        </div>
    )
}