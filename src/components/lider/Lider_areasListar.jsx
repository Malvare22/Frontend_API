import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import axios from "axios";

const useAlert = () => {
    const [state, setState] = useState(false);
    const [valor, setValor] = useState({});

    const toggleAlert = (v) => {
        setState(!state);
        if (v != null) {
            setValor(v);
        }
        console.log()
    }
    return { state, toggleAlert, valor }
}
const modalStyles = {
    transform: 'translate(0%, 120%)'
}


// Componente de tabla
const Table = (props) => {

    const { state, toggleAlert, valor } = useAlert();
    const eliminar = async (nombre) => {
        try {
            var formData = new FormData();
            formData.append('nombre', nombre);
            const config = {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") },
                data: formData
            };
            console.log(nombre)
            await axios.delete("http://144.22.63.128:8080/areaConocimiento", config)
            toggleAlert(null)
            window.location.reload();
        }
        catch (error){
            console.error(error);
        }
    }
    return (
        <Sdiv>
            <div className='w-auto'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col-auto">Id del area</th>
                            <th className='text-center' scope="col-auto">Nombre del area</th>
                            <th className='text-center' scope="col-auto">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((d) => (
                            <tr key={d && d.id}>
                                <td className='text-center align-middle col-auto'>{d && d.id}</td>
                                <td className='text-center align-middle col-auto'>{d && d.nombre}</td>
                                <td className='text-center align-middle'>
                                    <div>
                                        <button type="button" id="eliminar" value={d.id}  onClick={() => toggleAlert({nombre : d.nombre})} className="btn" style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={state} style={modalStyles}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Está seguro de que desea eliminar el area de conocimiento de {valor.nombre}?</Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => eliminar(valor.nombre)}>Eliminar</Button>
                    <Button color="primary" onClick={() => toggleAlert(null)}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </Sdiv>
    );
};
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
    color: #FFFFFF;
}
overflow-y: scroll;
height: fit-content;
max-height: 66.4vh;
    
@media screen and (max-width: 576px){
    th, td {
        width: 60px;
    }}
`;

// Componente principal que contiene la tabla y los filtros
export default function Listar_Areas() {
    const [areas, setAreas] = useState([]);
    const navigate = useNavigate();
    const getAreas = async () => {
        let value = null;
        value = await axios.get('http://144.22.63.128:8080/areaConocimiento', {
            headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
        }).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setAreas(value)
        console.log(areas)
    };
    useEffect(() => {
        getAreas();
    }, []);

    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Areas del conocimiento</h1>
                    <div className="container">
                        <br></br>
                        <Table data={areas} updater={getAreas} navigate={navigate}></Table>
                        <br></br>
                        <div className="d-flex justify-content-start">
                            <button type="button" className="btn rounded-3" style={{ background: "#1C3B57", color: "#FFFFFF" }} onClick={()=> navigate('../Areas/Registrar')}>
                                <div className='d-flex'>
                                    <div className='col-auto p-1'>
                                        Registrar area
                                    </div>
                                    <div className="col-auto p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
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









