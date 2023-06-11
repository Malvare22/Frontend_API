import React, { useEffect, useState } from 'react';
import { Enunciado } from './Lider_Preguntas_Template';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function EditarPregunta() {
    const [preguntaInfo, setPreguntaInfo] = useState([]);
    
    const getPregunta = async () => {
        try {
            const config = {
                headers: {
                    "X-Softue-JWT": localStorage.getItem('token_access')
                }
            }
            const response = await axios.get(`http://localhost:8080/pregunta/${localStorage.getItem('idPregunta')}`, config);
            const preguntaData = {
                ...response.data,
                componente: response.data.componenteCompetenciasId.nombre
              };
            setPreguntaInfo(preguntaData);
            
        } catch (error) {
            console.error("Error al obtener las preguntas:", error);
        }
    };
    useEffect(() => {
        getPregunta();
    }, []);

    const useRecibirDatos = async (datos, respuestasEliminar) => {
        console.log(datos);
    }

    return (
        <div className='m-5'>
            <h1 className="fst-italic fw-bold fs-1 text-black mb-4">Editar pregunta</h1>
            {Object.keys(preguntaInfo).length > 0 && <Enunciado pregunta={preguntaInfo} enviarDatos={useRecibirDatos} />}
        </div>
    );
}