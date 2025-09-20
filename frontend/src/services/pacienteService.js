const API_URL = "http://localhost:8080/pacientes";

export async function loginUser(login, senha) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, senha }),
    });

    if (!res.ok) {
        throw new Error("Login ou senha inválidos");
    }

    return res.json();
}


export async function registerUser(nome, email, senha) {
    const res = await fetch(`${API_URL}/cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
    });

    if (!res.ok) {
        throw new Error("Erro ao cadastrar");
    }

    return res.json();
}