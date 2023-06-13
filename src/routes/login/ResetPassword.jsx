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
        if (confirmPassword === '') {
            alert('Ingresa la confirmación de la contraseña.');
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+]).{6,}$/.test(password)) {
            alert('La contraseña no cumple los requisitos. Debe tener al menos una letra mayúscula, un dígito y un carácter especial (!@#$%^&), y tener una longitud mínima de 6 caracteres.');
        } else if (password === confirmPassword) {
            axios.patch('http://localhost:8080/administrativo/resetPassword', { "password": password }, { headers: { 'X-Softue-Reset': token } })
                .then((response) => {
                    alert('Se ha reestablecido su contraseña, verifique su bandeja de entrada.');
                    navigate('../../Login');
                })
                .catch((error) => {
                    alert('No se ha podido restablecer su contraseña, por favor contacte al líder de la unidad de emprendimiento.');
                    navigate('../../Login');
                });
        } else {
            alert('Las contraseñas no coinciden, por favor verifique.');
        }
    };

    const [type, setType] = useState('password');
    const changeType = () => {
        if (type === 'password') {
            setType('text');
        }
        else {
            setType('password');
        }
    };
    const [type2, setType2] = useState('password');
    const changeType2 = () => {
        if (type2 === 'password') {
            setType2('text');
        }
        else {
            setType2('password');
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className='m-1 mb-0 mt-0 bi bi-lock-fill' width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                            </svg>
                                            <input className="form-control border-0 border-bottom rounded-0 border-dark shadow-none w-75" style={{ backgroundColor: "#D9D9D9" }} type={type} value={password} onChange={(e) => setPassword(e.target.value)} />
                                            {type === 'password' ? <svg xmlns="http://www.w3.org/2000/svg" onClick={changeType} className='bi bi-eye-fill' width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" onClick={changeType} width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                            </svg>}
                                        </div>
                                        <p className="text-center mt-4 fw-bold">Repita la nueva contraseña</p>

                                        <div className="d-flex justify-content-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className='m-1 mb-0 mt-0 bi bi-lock-fill' width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                            </svg>
                                            <input className="form-control border-0 border-bottom rounded-0 border-dark shadow-none w-75" style={{ backgroundColor: "#D9D9D9" }} type={type2} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                            {type2 === 'password' ? <svg xmlns="http://www.w3.org/2000/svg" onClick={changeType2} className='bi bi-eye-fill' width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" onClick={changeType2} width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                            </svg>}
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