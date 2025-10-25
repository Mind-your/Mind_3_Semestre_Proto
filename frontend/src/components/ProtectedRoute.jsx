import { Navigate } from "react-router";
import { useAuth } from "../context/authContext";

// Componente para proteger rotas que precisam de autenticação
export default function ProtectedRoute({ children, requirePsicologo = false }) {
    const { isAuthenticated, isPsicologo, loading } = useAuth();

    // Aguardar carregamento
    if (loading) {
        return (
            <div className="loading-container">
                <p>Carregando...</p>
            </div>
        );
    }

    // Se não está autenticado, redirecionar para login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Se a rota requer psicólogo mas o usuário não é psicólogo
    if (requirePsicologo && !isPsicologo) {
        return <Navigate to="/home" replace />;
    }

    return children;
}