import './css/App.css';
import React from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Route, Routes, BrowserRouter, createRoutesFromElements, json } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Login from './routes/login/Login.jsx'
import Footer from './components/Footer';
import Recovery from './routes/login/Recovery';
import ResetPassword from './routes/login/ResetPassword';
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
import LiderVistaIdea from './components/lider/Lider_Idea_Ver';
import LiderVistaPlan from './components/lider/Lider_Plan_Ver';
import EstudianteVistaIdea from './components/estudiante/Estudiante_Idea_Ver';
import EstudianteVistaPlan from './components/estudiante/Estudiante_Plan_Ver'
import AdministrativoVistaIdea from './components/administrativo/Administrativo_Idea_Ver';
import AdministrativoPlanIdea from './components/administrativo/Administrativo_Plan_Ver';
import LiderListarIdeas from './components/lider/Listar_ideas';
import DocenteTutorVerIdea from './components/docente/Docente_Tutor_Idea_Ver.jsx';
import DocenteTutorVerPlan from './components/docente/Docente_Tutor_Plan_Ver.jsx';
import DocenteApoyoVerIdea from './components/docente/Docente_Apoyo_Idea_Ver.jsx';

import DocenteApoyoVerPlan from './components/docente/Docente_Apoyo_Plan_Ver.jsx';

import LiderListarDocentes from './components/lider/Lider_Docentes_Listar';
import LiderListarEntidades from './components/lider/Lider_entidadesListar';
import LiderListarAdministrativos from './components/lider/Lider_administrativosListar';
import EstudianteAgregarIdea from './components/estudiante/Estudiante_Agregar_Idea';
import EstudianteCapacitacionIdea from './components/estudiante/Estudiante_Capacitacion_Idea';
import EstudianteCapacitacionPlan from './components/estudiante/Estudiante_Capacitacion_Plan';
import LiderListarEstudiantes from './components/lider/Lider_Estudiante_Listar';
import LiderListarPlanes from './components/lider/Listar_planes';
import LiderListarFormatos from './components/lider/Lider_formatosListar';
import LiderSubirFormatos from './components/lider/Lider_formatosSubir';
import LiderVistaEntidadFinanciadora from './components/lider/Lider_Entidades_Financiadoras';
import AdministrativoListarIdeas from './components/administrativo/Administrativo_ideasListar';
import AdministrativoListarPlanes from './components/administrativo/Administrativo_planesListar';
import AdministrativoListarEntidades from './components/administrativo/Administrativo_entidadesListar';
import AdministrativoListarEstudiantes from './components/administrativo/Administrativo_estudiantesListar';
import AdministrativoListarDocentes from './components/administrativo/Administrativo_docentesListar';
import AdministrativoListarAdministrativos from './components/administrativo/Administrativo_administrativosListar';
import AdministrativoVerPerfilLider from './components/administrativo/Administrativo_Lider_Ver';
import AdministrativoRegistrarLiderPerfil from './components/administrativo/Administrativo_Lider_Registrar';
import AdministrativoEditarPerfilLider from './components/administrativo/Administrativo_Lider_Editar';
import AdministrativoVistaEntidadFinanciadora from './components/administrativo/Administrativo_Entidades_Financiadoras';
import PerfilDocente from './components/docente/Docente_Perfil';
import DocenteTutorListarIdeas from './components/docente/DocenteTutor_ideasListar';
import DocenteApoyoListarIdeas from './components/docente/DocenteApoyo_ideasListar';
import DocenteEvaluadorListarIdeas from './components/docente/DocenteEvaluador_ideasListar';
import DocenteTutorListarPlanes from './components/docente/DocenteTutor_planesListar';
import DocenteApoyoListarPlanes from './components/docente/DocenteApoyo_planesListar';
import DocenteEvaluadorListarPlanes from './components/docente/DocenteEvaluador_planesListar';
import DocenteListarEntidades from './components/docente/Docente_entidadesListar';
import DocenteListarEstudiantes from './components/docente/Docente_estudiantesListar';
import DocenteAceptarTutoria from './components/docente/Docente_TutoriaAceptar';
import DocenteVistaEntidadFinanciadora from './components/docente/Docente_Entidades_Financiadoras'
import Sidebar from './components/estudiante/Estudiante_Navbar'
import DocenteEvaluadorVerIdea from './components/docente/Docente_Evaluador_Idea_Ver.jsx';
import DocenteEvaluadorVerPlan from './components/docente/Docente_Evaluador_Plan_Ver.jsx';
import EditarPerfilEstudiante from './components/estudiante/Estudiante_Perfil_Editar';
import EstudianteEvaluacion from './components/estudiante/Estudiante_Evaluacion';
import EntidadesFinanciadoras from './components/estudiante/Estudiante_Entidades_Financiadoras';
import Tabla from './components/estudiante/Tabla';
import PerfilLider from './components/lider/Lider_Perfil_Ver';
import EditarPerfilLider from './components/lider/Lider_Perfil_Editar';
import LiderVerPerfilEstudiante from './components/lider/Lider_Estudiante_Ver';
import LiderEditarPerfilEstudiante from './components/lider/Lider_Estudiante_Editar';
import StorageTest from './components/lider/storage';
import axios from 'axios';
import RegistrarEstudiantePerfil from './components/lider/Lider_Estudiante_Registrar';
import Listar_Ideas from './components/lider/Listar_ideas';
import LiderAdministrativoVer from './components/lider/Lider_Administrador_Ver';
import LiderVerPerfilDocente from './components/lider/Lider_Docente_Ver';
import LiderDocenteEditar from './components/lider/Lider_Docente_Editar';
import AdministrativoPerfil from './components/administrativo/Administrativo_Perfil';
import AdministrativoPerfilEditar from './components/administrativo/Administrativo_Perfil_Editar';
import LiderDocenteRegistrar from './components/lider/Lider_Docente_Registrar';
import { importAdmins, importDocents, importStudents } from './context/functions_general';
import { ListarDocentes, MiPerfilDocente, GestionarDocente, MiPerfilEstudiante, GestionarEstudiante, MiPerfilAdministrativo } from './context/functions_app';
import DocentePerfilEditar from './components/docente/Docente_Perfil_Editar';
import EstudianteEditarPerfil from './components/estudiante/Estudiante_Perfil_Editar';
import LiderEstudianteRegistrar from './components/lider/Lider_Estudiante_Registrar';
import { PerfilAdministrativo } from './components/useGeneral/Profiles';

