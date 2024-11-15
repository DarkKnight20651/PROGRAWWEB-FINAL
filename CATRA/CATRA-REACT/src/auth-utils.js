import { createContext } from "react";

export const user_key = 'auth.user';
export const access_token_key = 'auth.access_token';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const REGISTER_CLIENTE = 'REGISTER_CLIENTE';

export const AuthContext = createContext(null);

export function getStoredUser() {
    return localStorage.getItem(user_key);
}

export function persistUserInfo(user, token) {
  localStorage.setItem(user_key, user);
  localStorage.setItem(access_token_key, token);
}

export const initialState = {
  user: getStoredUser(),
  isAuthenticated: false,
  cliente: null,
};

export function authReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        cliente: null,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        cliente: null
      };
    case REGISTER_CLIENTE:
      return {
        ...state,
        cliente: action.payload.cliente,
      };
    case SIGNUP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        cliente: null,
      };
    default:
      return state;
  }
}

export function limpiarTkUsuarioStorage() {
  localStorage.removeItem(access_token_key);
  localStorage.removeItem(user_key);
}