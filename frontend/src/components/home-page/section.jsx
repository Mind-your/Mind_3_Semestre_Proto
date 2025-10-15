import { Link } from "react-router";
import { useState } from "react";
import fotoPsi from '../../assets/img/perfil-default.png'
import '../../assets/styles/home.css';
import Visualizacao from "./visualizacao";
import Filtro from "./filtro";
import FiltroLocal from "./filtro-local";
import CardCol from "./card-col";
import CardRow from "./card-row";
import { FaSearch } from "react-icons/fa";

export default function Section() {
    const [selectedSpecialities, setSelectedSpecialities] = useState([]);
    const [selectedLocals, setSelectedLocals] = useState([]);
    const [visualizacao, setVisualizacao] = useState("col");

    const perfils = [
        {
            nome: "Robson",
            local: "Santo andre",
            tags: ["Ansiedade", "Conflitos Familiares"]
        },
        {
            nome: "Matheus",
            local: "SBC - SP",
            tags: ["Casais", "Socialidade"]
        },
        {
            nome: "Alice",
            local: "Diadema",
            tags: ["Ansiedade", "Conflitos Familiares"]
        },
        {
            nome: "Bruna",
            local: "São Paulo",
            tags: ["Burnout", "Insonia"]
        },
        {
            nome: "Carlos",
            local: "Campinas",
            tags: ["Dependencia Química", "Ansiedade"]
        }
    ];

    const locais = [...new Set(perfils.map(perfil => perfil.local))];

    // Filtro combinado por especialidade e local
    const perfisFiltrados = perfils.filter(perfil => {
        const matchEspecialidade = selectedSpecialities.length === 0
            || perfil.tags.some(tag => selectedSpecialities.includes(tag));
        const matchLocal = selectedLocals.length === 0
            || selectedLocals.includes(perfil.local);
        return matchEspecialidade && matchLocal;
    });
    // Pesquisa

    

    return (

        <>

            <section className="section-home">
                <div class="search-boxes">
                    <input type="text" required id="search-input" placeholder="Pesquisar" />
                    <FaSearch class="button-search" />
                </div>
                <div className="body-section">
                    
                    <div className="visualizacao-filtros">
                        
                        <div className="filtros">
                        
                            <Filtro
                                selectedSpecialities={selectedSpecialities}
                                setSelectedSpecialities={setSelectedSpecialities}
                            /><br />
                            <FiltroLocal
                                selectedLocals={selectedLocals}
                                setSelectedLocals={setSelectedLocals}
                                locais={locais}
                            /><br />
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
                                ? <CardCol perfils={perfisFiltrados} />
                                : <CardRow perfils={perfisFiltrados} />
                        )}
                        
                    </div>
                </div>
                <div className="container-botao-mais">
                    <button className="button-confirm button-mais">Mais</button>
                </div>
                
            </section>
        </>
    )
}