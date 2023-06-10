import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pregunta from './Estudiante_Preguntas';
import styled from 'styled-components';


const EstudianteEvaluacion = () => {
    
    const [datos, setDatos] = useState([]);

    const getPreguntas = async () => {
        let value = null;
        value = await axios.get("http://localhost:8080/pregunta", { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
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

    return (
        
        <div className='container' style={{width : "80%"}}>
        <Sobreponer>
            <div id="titulo1" className="rounded-4 mt-4" style={{ background: '#DC4B4B' }}>
                <div className="row">
                    <div className="d-flex col ms-3">
                        <h5 className="m-0 p-3" style={{ color: 'black'}}>
                            <b>Evaluación</b>
                        </h5>
                    </div>
                </div>
            </div>
            <div className="row mx-3 rounded-2 pt-3" style={{ background: '#DEDEDE' }}>
                <form>
                    {datos.map((v, i) => {
                        return (
                            <Pregunta enunciado={(i + 1) + ". " + v.enunciado} respuestas={v.listaRespuestas}></Pregunta>
                        );
                    })}
                    <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn mt-2 rounded-4" style={{ background: '#DC4B4B', color: 'black' }}>
                          <b>Enviar</b>
                        </button>
                      </div>
                </form> 
            </div>
        </Sobreponer>
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
    top: -15px;
  }

  #titulo {
    width: 100%;
    border: 1px solid grey;
    border-radius: 4px;
    height: 40px;
  }`

