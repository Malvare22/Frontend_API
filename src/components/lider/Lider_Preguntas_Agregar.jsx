import React from 'react'
import { Enunciado } from './Lider_Preguntas_Template';

export default function agregarPregunta() {
    const pregunta = {
        "enunciado" : "Ingrese el enunciado",
        "numeroRespuestas" : "2",
        "componente" : "liderazgo"
    }

    const cargarComponentes = () => {
        return (
            ["liderazgo", "creatividad", "solidaridad"]
        );
    }

    const recibirDatos = (datos) => {
        console.log("Datos recibidos:", datos);
        // Realiza la lógica necesaria con los datos recibidos
      };

    return (
        <div className='m-5'>
            <h1 className="fst-italic fw-bold fs-1 text-black mb-4">Agregar pregunta</h1>
            <Enunciado pregunta={pregunta} cargarComponentes={cargarComponentes} enviarDatos={recibirDatos} />
        </div>
    );
}

