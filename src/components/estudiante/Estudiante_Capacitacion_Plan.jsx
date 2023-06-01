import axios from 'axios'
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImagenIdeaNegocio from '../../assets/images/EstudianteCapacitaciones/ImagenPlanNegocio.png'

export default function CapacitacionIdea() {
    return (
        <div className="container">
            <img src="https://live.staticflickr.com/65535/52923103551_b041e3079c_o.png" className='img-fluid mt-2' />
            <div className="container my-5" style={{ width: "80%" }}>
                <InfoGeneralIdea></InfoGeneralIdea>
            </div>
        </div>
    )
}

const InfoGeneralIdea = () => {
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
                    <img src={ImagenIdeaNegocio} className='img-fluid m-auto' />
                </div>
            </div>
            <div className='row mt-3'>
                <div className='container d-flex justify content center'>
                    <button type="button" style={{ background: "#7FA9FC", color: "black" }} className="btn mx-auto">
                        Descargar formato
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download mx-2" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className='row my-4 d-flex justify-content-center align-items-center'>
                <TablaMaterialPlan></TablaMaterialPlan>
            </div>
        </main>
    )
}

function TablaMaterialPlan() {
    // const [datos, setDatos] = useState([]);
    // const getIdeas = async () => {
    //     let value = null;
    //     value = await axios.get('../ideas.json').then(
    //         response => {
    //             const data = response.data;
    //             return data;
    //         }).catch(error => {
    //             console.error(error);
    //         });
    //     setDatos(value)
    // };
    // useEffect(() => {
    //     getIdeas();
    // }, []);
    return (
        <Sdiv>
            <div className='w-auto m-2'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col-auto">Tipo de material</th>
                            <th className='text-center' scope="col-auto">Fecha de creación</th>
                            <th className='text-center' scope="col-auto">Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {datos.map((d) => ( */}
                            <tr /*key={d.id}*/>
                                <td className='text-center align-middle col-auto'>Documento</td>
                                <td className='text-center align-middle'>2023/05/22</td>
                                <td className='text-center align-middle col-auto'>
                                    <button type="button" className="btn" /*value={d.id}*/ style={{ width: "auto", border: "none" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </Sdiv>
    );
}

const Sdiv = styled.div`
  table{
      table-layout: fixed;
  }
  
  th, td {
      border: 1px solid;
      width: 100px;
      word-wrap: break-word;
  }
  table th{
      background-color: #1C3B57;
      color: #FFF;
  }
  table td{
    background-color:#FFF;
  }
  overflow-y: scroll;
  height: fit-content;
  max-height: 66.4vh;
  
  @media screen and (max-width: 576px){
      th, td {
          width: 60px;
      }}
`;