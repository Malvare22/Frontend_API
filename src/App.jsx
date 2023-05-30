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
import ListarIdeasEstudiante from './components/estudiante/Estudiante_ListarIdeas';
import ListarPlanesEstudiante from './components/estudiante/Estudiante_ListarPlanes';
import ListarIdeasEstudiantetest from './components/estudiante/Estudiante_Card_Idea';
import LiderVistaIdea from './components/lider/Lider_VerIdea';
import EstudianteVistaIdea from './components/estudiante/Estudiante_Idea_Ver';
import AdministrativoVistaIdea from './components/administrativo/Administrativo_Idea_Ver';
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
import PerfilLider from './components/lider/Lider_Perfil_Ver';
import EditarPerfilLider from './components/lider/Lider_Perfil_Editar';
import LiderVerPerfilEstudiante from './components/lider/Lider_Ver_Perfil_Estudiante';
import LiderEditarPerfilEstudiante from './components/lider/Lider_Editar_Perfil_Estudiante';
import StorageTest from './components/lider/storage';
import axios from 'axios';
import RegistrarEstudiantePerfil from './components/lider/Lider_Registrar_Estudiante';
import Listar_Ideas from './components/lider/Listar_ideas';
import LiderAdministrativoVer from './components/lider/Lider_Administrador_Ver';
import LiderVerPerfilDocente from './components/lider/Lider_Docente_Ver';
import LiderDocenteEditar from './components/lider/Lider_Docente_Editar';
import AdministrativoPerfil from './components/administrativo/Administrativo_Perfil';
import AdministrativoPerfilEditar from './components/administrativo/Administrativo_Perfil_Editar';

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
          <Route path='Ideas/Vista' element={<EstudianteVistaIdea></EstudianteVistaIdea>} />
          <Route path='ListarPlanes' element={<ListarPlanesEstudiante></ListarPlanesEstudiante>} />
          <Route path='ListarIdeas/test' element={<ListarIdeasEstudiantetest></ListarIdeasEstudiantetest>} />
          <Route path='Perfil/Editar' element={<EditarPerfilEstudiante></EditarPerfilEstudiante>} />
          <Route path='Test' element={<Tabla></Tabla>} />
          <Route path='EntidadesFinanciadoras' element={<EntidadesFinanciadoras></EntidadesFinanciadoras>}/>
          <Route path='AgregarIdea' element={<EstudianteAgregarIdea></EstudianteAgregarIdea>}/>
          <Route path='CapacitacionIdea' element={<EstudianteCapacitacionIdea></EstudianteCapacitacionIdea>}/>
          <Route path='CapacitacionPlan' element={<EstudianteCapacitacionPlan></EstudianteCapacitacionPlan>}/>
        </Route>
        <Route path='/Lider' element={<TemplateLider></TemplateLider>}>
          <Route path='Perfil' element={<PerfilLider></PerfilLider>} />
          <Route path='Perfil/Editar' element={<EditarPerfilLider></EditarPerfilLider>} />
          <Route path='Registrar/Estudiante' element={<RegistrarEstudiantePerfil></RegistrarEstudiantePerfil>} />
          <Route path='Perfil/Estudiante' element={<LiderVerPerfilEstudiante></LiderVerPerfilEstudiante>} loader={searchStudent}/>
          <Route path='Perfil/Estudiante/Editar' element={<LiderEditarPerfilEstudiante></LiderEditarPerfilEstudiante>} loader={verifyStudent}/>
          <Route path='Perfil/Docente/Editar' element={<LiderDocenteEditar></LiderDocenteEditar>} loader={verifyStudent}/>
          <Route path='Perfil/Administrativo' element={<LiderAdministrativoVer></LiderAdministrativoVer>} loader={verifyStudent}/>
          <Route path='Perfil/Docente' element={<LiderVerPerfilDocente></LiderVerPerfilDocente>} loader={verifyStudent}/>
          <Route path='Ideas' element={<Listar_Ideas></Listar_Ideas>}></Route>
          <Route path='Ideas/Vista' element={<LiderVistaIdea></LiderVistaIdea>}></Route>
          <Route path='Planes' element={<LiderListarPlanes></LiderListarPlanes>}></Route>
          <Route path='Estudiantes' element={<LiderListarEstudiantes></LiderListarEstudiantes>}/>
          <Route path='tester' element={<StorageTest></StorageTest>}/>
        </Route>
        <Route path='/Administrativo' element={<TemplateAdministrativo></TemplateAdministrativo>}>
          <Route path='Perfil' element={<AdministrativoPerfil></AdministrativoPerfil>}></Route>
          <Route path='Perfil/Editar' element={<AdministrativoPerfilEditar></AdministrativoPerfilEditar>}></Route>
          <Route path='Ideas/Vista' element={<AdministrativoVistaIdea></AdministrativoVistaIdea>} />
        </Route>
        <Route path='/Docente' element={<TemplateDocente></TemplateDocente>}>
          <Route path='Perfil'></Route>
        </Route>
      </Route>
    </>
  )
);

export default function App() {
  return <><ContextProvider><RouterProvider router={router} /></ContextProvider></>;
}

