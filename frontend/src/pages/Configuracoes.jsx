import "../assets/styles/configuracoes/configuracoes.css"

import InfosGerais from "../components/configuracoes/InfosGerais"
import AtualizacaoCredenciais from "../components/configuracoes/AtualizacaoCredenciais"
import InfosPerfil from "../components/configuracoes/InfosPerfil"
import Deletar from "../components/pop-ups/Deletar"
import PhotoDefault from "../assets/img/perfil-default.png"
import Horarios from "../components/configuracoes/Horarios"

import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router"
import { useAuth } from "../context/authContext";

export default function Configuracoes() {
    const { user, loading } = useAuth();
    const [imgPerfil, setImgPerfil] = useState(PhotoDefault);
    const [isOpen, setIsOpen] = useState(false);
    const { tipo, id } = useParams();

    // Carregar imagem de perfil do usuário
    useEffect(() => {
        if (user?.imgPerfil) {
            setImgPerfil(user.imgPerfil);
        }
    }, [user]);

    const chooseImgPerfil = (img) => {
        const file = img.target.files[0];
        const formData = new FormData();

        const imageUrl = URL.createObjectURL(file);
        setImgPerfil(imageUrl);

        formData.append('imagem', file);
        console.log(imageUrl);
    }

    if (loading) {
        return <div>Carregando...</div>;
    }

    // Verificar se usuário está logado
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Verificar se está tentando acessar configurações de outro usuário
    if (user.id !== id || user.tipo !== tipo) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>Acesso Negado</h2>
                <p>Você só pode editar suas próprias configurações.</p>
                <a href={`/${user.tipo}/perfil/${user.id}/configuracoes`}>
                    Ir para minhas configurações
                </a>
            </div>
        );
    }

    return (
    <>
        <section className="config">
            <div className="container-section">
                {/* Foto de perfil */}
                <div className="container-img">
                    <div className="img-options">

                        <img id="imagePreview" src={imgPerfil} alt="" className="imgEdit"/>
                        <div>
                            <input 
                                id="file-image" 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => chooseImgPerfil(e)}
                                required/>
                            <label className="btns button-confirm" htmlFor="file-image">Mudar Foto</label>
                        </div>
                        
                    </div>
                    <div className="atalhos">
                        <a href="#formAtualizar" id="Geral">Geral</a>
                        <a href="#container-perfil" id="Perfil">Perfil</a>
                        {user?.tipo === "psicologo" && (
                            <a href="#container-horario-atendimento" id="Horarios">Horarios de atendimentos</a>
                        )}
                        <a href="#deletar-conta" id="Deletar">Deletar conta</a>
                    </div>
                </div>

                {/* Informações pessoais */}
                <div className="container-inputs container-perfil" id="formAtualizar">
                    <h1>Geral</h1>

                    <form action="">
                        <InfosGerais user={user} />
                        <AtualizacaoCredenciais user={user} />
                        <InfosPerfil user={user} />
                        
                        {user?.tipo === "psicologo" && (
                            <Horarios />
                        )}

                        <div className="container-atualizar">
                            <button id="btnAtualizarPerfil" className="button-confirm">Atualizar perfil</button>
                        </div> 
                    </form>

                </div>
            </div>

            {/* Deletar conta  - area perigo */}
            <div className="container-deletar" id="deletar-conta">
                <span>Uma vez deletada sua conta, não será possível recupera-la. Tenha certeza!</span>
                <button 
                    className="btn-deletar button-attention" 
                    id="btn-abrir-pop-up"
                    onClick={() => setIsOpen(true)}>Deletar conta</button>
            </div>

            {/* pop-up-deletar */}
            <Deletar open={isOpen} close={() => setIsOpen(false)}/>
        </section>
    </>
  )
}