const obtenerInformacionCompletaAlumno = async () => {
  // // try {
  // let zelda = "http://localhost:8080/estudiante/" + localStorage.getItem('ESTUDIANTE_EMAIL');
  // const value = await axios.get(zelda, {
  //   headers: {
  //     "X-Softue-JWT": localStorage.getItem('token_access')
  //   }
  // })

  // let temp_user = toLiderFormatStudentsFromImport([value.data])[0]
  // zelda = 'http://localhost:8080/coordinador/foto/'
  // const foto = await axios.get(zelda + value.data.codigo, {
  //   headers: {
  //     "X-Softue-JWT": localStorage.getItem('token_access')
  //   },
  //   responseType: 'arraybuffer' // asegúrate de especificar el tipo de respuesta como arraybuffer
  // }).then(response => {
  //   const base64Image = btoa(
  //     new Uint8Array(response.data)
  //       .reduce((data, byte) => data + String.fromCharCode(byte), '')
  //   );
  //   const imageUrl = `data:${response.headers['content-type']};base64,${base64Image}`;

  //   return imageUrl;
  // });
  // const blob = await fetch(foto).then(response => response.blob());
  // const archivo = new File([blob], "IMG.png", { type: "image/png" });
  // localStorage.setItem("ESTUDIANTE_INFO", JSON.stringify({ ...temp_user, contrasenia: "", foto: { archivo: archivo, direccion: foto } }))

  // return true;
  // // }
  // // catch (error) {
  // //     throw new Response("Not Found", { status: 404 })
  // // }
}

