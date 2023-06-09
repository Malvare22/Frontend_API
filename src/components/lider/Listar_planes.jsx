import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import axios from "axios";
import { Filters, Table } from '../useGeneral/UserTablesPlanes';

export default function Listar_Planes() {
    const [filteredData, setFilteredData] = useState([]);
    const getPlanes = async () => {
        let value = null;
        value = await axios.get('../planes.json').then(
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
        console.log(filters)
        console.log(filters.tutor)
        console.log(filters.estudiante)
        console.log(filters.area)
        console.log(filters.estado)
        console.log(filters.fechaInicio)
        console.log(filters.fechaFin)
        try {
            let value = null;
            value = await axios.get('../planesFiltrados.json').then(
                response => {
                    const data = response.data;
                    return data;
                }).catch(error => {
                    console.error(error);
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
                    <h1 className="fst-italic fw-bold fs-1 text-black">Planes de Negocio</h1>
                    <div className="container">
                        <Filters onFilter={handleFilter} user={'lider'}></Filters>
                        <br></br>
                        <Table data={filteredData} user={'lider'}></Table>
                        <br></br>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn rounded-3" style={{ background: "#1C3B57", color: "#FFFFFF" }}>
                                <div className="row">
                                    <div className="col-auto">
                                        Generar informe
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
    );
}