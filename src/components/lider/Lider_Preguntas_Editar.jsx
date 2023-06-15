import React, { useEffect, useState } from 'react';
import { Enunciado } from './Lider_Preguntas_Template';
import { useNavigate } from "react-router-dom";
import { actualizarPregunta, actualizarRespuesta, crearRespuesta, eliminarRespuesta, getPregunta } from "./Lider_Preguntas_Endpoints"

export default function EditarPregunta() {
    const [preguntaInfo, setPreguntaInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPregunta({ preguntaInfo, setPreguntaInfo });
    }, [preguntaInfo, setPreguntaInfo]);

    const useRecibirDatos = async (datos, respuestasEliminar) => {
        actualizarPregunta(datos);
        for (let i = 0; i < datos["listaRespuestas"].length; i++) {
            const respuesta = {
                "id": datos["listaRespuestas"][i]["id"],
                "contenido": datos["listaRespuestas"][i]["contenido"],
                "valor": datos["listaRespuestas"][i]["valor"],
                "preguntaId": datos["id"]
            };
            if ("agregada" in datos["listaRespuestas"][i])
                crearRespuesta(respuesta);
            else
                actualizarRespuesta(respuesta);
        }
        for (let eliminada of respuestasEliminar) {
            eliminarRespuesta(eliminada);
        }
        navigate(-1);
    }

    return (
        <div className='m-5'>
            <div className="col-6 col-md-5 ">
                <div className="rounded-3 position-absolute p-2 pe-4 sobreponer">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="m-0 p-2 pe-0">
                                <b className="me-3" >Editar pregunta</b>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-fill m-0 p-0" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            {Object.keys(preguntaInfo).length > 0 && <Enunciado pregunta={preguntaInfo} enviarDatos={useRecibirDatos} />}
        </div>
    );
}











