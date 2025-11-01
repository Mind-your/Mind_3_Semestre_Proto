import { HiOutlineX } from "react-icons/hi";
import "../../assets/styles/pop-ups/deletar.css";

export default function Deletar({ open = false, close = () => {} }) {
  if (!open) return null;
  
  return (
    <>
      <div className="pop-up-backdrop" onClick={close}></div>
      <div className="pop-up-deletar">
          <button 
            className="btn-cancelar-pop-up-deletar" 
            onClick={close}>
            <HiOutlineX />
          </button>
          <h1>Deletar conta</h1>
          <span>Voce têm certeza de que quer deletar a sua conta. Isso resultará na exclusão de seus dados, visibilidade aos psicologos e qualquer informação adquirida pelo usuário durante a utilização da plaforma</span>
          <button id='btnADeletarPerfil' className="btn-deletar button-proceed">Confirmar</button>
      </div>
    </>
  )
}
