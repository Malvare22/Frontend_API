import styled from "styled-components";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, UncontrolledCollapse } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Historial from "./Estudiante_Plan_Historial";


export default function VistaIdea() {
    return (<div className="row">
        <InfoGeneral></InfoGeneral>
        <Observaciones></Observaciones>
        <div className="container-fluid" style={{ width: "95%" }}>
            <div className="row">
                <div className="col-12">
                    <div className="rounded-5 mt-2" style={{ background: "#1C3B57" }}>
                        <h5 className="p-2 ms-3" style={{ color: "white" }}>Evaluaciones</h5>
                    </div>
                </div>
            </div>
        </div>
        <Historial></Historial>
    </div>
    )
};

const InfoGeneral = () => {

    const [viewAlert, setViewAlert] = useState(false);
    const toggleAlert = () => {
        setViewAlert(!viewAlert);
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
        value = await axios.get('../../../docentes.json').then(
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

    let set = new Set();

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
                                    <div className="m-2 mb-4">
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
                                                        return (<li key={j} >{l}</li>);
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-auto">
                                                <h6 className="font-weight-bold"><b>Descripción:</b></h6>
                                            </div>
                                            <div className="col-auto mb-3">
                                                {datos1 && datos1.descripcion}
                                            </div>
                                            <div className="col-auto"><button type="button" style={{ background: "#1C3B57", color: "white" }} className="btn btn-sm rounded-5  m-2 p-2 px-3">Descargar formato completo</button></div>
                                            <div className="col-auto"><button onClick={toggleAlert} type="button" style={{ background: "#C29B10", color: "white" }} className="btn btn-sm btn-warning rounded-5 m-2 p-2 px-3">  Editar  </button></div>
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

            <Modal centered isOpen={viewAlert}>
                <ModalBody>
                    <FormGroup>
                    <Label for="descripcion" id="descripcion">Descripcion:</Label>
                        <Input style={{minHeight: "300px"}} type="textarea" name="text" id="exampleText" value={datos1 && datos1.descripcion} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger">Asignar</Button>
                    <Button color="primary" onClick={toggleAlert}>Cancelar</Button>
                </ModalFooter>
            </Modal>
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
                                    <div className="d-flex m-3 align-content-center justify-content-center col-12">
                                        <Form >
                                            <FormGroup>
                                                <div className="d-flex justify-content-center">
                                                <Label for="exampleFile"><b>Subir archivo:</b></Label>
                                                
                                                </div>
                                                <Input type="file" name="file" id="exampleFile" />
                                                
                                            </FormGroup>
                                            <div className="d-flex justify-content-center">
                                                <Button style={{backgroundColor : "#1C3B57"}} >Enviar</Button>
                                            </div>
                                            
                                        </Form>
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

function Tabla(props) {
    const [datos, setDatos] = useState([]);
    const getIdeas = async () => {
        let value = null;
        value = await axios.get('../../../Observaciones.json').then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setDatos(value)
    };
    useEffect(() => {
        getIdeas();
    }, []);
    return (
        <Sdiv>
            <div className='w-auto m-2'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col-auto">Docente</th>
                            <th className='text-center' scope="col-auto">Fecha</th>
                            <th className='text-center' scope="col-auto">Observación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos && datos.map((d) => (
                            <tr key={d.id}>
                                <td className='text-center align-middle col-auto'>{d.docenteInfo[1]}</td>
                                <td className='text-center align-middle'>{d.fecha[2]}/{d.fecha[1]}/{d.fecha[0]}</td>
                                <td className='text-center align-middle col-auto'>{d.retroalimentacion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Sdiv>
    );
}

