import { redirect } from "@tanstack/react-router";

/**
 * 
 * @param { } context El contexto del router
 * @param { string } allowedRoles Opciones de redireccionamiento
 */
export default function roleGuard(context, allowedRoles, url) {
    const auth = context.auth;    
    if(!allowedRoles.includes(auth.user?.role)) 
        throw redirect({to: url})
}