//import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import image from '../../assets/images/Login/login.png'
import logo from '../../assets/images/Login/Emprender_Aprender.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Screen() {

    const navigate = useNavigate();
    const backToggler = () => {
        navigate('/login');
    };
    const [type, setType] = useState(0);

    return (
        <div className='container-fluid' style={{ background: "#1C3B57" }}>
            <div className='row p-5 d-flex justify-content-center'>
                <div className='col-md-6 col-12 p-5 d-flex justify-content-center align-items-center' style={{ background: "#68462C" }}>
                    <div className='flex-grow-1'>
                        <h2 className='text-center mb-5' style={{ color: "white", fontWeight: "bold" }}>SoftUE</h2>
                        <div className='container border rounded m-0' style={{ backgroundColor: "#D9D9D9" }}>
                            <div className='text-center m-3'>
                                <img src={logo} className='' style={{ width: "30%" }}></img>
                            </div>
                            {(type == 0 || type == 1) && <PanelPrincipal type={type} setType={setType} navigate={navigate} backToggler={backToggler}></PanelPrincipal>}
                            {type == 2 && <PanelSuccess navigate={navigate} backToggler={backToggler}></PanelSuccess>}
                            {type == 3 && <PanelStudent navigate={navigate} backToggler={backToggler}></PanelStudent>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



const PanelSuccess = (props) => {
    return (
        <StyledDiv>
            <div>
                <p className='text-center m-5 mb-0 mt-4 fw-bold'>Se ha enviado una contraseña temporal a su correo, verifique su bandeja de entrada</p>
            </div>
            <div className='d-flex justify-content-center align-content-center'>
                <button type="button" onClick={props.backToggler} className="btn m-4" style={{ backgroundColor: "#2B9877", color: "white" }}>
                    <p className='d-flex align-items-center justify-content-center m-1'>Volver</p>
                </button>
            </div>
        </StyledDiv>
    );
}

const PanelStudent = (props) => {
    return (
        <StyledDiv>
            <div>
                <p className='text-center mt-4 fw-bold'>Por favor, contacte el lider de la unidad de emprendimiento para reestablecer su contraseña</p>
            </div>
            <div className='d-flex justify-content-center align-content-center'>
                <button type="button" onClick={props.backToggler} className="btn m-4" style={{ backgroundColor: "#2B9877", color: "white" }}>
                    <p className='d-flex align-items-center justify-content-center m-1'>Volver</p>
                </button>
            </div>
        </StyledDiv>
    );
}

const PanelPrincipal = (props) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const validar = (user) => {
        let temp = 0;
        if (user == "No") temp = 1;
        if (user == "Otro") temp = 2;
        if (user == "Estudiante") temp = 3;
        return temp;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(email);
        if (isValidEmail) {
            axios.get(`http://localhost:8080/coordinador/forgotPassword/${email}`).then((response) => {
                alert("Se ha enviado un correo para reestablecer su contraseña, verifique su bandeja de entrada.")
                navigate('/Login');
            }).catch((error) => {
                alert("No se ha podido reestablecer su contraseña, contacte con el lider de la unidad de emprendimiento.")
                navigate('/Login');
            });
        }
    }
    return (
        <StyledDiv>
            <form onSubmit={handleSubmit}>
                <div>
                    {props.type == 1 && <ErrorMessage></ErrorMessage>}
                    <p className='text-center mt-4 fw-bold'>Introduza su e-mail para recuperar la contraseña:</p>
                    <div className='d-flex justify-content-center'>
                        <input onChange={(e) => setEmail(e.target.value)} className='form-control border-0 border-bottom rounded-0 border-dark shadow-none w-75' value={email} style={{ backgroundColor: "#D9D9D9" }}></input>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-content-center'>
                    <button type="button" onClick={props.backToggler} className="btn m-4" style={{ backgroundColor: "#2B9877", color: "white" }}>
                        <p className='d-flex align-items-center justify-content-center m-1'>Volver</p>
                    </button>
                    <button type="submit" className="btn m-4" style={{ backgroundColor: "#2B9877", color: "white" }}>
                        <p className='d-flex align-items-center justify-content-center m-1'>Enviar</p>
                    </button>
                </div>
            </form>
        </StyledDiv>
    );
};

const ErrorMessage = () => {
    return (
        <div style={{ background: "#DC4B4B" }} className='d-flex justify-content-center align-items-center rounded p-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div className='text-white m-2 mt-1 mb-1'>Usuario y/o contraseña incorrectos</div>
        </div>);
};

const StyledDiv = styled.div`


    @media only screen and  (max-width: 768px){
        p{font-size: 1rem;}
    }
`;