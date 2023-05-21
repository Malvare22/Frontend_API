import { Row } from "react-bootstrap";
import styled from "styled-components";
import { Collapse, UncontrolledCollapse } from 'reactstrap';

export default function VistaIdea() {
    return (<>

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

        <Evaluaciones></Evaluaciones>

    </>
    )
};

const InfoGeneral = () => {
    return (
        <main className="container-fluid mt-4" style={{ width: "95%" }}>
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
                                            <p>...</p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-auto">
                                            <h6 className="font-weight-bold"><b>Integrantes:</b></h6>
                                        </div>
                                        <div className="col-auto">
                                            <ul>
                                                <li>Coffee</li>
                                                <li>Tea</li>
                                                <li>Milk</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-auto">
                                            <h6 className="font-weight-bold"><b>Tutor:</b></h6>
                                        </div>
                                        <div className="col-auto">
                                            <p>Lizeth Juliana Navarro Vargas</p>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-secondary btn-sm rounded-5 m-2">Asignar</button>
                                    <button type="button" style={{ background: "#1C3B57", color: "white" }} className="btn btn-sm rounded-5 m-2">Eliminar</button>
                                    <div className="row mt-2">
                                        <div className="col-auto">
                                            <h6 className="font-weight-bold"><b>Área de conocimiento:</b></h6>
                                        </div>
                                        <div className="col-auto">
                                            <p>...</p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-auto">
                                            <h6 className="font-weight-bold"><b>Docentes de apoyo:</b></h6>
                                        </div>
                                        <div className="col-auto">
                                            <ul>
                                                <li>Coffee</li>
                                                <li>Tea</li>
                                                <li>Milk</li>
                                            </ul>
                                        </div>
                                        <button type="button" style={{ background: "#1C3B57", color: "white" }} className="btn btn-sm rounded-5 m-2">Descargar formato completo</button>
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
                                        <div className="progress-value">50%</div>
                                    </div>
                                </SProgress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
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
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
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
                                    <h5 className="m-0 p-2" style={{ color: "white" }}>Observaciones de idea de negocio</h5>
                                </div>
                                <div className="d-flex justify-content-end align-items-center col-auto me-4">
                                    <svg id="arrowObservaciones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-md bi-arrow-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <UncontrolledCollapse id="observaciones" toggler="#arrowObservaciones">
                            <div id="cuerpo" className="row mx-3 rounded-2" style={{ background: "#CECECE" }}>
                                <div className="mt-3">
                                    <p>prueba</p>
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

#titulo, #cuerpo {
    position: relative;
}

#titulo{
    z-index: 2;
}

#cuerpo{
    z-index: 1;
    top: -5px
}

`;

const Evaluaciones = () => {
    return (
        <main className="container-fluid" style={{ width: "95%" }}>
            <div className="row">
                <Sobreponer>
                    <div className="col-12">
                        <div id="titulo" className="rounded-5 mt-2" style={{ background: "#515454" }}>
                            <div className="row">
                                <div className="d-flex col ms-3">
                                    <h5 className="m-0 p-2" style={{ color: "white" }}>Evaluación de idea de negocio - </h5>
                                </div>
                                <div className="d-flex justify-content-end align-items-center col-auto me-4">
                                    <svg id="arrowEvaluacion" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-md bi-arrow-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <UncontrolledCollapse id="evaluacion" toggler="#arrowEvaluacion">
                        <div id="cuerpo" className="row mx-3 rounded-2" style={{ background: "#CECECE" }}>
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="container rounded-1 mb-3" style={{ background: "#B4B4B4" }}>
                                            <p className="py-2" style={{ color: "#000" }}><b>Calificación:</b></p>
                                            <p className="d-flex justify-content-end" style={{ color: "#000", fontSize:"50px"}}><b>XX</b></p>
                                            <p className="py-2" style={{ color: "#000" }}><b>Observaciones:</b></p>
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
                                                <p style={{ color: "#000" }}>xx/xx/xx</p>
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
}