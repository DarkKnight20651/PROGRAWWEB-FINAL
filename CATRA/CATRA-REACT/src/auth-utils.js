import { createContext } from "react";

export const user_key = 'auth.user';
export const access_token_key = 'auth.access_token';

export const fallback = "/dashboard";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';

export const AuthContext = createContext(null);

export function getStoredUser() {
  return JSON.parse(localStorage.getItem(user_key));
}

export function persistUserInfo(user, token) {
  localStorage.setItem(user_key, JSON.stringify(user));
  localStorage.setItem(access_token_key, token);
}

export const initialState = {
  user: getStoredUser(),
  isAuthenticated: getStoredUser() ? true : false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
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
      };
    default:
      return state;
  }
}

export function cleanUserStorage() {
  localStorage.removeItem(access_token_key);
  localStorage.removeItem(user_key);
}