import React from 'react';
import { Enunciado } from './Lider_Preguntas_Template';
import { useNavigate } from "react-router-dom";
import {crearPregunta, crearRespuesta} from "./Lider_Preguntas_Endpoints"

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
        for(let i = 0; i < datos["listaRespuestas"].length; i++) {
            const respuesta = {
                "contenido" : datos["listaRespuestas"][i]["contenido"],
                "valor" : datos["listaRespuestas"][i]["valor"],
                "preguntaId" : resultadoPregunta["id"]
            };
            crearRespuesta(respuesta);
        }
        navigate(-1);
    };

    return (
        <div className='m-5'>
            <h1 className="fst-italic fw-bold fs-1 text-black mb-4">Agregar pregunta</h1>
            <Enunciado pregunta={pregunta} enviarDatos={useRecibirDatos} />
        </div>
    );
}

