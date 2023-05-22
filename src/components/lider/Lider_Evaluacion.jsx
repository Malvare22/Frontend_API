import React from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Collapse, UncontrolledCollapse } from 'reactstrap';

const Evaluaciones = (props) => {
    let identificador = "#a" + props.identificador;
    let identificador2 = "a" + props.identificador;
    return (
        <main className="container-fluid" style={{ width: "95%" }}>
            <div className="row">
                <Sobreponer>
                    <div className="col-12">
                        <div id="titulo" className="rounded-5 my-2" style={{ background: props.color }}>
                            <div className="row">
                                <div className="d-flex col ms-3">
                                    <h5 className="m-0 p-2" style={{ color: "white" }}>Evaluación de idea de negocio - {props.estado} </h5>
                                </div>
                                <div className="d-flex justify-content-end align-items-center col-auto me-4">
                                    <svg id={identificador2} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-md bi-arrow-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <UncontrolledCollapse id="evaluacion" toggler={identificador}>
                            <div id="cuerpo" className="row mx-3 rounded-2" style={{ background: "#CECECE" }}>
                                <div className="mt-3">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="container rounded-1 mb-3" style={{ background: "#B4B4B4" }}>
                                                <p className="py-2" style={{ color: "#000" }}><b>Calificación:</b></p>
                                                <p className="d-flex justify-content-end" style={{ color: "#000", fontSize: "50px" }}><b>{props.estado}</b></p>
                                                <p className="py-2" style={{ color: "#000" }}><b>Observaciones:</b></p>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>Evaluador 1: </p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>{props.observacion}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>Evaluador 2: </p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>{props.observacion}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>Evaluador 3: </p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>{props.observacion}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="container rounded-1" style={{ background: "#B4B4B4" }}>
                                                <p className="py-2 d-flex justify-content-center" style={{ color: "#000" }}><b>Comité de evaluación</b></p>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>Evaluador 1: </p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>...</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>Evaluador 2: </p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>...</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>Evaluador 3: </p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <p style={{ color: "#000" }}>...</p>
                                                    </div>
                                                </div>
                                                <div className="row d-flex justify-content-end">
                                                    <button className="btn btn-sm" style={{ backgroundColor: "transparent", width: "auto" }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                                            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-auto">
                                                    <p style={{ color: "#000" }}><b>Fecha de corte: </b></p>
                                                </div>
                                                <div className="col-auto">
                                                    <p style={{ color: "#000" }}>{props.fecha}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </UncontrolledCollapse>
                    </div>
                </Sobreponer>
            </div>
        </main>
    )
};

export default Evaluaciones;

const Sobreponer = styled.div`

#titulo, #cuerpo{
    position: relative;
 }

 #titulo{
    z-index: 2;
 }

 #cuerpo{
    z-index: 1;
    top: -15px;
 }

`;