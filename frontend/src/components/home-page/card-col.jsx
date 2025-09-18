import { Link } from "react-router";
import fotoPsi from '../../assets/img/icon-streaming.png'
import '../../assets/styles/home.css';

export default function CardCol() {
    return (
        <div className="card-psi">
            <div className="psi-foto-perfil">
                <img className="foto-psi" src={fotoPsi} alt="foto" />
            </div>
            <div className="infos-psi">
                <h1 className="nome-psi">Robson Souza</h1>
                <div className="local-info">
                    <p>Local:</p>
                    <p className="local-psi">Santo André - SP</p>
                </div>
            </div>
            <div className="tags card-psi-body">
                <a className="hm-psi-stats" data-speciality="Ansiedade">Ansiedade</a>
                <a className="hm-psi-stats" data-speciality="Conflitos Familiares">Conflitos familiares</a>
                <a className="hm-psi-stats" data-speciality="Dependencia Química">Dependência Química</a>
                <a className="hm-psi-stats" data-speciality="Casais">Casais</a>
            </div>
            <button className="button-proceed">Ver</button>
        </div>
    )
}
