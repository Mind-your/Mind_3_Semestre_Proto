import Section from '../components/perfil-page/section';
import { useAuth } from '../context/authContext';
import { useParams, Navigate } from 'react-router';

export default function Perfil() {
    const { user, loading } = useAuth();
    const { id, tipo } = useParams();

    if (loading) {
        return <div>Carregando...</div>;
    }

    // Verificar se o usuário está tentando acessar seu próprio perfil
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Verificar se o ID e tipo correspondem ao usuário logado
    if (user.id !== id || user.tipo !== tipo) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>Acesso Negado</h2>
                <p>Você só pode acessar seu próprio perfil.</p>
                <a href={`/${user.tipo}/perfil/${user.id}`}>
                    Ir para meu perfil
                </a>
            </div>
        );
    }

    return (
        <>
            <Section />
        </>
    );
}