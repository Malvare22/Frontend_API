import React from 'react'
import { Enunciado } from './Lider_Preguntas_Template';

export default function agregarPregunta() {
    const pregunta = {
        "id" : 1,
        "enunciado" : "Esto es un enunciado",
        "numeroRespuestas" : "2",
        "componente" : "liderazgo",
        "respuestas" : [
            {
                "id" : 1,
                "contenido" : "esto es un contenido de una respuesta",
                "valor" : 2
            },
            {
                "id" : 2,
                "contenido" : "esto es un contenido de una respuesta",
                "valor" : 2
            },
            {
                "id" : 3,
                "contenido" : "esto es un contenido de una respuesta",
                "valor" : 2
            } 
        ]
    }

    const cargarComponentes = () => {
        return (
            ["liderazgo", "creatividad", "solidaridad", "trabajo en equipo"]
        );
    }

    const recibirDatos = (datos) => {
        console.log("Datos recibidos:", datos);
      };

    return (
        <div className='m-5'>
            <h1 className="fst-italic fw-bold fs-1 text-black mb-4">Agregar pregunta</h1>
            <Enunciado pregunta={pregunta} cargarComponentes={cargarComponentes} enviarDatos={recibirDatos} />
        </div>
    );
}

