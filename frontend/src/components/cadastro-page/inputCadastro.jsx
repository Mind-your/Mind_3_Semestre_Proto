import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import background from "../../assets/img/background_input.png";
import "../../assets/styles/input_cadastro.css";
import OptionsCadastro from "./optionsCadastro";
import { useAuth } from "../../context/authContext";
import { RiArrowGoBackLine } from "react-icons/ri";


export default function InputCadastro() {
    const location = useLocation();
    const navigate = useNavigate();
    const { registerUser, loading, error } = useAuth();

    const [tipoUsuario, setTipoUsuario] = useState("paciente");

    const [form, setForm] = useState({
        nome: "",
        dataNascimento: "",
        email: "",
        localidade: "",
        telefone: "",
        genero: "",
        crp: "",
        especialidade: "",
        ra: "",
        token: "",
        senha: "",
        confirmarSenha: ""
    });

    useEffect(() => {
        const path = location.pathname;

        if (path === "/cadastro=0" || path === "/cadastro") {
            setTipoUsuario("paciente");
        } else if (path === "/cadastro=1") {
            setTipoUsuario("psicologo");
        } else if (path === "/cadastro=2") {
            setTipoUsuario("voluntario");
        }
    }, [location.pathname]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🧩 Validação manual
        if (!form.nome || !form.dataNascimento || !form.email || !form.localidade) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        if (form.senha !== form.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        if (tipoUsuario === "paciente" && (!form.telefone || !form.genero)) {
            alert("Preencha telefone e gênero!");
            return;
        }

        if (tipoUsuario === "psicologo" && (!form.crp || !form.especialidade)) {
            alert("Preencha CRP e especialidade!");
            return;
        }

        if (tipoUsuario === "voluntario" && (!form.ra || !form.token)) {
            alert("Preencha RA e token!");
            return;
        }

        const userData = {
            nome: form.nome,
            email: form.email,
            senha: form.senha,
            dtNascimento: form.dataNascimento,
            genero: form.genero,
            telefone: form.telefone,
            endereco: form.localidade,
            tipoUsuario: tipoUsuario, // 👈 adicionamos o tipo
        };

        if (tipoUsuario === "psicologo") {
            userData.crp = form.crp;
            userData.especialidade = form.especialidade;
        } else if (tipoUsuario === "voluntario") {
            userData.ra = form.ra;
            userData.token = form.token;
        }

        const result = await registerUser(userData);

        if (result?.success) {
            alert("Cadastro realizado com sucesso!");
            navigate("/login=0");
        } else {
            alert(result?.error || "Erro ao cadastrar. Tente novamente.");
        }


    };


    return (
        <section className="section-cadastro">
            <img
                className="background-cadastro"
                src={background}
                alt="Imagem de fundo da tela de cadastro"
            />
            <div className="container-input-login">
                <div className="container-icon-return-login">
                    <Link to="/login=0">
                        <button className="icon-btn icon-ui icon-return-login">
                            <RiArrowGoBackLine />
                        </button>
                    </Link>
                </div>

                <h1>Cadastro</h1>
                <OptionsCadastro />

                {/* ✅ Desativa a validação automática do navegador */}
                <form className="inputs" onSubmit={handleSubmit} noValidate>
                    <div className="duo-input">
                        <div className="input">
                            <span className="login-titulo"><label>Nome</label></span>
                            <input
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Seu nome completo"
                            />
                        </div>
                        <div className="input">
                            <span className="login-titulo"><label>Data de Nascimento</label></span>
                            <input
                                name="dataNascimento"
                                type="date"
                                value={form.dataNascimento}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="duo-input">
                        <div className="input">
                            <span className="login-titulo"><label>E-mail</label></span>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="exemplo@email.com"
                            />
                        </div>
                        <div className="input">
                            <span className="login-titulo"><label>Localidade</label></span>
                            <input
                                name="localidade"
                                type="text"
                                value={form.localidade}
                                onChange={handleChange}
                                placeholder="Cidade / Estado"
                            />
                        </div>
                    </div>

                    {/* ✅ Campos específicos */}
                    {tipoUsuario === "paciente" && (
                        <div className="duo-input">
                            <div className="input">
                                <span className="login-titulo"><label>Telefone</label></span>
                                <input
                                    name="telefone"
                                    type="text"
                                    value={form.telefone}
                                    onChange={handleChange}
                                    placeholder="11 94002-8922"
                                />
                            </div>
                            <div className="input">
                                <span className="login-titulo"><label>Gênero</label></span>
                                <input
                                    name="genero"
                                    type="text"
                                    value={form.genero}
                                    onChange={handleChange}
                                    placeholder="Masculino / Feminino"
                                />
                            </div>
                        </div>
                    )}

                    {tipoUsuario === "psicologo" && (
                        <div className="duo-input">
                            <div className="input">
                                <span className="login-titulo"><label>CRP</label></span>
                                <input
                                    name="crp"
                                    type="text"
                                    value={form.crp}
                                    onChange={handleChange}
                                    placeholder="06/12345"
                                />
                            </div>
                            <div className="input">
                                <span className="login-titulo"><label>Especialidade</label></span>
                                <input
                                    name="especialidade"
                                    type="text"
                                    value={form.especialidade}
                                    onChange={handleChange}
                                    placeholder="Terapia Cognitivo-Comportamental"
                                />
                            </div>
                        </div>
                    )}

                    {tipoUsuario === "voluntario" && (
                        <div className="duo-input">
                            <div className="input">
                                <span className="login-titulo"><label>R.A</label></span>
                                <input
                                    name="ra"
                                    type="text"
                                    value={form.ra}
                                    onChange={handleChange}
                                    placeholder="123456"
                                />
                            </div>
                            <div className="input">
                                <span className="login-titulo"><label>Token</label></span>
                                <input
                                    name="token"
                                    type="text"
                                    value={form.token}
                                    onChange={handleChange}
                                    placeholder="Token de autorização"
                                />
                            </div>
                        </div>
                    )}

                    <div className="duo-input">
                        <div className="input">
                            <span className="login-titulo"><label>Senha</label></span>
                            <input
                                name="senha"
                                type="password"
                                value={form.senha}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <span className="login-titulo"><label>Confirmar Senha</label></span>
                            <input
                                name="confirmarSenha"
                                type="password"
                                value={form.confirmarSenha}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="container-cadastrar-entrar">
                        <div className="container-termos">
                            <input id="Checkbox" type="checkbox" className="checkbox" required />
                            <label htmlFor="Checkbox">
                                Li e aceito os{" "}
                                <Link to="/termosCondicoes" className="link-cadastro">
                                    Termos e Condições
                                </Link>
                            </label>
                        </div>

                        <button type="submit" className="button-confirm" disabled={loading}>
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </div>

                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                </form>
            </div>
        </section>
    );
}
