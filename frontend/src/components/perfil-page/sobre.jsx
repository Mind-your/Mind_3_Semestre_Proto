import { Link } from "react-router";
import '../../assets/styles/perfil.css';


export default function Sobre() {
    return (
        <>
            <div className="infos">
            <div className="card-info-container">
                <h4>Sobre mim:</h4>
                <div className="card-sobre-container"></div>
            </div>
            <div className="card-info-container">
                <h4>Ficha do Paciente</h4>
                <div className="card-ficha-container"></div>
            </div>
        </div>

        </>
    )
}


