import { Link } from "@tanstack/react-router";

export default function NuevoClienteSubmit() {
    return (<>
        <div className="d-grid">
            <button type="submit" className="btn btn-primary">
                Crear cliente
            </button>
        </div>
        <p style={{ textAlign: 'center' }}>¿Ya estás registrado? <Link to="/login">Iniciar Sesión</Link></p>
    </>);
}