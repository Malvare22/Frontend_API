import axios from "axios";
import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import ImagenAprobado from '../../assets/images/aprobado.png'
import ImagenReprobado from '../../assets/images/reprobado.png'
import { Link } from "react-router-dom";

export default function Estudiante_Evaluacion() {

    useEffect(() => {
        const value = localStorage.getItem("RELOAD");
        if(value === "1"){
            console.log("prueba")
            localStorage.removeItem("RELOAD");
            window.location.reload();
        }
    }, []);

    const [componentes, setComponentes] = useState([]);
    const [estadoEvaluacion, setEstadoEvaluacion] = useState('');
    const [resultadoEvaluacion, setResultadoEvaluacion] = useState('');

    var localData = localStorage.getItem("MY_PROFILE_INFO");
    var parsedData = JSON.parse(localData);
    var codigoEstudiante = parsedData.codigo;
    var emailEstudiante = parsedData.correo;

    const getEstudiante = async () => {

        let value = await axios.get("http://144.22.32.132:8080/estudiante/" + emailEstudiante, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });

        setEstadoEvaluacion(value.capacitacionAprobada);

    };

    const getEvaluacion = async () => {

        let value = await axios.get("http://144.22.32.132:8080/test/resultadosEstudiante/" + codigoEstudiante, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });

        setComponentes(value);

    };

    const getResultado = async () => {

        let value = await axios.get("http://144.22.32.132:8080/test/" + codigoEstudiante, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });

        setResultadoEvaluacion(value.calificacion.toFixed(2));

    };

    useEffect(() => {
        getEvaluacion();
        getEstudiante();
        getResultado();
    }, []);

    return (
        <main>
            <Style>
                <div className="container" style={{ width: "80%" }}>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center align-items-center">
                            <p id="prueba"><b>El resultado de su evaluación es : </b></p>
                        </div>

                        {estadoEvaluacion === "aprobada" ?

                            <div className="col-6 d-flex justify-content-center align-items-center">
                                <p id="aprobado">{resultadoEvaluacion}</p>
                            </div>

                            :

                            <div className="col-6 d-flex justify-content-center align-items-center">
                                <p id="reprobado">{resultadoEvaluacion}</p>
                            </div>

                        }

                        <div className='w-auto mb-4'>
                            <Sdiv>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className='text-center' scope="col-auto">Componente</th>
                                            <th className='text-center' scope="col-auto">Calificación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {componentes && componentes.map((d, i) => (
                                            <tr key={i}>
                                                <td className='text-center align-middle col-auto'>{d.nombre}</td>
                                                <td className='text-center align-middle col-auto'>{d.valor}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Sdiv>
                        </div>

                        {estadoEvaluacion === "aprobada" ?

                            <>

                                <div className="row">
                                    <div className="col-12 col-lg-5 d-flex justify-content-center align-items-center mb-5">
                                        <img src={ImagenAprobado} className='img-fluid m-auto' style={{ width: "200px" }} />
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <p className='text-center' id='tituloG' style={{ color: "#1C3B57" }}>¡Felicitaciones!</p>
                                        </div>
                                        <div className="row">
                                            <p id='parrafoG'>
                                                Queremos celebrar su notable logro al aprobar exitosamente la evaluación sobre habilidades emprendedoras. Su dedicación y esfuerzo se ven reflejados en su desempeño en cada uno de los componentes evaluados, clave para triunfar en el mundo empresarial.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end align-items-center mb-3">
                                    <Link to="../CapacitacionIdea">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                        </svg>
                                    </Link>
                                </div>

                            </>

                            :

                            <>

                                <div className="row my-5">
                                    <div className="col-12 col-lg-5 d-flex justify-content-center mb-3">
                                        <img src={ImagenReprobado} className='img-fluid m-auto' style={{ width: "200px" }} />
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <p className='text-center' id='tituloG' style={{ color: "#1C3B57" }}>¡Lo sentimos!</p>
                                        </div>
                                        <div className="row">
                                            <p id='parrafoG'>
                                                Lamentamos informarle que no ha aprobado la evaluación de habilidades emprendedoras en esta ocasión. Sin embargo, reconocemos su interés y entusiasmo por desarrollar sus habilidades emprendedoras, y lo invitamos a participar de las capacitaciones y programas que ofrecemos para seguir fortaleciendo sus conocimientos y competencias en este ámbito y así repetir la evaluación con éxito.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end align-items-center mb-3">
                                    <Link to="../CapacitacionGeneral">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                        </svg>
                                    </Link>
                                </div>

                            </>
                        }
                    </div>
                </div>
            </Style>
        </main>
    )
};

const Style = styled.div`

#prueba{
    font-size: x-large;
}

#aprobado{
    font-family: 'Bebas Neue', sans-serif;
    font-size: 120px;
    color: #75C47D;
}

#reprobado{
    font-family: 'Bebas Neue', sans-serif;
    font-size: 120px;
    color: #DC4B4B;
}

`
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
  
  @media screen and (max-width: 576px){
      th, td {
          width: 60px;
      }}
`;


