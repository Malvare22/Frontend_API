import './css/App.css';
import React from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Route, Routes, BrowserRouter, createRoutesFromElements, json } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Login from './routes/login/Login.jsx'
import Recovery from './routes/login/Recovery';
import ResetPassword from './routes/login/ResetPassword';
import Error404 from './routes/404_error'
import TemplateEstudiante from './components/estudiante/Estudiante_Template'
import TemplateLider from './components/lider/Lider_Template'
import TemplateAdministrativo from './components/administrativo/Administrativo_Template'
import TemplateDocente from './components/docente/Docente_Template'
import ContextProvider from './context/UserContext';
import Template from './components/TemplateGeneral';
import PerfilEstudiante from './components/useGeneral/Perfil_Estudiante'
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

import LiderListarEntidades from './components/lider/Lider_entidadesListar';
import LiderListarAdministrativos from './components/lider/Lider_administrativosListar';
import EstudianteAgregarIdea from './components/estudiante/Estudiante_Agregar_Idea';
import EstudianteCapacitacionIdea from './components/estudiante/Estudiante_Capacitacion_Idea';
import EstudianteCapacitacionPlan from './components/estudiante/Estudiante_Capacitacion_Plan';
import EstudianteCapacitacionGeneral from './components/estudiante/Estudiante_Capacitacion_General';
import LiderListarPlanes from './components/lider/Listar_planes';
import LiderListarFormatos from './components/lider/Lider_formatosListar';
import LiderSubirFormatos from './components/lider/Lider_formatosSubir';
import LiderVistaEntidadFinanciadora from './components/lider/Lider_Entidades_Financiadoras';
import LiderComponentesListar from './components/lider/Lider_componentes_listar';
import LiderComponenteRegistrar from './components/lider/Lider_Componente_Registrar';
import AdministrativoListarIdeas from './components/administrativo/Administrativo_ideasListar';
import AdministrativoListarPlanes from './components/administrativo/Administrativo_planesListar';
import AdministrativoListarEntidades from './components/administrativo/Administrativo_entidadesListar';

import AdministrativoListarAdministrativos from './components/administrativo/Administrativo_administrativosListar';


import AdministrativoVistaEntidadFinanciadora from './components/administrativo/Administrativo_Entidades_Financiadoras';
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
import DocenteEvaluadorVerIdea from './components/docente/Docente_Evaluador_Idea_Ver.jsx';
import DocenteEvaluadorVerPlan from './components/docente/Docente_Evaluador_Plan_Ver.jsx';
import EditarPerfilEstudiante from './components/useGeneral/Editar_Perfil_Estudiante';
import EstudianteEvaluacion from './components/estudiante/Estudiante_Evaluacion';
import EntidadesFinanciadoras from './components/estudiante/Estudiante_Entidades_Financiadoras';
import Tabla from './components/estudiante/Tabla';
import StorageTest from './components/lider/storage';
import Listar_Ideas from './components/lider/Listar_ideas';
import AdministrativoPerfil from './components/useGeneral/Perfil_Admin';
import { MiPerfilDocente, GestionarDocente, MiPerfilEstudiante, GestionarEstudiante, MiPerfilAdministrativo, GestionarAdministrativo, MiPerfilLider, GestionarLider, GestionarEntidad } from './context/functions_app';
import EstudianteEditarPerfil from './components/useGeneral/Editar_Perfil_Estudiante';
import AdministrativoEditarPerfil from './components/useGeneral/Editar_Perfil_Admin';
import DocentePerfil from './components/useGeneral/Perfil_Docente';
import DocenteEditarPerfil from './components/useGeneral/Editar_Perfil_Docente';
import LiderPerfil from './components/useGeneral/Perfil_Lider';
import LiderEditarPerfil from './components/useGeneral/Editar_Perfil_Lider';
import EstudiantePerfil from './components/useGeneral/Perfil_Estudiante';
import EstudianteResultadoEvaluacion from './components/estudiante/Estudiante_Resultado_Evaluacion'
import ListarDocentes from './components/useGeneral/Listar_Docentes';
import ListarEstudiantes from './components/useGeneral/Listar_Estudiantes';
import AdministrativoVerPerfilLider from './components/administrativo/Ver_Lider';
import EntidadEditar from './components/useGeneral/Editar_Entidad';
import PlanVer from './components/useGeneral/Usuario_Plan_Ver';

import LiderPreguntasListar from './components/lider/Lider_Preguntas_Listar';
import LiderPreguntasAgregar from './components/lider/Lider_Preguntas_Agregar';

