export default function AtualizacaoCredenciais() {
  return (
    <>
        <div className="container-input-2">
            <div className="input-e-span">
                <span className="login-titulo"><label>Nome do login</label></span>
                <input id="loginEdit" type="text" className="form-control" placeholder="Login"/>
            </div>
            <div className="input-e-span">
                <span className="login-titulo"><label>E-mail</label></span>
                <input id="emailEdit" type="text" className="form-control" placeholder="E-mail"/>
            </div>
            <div className="input-e-span">
                <span className="login-titulo"><label>Senha</label></span>
                <input id="senhaEdit" type="password" className="form-control" placeholder="Senha"/>    
            </div>
        </div>
    </>
  )
}
