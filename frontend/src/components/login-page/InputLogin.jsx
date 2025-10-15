import { Link } from "react-router";
import background from "../../assets/img/background_input.png";
import '../../assets/styles/input_login.css';

export default function InputLogin() {
    return (
        <>
            <section className="login-inputs">
                <img className="background" src={background} alt="Imagem inicial do site" />
                <div className="container-input-login">
                    <h1>Entrar</h1>
                    <div className="inputs">
                        <span className="login-titulo"><label htmlForfor="email">Login</label></span>
                        <input id="login0" type="text" className="" placeholder="E-mail ou nome do usuário"/>
                        <span className="login-titulo"><label>Senha</label></span>
                        <input id="password0" type="password" className="" placeholder="Senha"/>
                        <div className="container-cadastrar-entrar">
                            <Link to="/cadastro"><a className="link-cadastro">Não tenho cadastro</a></Link>
                            <Link to="/Home"><button type="button" className="button-confirm">Entrar</button></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
