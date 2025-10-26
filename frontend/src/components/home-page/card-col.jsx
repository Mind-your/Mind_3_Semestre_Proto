import { Link } from "react-router";
import fotoPsi from '../../assets/img/perfil-default.png'
import '../../assets/styles/home.css';


export default function CardCol({ perfils, setSelectedPerfil, setOpenPsi }) {
    return (
        <>
            {perfils.map((item, index) => (
                <div className="card-psi-col" key={index}>
                    <div className="psi-foto-perfil-col">
                        <img className="foto-psi-col" src={fotoPsi} alt="foto" />
                    </div>
                    <div className="infos-psi-col">
                        <h1 className="nome-psi-col">{item.nome}</h1>
                        <div className="local-info-col">
                            <strong>Local:</strong>
                            <p className="local-psi-col">{item.local}</p>
                        </div>
                    </div>
                    <h1 className="tittle-conhecimentos-col">Conhecimentos</h1>
                    <div className="tags-col card-psi-body-col">

                        {item.tags.map((list, i) => (
                            <a key={i} data-speciality={list}>{list}</a>
                        ))}
                    </div>
                    <div className="container-btn-ver-col">
                        <button
                            className="button-ver-card-psi"
                            id="btn-abrir-pop-up"
                            onClick={() => {
                                if (setSelectedPerfil) setSelectedPerfil(item);
                                if (setOpenPsi) setOpenPsi(true);
                            }}
                        >
                            Ver
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
