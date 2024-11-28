import axiosClient from "src/axios-client";
import {
  authReducer,
  initialState,
  LOGIN,
  LOGOUT,
  persistUserInfo,
  SIGNUP,
  cleanUserStorage,
  AuthContext,
  access_token_key,
} from "./auth-utils";
import {
  useCallback,
  useEffect,
  useReducer,
} from "react";

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log("RECALCULANDO AUTH PROVIDER", state);

  const logout = useCallback(async () => {
    try {
      await axiosClient.post("/logout");
      console.log("Se cerró la sesión");
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: LOGOUT });
      cleanUserStorage();
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        const respuesta = await axiosClient.post("/login", { email, password });

        persistUserInfo(respuesta.data.user, respuesta.data.token, respuesta.data.user.cliente);


        dispatch({
          type: LOGIN,
          payload: {
            user: respuesta.data.user,
            cliente: respuesta.data.cliente,
          },
        });

        return "Success";

      } catch (error) {
        error.mensajes = error.response?.data?.errors;
        throw error;
      }
    },
    []
  );

  const signup = useCallback(
    async (payload) => {
      try {
        const respuesta = await axiosClient.post("/clientes?signup=true", payload);

        persistUserInfo(respuesta.data.user, respuesta.data.token);

        dispatch({
          type: SIGNUP,
          payload: {
            user: respuesta.data.user,
            cliente: null
          },
        });

        return "Success";

      } catch (error) {
        error.mensajes = error.response?.data?.errors;
        throw error;
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    if (localStorage.getItem(access_token_key)) {
      (async () => {
        try {
          const response = await axiosClient.get("/user", { signal: controller.signal });
          if (response.status === 200 && response.data) {
            persistUserInfo(respuesta.data.user, respuesta.data.token, respuesta.data.user.cliente);

            dispatch({
              type: LOGIN,
              payload: {
                user: response.data.user,
                cliente: response.data.user.cliente,
              },
            });
          }
        } catch (err) {
          console.log("ERROR DE USE EFFECT", err);
        }
      })();
    }
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        signup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}