import React from 'react';
import { Tabla } from '../useGeneral/Tabla';

export default function listarPreguntas() {
    let datos = [
        {
            "id" : 1,
            "Enunciado" : "Triste estoy",
            "Componente" : "Liderazgo",
        },
        {
            "id" : 1,
            "Enunciado" : "feliz estoy",
            "Componente" : "Liderazgo",
        },
        {
            "id" : 1,
            "Enunciado" : "enojada estoy",
            "Componente" : "Liderazgo",
        },
        {
            "id" : 1,
            "Enunciado" : "Fastidiada estoy",
            "Componente" : "Liderazgo",
        },
        {
            "id" : 1,
            "Enunciado" : "Fastidiada estoy",
            "Componente" : "Liderazgo",
        },
        {
            "id" : 1,
            "Enunciado" : "Fastidiada estoy",
            "Componente" : "Liderazgo",
        }
    ];
    let columnas = ["id", "Enunciado", "Componente"];
        
    const handleEliminarClick = (dato) => {
        console.log(dato);
    }
    
    const handleEditarClick = (dato) => {
        console.log(dato);
    }

    return (
        <div className='m-5'>
            <h1 className="fst-italic fw-bold fs-1 text-black mb-4">Preguntas Evaluacion de emprendimiento</h1>
            {Tabla({ datos, columnas, handleEliminarClick, handleEditarClick})}
        </div>
    );
}

