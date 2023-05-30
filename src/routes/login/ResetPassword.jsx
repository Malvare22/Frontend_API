//import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Login/Emprender_Aprender.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Screen() {
    const navigate = useNavigate();
    const backToggler = () => {
        navigate('/login');
    };
    return (
        <div className='container-fluid' style={{ background: "#1C3B57" }}>
            <div className='row p-5 d-flex justify-content-center'>
                <div className='col-md-6 col-12 p-5 d-flex justify-content-center align-items-center' style={{ background: "#68462C" }}>
                    <div className='flex-grow-1'>
                        <h2 className='text-center mb-5' style={{ color: "white", fontWeight: "bold" }}>SoftUE</h2>
                        <div className='container border rounded m-0' style={{ backgroundColor: "#D9D9D9" }}>
                            <div className='text-center m-3'>
                                <img src={logo} className='' style={{ width: "30%" }}/>
                            </div>
                            <StyledDiv>
                                <form>
                                    <div>
                                        <p className='text-center mt-4 fw-bold'>Introduzca la nueva contraseña</p>

                                        <div className='d-flex justify-content-center'>
                                            <input className='form-control border-0 border-bottom rounded-0 border-dark shadow-none w-75' style={{ backgroundColor: "#D9D9D9" }}></input>
                                        </div>
                                        <p className='text-center mt-4 fw-bold'>Repita la nueva contraseña</p>

                                        <div className='d-flex justify-content-center'>
                                            <input className='form-control border-0 border-bottom rounded-0 border-dark shadow-none w-75' style={{ backgroundColor: "#D9D9D9" }}></input>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center align-content-center'>
                                        <button type="button" className="btn m-4" style={{ backgroundColor: "#2B9877", color: "white" }}>
                                            <p className='d-flex align-items-center justify-content-center m-1'>Volver</p>
                                        </button>
                                        <button type="submit" className="btn m-4" style={{ backgroundColor: "#2B9877", color: "white" }}>
                                            <p className='d-flex align-items-center justify-content-center m-1'>Cambiar contraseña</p>
                                        </button>
                                    </div>
                                </form>
                            </StyledDiv>
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