const MiPerfilLider = async () => {
  //localStorage.setItem('token_access', response.data.token)
  //localStorage.setItem('session', JSON.stringify({"email": response.data.email, "rol": response.data.rol}))
  //localStorage.setItem('session', JSON.stringify({"email": "Ericka.Eckblad@gmail.com", "rol": "coordinador"}))
  const email=(JSON.parse(localStorage.getItem('session'))).email
  let zelda = "http://localhost:8080/coordinador/" + email;
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })

  let temp_user = value.data
  zelda = 'http://localhost:8080/coordinador/foto/'
  let foto;
  let archivo;
  try{
    foto = await axios.get(zelda + value.data.codigo, {
      headers: {
        "X-Softue-JWT": localStorage.getItem('token_access')
      },
      responseType: 'arraybuffer' // asegúrate de especificar el tipo de respuesta como arraybuffer
    }).then(response => {
      const base64Image = btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      const imageUrl = `data:${response.headers['content-type']};base64,${base64Image}`;
  
      return imageUrl;
    });
    const blob = await fetch(foto).then(response => response.blob());
    archivo = new File([blob], "IMG.png", { type: "image/png" });
  }
  catch{
      foto=''
      archivo = ''
  }
  localStorage.setItem("MY_PROFILE_INFO", JSON.stringify({ ...temp_user, contrasenia: "", foto: { archivo: archivo, direccion: foto } }))

  return true;
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Template></Template>} errorElement={<Error404></Error404>}>
        <Route path='/' element={<Home></Home>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/forgetPassword' element={<Recovery></Recovery>} />
        <Route exact path="/resetPassword" component={ResetPassword} element={<ResetPassword></ResetPassword>} />
        <Route path="/resetPassword/:token" component={ResetPassword} element={<ResetPassword></ResetPassword>} />
        <Route>
          <Route path='/Estudiante' element={<TemplateEstudiante></TemplateEstudiante>}>
            <Route path='Perfil' element={<PerfilEstudiante></PerfilEstudiante>} loader={MiPerfilEstudiante}/>
            <Route path='Perfil/Editar' element={<EstudianteEditarPerfil></EstudianteEditarPerfil>} loader={MiPerfilEstudiante}/>
            <Route path='Test' element={<Tabla></Tabla>} />
            <Route path='E_Evaluacion' element={<EstudianteEvaluacion></EstudianteEvaluacion>} />
            <Route path='ListarIdeas' element={<ListarIdeasEstudiante></ListarIdeasEstudiante>} />
            <Route path='Ideas/Vista' element={<EstudianteVistaIdea></EstudianteVistaIdea>} />
            <Route path='ListarPlanes' element={<ListarPlanesEstudiante></ListarPlanesEstudiante>} />
            <Route path='Planes/Vista' element={<EstudianteVistaPlan></EstudianteVistaPlan>} />
            <Route path='ListarIdeas/test' element={<ListarIdeasEstudiantetest></ListarIdeasEstudiantetest>} />
            <Route path='Perfil/Editar' element={<EditarPerfilEstudiante></EditarPerfilEstudiante>} />
            <Route path='EntidadesFinanciadoras' element={<EntidadesFinanciadoras></EntidadesFinanciadoras>} />
            <Route path='AgregarIdea' element={<EstudianteAgregarIdea></EstudianteAgregarIdea>} />
            <Route path='CapacitacionIdea' element={<EstudianteCapacitacionIdea></EstudianteCapacitacionIdea>} />
            <Route path='CapacitacionPlan' element={<EstudianteCapacitacionPlan></EstudianteCapacitacionPlan>} />
          </Route>
          <Route path='/Lider' element={<TemplateLider></TemplateLider>}>
            <Route path='Perfil' element={<PerfilLider></PerfilLider>} loader={MiPerfilLider}/>
            <Route path='Perfil/Editar' element={<EditarPerfilLider></EditarPerfilLider>} />
            <Route path='Ideas' element={<LiderListarIdeas></LiderListarIdeas>}></Route>
            <Route path='Ideas/Vista' element={<LiderVistaIdea></LiderVistaIdea>}></Route>
            <Route path='Planes' element={<LiderListarPlanes></LiderListarPlanes>}></Route>
            {/**Rutas de gestión de Estudiantes**/}
            <Route path='Estudiantes' element={<LiderListarEstudiantes></LiderListarEstudiantes>}></Route>
            <Route path='Estudiantes/Perfil' element={<LiderVerPerfilEstudiante></LiderVerPerfilEstudiante>} loader={GestionarEstudiante} />
            <Route path='Estudiantes/Perfil/Editar' element={<LiderEditarPerfilEstudiante></LiderEditarPerfilEstudiante>} loader={GestionarEstudiante} />
            <Route path='Estudiantes/Registrar' element={<LiderEstudianteRegistrar></LiderEstudianteRegistrar>} />
            {/**--------------------**/}
            {/**Rutas de gestión de Docentes**/}
            <Route path='Docentes' element={<LiderListarDocentes></LiderListarDocentes>}></Route>
            <Route path='Docentes/Perfil' element={<LiderVerPerfilDocente></LiderVerPerfilDocente>} loader={GestionarDocente}/>
            <Route path='Docentes/Perfil/Editar' element={<LiderDocenteEditar></LiderDocenteEditar>} loader={GestionarDocente}/>
            <Route path='Docentes/Registrar' element={<LiderDocenteRegistrar></LiderDocenteRegistrar>} />
            {/**--------------------**/}
            <Route path='Planes/Vista' element={<LiderVistaPlan></LiderVistaPlan>} />
            <Route path='Entidades' element={<LiderListarEntidades></LiderListarEntidades>} />
            <Route path='VistaEntidades' element={<LiderVistaEntidadFinanciadora></LiderVistaEntidadFinanciadora>} />
            <Route path='Formatos' element={<LiderListarFormatos></LiderListarFormatos>} />
            <Route path='AgregarFormato' element={<LiderSubirFormatos></LiderSubirFormatos>} />
            <Route path='tester' element={<StorageTest></StorageTest>} />
            
            {/**Rutas de gestión de Administradores**/}
            <Route path='Administrativos' element={<LiderListarAdministrativos></LiderListarAdministrativos>} />
            {/**--------------------**/}
          </Route>
          <Route path='/Administrativo' element={<TemplateAdministrativo></TemplateAdministrativo>}>
            <Route path='Perfil' element={<AdministrativoPerfil></AdministrativoPerfil>} loader={MiPerfilAdministrativo}></Route>
            <Route path='Perfil/Editar' element={<AdministrativoPerfilEditar></AdministrativoPerfilEditar>} loader={MiPerfilAdministrativo}></Route>
            <Route path='Ideas/Vista' element={<AdministrativoVistaIdea></AdministrativoVistaIdea>} />
            <Route path='Ideas' element={<AdministrativoListarIdeas></AdministrativoListarIdeas>} />
            <Route path='Planes' element={<AdministrativoListarPlanes></AdministrativoListarPlanes>} />
            <Route path='Planes/Vista' element={<AdministrativoPlanIdea></AdministrativoPlanIdea>} />
            <Route path='Entidades' element={<AdministrativoListarEntidades></AdministrativoListarEntidades>} />
            <Route path='VistaEntidades' element={<AdministrativoVistaEntidadFinanciadora></AdministrativoVistaEntidadFinanciadora>} />
            <Route path='Docentes' element={<AdministrativoListarDocentes></AdministrativoListarDocentes>} />
            <Route path='Estudiantes' element={<AdministrativoListarEstudiantes></AdministrativoListarEstudiantes>} />
            <Route path='Administrativos' element={<AdministrativoListarAdministrativos></AdministrativoListarAdministrativos>} />
            <Route path='Lider' element={<AdministrativoVerPerfilLider></AdministrativoVerPerfilLider>} />
            <Route path='Lider/Registrar' element={<AdministrativoRegistrarLiderPerfil></AdministrativoRegistrarLiderPerfil>} />
            <Route path='Lider/Editar' element={<AdministrativoEditarPerfilLider></AdministrativoEditarPerfilLider>} />
          </Route>
          <Route path='/Docente' element={<TemplateDocente></TemplateDocente>}>
            <Route path='Perfil' element={<PerfilDocente></PerfilDocente>} loader={MiPerfilDocente}/>
            <Route path='Perfil/Editar' element={<DocentePerfilEditar></DocentePerfilEditar>} loader={MiPerfilDocente}/>
            <Route path='Tutor/Ideas/Vista' element={<DocenteTutorVerIdea></DocenteTutorVerIdea>} />
            <Route path='Tutor/Ideas' element={<DocenteTutorListarIdeas></DocenteTutorListarIdeas>} />
            <Route path='Apoyo/Ideas/Vista' element={<DocenteApoyoVerIdea></DocenteApoyoVerIdea>} />
            <Route path='Apoyo/Ideas' element={<DocenteApoyoListarIdeas></DocenteApoyoListarIdeas>} />
            <Route path='Evaluador/Ideas' element={<DocenteEvaluadorListarIdeas></DocenteEvaluadorListarIdeas>} />
            <Route path='Evaluador/Ideas/Vista' element={<DocenteEvaluadorVerIdea></DocenteEvaluadorVerIdea>} />
            <Route path='Tutor/Planes' element={<DocenteTutorListarPlanes></DocenteTutorListarPlanes>} />
            <Route path='Tutor/Planes/Vista' element={<DocenteTutorVerPlan></DocenteTutorVerPlan>} />
            <Route path='Apoyo/Planes' element={<DocenteApoyoListarPlanes></DocenteApoyoListarPlanes>} />
            <Route path='Apoyo/Planes/Vista' element={<DocenteApoyoVerPlan></DocenteApoyoVerPlan>} />
            <Route path='Evaluador/Planes' element={<DocenteEvaluadorListarPlanes></DocenteEvaluadorListarPlanes>} />
            <Route path='Evaluador/Planes/Vista' element={<DocenteEvaluadorVerPlan></DocenteEvaluadorVerPlan>} />
            <Route path='Entidades' element={<DocenteListarEntidades></DocenteListarEntidades>} />
            <Route path='VistaEntidades' element={<DocenteVistaEntidadFinanciadora></DocenteVistaEntidadFinanciadora>} />
            <Route path='Estudiantes' element={<DocenteListarEstudiantes></DocenteListarEstudiantes>} />
            <Route path='Tutor/Aceptar' element={<DocenteAceptarTutoria></DocenteAceptarTutoria>} />
          </Route>
        </Route>
      </Route>     
    </>
  )
);

export default function App() {
  return <><ContextProvider><RouterProvider router={router} /></ContextProvider></>;
}

