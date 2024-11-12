export const user_key = 'auth.user';
export const access_token_key = 'auth.access_token';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';

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
  isAdmin: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        user: null,
      };
    case SIGNUP:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        user: action.payload.user,
      };
    default:
      return state;
  }
}
