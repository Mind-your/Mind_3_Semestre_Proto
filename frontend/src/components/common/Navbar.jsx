import '../../assets/styles/navbar-footer.css'
import logotipo from "../../assets/img/logotipo.svg"

import { NavLink, Link } from 'react-router'
import { useState, useEffect } from 'react'
import { HiOutlineUser, HiOutlineSearch } from "react-icons/hi";

export default function Navbar() {
    const [resize, setResize] = useState(true);

    useEffect(() => {
        const checkMedia = () => {
           setResize(window.matchMedia("(min-width: 800px)").matches)
        }
        checkMedia()
        window.addEventListener('resize', checkMedia);

    }, [])

    return (
        <>
            <header id="masterNav">
                <NavLink to="/">
                    <img className="logotipo" src={logotipo} alt="logotipo da plataforma Mind" />
                </NavLink>
                {resize ? <NavDesktop /> : <NavMobile />}
            </header>
        </>
    )
}

//  Links do Navbar versão desktop

function NavDesktop(){
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false)

    return (
        <>
            <nav id="nav-desktop">
                <ul>
                    <NavLink id="linkSobreNos" to="/sobre-nos">
                        <li>Sobre nós</li>
                    </NavLink>
                    <NavLink id="linkPlanos" to="#planos">
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

function NavMobile(){
    return (
        <>
        
        </>
    )
}

