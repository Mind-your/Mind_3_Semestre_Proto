import { useParams, Navigate } from "react-router";
import { useAuth } from "../context/authContext";
import SectionPaciente from "../components/perfil-page/sectionPaciente";
import SectionPsicologo from "../components/perfil-page/sectionPsicologo";

export default function Perfil() {
  const { user, loading, isAuthenticated } = useAuth();
  const { id, tipo } = useParams();

  // Enquanto carrega, mostra feedback
  if (loading) {
    return (
      <div style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  // Se não estiver logado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se o tipo da URL não for válido, redireciona para erro
  if (tipo !== "paciente" && tipo !== "psicologo") {
    return <Navigate to="*" />;
  }

  // Se o ID/tipo da URL não combinarem com o usuário logado
  if (user?.id !== id || user?.tipo !== tipo) {
    return <Navigate to={`/${user.tipo}/perfil/${user.id}`} replace />;
  }

  // Renderiza de acordo com o tipo do usuário
  return (
    <>
      {user.tipo.toLowerCase() === "paciente" ? (
        <SectionPaciente id={user.id} />
      ) : (
        <SectionPsicologo id={user.id} />
      )}
    </>
  );
}
