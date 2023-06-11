import React, { useEffect, useState } from 'react';
import { Enunciado } from './Lider_Preguntas_Template';
import { useNavigate } from "react-router-dom";
import {actualizarPregunta, actualizarRespuesta, crearRespuesta, eliminarRespuesta, getPregunta} from "./Lider_Preguntas_Endpoints"

export default function EditarPregunta() {
    const [preguntaInfo, setPreguntaInfo] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        getPregunta({preguntaInfo, setPreguntaInfo});
    }, [preguntaInfo, setPreguntaInfo]);
    
    const useRecibirDatos = async (datos, respuestasEliminar) => {
        actualizarPregunta(datos);
        for(let i = 0; i < datos["listaRespuestas"].length; i++) {
            const respuesta = {
                "id" : datos["listaRespuestas"][i]["id"],
                "contenido" : datos["listaRespuestas"][i]["contenido"],
                "valor" : datos["listaRespuestas"][i]["valor"],
                "preguntaId" : datos["id"]
            };
            if("agregada" in datos["listaRespuestas"][i])
                crearRespuesta(respuesta);
            else
                actualizarRespuesta(respuesta);
        }
        for(let eliminada of respuestasEliminar) {
            eliminarRespuesta(eliminada);
        }
        navigate(-1);
    }

    return (
        <div className='m-5'>
            <h1 className="fst-italic fw-bold fs-1 text-black mb-4">Editar pregunta</h1>
            {Object.keys(preguntaInfo).length > 0 && <Enunciado pregunta={preguntaInfo} enviarDatos={useRecibirDatos} />}
        </div>
    );
}