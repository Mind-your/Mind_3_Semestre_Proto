import { Link } from "react-router";
import fotoPsi from '../../assets/img/icon-streaming.png'
import '../../assets/styles/home.css';


export default function CardRow({ perfils }) {
    return (
        <>
            {perfils.map((item, index) => (
                <div className="card-psi-row" key={index}>
                    <div className="infos-psi-row">
                        <h1 className="nome-psi-row">{item.nome}</h1>
                        <div className="local-info-row">
                            <strong>Local:</strong>
                            <p className="local-psi-row">{item.local}</p>
                        </div>
                        <button className="button-proceed button-ver-col">Ver</button>
                    </div>
                    <div className="tags-row card-psi-body-row">
                        <h1>Conhecimentos</h1>
                        {item.tags.map((list, i) => (
                            <a key={i} data-speciality={list}>{list}</a>
                        ))}
                    </div>
                    <div className="psi-foto-perfil-row">
                        <img className="foto-psi-row" src={fotoPsi} alt="foto" />
                    </div>
                    
                </div>
            ))}
        </>
    )
}
