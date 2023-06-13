import React from 'react';
import { Enunciado } from './Lider_Preguntas_Template';
import { useNavigate } from "react-router-dom";
import { crearPregunta, crearRespuesta } from "./Lider_Preguntas_Endpoints";

export default function AgregarPregunta() {
    const pregunta = {
        "id": 0,
        "enunciado": "",
        "componente": "Seleccione una opción",
        "componenteCompetenciasId": {
            "id": 0,
            "nombre": "Seleccione una opción",
            "valorPorcentaje": 0
        },
        "listaRespuestas": [
        ]
    }
    const navigate = useNavigate();

    const useRecibirDatos = async (datos, respuestasEliminar) => {
        console.log("Datos recibidos:", datos);
        const resultadoPregunta = await crearPregunta(datos);
        for (let i = 0; i < datos["listaRespuestas"].length; i++) {
            const respuesta = {
                "contenido": datos["listaRespuestas"][i]["contenido"],
                "valor": datos["listaRespuestas"][i]["valor"],
                "preguntaId": resultadoPregunta["id"]
            };
            crearRespuesta(respuesta);
        }
        navigate(-1);
    };

    return (
        <div className='m-5'>
            <div className="col-6 col-md-5 ">
                <div className="rounded-3 position-absolute p-2 pe-4 sobreponer">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="m-0 p-2">
                                <b>Agregar pregunta  </b>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle p-0 m-0" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <Enunciado pregunta={pregunta} enviarDatos={useRecibirDatos} />
            </div>
        </div>
    );
}






