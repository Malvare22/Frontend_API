import axios from 'axios'
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImagenPlanNegocio from '../../assets/images/EstudianteCapacitaciones/ImagenPlanNegocio.png'
import TablaMaterialApoyo from '../estudiante/TablaMaterialApoyo'

export default function CapacitacionPlan() {
    return (
        <div className="container">
            <img src="https://live.staticflickr.com/65535/52923103551_b041e3079c_o.png" className='img-fluid mt-2' />
            <div className="container my-5" style={{ width: "80%" }}>
                <InfoGeneralPlan ></InfoGeneralPlan>
            </div>
        </div>
    )
}

const InfoGeneralPlan = () => {

    const obtenerFormato = async () => {

        let value = null;
        let URL = 'http://localhost:8080/formato/PlanNegocio';

        axios.get(URL, { responseType: 'blob', headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');

                // Obtener la extensión del nombre de archivo del encabezado Content-Type
                const contentType = response.headers['content-type'];
                const extension = contentType === 'application/octet-stream' ? '.docx' : '.pdf';

                link.href = url;
                link.setAttribute('download', `documento${extension}`); // Establecer el nombre del archivo con la extensión obtenida
                document.body.appendChild(link);
                link.click();

                // Limpiar el enlace temporal después de la descarga
                link.parentNode.removeChild(link);
            }).catch(error => {
                if (error.response) {
                    console.log('Código de estado:', error.response.status);
                    console.log('Respuesta del backend:', error.response.data);
                } else if (error.request) {
                    console.log('No se recibió respuesta del backend');
                } else {
                    console.log('Error al realizar la solicitud:', error.message);
                }
            });
    };

    return (
        <main>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <p id='tituloG' style={{ color: "#7FA9FC" }}>¿Qué es un plan de negocio?</p>
                    </div>
                    <div className="row">
                        <p id='parrafoG'>
                            Un negocio se define como una actividad u ocupación llevada a cabo con el objetivo de obtener ganancias mediante la venta o intercambio de productos o servicios que satisfagan las necesidades del mercado.
                        </p>
                        <p id='parrafoG'>
                            En este orden de ideas, el plan de negocio es el documento en el que usted como emprendedor detallará de manera sistemática la información relacionada con el emprendimiento que planea llevar a cabo.
                        </p>
                        <b><p id='cita'>
                            Sacado de la tesis de grado presentada por Rolon Estupiñan, M. y Benavides Escalante, C. A. (2021).
                        </p></b>
                    </div>
                </div>
                <div className="col-12 col-lg-5">
                    <img src={ImagenPlanNegocio} className='img-fluid m-auto' />
                </div>
            </div>
            <div className='row mt-3'>
                <div className='container d-flex justify content center'>
                    <button type="button" onClick={obtenerFormato} style={{ background: "#7FA9FC", color: "black" }} className="btn mx-auto">
                        Descargar formato
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download mx-2" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className='row my-4 d-flex justify-content-center align-items-center'>
                <TablaMaterialApoyo tipo="PlanNegocio"></TablaMaterialApoyo>
            </div>
        </main>
    )
}