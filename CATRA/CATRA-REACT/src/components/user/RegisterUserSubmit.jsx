import { Link } from "@tanstack/react-router";

export default function RegisterUserSubmit() {
    return (<>
        <div className="d-grid">
            <button type="submit" className="btn btn-primary">
                Registrarse
            </button>
        </div>
        <p style={{ textAlign: 'center' }}>¿Ya estás registrado? <Link to="/login">Iniciar Sesión</Link></p>
    </>);
}