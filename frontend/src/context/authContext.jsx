import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

// Contas de demonstração (temporárias) usadas apenas no frontend para navegar
const DEMO_USERS = {
    paciente: {
        login: "demo_paciente",
        senha: "demo123",
        userData: { id: "demo-paciente", nome: "Paciente Demo", login: "demo_paciente", tipo: "paciente" }
    },
    psicologo: {
        login: "demo_psicologo",
        senha: "demo123",
        userData: { id: "demo-psicologo", nome: "Psicólogo Demo", login: "demo_psicologo", tipo: "psicologo" }
    }
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Verificar se há usuário logado ao carregar
    useEffect(() => {
        async function loadUser() {
            const token = authService.getToken();
            const username = authService.getUsername();

            if (token && username) {
                try {
                    const userData = await authService.getUserData(username);
                    setUser(userData);
                } catch (err) {
                    console.error("Erro ao carregar usuário:", err);
                    authService.logout();
                }
            } else {
                // Se não há token, tentar restaurar usuário salvo no localStorage (útil para contas demo)
                try {
                    const stored = localStorage.getItem("user");
                    if (stored) {
                        const parsed = JSON.parse(stored);
                        setUser(parsed);
                    }
                } catch (err) {
                    console.warn("Erro ao restaurar usuário do localStorage:", err);
                }
            }
            if (!user && localStorage.getItem("user")) {
                const stored = JSON.parse(localStorage.getItem("user"));
                setUser(stored);
            }
            setLoading(false);
        }

        loadUser();
    }, []);

    // Login
    async function login(username, password) {
        setLoading(true);
        setError("");
        try {
            // Fazer login e obter token
            await authService.login(username, password);

            // Buscar dados completos do usuário
            const userData = await authService.getUserData(username);

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));

            return { success: true, user: userData };
        } catch (err) {
            const errorMessage = err.message || "Erro ao fazer login";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }

    // Cadastro de paciente
    async function registerPaciente(userData) {
        setLoading(true);
        setError("");
        try {
            const newUser = await authService.registerPaciente(userData);

            // Fazer login automaticamente após cadastro
            await login(userData.login, userData.senha);

            return { success: true, user: newUser };
        } catch (err) {
            const errorMessage = err.message || "Erro ao cadastrar";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }

    // Cadastro de psicólogo
    async function registerPsicologo(userData) {
        setLoading(true);
        setError("");
        try {
            const newUser = await authService.registerPsicologo(userData);

            // Fazer login automaticamente após cadastro
            await login(userData.login, userData.senha);

            return { success: true, user: newUser };
        } catch (err) {
            const errorMessage = err.message || "Erro ao cadastrar";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }

    // Logout
    function logout() {
        authService.logout();
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("demo");
    }

    // Login como conta demo (tenta logar no servidor, se falhar usa usuário local de demonstração)
    async function loginAsDemo(role) {
        setLoading(true);
        setError("");
        try {
            const demo = DEMO_USERS[role];
            if (!demo) throw new Error("Role inválido para demo");

            // Tentar autenticar no servidor com as credenciais demo (se existirem lá)
            try {
                await authService.login(demo.login, demo.senha);
                const userData = await authService.getUserData(demo.login);
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                return { success: true, user: userData, from: "server" };
            } catch (err) {
                // Se não for possível, usar o usuário demo local (sem token)
                const demoUser = { ...demo.userData };
                setUser(demoUser);
                localStorage.setItem("user", JSON.stringify(demoUser));
                localStorage.setItem("demo", "true");
                return { success: true, user: demoUser, from: "demo" };
            }
        } catch (err) {
            const errorMessage = err.message || "Erro ao logar como demo";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }

    // Atualizar dados do usuário
    function updateUser(newData) {
        const updatedUser = { ...user, ...newData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    const value = {
        user,
        loading,
        error,
        login,
        loginAsDemo,
        registerPaciente,
        registerPsicologo,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isPaciente: user?.tipo === "paciente",
        isPsicologo: user?.tipo === "psicologo"
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
}