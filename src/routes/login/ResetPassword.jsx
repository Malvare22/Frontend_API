//import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Login/Emprender_Aprender.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function Screen() {
    const { token } = useParams();
    console.log(token)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const navigate = useNavigate();
    const backToggler = () => {
        navigate('/login');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === '') {
            alert('Ingresa una contraseña.');
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&]).{6,}$/.test(password)) {
            alert('La contraseña no cumple los requisitos. Debe tener al menos una letra mayúscula, un dígito y un carácter especial (!@#$%^&), y tener una longitud mínima de 6 caracteres.');
        } else if (password === confirmPassword) {
            axios.patch('localhost:8080/coordinador/resetPassword', { "password": password }, { headers: { 'X-Softue-JWT': token } })
                .then((response) => {
                    navigate('../../Login')                    
                })
                .catch((error) => {
                    alert('No se ha podido reestablecer su contraseña, por favor contacte al lider de la unidad de emprendimiento.')
                    navigate('../../Login')     
                });
        } else {
            alert('Las contraseñas no coinciden, por favor verifique.');
        }
    };
    return (<div className="container-fluid" style={{ background: "#1C3B57" }}>
        <div className="row p-5 d-flex justify-content-center">
            <div className="col-md-6 col-12 p-5 d-flex justify-content-center align-items-center" style={{ background: "#68462C" }}>
                <div className="flex-grow-1">
                    <h2 className="text-center mb-5" style={{ color: "white", fontWeight: "bold" }}>SoftUE</h2>
                    <div className="container border rounded m-0" style={{ backgroundColor: "#D9D9D9" }}>
                        <div className="text-center m-3">
                            <img src={logo} className="" style={{ width: "30%" }} alt="Logo" />
                        </div>
                        {confirmationMessage ? (
                            <div className="text-center mt-4">
                                <p>{confirmationMessage}</p>
                            </div>
                        ) : (
                            <StyledDiv>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <p className="text-center mt-4 fw-bold">Introduzca la nueva contraseña</p>

                                        <div className="d-flex justify-content-center">
                                            <input className="form-control border-0 border-bottom rounded-0 border-dark shadow-none w-75" style={{ backgroundColor: "#D9D9D9" }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <p className="text-center mt-4 fw-bold">Repita la nueva contraseña</p>

                                        <div className="d-flex justify-content-center">
                                            <input className="form-control border-0 border-bottom rounded-0 border-dark shadow-none w-75" style={{ backgroundColor: "#D9D9D9" }} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center align-content-center">
                                        <button type="button" className="btn m-4" style={{ backgroundColor: "#2B9877", color: "white" }} onClick={backToggler}>
                                            <p className="d-flex align-items-center justify-content-center m-1">Volver</p>
                                        </button>
                                        <button type="submit" className="btn m-4" style={{ backgroundColor: "#2B9877", color: "white" }}>
                                            <p className="d-flex align-items-center justify-content-center m-1">Cambiar contraseña</p>
                                        </button>
                                    </div>
                                </form>
                            </StyledDiv>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

const StyledDiv = styled.div`
    @media only screen and  (max-width: 768px){
        p{font-size: 1rem;}
    }
`;