import { redirect } from "@tanstack/react-router";
import { access_token_key } from "../auth-utils";
import axiosClient from "src/axios-client";

/**
 * 
 * @param { } context El contexto del router
 * @param { { location?: any, url: string } } options Opciones de redireccionamiento
 */
// eslint-disable-next-line no-unused-vars
async function _authGuard(context, options) {
    const auth = context.auth;
    if(!auth.isAuthenticated && localStorage.getItem(access_token_key)) {
        try {
            const response = await axiosClient.get("/user");
            if(response.status !== 200) throw new Error("No autenticado");
        // eslint-disable-next-line no-unused-vars
        } catch(_) {
            performRedirect(options.location, options.url);
        }
    } else if(!auth.isAuthenticated) performRedirect(options.location, options.url);
}

/**
 * 
 * @param { } context El contexto del router
 * @param { { location?: any, url: string } } options Opciones de redireccionamiento
 */
export default function authGuard(context, options) {
    const auth = context.auth;
    
    if(!auth.isAuthenticated && !localStorage.getItem(access_token_key)) {
        console.log(auth.isAuthenticated, localStorage.getItem(access_token_key));
        performRedirect(options.location, options.url);  
    }
}

function performRedirect(localtion, url) {
    if(localtion) {
        throw redirect({
            to: url,
            search: {
                redirect: location.href,
            },
        })
    } else throw redirect({to: url})
}