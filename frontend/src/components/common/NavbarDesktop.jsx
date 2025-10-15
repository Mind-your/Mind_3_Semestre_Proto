import { NavLink, Link, useParams } from 'react-router'
import { useState } from 'react'
import { HiOutlineUser, HiOutlineSearch } from "react-icons/hi";

export default function NavDesktop(){
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false)

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
                    {isLoggedIn ? (
                        <>
                            <NavLink to="/home">
                                <HiOutlineSearch 
                                    id="search-icon-btn"
                                    className="icon-ui"/>
                            </NavLink>
                            <NavLink to="/:tipo(paciente|psicologo)/perfil/:id">
                                <HiOutlineUser 
                                    id="user-icon-btn" 
                                    className="icon-ui"/>
                            </NavLink>
                        </>
                    ) : (
                        ""
                    )}
                </ul>

                {/* DropDown */}
                <div 
                    className="nav-right-buttons">
                    <button 
                        type="button" 
                        className="nav-btn-login"
                        onClick={() => setDropdownOpen(prev => !prev)}
                    >login</button>

                    <div className={`nav-login-drop-wrapper ${isDropdownOpen ? "show" : ""}`}>
                        <div className="nav-login-drop">
                            <Link to="/login"><button type="button">Paciente</button></Link>
                            <Link to="/login"><button type="button">Psicólogo</button></Link>
                            <Link to="/login"><button type="button">Voluntário</button></Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}