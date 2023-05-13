import { Navigate, Outlet } from "react-router-dom";
import Navbar from '../NavBar'
export default function TemplateEstudiante({ children }) {
    /*Método de autenticación*/

    /**/
    return (<><div className="container-fluid row m-0 p-0">
        <div className="col-2 m-0 p-0">
            <Navbar></Navbar>
        </div>
        <div className="col-10 m-0 p-0">
            <Outlet></Outlet>
        </div>
        
    </div></>);
}