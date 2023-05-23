import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from 'reactstrap';
import CardEs from './Estudiante_Card_Idea';
import styled from 'styled-components';

export default function Estudiante_ListarIdeas() {



    const [datos, setDatos] = useState([]);

    const definir_Color = async () => {
        let value = null;
        value = await axios.get('../ideas.json').then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setDatos(value)
        console.log(value)
    };
    useEffect(() => {
        definir_Color();

    }, []);

    return (
        <>
            <div className="container">
                <img src="https://live.staticflickr.com/65535/52917978152_76ea16ef66_o.png" className='img-fluid mt-2'/>
                <div className="container-fluid" style={{ width: "100%" }}>
                    <div className="row">
                        <Sobreponer>
                            <div className="col-12">
                                <div id="titulo" className="rounded-3 mt-2" style={{ background: "#ECB904" }}>
                                    <div className="row">
                                        <div className="d-flex col ms-3">
                                            <h5 className="m-0 p-2" style={{ color: "black" }}><b>Ideas de negocio</b></h5>
                                        </div>
                                    </div>
                                </div>
                                <div id="cuerpo" className="row mx-3 rounded-2" style={{ background: "#DEDEDE" }}>
                                    <div className='row mx-4 mt-4'>
                                        <div className='d-flex col-auto justify-content-center align-items-center'>
                                            <div className='aprobadas'></div>
                                            <div className='mx-2'>Iniciativa aprobada</div>
                                        </div>
                                        <div className='d-flex col-auto justify-content-center align-items-center'>
                                            <div className='pendientes'></div>
                                            <div className='mx-2'>Iniciativa pendiente</div>
                                        </div>
                                        <div className='d-flex col-auto justify-content-center align-items-center'>
                                            <div className='rechazadas'></div>
                                            <div className='mx-2'>Iniciativa rechazada</div>
                                        </div>
                                    </div>
                                    <div className="row d-flex align-items-center">
                                        {datos.map((v, i) => {

                                            let color = "";
                                            if (v.estado === "a") {
                                                color = "#75C47D";
                                            } else if (v.estado === "r") {
                                                color = "#DC4B4B";
                                            } else {
                                                color = "#ECB904";
                                            }

                                            return (<div key={i} className="col-12 col-lg-4 col-sm-6">
                                                <CardEs key={v.titulo} titulo={v.titulo} color={color}></CardEs>
                                            </div>
                                            );
                                        })}
                                        <div className='col-12 col-lg-4 col-sm-6 d-flex justify-content-center align-items-center '>
                                            <button className="btn btn-sm" style={{ backgroundColor: "transparent", width: "auto", border: "none" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-plus-circle mb-3" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Sobreponer>
                    </div>
                </div>
            </div>
        </>
    )
};

const Sobreponer = styled.div`

#titulo, #cuerpo{
    position: relative;
 }

 #titulo{
    z-index: 2;
 }

 #cuerpo{
    z-index: 1;
    top: -15px;
 }

 .aprobadas{
     width: 10px;
     height: 10px;
     -moz-border-radius: 50%;
     -webkit-border-radius: 50%;
     border-radius: 50%;
     background: #75C47D;
 }

 .pendientes{
     width: 10px;
     height: 10px;
     -moz-border-radius: 50%;
     -webkit-border-radius: 50%;
     border-radius: 50%;
     background: #ECB904;
 }

 .rechazadas{
     width: 10px;
     height: 10px;
     -moz-border-radius: 50%;
     -webkit-border-radius: 50%;
     border-radius: 50%;
     background: #DC4B4B;
 }

`;