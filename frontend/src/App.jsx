import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider } from 'react-router'

import MainLayout from './layout/MainLayout'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Artigos from './pages/Artigos'
import Login from './pages/Login'
import Perfil from './pages/Perfil'
import SobreNos from './pages/SobreNos'
import AddArtigos from './pages/AddArtigos'
import Configuracoes from './pages/Configuracoes'
import TermosCondicoes from './pages/TermosCondicoes'
import VideoChamada from './pages/VideoChamada'
import Cadastro from './pages/Cadastro'

export default function App() {

  const routes = createBrowserRouter(
    createRoutesFromElements([
      <Route>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<LandingPage />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/artigos' element={<Artigos />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/login=0'element={<Login />}/>
          <Route path='/login=1'element={<Login />}/>
          <Route path='/login=2'element={<Login />}/>
          <Route path='/:tipo(paciente|psicologo)/perfil/:id' element={<Perfil />}/>
          <Route path='/sobre-nos' element={<SobreNos />}/>
          <Route path='adicionar-artigos' element={<AddArtigos />}/>
          <Route path='/:tipo(paciente|psicologo)/perfil/:id/configuracoes' element={<Configuracoes />}/>
          <Route path='/termos-e-condicoes' element={<TermosCondicoes />}/>
          <Route path='/:tipo(paciente|psicologo)/perfil/:id/video-chamada' element={<VideoChamada />}/>
          <Route path='/cadastro' element={<Cadastro />}/>
        </Route>
      </Route>
    ])
  )

  return (
    <RouterProvider router={routes}/>
  )
}
