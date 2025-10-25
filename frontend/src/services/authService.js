const API_URL = "http://localhost:8080";

// Serviço de autenticação com JWT
export const authService = {
    // Login com JWT
    async login(username, password) {
        const res = await fetch(`${API_URL}/api/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            throw new Error("Login ou senha inválidos");
        }

        const data = await res.json();
        
        // Salvar token e username no localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        
        return data;
    },

    // Buscar dados completos do usuário (paciente ou psicólogo)
    async getUserData(username) {
        const token = this.getToken();
        
        // Tentar buscar como paciente
        try {
            const resPaciente = await fetch(`${API_URL}/pacientes/login/${username}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (resPaciente.ok) {
                const paciente = await resPaciente.json();
                return { ...paciente, tipo: "paciente" };
            }
        } catch (err) {
            console.log("Não é paciente, tentando psicólogo...");
        }

        // Tentar buscar como psicólogo
        try {
            const resPsicologo = await fetch(`${API_URL}/psicologos/login/${username}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (resPsicologo.ok) {
                const psicologo = await resPsicologo.json();
                return { ...psicologo, tipo: "psicologo" };
            }
        } catch (err) {
            console.log("Não é psicólogo");
        }

        throw new Error("Usuário não encontrado");
    },

    // Cadastrar paciente
    async registerPaciente(userData) {
        const res = await fetch(`${API_URL}/pacientes/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            throw new Error("Erro ao cadastrar paciente");
        }

        return res.json();
    },

    // Cadastrar psicólogo
    async registerPsicologo(userData) {
        const res = await fetch(`${API_URL}/psicologos/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            throw new Error("Erro ao cadastrar psicólogo");
        }

        return res.json();
    },

    // Logout
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("user");
    },

    // Verificar se está autenticado
    isAuthenticated() {
        return !!this.getToken();
    },

    // Obter token
    getToken() {
        return localStorage.getItem("token");
    },

    // Obter username
    getUsername() {
        return localStorage.getItem("username");
    },

    // Fazer requisição autenticada
    async authenticatedFetch(url, options = {}) {
        const token = this.getToken();
        
        if (!token) {
            throw new Error("Não autenticado");
        }

        const headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        const res = await fetch(url, { ...options, headers });

        if (res.status === 401) {
            this.logout();
            throw new Error("Sessão expirada. Faça login novamente.");
        }

        return res;
    }
};