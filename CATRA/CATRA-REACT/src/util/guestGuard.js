import { redirect } from "@tanstack/react-router";
import { access_token_key } from "src/auth-utils";

/**
 * 
 * @param { } context El contexto del router
 * @param { string } url Opciones de redireccionamiento
 */
export default function guestGuard(context, url) {
    const auth = context.auth;
    if(auth.isAuthenticated || localStorage.getItem(access_token_key)) {
        throw redirect({to: url})
    }
}