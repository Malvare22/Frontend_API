import styled from "styled-components";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, UncontrolledCollapse } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Historial from "./Docente_Apoyo_Plan_Historial.jsx";



export default function VistaIdea() {
    return (<div className="row">
        <InfoGeneral nombre={localStorage.getItem("titulo")}></InfoGeneral>
        <Observaciones nombre={localStorage.getItem("titulo")}></Observaciones>
        <div className="container-fluid" style={{ width: "95%" }}>
            <div className="row">
                <div className="col-12">
                    <div className="rounded-5 mt-2" style={{ background: "#1C3B57" }}>
                        <h5 className="p-2 ms-3" style={{ color: "white" }}>Evaluaciones</h5>
                    </div>
                </div>
            </div>
        </div>
        <Historial nombre={localStorage.getItem("titulo")}></Historial>
    </div>
    )
};

const InfoGeneral = () => {

    const [viewAlert, setViewAlert] = useState(false);
    const toggleAlert = () => {
        setViewAlert(!viewAlert);
    }

    const [viewAlertDocente, setViewAlertDocente] = useState(false);
    const toggleAlertDocente = () => {
        setViewAlertDocente(!viewAlertDocente);
    }

    const [viewAlertEstudiante, setViewAlertEstudiante] = useState(false);
    const toggleAlertEstudiante = () => {
        setViewAlertEstudiante(!viewAlertEstudiante);
    }

    const [viewAlertEliminar, setViewAlertEliminar] = useState(false);
    const toggleAlertEliminar = () => {
        setViewAlertEliminar(!viewAlertEliminar);
    }

    const [viewAlertEliminarApoyo, setViewAlertEliminarApoyo] = useState(false);
    const toggleAlertEliminarApoyo = () => {
        setViewAlertEliminarApoyo(!viewAlertEliminarApoyo);
    }

    const [Area, setArea] = useState(String);
    const setArea_A = (a) => {
        setArea(a);
    }

    const [Agregar, setAgregar] = useState(String);
    const setAgregare = (a) => {
        setAgregar(a);
    }


    const [datos1, setDatos1] = useState();
    const getDatos1 = async () => {
        let value = null;
        value = await axios.get('../../../ideasdeveritas.json').then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setDatos1(value)

    };
    useEffect(() => {
        getDatos1();
    }, []);


    const [profesores, setProfesores] = useState([]);
    const getProfesores = async () => {
        let value = null;
        value = await axios.get('../../../docentesdeveritas.json').then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setProfesores(value)
    };
    useEffect(() => {
        getProfesores();
    }, []);

    const [estudiantes, setEstudiantes] = useState([]);
    const getEstudiantes = async () => {
        let value = null;
        value = await axios.get('../../../estudiantesdeveritas.json').then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setEstudiantes(value)
    };
    useEffect(() => {
        getEstudiantes();
    }, []);

    let set = new Set();
    let set1 = new Set();
    let set2 = new Set();
    return (


        <div className="container-fluid mt-4 mt-sm-0 " style={{ width: "95%" }}>
            {datos1 &&

                <div className="row">

                    <div className="col-12">
                        <div>
                            <div className="rounded-5" style={{ background: "#1C3B57" }}>
                                <h5 className="p-2 ms-3" style={{ color: "white" }}>Información general</h5>
                            </div>
                            <div className="row mx-4">
                                <div className="d-flex flex-column col-7">
                                    <div className="m-2">
                                        <div className="row mt-2">
                                            <div className="col-auto">
                                                <h6 className="font-weight-bold"><b>Título:</b></h6>
                                            </div>
                                            <div className="col-auto">
                                                <p>{datos1.titulo}</p>
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col-auto">
                                                <h6 className="font-weight-bold"><b>Integrante lider:</b></h6>
                                            </div>
                                            <div className="col-auto">
                                                <ul> {datos1.estudianteLiderInfo[1]}  </ul>
                                            </div>
                                        </div>
                                        
                                        <div className="row mt-2">
                                            <div className="col-auto">
                                                <h6 className="font-weight-bold"><b>Integrantes:</b></h6>
                                            </div>
                                            <div className="col-auto">
                                                <ul>

                                                    {datos1.estudiantesIntegrantesInfo[1].map((l, i) => {
                                                        return (<li key={i}>{l}</li>);
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-auto">
                                                <h6 className="font-weight-bold"><b>Tutor:</b></h6>
                                            </div>
                                            <div className="col-auto">
                                                <p>{datos1.tutorInfo[1]}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-auto">
                                                <h6 className="font-weight-bold"><b>Área de conocimiento:</b></h6>
                                            </div>
                                            <div className="col-auto">
                                                <p>{datos1.areaEnfoque}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-auto">
                                                <h6 className="font-weight-bold"><b>Docentes de apoyo:</b></h6>
                                            </div>
                                            <div className="col-auto">
                                                <ul>
                                                    {datos1.docentesApoyoInfo[1].map((l, j) => {
                                                        return (<li key={j}>{l}</li>);
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-auto">
                                                <h6 className="font-weight-bold"><b>Descripción:</b></h6>
                                            </div>
                                            <div className="col-auto">
                                                {datos1 && datos1.descripcion}
                                            </div>
                                            <div className="col-auto"><button type="button" style={{ background: "#1C3B57", color: "white" }} className="btn btn-sm rounded-5 mt-4 m-2 p-2 px-3">Descargar formato completo</button></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex col-5 justify-content-end">
                                    <SProgress>
                                        <div id="progreso" className="progress blue">
                                            <span className="progress-left">
                                                <span className="progress-bar"></span>
                                            </span>
                                            <span className="progress-right">
                                                <span className="progress-bar"></span>
                                            </span>
                                            <div className="progress-value">75%</div>
                                        </div>
                                    </SProgress>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            }

            {/* <Modal centered isOpen={viewAlert}>
                <ModalBody>
                    <FormGroup>
                        <Label for="Nombre">Escribe el nuevo nombre de tu Plan de negocio</Label>
                        <Input type="text" name="name" id="exampleSelect"></Input>
                        <Label id="texto">Escoge el area de tu proyecto</Label>
                        <Label for="exampleSelect"></Label>
                        <Input type="select" name="select" id="exampleSelect">
                            {profesores && profesores.map((l, i) => {
                                if (set.has(l.area)) {
                                    return ("");
                                } else {
                                    set.add(l.area);
                                    return (<option key={i} value={l.area}>{l.area}</option>);
                                }
                            })}
                        </Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger">Asignar</Button>
                    <Button color="primary" onClick={toggleAlert}>Cancelar</Button>
                </ModalFooter>
            </Modal>



            <Modal centered isOpen={viewAlertEliminar}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Quieres eliminar a este estudiante {Agregar}?</Label>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger">Eliminar</Button>
                    <Button color="primary" onClick={toggleAlertEliminar}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal centered isOpen={viewAlertEliminarApoyo}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Quieres eliminar a este docente de apoyo {Agregar}? </Label>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger">Eliminar</Button>
                    <Button color="primary" onClick={toggleAlertEliminarApoyo}>Cancelar</Button>
                </ModalFooter>
            </Modal>


            <Modal centered isOpen={viewAlertDocente}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">Escoge al docente que necesitas</Label>
                        <Label for="exampleSelect"></Label>
                        <Input type="select" name="select" onChange={(e) => { setArea_A(e.target.value) }} id="exampleSelect">
                            {profesores && profesores.map((l, i) => {
                                if (set1.has(l.area)) {
                                    return ("");
                                } else {
                                    set1.add(l.area);
                                    return (<option key={i} value={l.area}>{l.area}</option>);
                                }
                            })}
                        </Input>
                        <Label for="exampleSelectMulti">Select Multiple</Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                            {profesores && profesores.map((l) => {
                                if (l.area === Area) {
                                    return (<option key={l.correo} value={l.correo}>{l.nombre + l.apellido}</option>);
                                } else {
                                    return ("");
                                }
                            })}

                        </Input>
                    </FormGroup>
                    <ModalFooter>
                        <Button color="danger">Asignar</Button>
                        <Button color="primary" onClick={toggleAlertDocente}>Cancelar</Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>


            <Modal centered isOpen={viewAlertEstudiante}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">Escoge el curso del estudiante</Label>
                        <Label for="exampleSelect"></Label>
                        <Input type="select" name="select" onChange={(e) => { setArea_A(e.target.value) }} id="exampleSelect">
                            {estudiantes && estudiantes.map((l, i) => {
                                if (set2.has(l.curso)) {
                                    return ("");
                                } else {
                                    set2.add(l.curso);
                                    return (<option key={i} value={l.curso}>{l.curso}</option>);
                                }
                            })}
                        </Input>
                        <Label for="exampleSelectMulti">Selecciona al estudiante</Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                            {estudiantes && estudiantes.map((l) => {
                                if (l.curso === Area) {
                                    return (<option key={l.correo} value={l.correo}>{l.nombre + l.apellido}</option>);
                                } else {
                                    return ("");
                                }
                            })}

                        </Input>
                    </FormGroup>

                    <ModalFooter>
                        <Button color="danger">Asignar</Button>
                        <Button color="primary" onClick={toggleAlertEstudiante}>Cancelar</Button>
                    </ModalFooter>
                </ModalBody>
            </Modal> */}
        </div>
    )
};

const SProgress = styled.div`
.progress {
  width: 150px;
  height: 150px !important;
  float: left; 
  line-height: 150px;
  background: none;
  margin: 20px;
  box-shadow: none;
  position: relative;
}
.progress:after {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 12px solid #CECECE;
  position: absolute;
  top: 0;
  left: 0;
}
.progress>span {
  width: 50%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 1;
}
.progress .progress-left {
  left: 0;
}
.progress .progress-bar {
  width: 100%;
  height: 100%;
  background: none;
  border-width: 12px;
  border-style: solid;
  position: absolute;
  top: 0;
}
.progress .progress-left .progress-bar {
  left: 100%;
  border-top-right-radius: 80px;
  border-bottom-right-radius: 80px;
  border-left: 0;
  -webkit-transform-origin: center left;
  transform-origin: center left;
}
.progress .progress-right {
  right: 0;
}
.progress .progress-right .progress-bar {
  left: -100%;
  border-top-left-radius: 80px;
  border-bottom-left-radius: 80px;
  border-right: 0;
  -webkit-transform-origin: center right;
  transform-origin: center right;
  animation: loading-1 1.8s linear forwards;
}
.progress .progress-value {
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: #fff;
  font-size: 24px;
  color: #000;
  line-height: 135px;
  text-align: center;
  position: absolute;
  top: 5%;
  left: 5%;
}
.progress.blue .progress-bar {
  border-color: #1C3B57;
}
.progress.blue .progress-left .progress-bar {
  animation: loading-2 1.5s linear forwards 1.8s;
}

@keyframes loading-1 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}
@keyframes loading-2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
}
@media screen and (max-width:576px){
    #progreso{
        display:none;
    }
}
`;

const Observaciones = () => {

    return (
        <main className="container-fluid" style={{ width: "95%" }}>
            <div className="row">
                <Sobreponer>
                    <div className="col-12">
                        <div id="titulo" className="rounded-5 mt-2" style={{ background: "#515454" }}>
                            <div className="row">
                                <div className="d-flex col ms-3">
                                    <h5 className="m-0 p-2" style={{ color: "white" }}>Observaciones de Plan de negocio</h5>
                                </div>
                                <div className="d-flex justify-content-end align-items-center col-auto me-4">

                                    <svg id="arrowObservaciones" style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-md bi-arrow-down" viewBox="0 0 16 16">

                                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <UncontrolledCollapse id="observaciones" toggler="#arrowObservaciones">
                            <div id="cuerpo" className="row mx-3 rounded-2" style={{ background: "#CECECE" }}>
                                <div className="mt-3">
                                    <Tabla></Tabla>
                                </div>
                            </div>
                            <div className="col-12">

                            </div>
                        </UncontrolledCollapse>
                    </div>
                </Sobreponer>
            </div>
        </main>
    )
};

const Sobreponer = styled.div`
#titulo, #cuerpo{
    position: relative;
 }

 #titulo{
    z-index: 2;
 }

 #cuerpo{
    z-index: 1;
    top: -5px;
 }
 
 `;

const Sdiv = styled.div`
            table{
                table-layout: fixed;
            }
            
            th, td {
                border: 1px solid;
                width: 100px;
                word-wrap: break-word;
            }
            table th{
                background-color: #1C3B57;
                color: #FFF;
            }
            table td{
              background-color:#FFF;
            }
            overflow-y: scroll;
            height: fit-content;
            max-height: 66.4vh;
            
            @media screen and (max-width: 576px){
                th, td {
                    width: 60px;
                }}
          `;

function Tabla() {

    return (
        <Sdiv>
            <Form>
                <div className='w-auto  row m-2'>

                    <div className="col-12 col-sm-6 align-content-center justify-content-center ">
                        <FormGroup>
                            <Label for="estado">Asigna una calificacion al proyecto</Label>
                            <Input type="select" name="estado" id="estado">
                                <option value="Aprobado">Aprobado</option>
                                <option value="Rechazado">Rechazado</option>
                            </Input>
                        </FormGroup>
                    </div>

                    <div className="col-12 col-sm-6 align-content-center justify-content-center ">
                        <FormGroup>
                            <Label for="Observacion">Observaciones</Label>
                            <Input type="textarea" name="Observacion" id="Observacion" />
                        </FormGroup>
                    </div>
                    <div className="d-flex justify-content-center  ">
                        <Button className="m-2" style={{ backgroundColor: "#1C3B57" }}>Enviar</Button>
                    </div>

                </div>
            </Form>
        </Sdiv>
    );
}










