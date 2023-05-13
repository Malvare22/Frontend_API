import { Navigate, Outlet } from "react-router-dom";
import Navbar from '../NavBar'
import NavbarLU from '../NavBarLU'
import NavbarAdmin from '../NavBarAdmin'
import NavbarDocente from '../NavBarDocente'
export default function TemplateEstudiante({ children }) {
    /*Método de autenticación*/

    /**/
    return (<><div className="container-fluid row m-0 p-0">
        <div className="col-2 m-0 p-0">
            <NavbarDocente></NavbarDocente>
        </div>
        <div className="col-10 m-0 p-0">
            <Outlet></Outlet>
        </div>
        
    </div></>);
}