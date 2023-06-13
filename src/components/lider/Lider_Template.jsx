import { Navigate, Outlet, json, useNavigate } from "react-router-dom";
import NavbarLU from '../lider/Lider_Navbar'
import styled from "styled-components";
import Login from "../../routes/login/Login";
import { useEffect } from "react";
import Error404 from "../../routes/404_error";
import Footer from "../Footer";

export default function TemplateLider({ children }) {
    /*Método de validación: aplica para todo usuario, es preguntar si el usuario corresponde al rol*/
    const navigate = useNavigate()
    const Token = localStorage.getItem('token_access')
    const Usuario = JSON.parse(localStorage.getItem('session'))

    if(JSON.parse(localStorage.getItem('session')).rol == 'coordinador')
    return (
        <>
            <div className="container-fluid row m-0 p-0">
                <div className="col-12 col-sm-2 m-0 p-0">
                    <NavbarLU></NavbarLU>
                </div>
                <div className="col-12 col-sm-10 m-0 p-0 d-flex align-items-center justify-content-center">
                    <Contenido>
                        <Outlet></Outlet>
                    </Contenido>
                </div>
            </div>
            <Footer></Footer>
        </>
    );

    else return(<Error404></Error404>)

}

const Contenido = styled.div.attrs({
    className: 'flex-grow-1',

})`
`;








