import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, UncontrolledCollapse } from 'reactstrap';

const Evaluaciones = (props) => {
    let identificador = "#a" + props.identificador;
    let identificador2 = "a" + props.identificador;
    let estado = props.estado;

    let set = new Set();

    const [Advice, setAdvice] = useState(null);
    const setAdvice_A = (a) => {
        setAdvice(a);
    }

    const [Area, setArea] = useState(null);
    const setArea_A = (a) => {
        setArea(a);
    }

    const [Advertencia, setAdvertencia] = useState(false);
    const setAdverten = () => {
        setAdvertencia(!Advertencia);
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
        if (Area !== null) {
            try {
                const response = await axios.get('http://129.151.121.230:8080/docente/listar/' + Area, {
                    headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
                });
                const data = response.data;
                setProfesores(data);
                //console.log(data)
            } catch (error) {
                console.error("Historial", error);
            }
        }

    };
    useEffect(() => {
        getProfesores();
    }, [Area]);

    //AXIOS PARA RECIBIR A LOS DOCENTES CALIFICADORES CON SUS NOTAS Y OBSERVACIONES

    const [calificadores, setCalificadores] = useState();
    const getCalificadores = async () => {
        let value = null;
        //let URLs='http://144.22.37.238:8080/planNegocio/evaluacion/'+props.nombre;
        let URLs = 'http://129.151.121.230:8080/planNegocio/evaluacion/' + props.nombre;
        value = await axios.get(URLs, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;

            }).catch(error => {
                console.error(error);
            });
        setCalificadores(value)
        //console.log(value)
    };
    useEffect(() => {
        getCalificadores();
    }, []);

    let docentes = true;


    const [datos1, setDatos] = useState([]);
    const getIdeas = async () => {
        let value = null;
        //let URLs = 'http://144.22.37.238:8080/observacionIdea/' + props.nombre;
        let URLs = 'http://129.151.121.230:8080/observacionPlan/' + props.nombre;
        value = await axios.get(URLs, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
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

    const ElimnarCalificadores = async (a, b) => {
        bottomEliminar()
        let value = null;

        //let URLd = 'http://144.22.37.238:8080/ideaNegocio/calificacion';
        let URLd = 'http://129.151.121.230:8080/planNegocio/calificacion';
        const response = await axios.delete(URLd, {
            data: { codigoDocente: a, evaluacionPlanId: props.idi },
            headers: { "X-Softue-JWT": localStorage.getItem("token_access") },
        }
        ).then(
            window.location.reload()
        ).catch(error => {
            if (error.response) {
                console.log('Código de estado:', error.response.status);
                console.log('Respuesta del backend:', error.response.data);
            } else if (error.request) {
                console.log('No se recibió respuesta del backend');
            } else {
                console.log('Error al realizar la solicitud:', error.message);
            }
            setAdverten()
        });
    };

    {/* llistar areas de conocimiento*/ }


    const [areas, setAreas] = useState([]);
    const getAreas = async () => {
        try {
            const response = await axios.get('http://129.151.121.230:8080/areaConocimiento', {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
            });
            const data = response.data;
            setAreas(data);
            //console.log(data)
        } catch (error) {
            console.error("Historial", error);
        }
    };
    useEffect(() => {
        getAreas();
    }, []);

    const [correoDocente, setCorreo] = useState(String);
    const setCorreoDocente = (a) => {
        setCorreo(a);
    }

    const agregarTutor = async () => {

        if (correoDocente) {
            try {
                const response = await axios.post('http://129.151.121.230:8080/planNegocio/calificacion/' + props.nombre + '/' + correoDocente, {}, {
                    headers: {
                        "X-Softue-JWT": localStorage.getItem("token_access")
                    }
                });
                set_Adverten(null)
                window.location.reload();
                //console.log(response.data); // Puedes hacer algo con la respuesta recibida
            } catch (error) {
                set_Adverten("No puedes asignar este docente.");
                if (error.response) {
                    console.log('Código de estado:', error.response.status);
                    console.log('Respuesta del backend:', error.response.data);
                } else if (error.request) {
                    console.log('No se recibió respuesta del backend');
                } else {
                    console.log('Error al realizar la solicitud:', error.message);
                }
            }

        }

    };

    //Enviar a Entidades financiadoras

    const enviarA_Plan = async () => {

        try {
            const response = await axios.post('http://129.151.121.230:8080/planNegocio/' + props.nombre, {}, {
                headers: {
                    "X-Softue-JWT": localStorage.getItem("token_access")
                }
            });
            setAdvice_A("El Plan Hasido creado exitosamente")
            //console.log(response.data); // Puedes hacer algo con la respuesta recibida
        } catch (error) {
            if (error.response) {
                console.log('Código de estado:', error.response.status);
                console.log('Respuesta del backend:', error.response.data);
            } else if (error.request) {
                console.log('No se recibió respuesta del backend');
            } else {
                console.log('Error al realizar la solicitud:', error.message);
            }
        }

    };

    const [Adverten, setAdvertenc] = useState(null);
    const set_Adverten = (a) => {
        setAdvertenc(a);
    }

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

                                    <svg id={identificador2} xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }} width="16" height="16" fill="white" className="bi bi-md bi-arrow-down" viewBox="0 0 16 16">

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

                                                {calificadores && calificadores[props.identificador].calificacionesInfo.map((v, i) => {

                                                    if (v.observacion != null) {

                                                        return <div key={i} className="row">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <p style={{ color: "#000" }}>Evaluador {i + 1}: </p>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <p style={{ color: "#000" }}>{v.observacion}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    } else {
                                                        return <div key={i} className="row">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <p style={{ color: "#000" }}>Evaluador {i + 1}: </p>
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


                                                {calificadores && calificadores[props.identificador].calificacionesInfo.map((v, i) => {


                                                    if (v.id.codigoDocente != null) {
                                                        let colorin = "";
                                                        if (v.estado === 'aprobada') {
                                                            colorin = "#2B9877"
                                                        } else if (v.estado === 'rechazada') {
                                                            colorin = "#DC4B4B"
                                                        } else {

                                                            colorin = "#555555"
                                                        }
                                                        return <div key={i} className="row">
                                                            <div className="col-12">
                                                                <p style={{ color: "#000" }}><b>Evaluador {i + 1}: </b></p>
                                                            </div>
                                                            <div className="col-8">
                                                                <p style={{ color: "#000" }}>{props.rol == "coordinador" ? v.nombreDocente : ""}</p>
                                                            </div>
                                                            <div className="col-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={colorin} className="bi bi-square-fill border rounded-2 border-2 border-dark" viewBox="0 0 16 16">
                                                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                                                                </svg>
                                                            </div>

                                                            {props.rol == "coordinador" ? props.estado == "NA" ? colorin === "#555555" ? <div className="col-2">

                                                                <p style={{ color: "#000" }}> <svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" onClick={() => eliminar(v.id.codigoDocente)} width="24" height="24" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                                                </svg></p>
                                                            </div> : <div className="col-2">
                                                                <p style={{ color: "#000" }}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#555555" className="bi bi-x-square-fill disabled" viewBox="0 0 16 16">
                                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                                                </svg></p>
                                                            </div> : "" : ""

                                                            }
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
                                                {
                                                    props.rol == "coordinador" ? props.estado == "NA" ? calificadores && calificadores[0].calificacionesInfo.length == 3 ? "" : <div className="row d-flex justify-content-end">
                                                        <button className="btn btn-sm" onClick={toggleAlert} style={{ backgroundColor: "transparent", width: "auto", border: "none" }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                                            </svg>
                                                        </button>
                                                    </div> : "" : ""
                                                }
                                            </div>

                                            <div className="row mt-2">
                                                <div className="col-auto">
                                                    <p style={{ color: "#000" }}><b>Fecha de corte: </b></p>
                                                </div>
                                                <div className="col-auto">

                                                    <p style={{ color: "#000" }}>{calificadores ?

                                                        calificadores[props.identificador].fechaCorte[2] + "/" + calificadores[props.identificador].fechaCorte[1] + "/" + calificadores[props.identificador].fechaCorte[0] : ""}</p>
                                                </div>
                                            </div>


                                        </div>
{/* 
                                        <div className="d-flex justify-content-center align-content-center mt-5">
                                            {
                                                props.rol == "coordinador" ? props.estado == "Aprobado" ? props.identificador == 0 ? <div>
                                                    <Form className="justify-content-center align-content-center">
                                                        <FormGroup className="row">
                                                            <Button className="m-auto col-12" style={{ backgroundColor: "#4DB595" }} >Aceptar Calificacion <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                            </svg></Button>
                                                        </FormGroup>
                                                        <div>{Advice != null ? <Alert color="success">{Advice}</Alert> : ""}</div>
                                                    </Form></div> : "" : "" : ""
                                            }
                                        </div> */}

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
                        <Label id="texto">Escoge al docente que necesita</Label>
                        <Label for="exampleSelect"></Label>
                        <Input type="select" name="select" onChange={(e) => { setArea_A(e.target.value) }} id="exampleSelect">
                            <option disabled selected>Seleccionar opción</option>
                            {areas && areas.map((l, i) => {
                                return (<option key={i} value={l.nombre}>{l.nombre}</option>);
                            })}
                        </Input>
                        <Label for="exampleSelectMulti">Select Multiple</Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" onClick={(e) => { setCorreoDocente(e.target.value) }} multiple>
                            {profesores && profesores.map((l) => {
                                return (<option key={l.correo} value={l.correo}>{l.nombre + " " + l.apellido}</option>);
                            })}
                        </Input>
                        {Adverten !== null ? <Alert className="text-center m-2" color="danger"> {Adverten} </Alert>:""}
                    </FormGroup>
                    <ModalFooter>
                        <Button color="danger" onClick={() => { agregarTutor() }}>Asignar</Button>
                        <Button color="primary" onClick={toggleAlert}>Cancelar</Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>

            <Modal centered isOpen={viewEliminar}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Quieres eliminar a este docente calificador {idEliminar}?</Label>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={() => { ElimnarCalificadores(idEliminar, datos1.id) }}>Eliminar</Button>
                    <Button color="primary" onClick={bottomEliminar}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal centered isOpen={Advertencia}>
                <ModalBody>
                    <FormGroup className="d-flex justify-content-center text-center">
                        <Label id="texto">No puedes eliminar al Docente con codigo {idEliminar} porque su fecha de vencimiento no se ha cumplido</Label>
                    </FormGroup>
                </ModalBody>

                <ModalFooter className="d-flex justify-content-center">
                    <Button color="primary" onClick={setAdverten}>Aceptar</Button>
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


