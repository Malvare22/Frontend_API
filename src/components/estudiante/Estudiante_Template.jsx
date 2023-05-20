import { Navigate, Outlet } from "react-router-dom";
import NavbarEstudiante from './Estudiante_Navbar'
import NavbarLU from '../lider/Lider_Navbar'
import NavbarAdmin from '../administrativo/Administrativo_Navbar'
import NavbarDocente from '../docente/Docente_Navbar'

export default function TemplateEstudiante({ children }) {
    /*Método de validación: aplica para todo usuario, es preguntar si el usuario corresponde al rol*/

    return (<><div className="container-fluid row m-0 p-0">
        <div className="col-12 col-sm-2 m-0 p-0">
            <NavbarEstudiante></NavbarEstudiante>
        </div>
        <div className="col-12 col-sm-10 m-0 p-0">
            <div>CONTENIDO</div>
        </div>
    </div></>);

}