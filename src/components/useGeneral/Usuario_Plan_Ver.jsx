import styled from "styled-components";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, UncontrolledCollapse } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Historial from "./Usuario_Plan_Historial.jsx";
import { useNavigate } from "react-router-dom";



export default function VistaIdea() {
    return (<div className="row">
        <InfoGeneral nombre={(JSON.parse(localStorage.getItem("info_plan"))).titulo} rol={(JSON.parse(localStorage.getItem("info_plan"))).rol}></InfoGeneral>
        <Observaciones nombre={(JSON.parse(localStorage.getItem("info_plan"))).titulo} rol={(JSON.parse(localStorage.getItem("info_plan"))).rol}></Observaciones>
        {/* rol={(JSON.parse(localStorage.getItem("MY_PROFILE_INFO"))).tipoUsuario} */}
        {(JSON.parse(localStorage.getItem("info_plan"))).rol !== "evaluador" ?
            <div>
                <div className="container-fluid" style={{ width: "95%" }}>
                    <div className="row">
                        <div className="col-12">
                            <div className="rounded-5 mt-2" style={{ background: "#1C3B57" }}>
                                <h5 className="p-2 ms-3" style={{ color: "white" }}>Evaluaciones</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <Historial nombre={(JSON.parse(localStorage.getItem("info_plan"))).titulo} rol={(JSON.parse(localStorage.getItem("info_plan"))).rol}></Historial>
            </div>
            : ""}

    </div>
    )
};

