import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Button, Collapse, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, UncontrolledCollapse } from 'reactstrap';

const Evaluaciones = (props) => {
    let identificador = "#a" + props.identificador;
    let identificador2 = "a" + props.identificador;
    let estado = props.estado;

    let set = new Set();

    const [Area, setArea] = useState(String);
    const setArea_A = (a) => {
        setArea(a);
    }

    const [viewAlert, setViewAlert] = useState(false);
    const toggleAlert = () => {
        setViewAlert(!viewAlert);
    }

    const eliminar = (a) => {
        ObtenerIdElimnar(a);
        bottomEliminar();
        
    }

    const [viewEliminar, setViewEliminar] = useState(false);
    const bottomEliminar = () => {
        setViewEliminar(!viewEliminar);
    }

    const [idEliminar, setidEliminar] = useState(String);
    const ObtenerIdElimnar = (a) => {
        setidEliminar(a);
    }

    //AXIOS PARA RECIBIR LOS DOCENTES
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

    //AXIOS PARA RECIBIR A LOS DOCENTES CALIFICADORES CON SUS NOTAS Y OBSERVACIONES

    const [calificadores, setCalificadores] = useState();
    const getCalificadores = async () => {
        let value = null;
        value = await axios.get('../../../calificadores.json').then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setCalificadores(value)
    };
    useEffect(() => {
        getCalificadores();
    }, []);

    let docentes = true;

    return (
        <main className="container-fluid" style={{ width: "95%" }}>
            <div className="row">
                <Sobreponer>
                    <div className="col-12">
                        <div id="titulo" className="rounded-5 my-2" style={{ background: props.color }}>
                            <div className="row">
                                <div className="d-flex col ms-3">
                                    <h5 className="m-0 p-2" style={{ color: "white" }}>Evaluación de Plan de negocio - {props.estado} </h5>
                                </div>
                                <div className="d-flex justify-content-end align-items-center col-auto me-4">

                                    <svg id={identificador2} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" style={{ cursor: "pointer" }} className="bi bi-md bi-arrow-down" viewBox="0 0 16 16">

                                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <UncontrolledCollapse id="evaluacion" toggler={identificador}>
                            <div id="cuerpo" className="row mx-3 rounded-2" style={{ background: "#CECECE" }}>
                                <div className="mt-3">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="container rounded-1 mb-3 p-4" style={{ background: "#B4B4B4" }}>
                                                <p className="py-2" style={{ color: "#000" }}><b>Calificación:</b></p>
                                                <p className="d-flex justify-content-end" style={{ color: "#000", fontSize: "30px" }}><b>{props.estado}</b></p>
                                                <p className="py-2" style={{ color: "#000" }}><b>Observaciones:</b></p>

                                                 { calificadores && calificadores[props.identificador].calificacionesInfo.map((v, i) => {            
                                                    
                                                    if (v.observacion != null ) {

                                                        return <div key={i} className="row">
                                                        <div className="row">
                                                                <div className="col-auto">
                                                                    <p style={{ color: "#000" }}>Evaluador {i+1}: </p>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <p style={{ color: "#000" }}>{v.observacion}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    } else {
                                                        docentes = false;
                                                        return <div key={i} className="row">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <p style={{ color: "#000" }}>Evaluador {i+1}: </p>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <p style={{ color: "#000" }}></p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    }

                                                })}



                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="container rounded-1 p-4" style={{ background: "#B4B4B4" }}>
                                                <p className="py-2 d-flex justify-content-center" style={{ color: "#000" }}><b>Comité de evaluación</b></p>
                                                

                                                 { calificadores && calificadores[props.identificador].calificacionesInfo.map((v, i) => {

                                                    
                                                    if (v.id.codigoDocente != null) {
                                                        let colorin = "";
                                                        if (v.estado === 'aprobado') {
                                                            colorin = "#2B9877"
                                                        } else if (v.estado === 'rechazada') {
                                                            colorin = "#DC4B4B"
                                                        } else {

                                                            colorin = "#555555"
                                                        }
                                                        return <div key={i} className="row mb-2">
                                                            <div className="col-8">
                                                                <p style={{ color: "#000" }}><b>Evaluador {i + 1}: </b></p>
                                                            </div>
                                                            <div className="col-4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={colorin} className="bi bi-square-fill border rounded-2 border-2 border-dark" viewBox="0 0 16 16">
                                                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                                                                </svg>
                                                            </div>
                                                        </div>

                                                    } else {
                                                        docentes = false;
                                                        return <div key={i} className="row">
                                                            <div className="col-12">
                                                                <p style={{ color: "#000" }}><b>Evaluador {i + 1}: </b></p>
                                                            </div>
                                                            <div className="col-8">
                                                                <p style={{ color: "#000" }}>No asignado</p>
                                                            </div>
                                                        </div>

                                                    }

                                                })}
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-auto">
                                                    <p style={{ color: "#000" }}><b>Fecha de corte: </b></p>
                                                </div>
                                                <div className="col-auto">

                                                    <p style={{ color: "#000" }}>{calificadores ? 

                                                    
                                                    calificadores[props.identificador].fechaCorte[2]+"/"+calificadores[props.identificador].fechaCorte[1]+"/"+calificadores[props.identificador].fechaCorte[0]:""}</p>
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
            <Modal centered isOpen={viewAlert}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">Escoge al docente que necesitas</Label>
                        <Label for="exampleSelect"></Label>
                        <Input type="select" name="select" onChange={(e) => { setArea_A(e.target.value) }} id="exampleSelect">
                            {profesores.map((l, i) => {
                                if (set.has(l.area)) {
                                    return ("");
                                } else {
                                    set.add(l.area);
                                    return (<option key={i} value={l.area}>{l.area}</option>);
                                }
                            })}
                        </Input>
                        <Label for="exampleSelectMulti">Select Multiple</Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                            {profesores.map((l,i) => {
                                if (l.area === Area) {
                                    return (<option key={l.docente+i} value={l.docente}>{l.docente}</option>);
                                } else {
                                    return ("");
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

            <Modal centered isOpen={viewEliminar}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Quieres eliminar a este docente tutor {idEliminar}?</Label>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger">Eliminar</Button>
                    <Button color="primary" onClick={bottomEliminar}>Cancelar</Button>
                </ModalFooter>
            </Modal>    
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






