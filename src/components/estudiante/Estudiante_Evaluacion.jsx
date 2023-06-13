import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Pregunta from './Estudiante_Preguntas';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';


const EstudianteEvaluacion = () => {

    const navigate = useNavigate();
    const formularioRef = useRef(null);
    const [datos, setDatos] = useState([]);
    const [respuestas, setRespuestas] = useState([]);

    const getPreguntas = async () => {
        let value = null;
        value = await axios.get("http://144.22.32.132:8080/pregunta", { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setDatos(value);
    };

    useEffect(() => {
        getPreguntas();
    }, []);

    useEffect(() => {
        const enviarRespuestas = async () => {
            var formData = new FormData();
            formData.append('respuestasId', respuestas);

            var localData = localStorage.getItem("MY_PROFILE_INFO");
            var parsedData = JSON.parse(localData);
            formData.append('codigoEstudiante', parsedData.codigo);

            let ruta = "http://144.22.32.132:8080/test";
            try {
                const response = await axios.post(ruta, formData, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } });
                console.log("hecho");
                console.log([...formData.entries()]);

                setRespuestas(null);
                localStorage.setItem("RELOAD", 1);
                navigate('../ResultadoEvaluacion');

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

        if (respuestas.length > 0) {
            enviarRespuestas();
        }
    }, [respuestas]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const res = new FormData(formularioRef.current);
        const values = Object.fromEntries(res.entries());

        Object.keys(values).forEach((key) => {
            const value = values[key];
            setRespuestas((prevOptions) => [...prevOptions, value]);
        });

    };


    return (
        <div className="container">
            <img src="https://live.staticflickr.com/65535/52965391213_c807af25a6_o.png" className='img-fluid mt-2' />
            <div className='container' style={{ width: "80%" }}>
                <Sobreponer>
                    <div id="titulo1" className="rounded-4 mt-4" style={{ background: '#DC4B4B' }}>
                        <div className="row">
                            <div className="d-flex col ms-3">
                                <h5 className="m-0 p-3" style={{ color: 'black' }}>
                                    <b>Evaluación</b>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className='container' style={{ width: "95%" }}>
                        <div id='cuerpo' className="row mx-3zzzz rounded-2 pt-3" style={{ background: '#DEDEDE' }}>
                            <form ref={formularioRef} onSubmit={handleSubmit}>
                                {datos && datos.map((v, i) => {
                                    return (
                                        <Pregunta id={i} enunciado={(i + 1) + ". " + v.enunciado} respuestas={v.listaRespuestas}></Pregunta>
                                    );
                                })}
                                <div className="d-flex justify-content-center mb-3">
                                    <button type="submit" className="btn mt-2 rounded-4" style={{ background: '#DC4B4B', color: 'black' }}>
                                        <b>Enviar</b>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Sobreponer>
            </div>
        </div>

    );
}

export default EstudianteEvaluacion;

const Sobreponer = styled.div`

  #titulo1,
  #cuerpo {
    position: relative;
  }

  #titulo1 {
    z-index: 2;
  }

  #cuerpo {
    z-index: 1;
    top: -10px;
  }

  #titulo {
    width: 100%;
    border: 1px solid grey;
    border-radius: 4px;
    height: 40px;

  }`





