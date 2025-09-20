import { Link } from "react-router";
import fotoPsi from '../../assets/img/icon-streaming.png'
import '../../assets/styles/home.css';


export default function CardCol({ perfils }) {
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
                    <button className="button-proceed button-ver">Ver</button>
                </div>
            ))}
        </>
    )
}