import LiderPreguntasEditar from './components/lider/Lider_Preguntas_Editar';
import TiemposEvaluacionAgregar from './components/lider/Lider_TiemposEvaluacion_Agregar';
import Listar_Areas from './components/lider/Lider_areasListar';
import RegistrarArea from './components/lider/Lider_Areas_Registrar';
import LiderResultadosListar from './components/lider/Lider_Resultados_Listar';
import LiderResultadosVer from './components/lider/Lider_Resultados_Ver';
import LiderComponenteActualizar from './components/lider/Lider_componente_editar';
import Footer from './components/Footer';
import { Relogin } from './routes/login/Relogin';
import DocenteAceptarTutoriaPlan from './components/docente/Docente_Tutoria_AceptarPlan';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Template></Template>} errorElement={<Error404></Error404>}>
        <Route path='/' element={<Home></Home>} />
        <Route path='/login' element={<><Login/><Footer/></>} />
        <Route path='/relogin' element={<><Relogin/><Footer/></>} />
        <Route path='/forgetPassword' element={<><Recovery></Recovery><Footer></Footer></>} />
        <Route exact path="/resetPassword" component={ResetPassword} element={<><ResetPassword></ResetPassword><Footer></Footer></>} />
        <Route path="/resetPassword/:token" component={ResetPassword} element={<><ResetPassword></ResetPassword><Footer></Footer></>} />
        <Route>
          <Route path='/Estudiante' element={<TemplateEstudiante></TemplateEstudiante>}>
            <Route path='Perfil' element={<EstudiantePerfil location={'MY_PROFILE_INFO'} editable={true} />} loader={MiPerfilEstudiante} />
            <Route path='Perfil/Editar' element={<EstudianteEditarPerfil location={'MY_PROFILE_INFO'} type={'estudiante'}/>} loader={MiPerfilEstudiante} />
            <Route path='Test' element={<Tabla></Tabla>} />
            <Route path='E_Evaluacion' element={<EstudianteEvaluacion></EstudianteEvaluacion>} />
            <Route path='ResultadoEvaluacion' element={<EstudianteResultadoEvaluacion></EstudianteResultadoEvaluacion>} />
            <Route path='ListarIdeas' element={<ListarIdeasEstudiante></ListarIdeasEstudiante>} />
            <Route path='Ideas/Vista' element={<EstudianteVistaIdea></EstudianteVistaIdea>} />
            <Route path='ListarPlanes' element={<ListarPlanesEstudiante></ListarPlanesEstudiante>} />
            <Route path='Planes/Vista' element={<PlanVer></PlanVer>} />
            <Route path='ListarIdeas/test' element={<ListarIdeasEstudiantetest></ListarIdeasEstudiantetest>} />
            <Route path='Perfil/Editar' element={<EditarPerfilEstudiante></EditarPerfilEstudiante>} />
            <Route path='EntidadesFinanciadoras' element={<EntidadesFinanciadoras></EntidadesFinanciadoras>} />
            <Route path='AgregarIdea' element={<EstudianteAgregarIdea></EstudianteAgregarIdea>} />
            <Route path='CapacitacionIdea' element={<EstudianteCapacitacionIdea></EstudianteCapacitacionIdea>} />
            <Route path='CapacitacionPlan' element={<EstudianteCapacitacionPlan></EstudianteCapacitacionPlan>} />
            <Route path='CapacitacionGeneral' element={<EstudianteCapacitacionGeneral></EstudianteCapacitacionGeneral>} />
          </Route>
          <Route path='/Lider' element={<TemplateLider></TemplateLider>}>
            <Route path='Perfil' element={<LiderPerfil location={"MY_PROFILE_INFO"} editable={true}/>} loader={MiPerfilLider} />
            <Route path='Perfil/Editar' element={<LiderEditarPerfil location={"MY_PROFILE_INFO"} type={'editar'}/>} loader={MiPerfilLider}/>
            <Route path='Ideas' element={<LiderListarIdeas></LiderListarIdeas>}></Route>
            <Route path='Ideas/Vista' element={<LiderVistaIdea></LiderVistaIdea>}></Route>
            <Route path='Planes' element={<LiderListarPlanes></LiderListarPlanes>}></Route>
            <Route path='Planes/Vista' element={<PlanVer></PlanVer>}></Route>
            <Route path='Evaluacion/Componentes' element={<LiderComponentesListar></LiderComponentesListar>}></Route>
            <Route path='Evaluacion/Componentes/Registrar' element={<LiderComponenteRegistrar></LiderComponenteRegistrar>}></Route>
            <Route path='Evaluacion/Componentes/Editar' element={<LiderComponenteActualizar></LiderComponenteActualizar>}></Route>
            <Route path='Estudiantes' element={<ListarEstudiantes/>} />          
            <Route path='Estudiantes/Perfil' element={<PerfilEstudiante location={'ESTUDIANTE_INFORMATION'} editable={true} />} loader={GestionarEstudiante} />
            <Route path='Estudiantes/Perfil/Editar' element={<EstudianteEditarPerfil location={'ESTUDIANTE_INFORMATION'} type={'sudo'}/>} loader={GestionarEstudiante} />
            
            <Route path='Estudiantes/Registrar' element={<EstudianteEditarPerfil type={'registrar'} />} />

            <Route path='Docentes' element={<ListarDocentes/>}></Route>
            <Route path='Docentes/Perfil' element={<DocentePerfil location={'DOCENTE_INFORMATION'} editable={true} />} loader={GestionarDocente} />
            <Route path='Docentes/Perfil/Editar' element={<DocenteEditarPerfil location={'DOCENTE_INFORMATION'} type={'sudo'} />} loader={GestionarDocente} />
            <Route path='Docentes/Registrar' element={<DocenteEditarPerfil type={'registrar'}/>}/>
            
            <Route path='Administrativos' element={<LiderListarAdministrativos></LiderListarAdministrativos>} />
            <Route path='Administrativos/Perfil' element={<AdministrativoPerfil location={'ADMINISTRATIVO_INFORMATION'} editable={false} />} loader={GestionarAdministrativo}></Route>

            <Route path='Planes/Vista' element={<LiderVistaPlan></LiderVistaPlan>} />
            <Route path='Entidades' element={<LiderListarEntidades></LiderListarEntidades>} />
            <Route path='Entidades/Editar' element={<EntidadEditar location={'ENTIDAD_INFORMATION'} type={'editar'}/>} loader={GestionarEntidad}/>
            <Route path='Entidades/Registrar' element={<EntidadEditar type={'registrar'}/>}/>
            <Route path='VistaEntidades' element={<LiderVistaEntidadFinanciadora></LiderVistaEntidadFinanciadora>} loader={GestionarEntidad}/>
            <Route path='Formatos' element={<LiderListarFormatos></LiderListarFormatos>} />
            <Route path='AgregarFormato' element={<LiderSubirFormatos></LiderSubirFormatos>} />
            <Route path='tester' element={<StorageTest></StorageTest>} />
            <Route path='TiemposEvaluacion' element={<TiemposEvaluacionAgregar></TiemposEvaluacionAgregar>}/>
            <Route path='Areas/Listar' element={<Listar_Areas></Listar_Areas>}></Route>
            <Route path='Areas/Registrar' element={<RegistrarArea></RegistrarArea>}></Route>

            {/** Rutas del manejo de preguntas */}
            <Route path='Preguntas/Listar' element={<LiderPreguntasListar></LiderPreguntasListar>} />
            <Route path='Preguntas/Listar/Agregar' element={<LiderPreguntasAgregar></LiderPreguntasAgregar>} />
            <Route path='Preguntas/Listar/Editar' element={<LiderPreguntasEditar></LiderPreguntasEditar>} />
            
            {/** Rutas del manejo de resultados */}
            <Route path='Resultados/Listar' element={<LiderResultadosListar></LiderResultadosListar>} />
            <Route path='Resultados/Ver' element={<LiderResultadosVer></LiderResultadosVer>} />

          </Route>
          <Route path='/Administrativo' element={<TemplateAdministrativo></TemplateAdministrativo>}>
            <Route path='Perfil' element={<AdministrativoPerfil location={"MY_PROFILE_INFO"} editable={true}/>} loader={MiPerfilAdministrativo}></Route>
            <Route path='Perfil/Editar' element={<AdministrativoEditarPerfil location={"MY_PROFILE_INFO"} type={'editar'}/>} loader={MiPerfilAdministrativo}></Route>
            
            <Route path='Estudiantes' element={<ListarEstudiantes/>} />
            <Route path='Estudiantes/Perfil' element={<PerfilEstudiante location={'ESTUDIANTE_INFORMATION'} editable={true} />} loader={GestionarEstudiante} />
            <Route path='Estudiantes/Perfil/Editar' element={<EstudianteEditarPerfil location={'ESTUDIANTE_INFORMATION'} type={'sudo'}/>} loader={GestionarEstudiante} />
            <Route path='Estudiantes/Registrar' element={<EstudianteEditarPerfil type={'registrar'} />} />

            <Route path='Docentes' element={<ListarDocentes/>}></Route>
            <Route path='Docentes/Perfil' element={<DocentePerfil location={'DOCENTE_INFORMATION'} editable={true} />} loader={GestionarDocente} />
            <Route path='Docentes/Perfil/Editar' element={<DocenteEditarPerfil location={'DOCENTE_INFORMATION'} type={'sudo'} />} loader={GestionarDocente} />
            <Route path='Docentes/Registrar' element={<DocenteEditarPerfil type={'registrar'}/>}/>
            
            <Route path='Administrativos' element={<AdministrativoListarAdministrativos/>} />
            <Route path='Administrativos/Perfil' element={<AdministrativoPerfil location={'ADMINISTRATIVO_INFORMATION'} editable={true} />} loader={GestionarAdministrativo}></Route>
            <Route path='Administrativos/Perfil/Editar' element={<AdministrativoEditarPerfil location={'ADMINISTRATIVO_INFORMATION'} type={'sudo'} />} loader={GestionarAdministrativo}></Route>
            <Route path='Administrativos/Registrar' element={<AdministrativoEditarPerfil type={'registrar'} />}></Route>

            
            <Route path='Ideas/Vista' element={<AdministrativoVistaIdea></AdministrativoVistaIdea>} />
            <Route path='Ideas' element={<AdministrativoListarIdeas></AdministrativoListarIdeas>} />
            <Route path='Planes' element={<AdministrativoListarPlanes></AdministrativoListarPlanes>} />
            <Route path='Planes/Vista' element={<PlanVer></PlanVer>} />
            <Route path='Entidades' element={<AdministrativoListarEntidades></AdministrativoListarEntidades>} />
            <Route path='VistaEntidades' element={<AdministrativoVistaEntidadFinanciadora></AdministrativoVistaEntidadFinanciadora>} />

            <Route path='Lider' element={<AdministrativoVerPerfilLider/>} />
            <Route path='Lider/Registrar' element={<LiderEditarPerfil type={'registrar'}/>} />
            <Route path='Lider/Editar' element={<LiderEditarPerfil location={'LIDER_INFORMATION'} type={'sudo'}/>} loader={GestionarLider}/>
            
            <Route path='Resultados/Listar' element={<LiderResultadosListar></LiderResultadosListar>} />
            <Route path='Resultados/Ver' element={<LiderResultadosVer></LiderResultadosVer>} />
            
          </Route>
          <Route path='/Docente' element={<TemplateDocente></TemplateDocente>}>
            <Route path='Perfil' element={<DocentePerfil location={'MY_PROFILE_INFO'} editable={true}/>} loader={MiPerfilDocente} />
            <Route path='Perfil/Editar' element={<DocenteEditarPerfil location={'MY_PROFILE_INFO'} type={'editar'}/>} loader={MiPerfilDocente} />
            <Route path='Tutor/Ideas/Vista' element={<DocenteTutorVerIdea></DocenteTutorVerIdea>} />
            <Route path='Tutor/Ideas' element={<DocenteTutorListarIdeas></DocenteTutorListarIdeas>} />
            <Route path='Apoyo/Ideas/Vista' element={<DocenteApoyoVerIdea></DocenteApoyoVerIdea>} />
            <Route path='Apoyo/Ideas' element={<DocenteApoyoListarIdeas></DocenteApoyoListarIdeas>} />
            <Route path='Evaluador/Ideas' element={<DocenteEvaluadorListarIdeas></DocenteEvaluadorListarIdeas>} />
            <Route path='Evaluador/Ideas/Vista' element={<DocenteEvaluadorVerIdea></DocenteEvaluadorVerIdea>} />
            <Route path='Tutor/Planes' element={<DocenteTutorListarPlanes></DocenteTutorListarPlanes>} />
            <Route path='Tutor/Planes/Vista' element={<PlanVer></PlanVer>} />
            <Route path='Apoyo/Planes' element={<DocenteApoyoListarPlanes></DocenteApoyoListarPlanes>} />
            <Route path='Apoyo/Planes/Vista' element={<PlanVer></PlanVer>} />
            <Route path='Evaluador/Planes' element={<DocenteEvaluadorListarPlanes></DocenteEvaluadorListarPlanes>} />
            <Route path='Evaluador/Planes/Vista' element={<PlanVer></PlanVer>} />
            <Route path='Entidades' element={<DocenteListarEntidades></DocenteListarEntidades>} />
            <Route path='VistaEntidades' element={<DocenteVistaEntidadFinanciadora></DocenteVistaEntidadFinanciadora>} />
            <Route path='Estudiantes' element={<ListarEstudiantes type={'docente'}></ListarEstudiantes>} />
            <Route path='Estudiantes/Perfil' element={<PerfilEstudiante location={'ESTUDIANTE_INFORMATION'}/>} loader={GestionarEstudiante} />
            <Route exact path='Tutor/Aceptar' component={DocenteAceptarTutoria} element={<DocenteAceptarTutoria></DocenteAceptarTutoria>} />
            <Route path='Tutor/Aceptar/:titulo' component={DocenteAceptarTutoria} element={<DocenteAceptarTutoria></DocenteAceptarTutoria>} />
            <Route path='Tutor/AceptarPlan/:tituloPlan' component={DocenteAceptarTutoriaPlan} element={<DocenteAceptarTutoriaPlan></DocenteAceptarTutoriaPlan>} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

export default function App() {
  return <><ContextProvider><RouterProvider router={router} /></ContextProvider></>;
}






