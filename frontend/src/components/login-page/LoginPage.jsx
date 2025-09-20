import { useState } from "react";
import { useNavigate, Link } from "react-router";
import background from "../../assets/img/background_input.png";
import "../../assets/styles/input_login.css";
import { loginUser } from "../../services/pacienteService";

export default function LoginPage() {
  const [form, setForm] = useState({ login: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(form.login, form.senha);
      console.log("Login bem-sucedido:", data);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <img className="background" src={background} alt="Imagem inicial do site" />
      <div className="container-input-login">
        <h1>Entrar</h1>
        <form className="inputs" onSubmit={handleSubmit}>
          <span className="login-titulo">
            <label htmlFor="login0">Login</label>
          </span>
          <input
            id="login0"
            type="text"
            placeholder="E-mail ou nome do usuário"
            value={form.login}
            onChange={(e) => setForm({ ...form, login: e.target.value })}
            required
          />

          <span className="login-titulo">
            <label htmlFor="password0">Senha</label>
          </span>
          <input
            id="password0"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            required
          />

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <div className="container-cadastrar-entrar">
            <Link to="/cadastro" className="link-cadastro">
              Não tenho cadastro
            </Link>
            <button type="submit" className="button-confirm" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
