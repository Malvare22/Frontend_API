import { Navigate, Outlet } from "react-router-dom";
import NavbarDocente from '../docente/Docente_Navbar'

export default function TemplateEstudiante({ children }) {
    /*Método de validación: aplica para todo usuario, es preguntar si el usuario corresponde al rol*/

    return (<><div className="container-fluid row m-0 p-0">
        <div className="col-12 col-sm-2 m-0 p-0">
            <NavbarDocente></NavbarDocente>
        </div>
        <div className="col-12 col-sm-10 m-0 p-0">
            <Outlet></Outlet>
        </div>
    </div></>);

}