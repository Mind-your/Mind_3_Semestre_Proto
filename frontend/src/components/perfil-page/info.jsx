import { Link } from "react-router";
import background from "../../assets/img/background_input.png";
import '../../assets/styles/perfil.css';
import { HiOutlinePhone } from "react-icons/hi";


export default function Info() {
    return (
        <>

            <div className="card-perfil-content">
                <div className="foto-perfil">
                    <img id="perfilFoto" src="/img/cliente_ex.png" alt=""/>
                        <div className="info-perfil ">
                            <h3 id="perfilNome">Nome Sobrenome</h3>
                            <p id="perfilIdade">Idade: </p>
                            <p>Local: </p>
                        </div>
                </div>


                <div className="settings">
                    <div className="contato">
                        <button type="button" className="perfil-btn" onclick="copyNumber()"><HiOutlinePhone/></button>
                        <span id="cell-n">+55 11 9000-0000</span>
                    </div>
                    <button className="setting"><a href="./configuracoes.html">Configurações</a></button>
                </div>
            </div>

        </>
    )
}


