import axios from "axios";
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import imageDefault from './../../assets/images/Users/default_profile.png'

const Information = (props) => {
    let email = "mailto:" + props.correo;
    return (
        <main className="container-fluid" style={{ width: "80%" }}>
            <div className="row">
                <Sobreponer>
                    <div className="col-12 my-3">
                        <div id="titulo" className="rounded-4 mt-2" style={{ background: "#1C3B57", width: "80%" }}>
                            <div className="row">
                                <div className="col-1 ms-4 p-4 d-flex justify-content-center align-items-center">
                                    <div>
                                        {props.imagen ? <img className='rounded-circle' src={props.imagen} alt="Imagen Entidad Financiadora" /> : <img className='rounded-circle' src={imageDefault} alt="Imagen Predeterminada" />}
                                    </div>
                                </div>
                                <div className="col d-flex align-items-center">
                                    <h5 className="m-2" style={{ color: "white" }}>{props.nombre}</h5>
                                </div>
                            </div>
                        </div>
                        <div id="cuerpo" className="row mx-4 rounded-1" style={{ background: "#CECECE" }}>
                            <div className="mt-3">
                                <div className="row my-2">
                                    <div className="col d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill mx-2" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                        </svg>
                                        {props.telefono}
                                    </div>
                                    <div className="col d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill mx-2" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                        </svg>
                                        <a href={email}>{props.correo}</a>
                                    </div>
                                    <div className="col d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe mx-2" viewBox="0 0 16 16">
                                            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                                        </svg>
                                        <a href={props.sitioweb} target="_blank" rel="noreferrer">{props.sitioweb}</a>
                                    </div>
                                </div>
                                <hr className='border-3 border-black m-0'></hr>
                                <div className="my-4 mx-2">
                                    {props.descripcion}
                                </div>
                            </div>
                        </div>

                    </div>
                </Sobreponer>
            </div>
        </main>
    );
}

export default Information;

const Sobreponer = styled.div`

img{
    width: 50px;
}

#titulo, #cuerpo{
    position: relative;
 }

 #titulo{
    z-index: 2;
 }

 #cuerpo{
    z-index: 1;
    top: -5px;
 }
 
 `;





