import { Navigate, Outlet } from "react-router-dom";
import NavbarLU from '../lider/Lider_Navbar'
import styled from "styled-components";

export default function TemplateLider({ children }) {
    /*Método de validación: aplica para todo usuario, es preguntar si el usuario corresponde al rol*/

    return (<><div className="container-fluid row m-0 p-0">
        <div className="col-12 col-sm-2 m-0 p-0">
            <NavbarLU></NavbarLU>
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

`;