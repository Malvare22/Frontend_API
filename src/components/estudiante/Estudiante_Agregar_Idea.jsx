import styled from "styled-components";
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';

import { Dropdown } from "react-bootstrap";

export default function AgregarIdea() {

    const [datos, setDatos] = useState([]);

    const estudiantes = async () => {
        let value = null;
        value = await axios.get('../estudiantes.json').then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setDatos(value)
    };
    useEffect(() => {
        estudiantes();

    }, []);

    return (<>
        <div className="container">
            <img src="https://live.staticflickr.com/65535/52923256419_f1155354b4_o.png" className='img-fluid mt-2' />
            <div className="container-fluid" style={{ width: "100%" }}>
                <div className="row">
                    <Sobreponer>
                        <div className="col-12">
                            <div id="titulo" className="rounded-3 mt-4" style={{ background: "#ECB904" }}>
                                <div className="row">
                                    <div className="d-flex col ms-3">
                                        <h5 className="m-0 p-2" style={{ color: "black" }}><b>Ideas de negocio</b></h5>
                                    </div>
                                </div>
                            </div>
                            <div id="cuerpo" className="row mx-3 rounded-2" style={{ background: "#DEDEDE" }}>
                                <div className="mt-2 p-4">
                                    <p><b>1. Nombre de la idea de negocio</b></p>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="mt-3">
                                        <p><b>2. Estudiantes que hacen parte del proyecto</b></p>
                                        <Autocomplete
                                            style={{ background: "white", border: "none" }}
                                            multiple
                                            limitTags={2}
                                            options={datos}
                                            getOptionLabel={(option) => option.estudiante}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Integrantes" placeholder="Estudiantes" />
                                            )}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <p><b>3. Área de enfoque</b></p>
                                        <Form.Select aria-label="Área de enfoque"style={{ width:"auto"}}>
                                            <option>Seleccione ...</option>
                                            <option value="1">Minera</option>
                                            <option value="2">Agropecuaria</option>
                                            <option value="3">Comercial</option>
                                            <option value="4">Servicios</option>
                                            <option value="5">Industrial</option>
                                        </Form.Select>
                                    </div>
                                    <div className="mt-3">
                                        <p><b>4. Subir formato de la idea de negocio</b></p>
                                        <button type="button" style={{ background: "#1C3B57", color: "white" }} className="btn">
                                            Seleccione el archivo
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-up mx-2" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <button type="button" style={{ background: "#ECB904", color: "black" }} className="btn m-2"><b>Enviar</b></button>
                            </div>
                        </div>
                    </Sobreponer>
                </div>
            </div>
        </div>
    </>
    )
}


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

`;
