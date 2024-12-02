import './index.css';

// eslint-disable-next-line react/prop-types
export default function Loader() {
    return (<div className="loader-container">
        <p>Cargando</p>
        <div className="loader"></div>
    </div>)
}