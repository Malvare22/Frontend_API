import { Navigate, Outlet } from "react-router-dom";
import NavbarAdmin from '../administrativo/Administrativo_Navbar'
import styled from "styled-components";
import Error404 from "../../routes/404_error";
import Footer from "../Footer";

export default function TemplateEstudiante({ children }) {
    /*Método de validación: aplica para todo usuario, es preguntar si el usuario corresponde al rol*/
    if (JSON.parse(localStorage.getItem('session')).rol == 'administrativo')
        return (<><div className="container-fluid row m-0 p-0">
            <div className="col-12 col-sm-2 m-0 p-0">
                <NavbarAdmin></NavbarAdmin>
            </div>
            <div className="col-12 col-sm-10 m-0 p-0 d-flex align-items-center justify-content-center">
                <Contenido>
                    <Outlet></Outlet>
                </Contenido>
            </div>
        </div>
            <Footer></Footer>
        </>);
    else return (<Error404></Error404>)
}

const Contenido = styled.div.attrs({
    className: 'flex-grow-1',

})`

`;





