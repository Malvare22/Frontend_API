import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";
import { Filters, Table } from '../useGeneral/UserTablesPlanes';

// Componente principal que contiene la tabla y los filtros
export default function Listar_Planes() {
    const [filteredData, setFilteredData] = useState([]);
    const getPlanes = async () => {
        let formData = new FormData()
        var localData = localStorage.getItem("MY_PROFILE_INFO");
        var parsedData = JSON.parse(localData);
        formData.append('tutorCodigo', parsedData.codigo);
        let value = await axios.post("http://144.22.32.132:8080/planNegocio/filtrar", formData, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setFilteredData(value)
    };
    useEffect(() => {
        getPlanes();
    }, []);
    const handleFilter = async (filters) => {
        var formData = new FormData();
        var localData = localStorage.getItem("MY_PROFILE_INFO");
        var parsedData = JSON.parse(localData);
        formData.append('tutorCodigo', parsedData.codigo);
        if (filters.estudiante !== '') {
            formData.append('codigoEstudiante', filters.estudiante);
        }
        if (filters.area !== '') {
            formData.append('area', filters.area);
        }
        if (filters.estado !== '') {
            formData.append('estado', filters.estado);
        }
        if (filters.fechaInicio !== '' && filters.fechaFin !== '') {
            formData.append('fechaInicio', filters.fechaInicio);
            formData.append('fechaFin', filters.fechaFin);
        }
        console.log([...formData.entries()]);
        try {
            const config = {
                headers: {
                    "X-Softue-JWT": localStorage.getItem('token_access')
                }
            }
            const value = await axios.post("http://144.22.32.132:8080/planNegocio/filtrar", formData, config
            ).then(
                response => {
                    const data = response.data;
                    console.log(data)
                    return data;
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
            setFilteredData(value);
        } catch (error) {
            console.error(error);
        }
        //ACA IRA LA SOLICITUD A BACK CON LOS PARAMETROS
    };
    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Planes de Negocio - Tutor</h1>
                    <div className="container">
                        <Filters onFilter={handleFilter} user={'tutor'}></Filters>
                        <br></br>
                        <Table data={filteredData} user={'tutor'}></Table>
                        <br></br>
                        <div className='row'>
                            <div className="col">
                                <button type="button" className="btn rounded-3" style={{ background: "#1C3B57", color: "#FFFFFF" }}>
                                    <div className="row">
                                        <div className="col-auto">
                                            Formato actual
                                        </div>
                                        <div className="col-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





