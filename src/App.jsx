import './css/App.css';
import React from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Login from './routes/login/Login.jsx'
import Footer from './components/Footer';
import Recovery from './routes/login/Recovery';
import Error404 from './routes/404_error'
import TemplateEstudiante from './components/estudiante/Estudiante_Template'
import TemplateLider from './components/lider/Lider_Template'
import TemplateAdministrativo from './components/administrativo/Administrativo_Template'
import TemplateDocente from './components/docente/Docente_Template'
import ContextProvider from './context/UserContext';
import Template from './components/TemplateGeneral';
import PerfilEstudiante from './components/estudiante/Estudiante_Perfil'
import ListarIdeas from './components/lider/Listar_ideas';
import VistaIdea from './components/lider/Lider_VerIdea';
import Sidebar from './components/estudiante/Estudiante_Navbar'
import Tabla from './components/estudiante/Tabla';
import EditarPerfilEstudiante from './components/estudiante/Estudiante_Perfil_Editar';


const Enrutado = () => {
  /** *
   * Todo del sistema de enrutado del sitio Web
   * Notación en usuarios: Tipo/Sección
   * Ejemplo: Estudiante/Perfil
   * Ejemplo: LiderUE/Planes/${id}
   * Nota: Dentro de cada template de usuario valida el tipo de usuario, para que no vean
   * funcionalidades que no les corresponden.
  */
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Template></Template>}>
          <Route path='/' element={<Home></Home>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/forgetPassword' element={<Recovery></Recovery>} />
          <Route element={<TemplateEstudiante></TemplateEstudiante>}>
            <Route path='/Estudiante/Perfil' element={<PerfilEstudiante></PerfilEstudiante>} />
            <Route path='/Estudiante/Test' element={<Tabla></Tabla>} />
            <Route path='/Estudiante/Perfil/Editar' element={<EditarPerfilEstudiante></EditarPerfilEstudiante>} />
          </Route>
          <Route element={<TemplateLider></TemplateLider>}>
            <Route path='/Lider/Ideas' element={<ListarIdeas></ListarIdeas>}></Route>
            <Route path='/Lider/VistaIdea' element={<VistaIdea></VistaIdea>}/>
          </Route>
          <Route element={<TemplateAdministrativo></TemplateAdministrativo>}>
            <Route path='/Administrativo/Perfil'></Route>
          </Route>
          <Route element={<TemplateDocente></TemplateDocente>}>
            <Route path='/Docente/Perfil'></Route>
          </Route>
        </Route>
        <Route path='/*' element={<Error404></Error404>} />
      </Routes>
    </BrowserRouter>
  );

}

export default function App() {
  return <><ContextProvider><Enrutado></Enrutado></ContextProvider></>;
}

