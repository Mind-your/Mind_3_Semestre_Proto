import { NavLink, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { HiOutlineUser, HiOutlineSearch } from "react-icons/hi";
import { useAuth } from '../../context/authContext';

export default function NavDesktop() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <nav id="nav-desktop">
                <ul>
                    <NavLink id="linkSobreNos" to="/sobre-nos">
                        <li>Sobre nós</li>
                    </NavLink>
                    <NavLink
                        id="linkPlanos"
                        to="/"
                        onClick={(e) => {
                            if (window.location.pathname === "/") {
                                e.preventDefault();
                                document.getElementById('planos')?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                            }
                        }}>
                        <li>Planos</li>
                    </NavLink>
                    <NavLink id="linkArtigos" to="/artigos">
                        <li>Artigos</li>
                    </NavLink>

                    {/* Se o usuario estiver logado, aparecerá o navbar personalizado */}
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/home">
                                <HiOutlineSearch
                                    id="search-icon-btn"
                                    className="icon-ui" />
                            </NavLink>
                            <NavLink to={`/${user.tipo}/perfil/${user.id}`}>
                                <HiOutlineUser
                                    id="user-icon-btn"
                                    className="icon-ui" />
                            </NavLink>
                        </>
                    ) : (
                        ""
                    )}
                </ul>

                {/* DropDown */}
                {!isAuthenticated ? (
                    <div className="nav-right-buttons">
                        <button
                            type="button"
                            className="nav-btn-login"
                            onClick={() => setDropdownOpen(prev => !prev)}
                        >login</button>

                        <div className={`nav-login-drop-wrapper ${isDropdownOpen ? "show" : ""}`}>
                            <div className="nav-login-drop">
                                <Link to="/login=0"><button type="button">Paciente</button></Link>
                                <Link to="/login=1"><button type="button">Psicólogo</button></Link>
                                <Link to="/login=2"><button type="button">Voluntário</button></Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Menu quando logado
                    <div className="nav-right-buttons">
                        <button
                            type="button"
                            className="nav-btn-login"
                            onClick={() => setDropdownOpen(prev => !prev)}
                        >
                            {user.nome}
                        </button>

                        <div className={`nav-login-drop-wrapper ${isDropdownOpen ? "show" : ""}`}>
                            <div className="nav-login-drop">
                                {user && (
                                    <Link
                                        to={`/${user.tipo.toLowerCase()}/perfil/${user.id}`}
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <button type="button">Meu Perfil</button>
                                    </Link>
                                )}

                                <Link
                                    to={`/${user.tipo}/perfil/${user.id}/configuracoes`}
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <button type="button">Configurações</button>
                                </Link>

                                {user.tipo === "psicologo" && (
                                    <Link
                                        to="/adicionar-artigos"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <button type="button">Adicionar Artigos</button>
                                    </Link>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleLogout();
                                        setDropdownOpen(false);
                                    }}
                                >
                                    Sair
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </nav>
        </>
    )
}