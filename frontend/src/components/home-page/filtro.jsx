import '../../assets/styles/home.css';
import { useEffect } from "react";

export default function Filtro() {
  useEffect(() => {
    const checkboxes = document.querySelectorAll(".checkbox input");
    const cards = document.querySelectorAll(".card-psi");
    const noResultsCard = document.getElementById("no-results-card");

    function filtrarCards() {
      const especialidadesSelecionadas = Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) =>
          checkbox.getAttribute("data-speciality").toLowerCase()
        );

      if (especialidadesSelecionadas.length === 0) {
        cards.forEach((card) => (card.style.display = "block"));
        if (noResultsCard) noResultsCard.style.display = "none";
      } else {
        let algumCardVisivel = false;
        cards.forEach((card) => {
          const especialidadesCard = Array.from(
            card.querySelectorAll(".hm-psi-stats")
          ).map((tag) => tag.getAttribute("data-speciality").toLowerCase());

          const deveAparecer = especialidadesSelecionadas.some((especialidade) =>
            especialidadesCard.includes(especialidade)
          );

          if (deveAparecer) {
            card.style.display = "block";
            algumCardVisivel = true;
          } else {
            card.style.display = "none";
          }
        });

        if (noResultsCard) {
          noResultsCard.style.display = algumCardVisivel ? "none" : "block";
        }
      }
    }

    checkboxes.forEach((checkbox) =>
      checkbox.addEventListener("change", filtrarCards)
    );

    filtrarCards();

    return () => {
      checkboxes.forEach((checkbox) =>
        checkbox.removeEventListener("change", filtrarCards)
      );
    };
  }, []);

  function AbrirFiltro() {
    const filtro = document.getElementById("filtro-checkbox");
    const seta = document.getElementById("seta-checkbox");
    filtro.classList.toggle("show"); // ✅ corrigido
    seta.style.transform = filtro.classList.contains("show")
      ? "rotate(-90deg)"
      : "rotate(0deg)";
  }

  return (
    <div className="filtro">
      <button type="button" className="hm-btn-buscar" onClick={AbrirFiltro}>
        Filtro{" "}
        <img
          src="../img/icons/arrow_down.svg"
          className="seta-filtro"
          alt=""
          id="seta-checkbox"
        />
      </button>
      <div className="checkbox" id="filtro-checkbox">
        <div className="checkbox-input">
          <input type="checkbox" data-speciality="Ansiedade" id="checkbox-1" />
          <label className="titulo-checkbox" htmlFor="checkbox-1">
            Ansiedade
          </label>
        </div>
        <div className="checkbox-input">
          <input type="checkbox" data-speciality="Casais" id="checkbox-2" />
          <label className="titulo-checkbox" htmlFor="checkbox-2">
            Casais
          </label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            data-speciality="Conflitos Familiares"
            id="checkbox-3"
          />
          <label className="titulo-checkbox" htmlFor="checkbox-3">
            Conflitos Familiares
          </label>
        </div>
        <div className="checkbox-input">
          <input type="checkbox" data-speciality="Insonia" id="checkbox-4" />
          <label className="titulo-checkbox" htmlFor="checkbox-4">
            Insonia
          </label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            data-speciality="Dependencia Química"
            id="checkbox-5"
          />
          <label className="titulo-checkbox" htmlFor="checkbox-5">
            Dependencia Química
          </label>
        </div>
        <div className="checkbox-input">
          <input type="checkbox" data-speciality="Burnout" id="checkbox-6" />
          <label className="titulo-checkbox" htmlFor="checkbox-6">
            Burnout
          </label>
        </div>
      </div>
    </div>
  );
}
