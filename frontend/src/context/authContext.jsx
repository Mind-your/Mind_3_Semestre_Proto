import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

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