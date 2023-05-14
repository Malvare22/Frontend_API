import { Navigate, Outlet } from "react-router-dom";
import NavbarEstudiante from './Estudiante_Navbar'
import NavbarLU from '../lider/Lider_Navbar'
import NavbarAdmin from '../administrativo/Administrativo_Navbar'
import NavbarDocente from '../docente/Docente_Navbar'
export default function TemplateEstudiante({ children }) {
    /*Método de autenticación*/

    /**/
    return (<><div className="container-fluid row m-0 p-0">
        <div className="col-12 col-sm-3 m-0 p-0">
            <NavbarDocente></NavbarDocente>
        </div>
       <div className="col-12 col-sm-9 m-0 p-0">
            HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAA
       </div>
        
    </div></>);
}