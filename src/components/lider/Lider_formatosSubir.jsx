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
                                    <div className=''>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="currentColor" className="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                        </svg>
                                        <div className="mt-3 align-items-center justify-content-center">
                                            <p>
                                                <b>4. Subir formato de la idea de negocio</b>
                                            </p>
                                            <button type="button" style={{ background: "#1C3B57", color: "white" }} className="btn d-flex align-items-center justify-content-center">
                                                Seleccione el archivo
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-up mx-2" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div  className="col-auto d-flex align-items-center justify-content-center mt-3">
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