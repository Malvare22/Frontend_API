import React from 'react';
import axios from 'axios';
import { Enunciado } from './Lider_Preguntas_Template';
import { useNavigate } from "react-router-dom";

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

    const crearPregunta = async (datos) => {
        try {
            const formData = new FormData();
            formData.append('enunciado', datos.enunciado);
            formData.append('nombreComponente', datos.componente);
            const config = {
                headers: {
                    "X-Softue-JWT": localStorage.getItem('token_access')
                }
            }
            const response = await axios.post('http://localhost:8080/pregunta', formData, config);
            return response.data;
        } 
        catch (error) {
            let msg = '';
            if (error.response) {
                console.log('Código de estado:', error.response.status);
                msg = "Error " + error.response.status + ": " + error.response.data.errorMessage;
            } else if (error.request) {
                msg = 'Error: No se recibió respuesta de la base de datos';
            } else {
                msg = "Error al realizar la solicitud: " + error.message;
            }
            console.error(msg);
        }
    };

    const crearRespuesta = async (respuesta) => {
        try {
            const formData = new FormData();
            formData.append('contenido', respuesta.contenido);
            formData.append('valor', respuesta.valor);
            formData.append('preguntaId', respuesta.preguntaId);
            const config = {
                headers: {
                    "X-Softue-JWT": localStorage.getItem('token_access')
                }
            }
            await axios.post('http://localhost:8080/respuesta', formData, config);
        } 
        catch (error) {
            let msg = '';
            if (error.response) {
                console.log('Código de estado:', error.response.status);
                msg = "Error " + error.response.status + ": " + error.response.data.errorMessage;
            } else if (error.request) {
                msg = 'Error: No se recibió respuesta de la base de datos';
            } else {
                msg = "Error al realizar la solicitud: " + error.message;
            }
            console.error(msg);
        }
    };


    return (
        <div className='m-5'>
            <h1 className="fst-italic fw-bold fs-1 text-black mb-4">Agregar pregunta</h1>
            <Enunciado pregunta={pregunta} enviarDatos={useRecibirDatos} />
        </div>
    );
}

