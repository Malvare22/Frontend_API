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
import ListarIdeasEstudiante from './components/estudiante/Estudiante_ListarIdeas';
import ListarPlanesEstudiante from './components/estudiante/Estudiante_ListarPlanes';
import ListarIdeasEstudiantetest from './components/estudiante/Estudiante_Card_Idea';
import LiderVistaIdea from './components/lider/Lider_VerIdea';
import LiderListarIdeas from './components/lider/Listar_ideas';
import EstudianteAgregarIdea from './components/estudiante/Estudiante_Agregar_Idea';
import EstudianteCapacitacionIdea from './components/estudiante/Estudiante_Capacitacion_Idea';
import EstudianteCapacitacionPlan from './components/estudiante/Estudiante_Capacitacion_Plan';
import LiderListarPlanes from './components/lider/Listar_planes';
import Sidebar from './components/estudiante/Estudiante_Navbar'
import EditarPerfilEstudiante from './components/estudiante/Estudiante_Perfil_Editar';
import EstudianteEvaluacion from './components/estudiante/Estudiante_Evaluacion';
import EntidadesFinanciadoras from './components/estudiante/Estudiante_Entidades_Financiadoras';
import Tabla from './components/estudiante/Tabla';

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
            <Route path='/Estudiante/E_Evaluacion' element={<EstudianteEvaluacion></EstudianteEvaluacion>} />
            <Route path='/Estudiante/ListarIdeas' element={<ListarIdeasEstudiante></ListarIdeasEstudiante>} />
            <Route path='/Estudiante/ListarPlanes' element={<ListarPlanesEstudiante></ListarPlanesEstudiante>}/>
            <Route path='/Estudiante/ListarIdeas/test' element={<ListarIdeasEstudiantetest></ListarIdeasEstudiantetest>} />
            <Route path='/Estudiante/Perfil/Editar' element={<EditarPerfilEstudiante></EditarPerfilEstudiante>} />
            <Route path='/Estudiante/EntidadesFinanciadoras' element={<EntidadesFinanciadoras></EntidadesFinanciadoras>}/>
            <Route path='/Estudiante/AgregarIdea' element={<EstudianteAgregarIdea></EstudianteAgregarIdea>}/>
            <Route path='/Estudiante/CapacitacionIdea' element={<EstudianteCapacitacionIdea></EstudianteCapacitacionIdea>}/>
            <Route path='/Estudiante/CapacitacionPlan' element={<EstudianteCapacitacionPlan></EstudianteCapacitacionPlan>}/>
          </Route>
          <Route element={<TemplateLider></TemplateLider>}>
            <Route path='/Lider/Ideas' element={<LiderListarIdeas></LiderListarIdeas>}></Route>
            <Route path='/Lider/Planes' element={<LiderListarPlanes></LiderListarPlanes>}></Route>
            <Route path='/Lider/VistaIdea' element={<LiderVistaIdea></LiderVistaIdea>}/>
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

