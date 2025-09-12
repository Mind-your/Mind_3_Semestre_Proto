import '../../assets/styles/hero-apresentacao.css';

import logomarca from '../../assets/img/logomarca.svg'
import logo from '../../assets/img/logo.svg'
import bg from "../../assets/img/Wallpaper01.jpg"

export default function Hero() {
  return (
    <>
        <main>
          <img className="bg" src={bg} alt="Imagem inicial do site" />

          <div className="heading-hero">
            <img src={logo} alt="logo do site" />
            <div className="heading-1">
              <img src={logomarca} alt="logomarca ou nome do sistema mind estilizado" />
              <h1>... your mind</h1>
            </div>
          </div>

          <p>A plataforma que tem cuidado com a sua saúde mental diária</p>
          <a href="#planos">
            <button className="button-confirm" >Ver planos</button>
          </a>
        </main>
    </>
  )
}