const InfoGeneral = (props) => {


    const [viewAlert, setViewAlert] = useState(false);
    const toggleAlert = () => {
        setViewAlert(!viewAlert);
    }

    //Agregar Docente
    const [viewAlertDocente, setViewAlertDocente] = useState(false);
    const toggleAlertDocente = () => {
        setViewAlertDocente(!viewAlertDocente);
    }

    //Agregar Estudiante
    const [viewAlertEstudiante, setViewAlertEstudiante] = useState(false);
    const toggleAlertEstudiante = () => {
        setViewAlertEstudiante(!viewAlertEstudiante);
    }

    //EliminarEstudiantes
    const [viewAlertEliminar, setViewAlertEliminar] = useState(false);
    const toggleAlertEliminar = () => {
        setViewAlertEliminar(!viewAlertEliminar);
    }


    //EliminarApoyo
    const [viewAlertEliminarApoyo, setViewAlertEliminarApoyo] = useState(false);
    const toggleAlertEliminarApoyo = () => {
        setViewAlertEliminarApoyo(!viewAlertEliminarApoyo);
    }

    const [Agregar, setAgregar] = useState(String);
    const setAgregare = (a) => {
        setAgregar(a);
    }


    //Elimnar Estudiantes tomar el correo
    const eliminarEstudiantes = (a) => {
        setAgregare(a);
        toggleAlertEliminar();
    }
    //Elimnar Apoyo tomar el correo
    const eliminarApoyo = (a) => {
        setAgregare(a);
        toggleAlertEliminarApoyo();
    }

    const [datos1, setDatos1] = useState();
    const getDatos1 = async () => {
        const URLs = 'http://localhost:8080/planNegocio/' + props.nombre;
        try {
            const response = await axios.get(URLs, {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") },
            });
            const data = response.data;
            setDatos1(data);
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getDatos1();
    }, []);

    {/* llistar areas de conocimiento*/ }

    const [areas, setAreas] = useState([]);
    const getAreas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/areaConocimiento', {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
            });
            const data = response.data;
            setAreas(data);
            console.log(data)
        } catch (error) {
            console.error("Historial", error);
        }
    };
    useEffect(() => {
        getAreas();
    }, []);

    {/*Listar docentes por area*/ }

    const [Area, setArea] = useState(null);
    const setArea_A = (a) => {
        setArea(a);
    }

    const [profesores, setProfesores] = useState([]);
    const getProfesores = async () => {
        if (Area !== null) {
            try {
                const response = await axios.get('http://localhost:8080/docente/listar/' + Area, {
                    headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
                });
                const data = response.data;
                setProfesores(data);
                console.log(data)
            } catch (error) {
                console.error("Historial", error);
            }
        }
    };
    useEffect(() => {
        getProfesores();
    }, [Area]);

    const [Curso, setCurso] = useState(String);
    const getCurso = (a) => {
        setCurso(a);
    }

    const [estudiantes, setEstudiantes] = useState([]);
    const getEstudiantes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/estudiante/listar', {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
            });
            const data = response.data;
            setEstudiantes(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getEstudiantes();
    }, []);

    let set = new Set();
    let set1 = new Set();
    let set2 = new Set();

    const [titleNuevo, settNuevo] = useState(null);
    const tituloNuevo = (e) => {
        settNuevo(e);
    };

    const [Advertencia, setAdvertencia] = useState(false);
    const setAdverten = () => {
        setAdvertencia(!Advertencia);
    }


    //Descarga del documento 

    const getArchi = async () => {
        let value = null;
        //let URL = 'http://144.22.37.238:8080/ideaNegocio/recuperarDocumento/' + props.nombre;
        let URL = 'http://localhost:8080/planNegocio/recuperarDocumento/' + props.nombre;
        axios.get(URL, { responseType: 'blob', headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');

                // Obtener la extensión del nombre de archivo del encabezado Content-Type
                const contentType = response.headers['content-type'];
                const extension = contentType === 'application/octet-stream' ? '.docx' : '.pdf';

                link.href = url;
                link.setAttribute('download', `documento${extension}`); // Establecer el nombre del archivo con la extensión obtenida
                document.body.appendChild(link);
                link.click();

                // Limpiar el enlace temporal después de la descarga
                link.parentNode.removeChild(link);
            }).catch(error => {
                if (error.response) {
                    console.log('Código de estado:', error.response.status);
                    console.log('Respuesta del backend:', error.response.data);
                } else if (error.request) {
                    console.log('No se recibió respuesta del backend');
                } else {
                    console.log('Error al realizar la solicitud:', error.message);
                }
            });
    };

    //Agregar Docente apoyo idea

    const [correoDocente, setCorreo] = useState(String);
    const setCorreoDocente = (a) => {
        setCorreo(a);
    }

    const agregarTutor = async () => {

        if (correoDocente) {
            try {
                const formData1 = new FormData();
                formData1.append('tituloPlan', props.nombre);
                formData1.append('correoDocente', correoDocente);

                const response = await axios.post('http://localhost:8080/docenteApoyoPlan', formData1, {
                    headers: {
                        "X-Softue-JWT": localStorage.getItem("token_access")
                    }
                });
                window.location.reload();
                console.log(response.data); // Puedes hacer algo con la respuesta recibida
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

        }

    };

    // Elimnar docente de apoyo
    const eliminarDocenteApoyo = async () => {
        toggleAlertEliminarApoyo();

        var formData = new FormData();
        formData.append('tituloPlan', props.nombre);
        formData.append('correoDocente', Agregar);

        try {
            //let URLd = 'http://144.22.37.238:8080/docenteApoyo';
            let URLd = 'http://localhost:8080/docenteApoyoPlan';
            await axios.delete(URLd, {
                data: formData,
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
            });
            window.location.reload();
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

    const [Resumen, setResumen] = useState(String);
    const getResumen = (a) => {
        setResumen(a);
    }

    const [viewAlertEditar, setViewAlertEditar] = useState(false);
    const toggleAlert_Editar = () => {
        setViewAlertEditar(!viewAlertEditar);
    }

    const editarPlan = async () => {
        toggleAlert_Editar()
        var formData2 = new FormData();

        console.log(Resumen)

        formData2.append('titulo', datos1 && datos1.titulo);

        if (Resumen != null) {
            formData2.append('resumen', Resumen);
        } else {
            formData2.append('resumen', datos1 && datos1.resumen);
        }

        //let ruta = "http://144.22.37.238:8080/ideaNegocio/Actualizar";
        let ruta = "http://localhost:8080/planNegocio";
        axios.patch(ruta, formData2, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } })
            .then(response => {
                const data = response.data;
                window.location.reload();
                return data;
            })
            .catch(function (error) {
                if (error.response) {
                    console.log('Código de estado:', error.response.status);
                    console.log('Respuesta del backend:', error.response.data);
                } else if (error.request) {
                    console.log('No se recibió respuesta del backend');
                } else {
                    console.log('Error al realizar la solicitud:', error.message);
                }
            });
    }

    //Cambiar tutor

    const [TutorNuevo, setTutorN] = useState(null);
    const getTutorN = (a) => {
        setTutorN(a);
    }


    const asignarTutor = async (docente) => {
        console.log(TutorNuevo, "Siass")
        if (TutorNuevo) {
            let value = null;
            let idea = datos1 && datos1.titulo;
            //let ruta = 'http://144.22.37.238:8080/coordinador/asignar/' + idea + '/' + docente;
            let ruta = 'http://localhost:8080/administrativo/asignarPlan/' + idea + '/' + docente;
            //localhost:8080/administrativo/asignarPlan/timbers/
            console.log(ruta);
            value = await axios.get(ruta, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
            ).then(
                response => {
                    const data = response.data;
                    return data;
                }).catch(error => {
                    if (error.response) {
                        console.log('Código de estado:', error.response.status);
                        console.log('Respuesta del backend:', error.response.data);
                    } else if (error.request) {
                        console.log('No se recibió respuesta del backend');
                    } else {
                        console.log('Error al realizar la solicitud:', error.message);
                    }
                });
            console.log(value)
            toggleAlert()

        } else {
            console.log("Ando vacio vago")
        }

    }

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
                                                    {datos1.estudiantesIntegrantesInfo && datos1.estudiantesIntegrantesInfo[1].map((l, i) => {

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
                                                <p>{datos1.tutorInfo && datos1.tutorInfo[1]}</p>
                                            </div>
                                        </div>
                                        {props.rol === "coordinador" ? <div> <button type="button" id="Aceptare" className="btn btn-secondary btn-sm rounded-5 m-2" onClick={toggleAlert} >Asignar</button>
                                            {/* {<button type="button" id="Eliminare" style={{ background: "#1C3B57", color: "white" }} onClick={toggleAlertEliminar} className="btn btn-sm rounded-5 m-2" >Eliminar</button>*/} </div> : ""}



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
                                            <div className="col-auto ">
                                                <ul>
                                                    {console.log(datos1 && datos1.docentesApoyoInfo[1])}
                                                    {datos1 && datos1.docentesApoyoInfo[1].map((l, j) => {
                                                        return (<li key={j}>{l} {props.rol == "tutor" ? <svg onClick={() => { eliminarApoyo(datos1.docentesApoyoInfo[0][j]) }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF0000" style={{ cursor: "pointer" }} className="bi bi-x-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                        </svg> : ""} </li>);
                                                    })}
                                                    {props.rol == "tutor" ? <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleAlertDocente} width="20" height="20" fill="currentColor" style={{ cursor: "pointer" }} className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                    </svg> : ""}

                                                </ul>
                                            </div>

                                            <div className="row mt-2">
                                                <div className="col-auto">
                                                    <h6 className="font-weight-bold"><b>Resumen:</b></h6>
                                                </div>
                                                <div className="col-auto">
                                                    <p>{datos1.resumen && datos1.resumen}</p>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-auto"><button type="button" style={{ background: "#1C3B57", color: "white" }} className="btn btn-sm rounded-5  m-2 p-2 px-3" onClick={() => { getArchi() }}> Descargar formato completo</button></div>
                                                {props.rol == "estudiante" ? <div className="col-auto"><button onClick={toggleAlert_Editar} type="button" style={{ background: "#C29B10", color: "white" }} className="btn btn-sm btn-warning rounded-5 m-2 p-2 px-3">  Editar  </button></div> : ""}

                                            </div>
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

            {/* viewAlertEditar */}

            <Modal centered isOpen={viewAlertEditar}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">Escrbe un resumen para tu proyecto </Label>
                        <Input type="textarea" defaultValue={datos1 && datos1.resumen} onChange={(e) => { getResumen(e.target.value) }} name="text" id="exampleText" />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={() => { editarPlan() }}>Actualizar</Button>
                    <Button color="primary" onClick={toggleAlert_Editar} >Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal centered isOpen={viewAlertEliminarApoyo}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Quieres eliminar a este docente de apoyo {Agregar}? </Label>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={() => { eliminarDocenteApoyo() }}>Eliminar</Button>
                    <Button color="primary" onClick={toggleAlertEliminarApoyo}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal centered isOpen={viewAlertDocente}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">Escoge el area de enfoque</Label>
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
                    </FormGroup>
                    <ModalFooter>
                        <Button color="danger" onClick={() => { agregarTutor() }}>Asignar</Button>
                        <Button color="primary" onClick={toggleAlertDocente}>Cancelar</Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>

            <Modal centered isOpen={viewAlert}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">Escoge el area del docente: </Label>
                        <Label for="exampleSelect"></Label>
                        <Input type="select" name="select" onChange={(e) => { setArea_A(e.target.value) }} id="exampleSelect">
                            <option disabled selected>Seleccionar opción</option>
                            {areas && areas.map((l, i) => {
                                return (<option key={i} value={l.nombre}>{l.nombre}</option>);
                            })}
                        </Input>
                        <Label for="exampleSelectMulti">Seleccciona al docente: </Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" onClick={(e) => { getTutorN(e.target.value) }} multiple>
                            {profesores && profesores.map((l) => {
                                return (<option key={l.correo} value={l.correo}>{l.nombre + l.apellido}</option>);
                            })}
                        </Input>
                    </FormGroup>
                    <ModalFooter>
                        <Button color="danger" onClick={() => { asignarTutor(TutorNuevo) }}>Asignar</Button>
                        <Button color="primary" onClick={toggleAlert}>Cancelar</Button>
                    </ModalFooter>
                </ModalBody>
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
    transform: rotate(90deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(90deg);
  }
}
@media screen and (max-width:576px){
    #progreso{
        display:none;
    }
}
`;

const Observaciones = (props) => {

    const [datos, setDatos] = useState();
    const getDatos1 = async () => {
        const URLs = 'http://localhost:8080/planNegocio/' + props.nombre;
        try {
            const response = await axios.get(URLs, {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") },
            });
            const data = response.data;
            setDatos(data);
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
    useEffect(() => {
        getDatos1();
    }, []);

    //
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const subirIdea = async () => {

        if (selectedFile) {
            setError(null);
            var formData = new FormData();
            formData.append('titulo', datos && datos.titulo);
            formData.append('documento', selectedFile);
            //let ruta = "http://144.22.37.238:8080/ideaNegocio/agregarDocumento";
            let ruta = "http://localhost:8080/planNegocio/agregarDocumento";
            let value = await axios.post(ruta, formData, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } })
                .then((response) => {
                    console.log("hecho")
                    window.location.reload();
                })
                .catch((error) => {
                    if (error.response) {
                        console.log('Código de estado:', error.response.status);
                        console.log('Respuesta del backend:', error.response.data);
                    } else if (error.request) {
                        console.log('No se recibió respuesta del backend');
                    } else {
                        console.log('Error al realizar la solicitud:', error.message);
                    }
                    setError('Tu archivo debe ser PDF o es muy pesado');
                });
            setSelectedFile(null);
        } else {
            setError('Por favor, selecciona un archivo');
        }
    }

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
                                    <Tabla nombre={props.nombre} rol={props.rol}></Tabla>
                                    {props.rol == "estudiante" ?
                                        <div className="d-flex m-3 align-content-center justify-content-center col-12">
                                            <Form >
                                                <FormGroup>
                                                    <div className="d-flex justify-content-center">
                                                        <Label for="exampleFile"><b> Subir archivo: </b></Label>

                                                    </div>
                                                    <Input type="file" name="file" onChange={handleFileChange} id="exampleFile" />
                                                    {error && <Alert color="danger">{error}</Alert>}
                                                </FormGroup>
                                                <div className="d-flex justify-content-center">
                                                    <Button style={{ backgroundColor: "#1C3B57" }} onClick={subirIdea} >Enviar</Button>
                                                </div>

                                            </Form>
                                        </div>
                                        : ""}

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

function Tabla(props) {

    const [datos1, setDatos1] = useState();
    const getDatos1 = async () => {
        const URLs = 'http://localhost:8080/planNegocio/' + props.nombre;
        try {
            const response = await axios.get(URLs, {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") },
            });
            const data = response.data;
            setDatos1(data);
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getDatos1();
    }, []);

    const [datos, setDatos] = useState([]);
    const getIdeas = async () => {
        let value = null;
        //let URLs = 'http://144.22.37.238:8080/observacionIdea/' + props.nombre;
        let URLs = 'http://localhost:8080/observacionPlan/' + props.nombre;
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


    {/*Subir evaluacion*/ }

    const [error, setError] = useState(null);

    const [Observacion, setObservacion] = useState(" ");
    const setObservacion_A = (a) => {
        setObservacion(a);
    }

    const [Nota, setNota] = useState(null);
    const setNota_A = (a) => {
        setNota(a);
    }

    async function enviarDatos() {
        try {
            setError(null);
            const url = 'http://localhost:8080/planNegocio/calificacion';
            const formData = new FormData();

            formData.append('titulo', props.nombre);
            formData.append('nota', Nota);
            formData.append('observacion', Observacion);

            const response = await axios.patch(url, formData, {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") }

            });

            console.log(response.data);
        } catch (error) {
            setError("Ya evaluaste esta idea de negocio")
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

    // Cosas de enviar a evaluacion y observaciones

    const [comentario, setComentarios] = useState(String);
    const getComentarios = (e) => {
        setComentarios(e);
    };

    const observacionDocenteApoyo = async () => {
        if (comentario) {
            try {
                const formData1 = new FormData();
                formData1.append('planTitulo', props.nombre);
                formData1.append('observacion', comentario);

                // let URLd = 'http://144.22.37.238:8080/observacionPlan';
                const URLd = 'http://localhost:8080/observacionPlan';
                const response = await axios.post(URLd, formData1, {
                    headers: {
                        "X-Softue-JWT": localStorage.getItem("token_access"),
                    },
                });

                if (response.status === 200) {
                    window.location.reload();
                    console.log("hecho");
                } else {
                    console.error(`Request failed with status ${response.status}`);
                }
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
        }

    };
    {/* Enviar a evaluacion */ }

    const enviarEvaluacion = async () => {
        try {
            const response = await axios.post('http://localhost:8080/planNegocio/evaluacion/' + props.nombre, {}, {
                headers: {
                    "X-Softue-JWT": localStorage.getItem("token_access")
                }
            });
            console.log(response.data); // Puedes hacer algo con la respuesta recibida
            window.location.reload();
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

    return (

        props.rol == "evaluador" ? <Sdiv>
            <Form>
                <div className='w-auto  row m-2'>

                    <div className="col-12 col-sm-6 align-content-center justify-content-center ">
                        <FormGroup>
                            <Label for="estado">Asigna una calificacion al proyecto</Label>
                            <Input onChange={(e) => { setNota_A(e.target.value) }} type="select" name="estado" id="estado">
                                <option disabled selected>Seleccionar opción</option>
                                <option value="aprobada">Aprobado</option>
                                <option value="rechazada">Rechazado</option>
                            </Input>
                        </FormGroup>
                    </div>

                    <div className="col-12 col-sm-6 align-content-center justify-content-center ">
                        <FormGroup>
                            <Label for="Observacion">Observaciones</Label>
                            <Input onChange={(e) => { setObservacion_A(e.target.value) }} type="textarea" name="Observacion" id="Observacion" />
                        </FormGroup>
                    </div>
                    <div>     {error && <Alert color="danger" className="text-center">{error}</Alert>} </div>
                    <div className="d-flex justify-content-center  ">
                        <Button className="m-2" style={{ backgroundColor: "#1C3B57" }} onClick={() => { enviarDatos() }}>Enviar</Button>
                    </div>

                </div>
            </Form>
        </Sdiv> :
            <div>
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

                <div className=" mt-4 ">
                    {props.rol === "tutor" || props.rol === "apoyo" ?
                        <div className="row m-4">
                            <div className="d-flex justify-content-end">
                                <Button id="AgregarComentario" style={{ backgroundColor: "#1C3B57" }}>
                                    Agregar
                                </Button>
                            </div>
                        </div> : ""}
                    {props.rol === "tutor" ?
                        <div className="row m-4">
                            <div className="d-flex justify-content-end">
                                <Button color="success" onClick={() => { enviarEvaluacion() }} disabled={(datos1 && datos1.estado === "formulado") || (datos1 && datos1.estado === "rechazada") ? false : true} >
                                    Enviar a Evaluacion
                                </Button>
                            </div>
                        </div>
                        : ""}

                </div>

                <UncontrolledCollapse id="observaciones" toggler="#AgregarComentario">
                    <Form>
                        <FormGroup>
                            <div className="row mt-4 justify-content-center text-center">

                                <div className="col-6 flex-column justify-content-center">
                                    <Label for="exampleEmail"><h3>Observaciones</h3></Label>
                                </div>
                                <div className="col-6 flex-column d-flex justify-content-center">
                                    <Input type="textarea" onChange={(e) => { getComentarios(e.target.value) }} name="email" id="exampleEmail" placeholder="" />
                                </div>

                            </div>
                        </FormGroup>
                        <div className=" d-flex justify-content-end">
                            <button type="button" id="AgregarComentario" className="btn btn-danger m-2" style={{ backgroundColor: "#DC4B4B" }}>Cancelar</button>
                            <Button className="m-2" style={{ backgroundColor: "#1C3B57" }} onClick={() => { observacionDocenteApoyo() }}>Enviar</Button>
                        </div>
                    </Form>
                </UncontrolledCollapse>

            </div>
    );
}

