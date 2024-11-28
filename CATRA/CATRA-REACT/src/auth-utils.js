import { createContext } from "react";

export const user_key = 'auth.user';
export const cliente_key = 'auth.cliente';
export const access_token_key = 'auth.access_token';

export const fallback = "/dashboard";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';

export const AuthContext = createContext(null);

export function getStoredUser() {
  return JSON.parse(localStorage.getItem(user_key));
}
export function getStoredCliente() {
  return JSON.parse(localStorage.getItem(cliente_key));
}
export function persistUserInfo(user, token, cliente) {
  localStorage.setItem(user_key, JSON.stringify(user));
  localStorage.setItem(access_token_key, token);
  localStorage.setItem(cliente_key, JSON.stringify(cliente)); // Guardar cliente
}


export const initialState = {
  user: getStoredUser(),
  cliente: getStoredCliente(),  // Nueva propiedad cliente
  isAuthenticated: getStoredUser() ? true : false,
};




export function authReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        cliente: action.payload.cliente,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case SIGNUP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        cliente: action.payload.cliente,
      };
    default:
      return state;
  }
}

export function cleanUserStorage() {
  localStorage.removeItem(access_token_key);  // Elimina el token de acceso
  localStorage.removeItem(user_key);  // Elimina el usuario
  localStorage.removeItem(cliente_key);  // Elimina la información del cliente
}
