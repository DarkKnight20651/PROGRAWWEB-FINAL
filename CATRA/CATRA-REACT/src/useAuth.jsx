import { useContext } from "react";
import { AuthContext } from "./auth";

export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("El hook useAuth debe ser usado con un AuthProvider");
    }
    return context;
}
