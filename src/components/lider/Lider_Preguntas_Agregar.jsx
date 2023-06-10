import React from 'react'
import { Enunciado } from './Lider_Preguntas_Template';

export default function agregarPregunta() {
    const pregunta = {
        "id": 0,
        "enunciado": "",
        "componente" : "Seleccione una opción",
        "componenteCompetenciasId": {
            "id": 0,
            "nombre": "Seleccione una opción",
            "valorPorcentaje": 0
        },
        "listaRespuestas": [
        ]
    }
    
    const recibirDatos = (datos, respuestasEliminar) => {
        console.log("Datos recibidos:", datos);
      };

    return (
        <div className='m-5'>
            <h1 className="fst-italic fw-bold fs-1 text-black mb-4">Agregar pregunta</h1>
            <Enunciado pregunta={pregunta} enviarDatos={recibirDatos} />
        </div>
    );
}

