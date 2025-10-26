import { Link } from "react-router";
import { useState } from "react";
import fotoPsi from '../../assets/img/perfil-default.png';
import '../../assets/styles/home.css';
import Visualizacao from "./visualizacao";
import Filtro from "./filtro";
import FiltroLocal from "./filtro-local";
import CardCol from "./card-col";
import CardRow from "./card-row";
import VerPsi from "../pop-ups/VerPsi";
import { HiChevronRight } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";

import { usePsicologoss } from '../../context/psicologos.jsx';

export default function Section() {
    const [selectedSpecialities, setSelectedSpecialities] = useState([]);
    const [selectedLocals, setSelectedLocals] = useState([]);
    const [visualizacao, setVisualizacao] = useState("col");
    const [openPsi, setOpenPsi] = useState(false);
    const [selectedPerfil, setSelectedPerfil] = useState(null);

    const { psicologos } = usePsicologoss();

    const perfils = (psicologos || []).map(p => ({
        id: p.id,
        nome: p.nome,
        idade: p.idade,
        local: p.local,
        tags: p.tags || [],
        foto: p.foto || null,
        horarios: p.horarios || {}
    }));

    const locais = [...new Set(perfils.map(perfil => perfil.local))];

    const perfisFiltrados = perfils.filter(perfil => {
        const matchEspecialidade = selectedSpecialities.length === 0
            || perfil.tags.some(tag => selectedSpecialities.includes(tag));
        const matchLocal = selectedLocals.length === 0
            || selectedLocals.includes(perfil.local);
        return matchEspecialidade && matchLocal;
    });

    return (
        <>
            <section className="section-home">
                <div className="search-boxes">
                    <input type="text" required id="search-input" placeholder="Pesquisar" />
                    <FaSearch className="button-search" />
                </div>
                <div className="body-section">
                    <div className="visualizacao-filtros">
                        <div className="filtros">
                            <Filtro
                                selectedSpecialities={selectedSpecialities}
                                setSelectedSpecialities={setSelectedSpecialities}
                            />
                            <br />
                            <FiltroLocal
                                selectedLocals={selectedLocals}
                                setSelectedLocals={setSelectedLocals}
                                locais={locais}
                            />
                            <br />
                            <Visualizacao
                                visualizacao={visualizacao}
                                setVisualizacao={setVisualizacao}
                            />
                        </div>
                    </div>

                    <div className="cards-home">
                        {perfisFiltrados.length === 0 ? (
                            <div style={{ margin: '2rem', textAlign: 'center' }}>Nenhum resultado encontrado.</div>
                        ) : (
                            visualizacao === "col"
                                ? <CardCol perfils={perfisFiltrados} setSelectedPerfil={setSelectedPerfil} setOpenPsi={setOpenPsi} />
                                : <CardRow perfils={perfisFiltrados} setSelectedPerfil={setSelectedPerfil} setOpenPsi={setOpenPsi} />
                        )}
                    </div>

                    {openPsi && selectedPerfil && (
                        <VerPsi
                            open={openPsi}
                            close={() => setOpenPsi(false)}
                            perfil={selectedPerfil}
                        />
                    )}

                </div>
                <div className="container-botao-mais">
                    <button className="button-mais">Mais
                        <HiChevronRight className="seta-filtro" id="seta-local-checkbox" />
                    </button>
                </div>
            </section>
        </>
    )
}