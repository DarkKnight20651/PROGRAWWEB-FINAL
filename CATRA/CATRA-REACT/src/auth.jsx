import axiosClient from "./axios-client";
import {
  authReducer,
  initialState,
  LOGIN,
  LOGOUT,
  persistUserInfo,
  SIGNUP,
  cleanUserStorage,
  AuthContext,
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
      dispatch({ type: LOGOUT });
      cleanUserStorage();
      console.log("Se cerró la sesión");
    } catch(err) {
      console.log(err);
    }
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
        const respuesta = await axiosClient.post("/registrar-cliente", payload);
        
        dispatch({
          type: SIGNUP,
          payload: {
            user: respuesta.data.user,
            cliente: null
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

  useEffect(() => {
    console.log("Ejecutando USE_EFFECT AuthProvider");

    const controller = new AbortController();
    const signal = controller.signal;
    
    (async () => {
      try {
        const response = await axiosClient.get("/user", { signal });
        if (response.status === 200 && response.data) {
          dispatch({
            type: LOGIN,
            payload: {
              user: response.data.user
            },
          });
          persistUserInfo(response.data.user, response.data.token);
        }
      } catch (err) {
        console.log("ERROR DE USE EFFECT", err);
      }
    })();

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