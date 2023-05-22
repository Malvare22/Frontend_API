import { Navigate, Outlet } from "react-router-dom";
import NavbarEstudiante from './Estudiante_Navbar'
import styled from "styled-components";

export default function TemplateEstudiante({ children }) {
    /*Método de validación: aplica para todo usuario, es preguntar si el usuario corresponde al rol*/

    return (<><div className="container-fluid row m-0 p-0">
        <div className="col-12 col-sm-2 m-0 p-0">
            <NavbarEstudiante></NavbarEstudiante>
        </div>
        <div className="col-12 col-sm-10 m-0 p-0 d-flex align-items-center justify-content-center">
            <Contenido>
                <Outlet></Outlet>
            </Contenido>
        </div>
    </div></>);

}

const Contenido = styled.div.attrs({
    className: 'flex-grow-1',
    
})`
    
    padding-bottom: 150px;
    @media screen and (max-width: 576px) {
        padding-bottom: 30px;
    }
`;