import { Link } from "react-router";
import '../../assets/styles/perfil.css';


export default function Notificacoes() {
    return (
        <>
            <div class="card-notif-container">
            <div class="notificacoes">
                <h1 class="notif-titulo">Notificações</h1>
                <div id="notifSide" class="card-notif-session">
                    <div>
                        Sessão do dia 25/10 <br/>começa ás 18:00
                    </div>
                    <div>
                        <a href="stream-terapia.html">
                            <button class="button-confirm" onclick="setTerapia(1)">Entrar</button>
                        </a>
                    </div>
                </div>
                <div id="notifSide" class="card-notif-session">
                    <div>
                        Sessão do dia 28/10 <br/>começa ás 18:00
                    </div>
                    <div>
                        <a href="stream-terapia.html">
                            <button class="button-confirm" onclick="setTerapia(2)">Entrar</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}


