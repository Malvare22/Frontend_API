import axios from "axios";
import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import ImagenAprobado from '../../assets/images/aprobado.png';
import ImagenReprobado from '../../assets/images/reprobado.png';
import { Link, useNavigate } from "react-router-dom";

export default function useListarPreguntas() {

    const navigate = useNavigate();

    const [componentes, setComponentes] = useState([]);
    const [datos, setDatos] = useState([]);

    const estado = localStorage.getItem('estado');
    const codigo = localStorage.getItem('codigo');
    const calificacion = localStorage.getItem('calificacion');
    const id = localStorage.getItem('id');

    var localData = localStorage.getItem("MY_PROFILE_INFO");
    var parsedData = JSON.parse(localData);
    var rol = parsedData.tipoUsuario;

    const getEstudiante = async () => {

        let value = await axios.get("http://localhost:8080/estudiante/visualizarConId/" + codigo, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });

        console.log("datos estudiante")
        console.log(value);

        setDatos(value);

    };

    const getEvaluacion = async () => {

        let value = await axios.get("http://localhost:8080/test/resultados/" + id, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });

        setComponentes(value);

    };

    useEffect(() => {
        getEvaluacion();
        getEstudiante();
    }, []);

    const handleVerEstudianteClick = () => {
        localStorage.setItem('ESTUDIANTE_EMAIL', datos.correo);
        navigate('../Estudiantes/Perfil');
    }

    return (
        <main>
            <Style>
                <div className="container-fluid" style={{ width: "95%" }}>
                    <div className="row">
                        <div className="col-12">
                            <div id="titulo" className="rounded-5 mt-2" style={{ background: "#1C3B57" }}>
                                <div className="row">
                                    <div className="d-flex col ms-3">
                                        <h5 className="m-0 p-2" style={{ color: "white" }}>Revisión</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-3">
                        <div className="col">
                            <div className="row">
                                <p><b>Estudiante:</b></p>
                            </div>
                            <div className="row">
                                <div className="container rounded-2" style={{ background: "#DEDEDE", boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)" }}>
                                    <div className="row p-3">
                                        <div className="col">
                                            <div className="row">
                                                <b>Nombre completo: </b>
                                            </div>
                                            <div className="row">
                                                <b>Curso :</b>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                {datos.nombre + ' ' + datos.apellido}
                                            </div>
                                            <div className="row">
                                                {datos.curso}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end p-3">
                                        <button type="button" class="btn" style={{ background: "#1C3B57", width: "auto" }} onClick={handleVerEstudianteClick}>
                                            <div class="container">
                                                <div class="col-auto">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="white" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {estado === "aprobada" ?

                            <div className="col-auto d-flex justify-content-center align-items-bottom">
                                <p id="aprobado" className="mx-5">{calificacion}</p>
                            </div>

                            :

                            <div className="col-auto d-flex justify-content-center align-items-bottom">
                                <p id="reprobado" className="my-auto mx-4">{calificacion}</p>
                            </div>

                        }
                    </div>
                    <div className="row my-5">
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
                    </div>
                    <div className="row my-5">
                        {estado === "aprobada" ?

                            <div className="d-flex justify-content-center align-items-bottom">
                                <img src={ImagenAprobado} className='img-fluid m-auto' style={{ width: "200px" }} />
                            </div>

                            :

                            <div className="d-flex justify-content-center align-items-bottom">
                                <img src={ImagenReprobado} className='img-fluid m-auto' style={{ width: "200px" }} />
                            </div>

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
    font-size: 80px;
    color: #75C47D;
}

#reprobado{
    font-family: 'Bebas Neue', sans-serif;
    font-size: 80px;
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