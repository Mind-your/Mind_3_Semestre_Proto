import '../../assets/styles/home.css';
import { HiChevronRight } from "react-icons/hi";

export default function FiltroLocal({ selectedLocals, setSelectedLocals, locais }) {
  function handleCheckboxChange(e) {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedLocals([...selectedLocals, value]);
    } else {
      setSelectedLocals(selectedLocals.filter(l => l !== value));
    }
  }

  function AbrirFiltro() {
    const filtro = document.getElementById("filtro-local-checkbox");
    const seta = document.getElementById("seta-local-checkbox");
    const button = document.getElementsByClassName("button-buscar");
    filtro.classList.toggle("show");
    seta.style.transform = filtro.classList.contains("show")
      ? "rotate(90deg)"
      : "rotate(0deg)";
    button.style.borderRadius = "0px 0px 80px 8px";
  }

  return (
    <div className="filtro">
      <button type="button" className="button-buscar" onClick={AbrirFiltro}>
        Local
        <HiChevronRight className="seta-filtro" id="seta-local-checkbox"/>
      </button>
      <div className="checkbox" id="filtro-local-checkbox">
        {locais.map((local, idx) => (
          <div className="checkbox-input" key={local}>
            <input
              type="checkbox"
              value={local}
              id={`checkbox-local-${idx}`}
              onChange={handleCheckboxChange}
              checked={selectedLocals.includes(local)}
            />
            <label className="titulo-checkbox" htmlFor={`checkbox-local-${idx}`}>
              {local}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
