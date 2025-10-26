import { Link } from "react-router";
import background from "../../assets/img/background_input.png";
//import '../../assets/styles/input_login.css';
import '../../assets/styles/input_cadastro.css';

export default function inputCadastro() {
    return (
        <>
            <section id="">
                <img className="background-cadastro" src={background} alt="Imagem inicial do site" />
                <div className="container-input-login">
                    <h1>Cadastro</h1>
                    <div className="inputs">
                        <div className="duo-input">
                            <div className="input">
                                <span className="login-titulo"><label>Nome</label></span>
                                <input id="Nome" type="text" className="" placeholder="" />
                            </div>
                            <div className="input">
                                <span className="login-titulo"><label>Data de Nascimento</label></span>
                                <input id="Dt_nascimento" type="date" className="" placeholder="" />
                            </div>
                        </div>
                        <div className="duo-input">
                            <div className="input">
                                <span className="login-titulo"><label>E-mail</label></span>
                                <input id="Email" type="email" className="" placeholder="" />
                            </div>
                            <div className="input">
                                <span className="login-titulo"><label>Localidade</label></span>
                                <input id="Localidade" type="text" className="" placeholder="" />
                            </div>
                        </div>
                        <div className="duo-input">
                            <div className="input">
                                <span className="login-titulo"><label>CPF</label></span>
                                <input id="Cpf" type="text" className="" placeholder="" />
                            </div>
                            <div className="input">
                                <span className="login-titulo"><label>Telefone</label></span>
                                <input id="Telefone" type="number" className="" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="container-cadastrar-entrar">
                        <div className="container-termos">
                            <input id="Checkbox" type="checkbox" className="checkbox" placeholder="" />
                            <span class="checkmark"></span>
                            <Link to="/termosCondicoes"><a className="link-cadastro">Termos e Condições</a></Link>
                        </div>
                        <Link to="/Home"><button type="button" className="button-confirm">Cadastra</button></Link>
                    </div>
                </div>
            </section>
        </>
    )
}
