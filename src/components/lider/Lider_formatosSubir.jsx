import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import styled from 'styled-components';
import axios from "axios";
import Form from 'react-bootstrap/Form';


// Componente principal que contiene la tabla y los filtros
export default function Subir_Formatos() {
    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Formato proyectos de emprendimiento</h1>
                    <div className="container">
                        <div className="mt-3">
                            <form>
                                <div className='row'>
                                    <div className="col-auto d-flex align-items-center mb-1">
                                        <select name="area" className="form-select-sm selector fw-bold text-black">
                                            <option defaultValue="0">Seleccione tipo</option>
                                            <option defaultValue="idea">Idea de negocio</option>
                                            <option defaultValue="plan">Plan de negocio</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-3 rounded d-flex align-items-center justify-content-center" style={{ background: "#ECECEC", padding: "10px" }}>
                                    <div>
                                        <img src="https://live.staticflickr.com/65535/52935272392_1eff2004b3_o.png" className='img-fluid' />
                                        <div className="mt-3">
                                            <p className='text-center'>
                                                <b>4. Subir formato de la idea de negocio</b>
                                            </p>
                                            <div>
                                                <button type="button" style={{ background: "#1C3B57", color: "white" }} className="btn d-flex align-items-center justify-content-center m-auto">
                                                    Seleccione el archivo
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-up mx-2" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto d-flex align-items-center justify-content-center mt-3">
                                    <button style={{ background: "#1C3B57", color: "white" }} type="submit" className="btn text-white">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}