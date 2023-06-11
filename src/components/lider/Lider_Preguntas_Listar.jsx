import React, {useEffect, useState} from 'react';
import { Tabla } from '../useGeneral/Tabla';
import axios from 'axios';

export default function useListarPreguntas() {
    const [preguntaInfo, setPreguntaInfo] = useState([]);

    const getPreguntas = async () => {
    try {
        const config = {
        headers: {
            "X-Softue-JWT": localStorage.getItem('token_access')
        }
        }
        const response = await axios.get('http://localhost:8080/pregunta', config);
        setPreguntaInfo(response.data);
    } catch (error) {
        console.error("Error al obtener las preguntas:", error);
    }
    };
    useEffect(() => {
    getPreguntas();
    }, []);

    let columnas = ["id", "enunciado", "componente"];

    const preguntasConComponente = preguntaInfo.map((pregunta) => {
        return {
          ...pregunta,
          componente: pregunta.componenteCompetenciasId.nombre
        };
      });

    const handleEliminarClick = (dato) => {
        console.log(dato);
    }
    
    const handleEditarClick = (dato) => {
        console.log(dato);
    }

    return (
        <div className='m-5'>
            <h1 className="fst-italic fw-bold fs-1 text-black mb-4">Preguntas Evaluacion de emprendimiento</h1>
            <Tabla datos={preguntasConComponente} columnas={columnas} handleEliminarClick={handleEliminarClick} handleEditarClick={handleEditarClick} />
        </div>
    );
}

