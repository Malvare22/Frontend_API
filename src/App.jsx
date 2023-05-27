import './css/App.css';
import React from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Route, Routes, BrowserRouter, createRoutesFromElements } from 'react-router-dom'
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
import ListarIdeasEstudiante from './components/estudiante/Estudiante_ListarIdeas';
import ListarPlanesEstudiante from './components/estudiante/Estudiante_ListarPlanes';
import ListarIdeasEstudiantetest from './components/estudiante/Estudiante_Card_Idea';
import VistaIdea from './components/lider/Lider_VerIdea';
import Listar_Ideas from './components/lider/Listar_ideas';
import Sidebar from './components/estudiante/Estudiante_Navbar'
import EditarPerfilEstudiante from './components/estudiante/Estudiante_Perfil_Editar';
import EstudianteEvaluacion from './components/estudiante/Estudiante_Evaluacion';
import Tabla from './components/estudiante/Tabla';
import PerfilLider from './components/lider/Lider_Perfil';
import EditarPerfilLider from './components/lider/Lider_Perfil_Editar';
import LiderVerPerfilEstudiante from './components/lider/Lider_Ver_Perfil_Estudiante';
import LiderEditarPerfilEstudiante from './components/lider/Lider_Editar_Perfil_Estudiante';
import StorageTest from './components/lider/storage';
import axios from 'axios';
import RegistrarEstudiantePerfil from './components/lider/Lider_Registrar_Estudiante';

const searchStudent= async()=> {
  //Valor que se va a buscar en el .json -> id estudiante en este caso (codigo)
  const searchValue=localStorage.getItem("Estudiante")
  let value = null;
  value = await axios.get('../../../anotherStudent.json').then(
      response => {
          const data = response.data;
          let temp = null;
          data.map((d) => {
              if (d.codigo == searchValue) temp = d;
          })
          return temp;
      }).catch(error => { console.error(error); })
  if (value === null) throw new Response("Not Found", { status: 404 })
  localStorage.setItem("info_estudiante", JSON.stringify(value))
  return value;
}

const verifyStudent= ()=>{
  const data = localStorage.getItem("info_estudiante");
    if(data===null || !JSON.parse(data)) throw new Response("Not Found", { status: 404 })
    return true;
}



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Template></Template>} errorElement={<Error404></Error404>}>
        <Route path='/' element={<Home></Home>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/forgetPassword' element={<Recovery></Recovery>} />
        <Route path='/Estudiante' element={<TemplateEstudiante></TemplateEstudiante>}>
          <Route path='Perfil' element={<PerfilEstudiante></PerfilEstudiante>} />
          <Route path='Test' element={<Tabla></Tabla>} />
          <Route path='E_Evaluacion' element={<EstudianteEvaluacion></EstudianteEvaluacion>} />
          <Route path='ListarIdeas' element={<ListarIdeasEstudiante></ListarIdeasEstudiante>} />
          <Route path='ListarPlanes' element={<ListarPlanesEstudiante></ListarPlanesEstudiante>} />
          <Route path='ListarIdeas/test' element={<ListarIdeasEstudiantetest></ListarIdeasEstudiantetest>} />
          <Route path='Perfil/Editar' element={<EditarPerfilEstudiante></EditarPerfilEstudiante>} />
        </Route>
        <Route path='/Lider' element={<TemplateLider></TemplateLider>}>
          <Route path='Ideas' element={<Listar_Ideas></Listar_Ideas>}></Route>
          <Route path='VistaIdea' element={<VistaIdea></VistaIdea>} />
          <Route path='Perfil' element={<PerfilLider></PerfilLider>} />
          <Route path='Perfil/Editar' element={<EditarPerfilLider></EditarPerfilLider>} />
          <Route path='Registar/Estudiante' element={<RegistrarEstudiantePerfil></RegistrarEstudiantePerfil>} />
          <Route path='Perfil/Estudiante' element={<LiderVerPerfilEstudiante></LiderVerPerfilEstudiante>} loader={searchStudent}/>
          <Route path='Perfil/Estudiante/Editar' element={<LiderEditarPerfilEstudiante></LiderEditarPerfilEstudiante>} loader={verifyStudent}/>
          <Route path='tester' element={<StorageTest></StorageTest>}/>
        </Route>
        <Route path='/Administrativo' element={<TemplateAdministrativo></TemplateAdministrativo>}>
          <Route path='Perfil'></Route>
        </Route>
        <Route path='/Docente' element={<TemplateDocente></TemplateDocente>}>
          <Route path='Perfil'></Route>
        </Route>
      </Route>
    </>
  )
);

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
            <Route path='/Estudiante/ListarPlanes' element={<ListarPlanesEstudiante></ListarPlanesEstudiante>} />
            <Route path='/Estudiante/ListarIdeas/test' element={<ListarIdeasEstudiantetest></ListarIdeasEstudiantetest>} />
            <Route path='/Estudiante/Perfil/Editar' element={<EditarPerfilEstudiante></EditarPerfilEstudiante>} />
          </Route>
          <Route element={<TemplateLider></TemplateLider>}>
            <Route path='/Lider/Ideas' element={<Listar_Ideas></Listar_Ideas>}></Route>
            <Route path='/Lider/VistaIdea' element={<VistaIdea></VistaIdea>} />
            <Route path='/Lider/Perfil' element={<PerfilLider></PerfilLider>} />
            <Route path='/Lider/Perfil/Editar' element={<EditarPerfilLider></EditarPerfilLider>} />
            <Route path='/Lider/Perfil/Estudiante' element={<LiderVerPerfilEstudiante></LiderVerPerfilEstudiante>} />

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
  return <><ContextProvider><RouterProvider router={router} /></ContextProvider></>;
}

