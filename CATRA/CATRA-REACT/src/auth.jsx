import axiosClient from "./axios-client";
import {
  access_token_key,
  authReducer,
  initialState,
  LOGIN,
  LOGOUT,
  persistUserInfo,
  SIGNUP,
  limpiarTkUsuarioStorage,
  AuthContext,
  REGISTER_CLIENTE
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
    await axiosClient.post("/logout");
    dispatch({ type: LOGOUT });
    limpiarTkUsuarioStorage();

    console.log("Se cerró la sesión");
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        const respuesta = await axiosClient.post("/login", { email, password });

        dispatch({
          type: LOGIN,
          payload: {
            user: respuesta.data.user,
          },
        });

        if(respuesta.data.cliente) {
          dispatch({
            type: REGISTER_CLIENTE,
            payload: {
              user: respuesta.data.cliente,
            },
          });
        }

        persistUserInfo(respuesta.data.user, respuesta.data.token);
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
        const respuesta = await axiosClient.post("/signup", payload);

        dispatch({
          type: SIGNUP,
          payload: {
            user: respuesta.data.user,
          },
        });

        persistUserInfo(respuesta.data.user, respuesta.data.token);

        return "Success";
      } catch (error) {
        error.mensajes = error.response?.data?.errors;
        throw error;
      }
    },
    []
  );

  const registrar_cliente = useCallback(
    async (payload) => {
      try {
        const respuesta = await axiosClient.post("/cliente", payload);

        dispatch({
          type: REGISTER_CLIENTE,
          payload: {
            user: respuesta.data.cliente,
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
    const signal = controller.signal;

    const checkAuth = async () => {
      const token = localStorage.getItem(access_token_key);
      try {
        console.log("TOKEN ANTES DE /USER EN EFFECT", token);

        const response = await axiosClient.get("/user", { signal });
        if (response.status === 200 && response.data) {
          dispatch({
            type: LOGIN,
            payload: {
              user: response.data.user
            },
          });

          if(response.data.cliente) {
            dispatch({
              type: REGISTER_CLIENTE,
              payload: {
                cliente: response.data.cliente,
              },
            });
          }
          
        }
      } catch (err) {
        console.log("ERROR DE USE EFFECT", err);

        /* if (err.token_expirado) {
          console.log("HACIENDO LOGOUT POR ERROR");
          dispatch({ type: LOGOUT });
          localStorage.removeItem(access_token_key);
          localStorage.removeItem(user_key);
        } */
      }
    };

    checkAuth();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        rol: state.rol,
        login,
        logout,
        signup,
        registrar_cliente
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}