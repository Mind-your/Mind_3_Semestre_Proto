import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router';

import "../src/assets/styles/main.css";
import "../src/assets/styles/ui/buttons.css";
import "../src/assets/styles//ui/icons.css";

import MainLayout from './layout/MainLayout';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Artigos from './pages/Artigos';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import SobreNos from './pages/SobreNos';
import AddArtigos from './pages/AddArtigos';
import Configuracoes from './pages/Configuracoes';
import TermosCondicoes from './pages/TermosCondicoes';
import VideoChamada from './pages/VideoChamada';
import Cadastro from './pages/Cadastro';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';

export default function App() {

  const routes = createBrowserRouter(
    createRoutesFromElements([
      <Route path='/' element={<MainLayout />} errorElement={<ErrorPage />}>
        {/* Rotas públicas */}
        <Route index element={<LandingPage />} />
        <Route path='home' element={<Home />} />
        <Route path='artigos' element={<Artigos />} />
        <Route path='sobre-nos' element={<SobreNos />} />
        <Route path='termos-e-condicoes' element={<TermosCondicoes />} />
        
        {/* Rotas de autenticação */}
        <Route path='login' element={<Login />} />
        <Route path='login=0' element={<Login />} />
        <Route path='login=1' element={<Login />} />
        <Route path='login=2' element={<Login />} />
        <Route path='cadastro' element={<Cadastro />} />
        
        {/* Rotas protegidas - QUALQUER tipo de usuário */}
        <Route 
          path=':tipo/perfil/:id' 
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } 
        />
        <Route 
          path=':tipo/perfil/:id/configuracoes' 
          element={
            <ProtectedRoute>
              <Configuracoes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path=':tipo/perfil/:id/video-chamada' 
          element={
            <ProtectedRoute>
              <VideoChamada />
            </ProtectedRoute>
          } 
        />
        
        {/* Rota protegida APENAS para psicólogos */}
        <Route 
          path='adicionar-artigos' 
          element={
            <ProtectedRoute requirePsicologo={true}>
              <AddArtigos />
            </ProtectedRoute>
          } 
        />

        {/* Rota 404 */}
        <Route path='*' element={<ErrorPage />} />
      </Route>
    ])
  );

  return (
    <RouterProvider router={routes} />
  );
}