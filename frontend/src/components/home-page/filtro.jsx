import '../../assets/styles/home.css';

import { HiChevronRight } from "react-icons/hi";

export default function Filtro({ selectedSpecialities, setSelectedSpecialities }) {
  function handleCheckboxChange(e) {
    const { checked, dataset } = e.target;
    const speciality = dataset.speciality;
    if (checked) {
      setSelectedSpecialities([...selectedSpecialities, speciality]);
    } else {
      setSelectedSpecialities(selectedSpecialities.filter(s => s !== speciality));
    }
  }

  function AbrirFiltro() {
    const filtro = document.getElementById("filtro-checkbox");
    const seta = document.getElementById("seta-checkbox");
    filtro.classList.toggle("show");
    seta.style.transform = filtro.classList.contains("show")
      ? "rotate(90deg)"
      : "rotate(0deg)";
  }

  return (
    <div className="filtro">
      <h1>Filtragem</h1>
      <button type="button" className="button-buscar" onClick={AbrirFiltro}>
        Filtro{" "}
        <HiChevronRight className="seta-filtro" id="seta-checkbox"/>
      </button>
      <div className="checkbox" id="filtro-checkbox">
        <div className="checkbox-input">
          <input
            type="checkbox"
            data-speciality="Ansiedade"
            id="checkbox-1"
            onChange={handleCheckboxChange}
            checked={selectedSpecialities.includes("Ansiedade")}
          />
          <label className="titulo-checkbox" htmlFor="checkbox-1">
            Ansiedade
          </label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            data-speciality="Casais"
            id="checkbox-2"
            onChange={handleCheckboxChange}
            checked={selectedSpecialities.includes("Casais")}
          />
          <label className="titulo-checkbox" htmlFor="checkbox-2">
            Casais
          </label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            data-speciality="Conflitos Familiares"
            id="checkbox-3"
            onChange={handleCheckboxChange}
            checked={selectedSpecialities.includes("Conflitos Familiares")}
          />
          <label className="titulo-checkbox" htmlFor="checkbox-3">
            Conflitos Familiares
          </label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            data-speciality="Insonia"
            id="checkbox-4"
            onChange={handleCheckboxChange}
            checked={selectedSpecialities.includes("Insonia")}
          />
          <label className="titulo-checkbox" htmlFor="checkbox-4">
            Insonia
          </label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            data-speciality="Dependencia Química"
            id="checkbox-5"
            onChange={handleCheckboxChange}
            checked={selectedSpecialities.includes("Dependencia Química")}
          />
          <label className="titulo-checkbox" htmlFor="checkbox-5">
            Dependencia Química
          </label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            data-speciality="Burnout"
            id="checkbox-6"
            onChange={handleCheckboxChange}
            checked={selectedSpecialities.includes("Burnout")}
          />
          <label className="titulo-checkbox" htmlFor="checkbox-6">
            Burnout
          </label>
        </div>
      </div>
    </div>
  );
}
