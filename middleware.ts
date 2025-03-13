import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes} from "@/routes"
const {auth} = NextAuth(authConfig)

export default auth((req)=>{
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicUrl = publicRoutes.includes(nextUrl.pathname)
    const isAuthUrl = authRoutes.includes(nextUrl.pathname)

    /*/ routes checking  /*/

    if(isApiRoute){ return}
    if(isAuthUrl){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }
    if(!isLoggedIn && !isPublicUrl){
        return Response.redirect(new URL("/", nextUrl));
    }

    return;
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}