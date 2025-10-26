import { Link } from "react-router";
import '../../assets/styles/perfil.css';
import { HiOutlinePhone } from "react-icons/hi";
import { useAuth } from "../../context/authContext";
import PhotoDefault from "../../assets/img/perfil-default.png";

export default function Info() {
    const { user } = useAuth();

    const copyNumber = () => {
        if (user?.telefone) {
            navigator.clipboard.writeText(user.telefone);
            alert("Número copiado!");
        }
    };

    return (
        <>
            <div className="card-perfil-content">
                <div className="foto-perfil">
                    <img 
                        id="perfilFoto" 
                        src={user?.imgPerfil || PhotoDefault} 
                        alt="Foto de perfil"
                    />
                    <div className="info-perfil">
                        <h3 id="perfilNome">
                            {user?.nome} {user?.sobrenome}
                        </h3>
                        <p id="perfilIdade">
                            Idade: {user?.idade || "N/A"}
                        </p>
                        <p>Local: {user?.endereco || "N/A"}</p>
                    </div>
                </div>

                <div className="settings">
                    <div className="contato">
                        <button 
                            type="button" 
                            className="perfil-btn" 
                            onClick={copyNumber}
                        >
                            <HiOutlinePhone/>
                        </button>
                        <span id="cell-n">
                            {user?.telefone || "+55 11 0000-0000"}
                        </span>
                    </div>
                    <button className="setting">
                        <Link to={`/${user?.tipo}/perfil/${user?.id}/configuracoes`}>
                            Configurações
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
}