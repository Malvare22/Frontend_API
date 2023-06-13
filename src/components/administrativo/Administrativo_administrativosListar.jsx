import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import styled from 'styled-components';
import axios from "axios";

const useAlert = () => {
    const [state, setState] = useState(false);
    const [valor, setValor] = useState({});

    const toggleAlert = (v) => {
        setState(!state);
        if (v != null) {
            setValor(v);
        }
    }

    return { state, toggleAlert, valor }
}
const modalStyles = {
    transform: 'translate(0%, 120%)'
}



// Componente de tabla
const Table = ({ data }) => {
    const [orderBy, setOrderBy] = useState({ column: 'Administrativo', ascending: true });

    const handleSort = (column) => {
        if (orderBy.column === column) {
            setOrderBy((prevState) => ({
                column,
                ascending: !prevState.ascending,
            }));
        } else {
            setOrderBy({ column, ascending: true, });
        }
    };
    const sortData = () => {
        const { column, ascending } = orderBy;
        return data.slice().sort((a, b) => {
            let comparison = 0;
            if (column === 'Administrativo') {
                comparison = a.apellido.localeCompare(b.apellido);
            }
            if (!ascending) {
                comparison *= -1;
            }
            return comparison;
        });
    };
    const sortedData = sortData();
    const { state, toggleAlert, valor } = useAlert();
    const navigate = useNavigate();
    const toggleA = (correo) => {
        console.log(correo)
        localStorage.setItem('ADMINISTRATIVO_EMAIL', correo)
        navigate('Perfil');
    };
    const toggleB = (correo) => {
        localStorage.setItem('ADMINISTRATIVO_EMAIL', correo)
        navigate('Perfil/Editar');
    };
    const disableAdmin = async () => {

        try{
            await axios.get('http://144.22.32.132:8080/coordinador/deshabilitarUsuario/' + valor.correo, {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        })
            toggleAlert(null)
            window.location.reload()
        }
        catch (error){
            console.log(error)
    
        }
    
    }
    
    return (
        <Sdiv>
            <div className='w-auto'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' style={{ cursor: "pointer" }} onClick={() => handleSort('Administrativo')} scope="col-auto">Nombre completo</th>
                            <th className='text-center' scope="col-auto">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((d) => {
                            if (d.correo!= (JSON.parse(localStorage.getItem('session'))).email)
                            return <tr key={d.id}>
                                <td className='text-center align-middle col-auto'>{d.apellido + " " + d.nombre}</td>
                                <td className='text-center align-middle'>
                                    <div>
                                        <button type="button" className="btn" onClick={()=>{toggleA(d.correo)}} value={d.codigo} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>
                                        </button>
                                        <button type="button" className="btn" onClick={()=>{toggleB(d.correo)}} value={d.codigo} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                        <button type="button" id="eliminar" value={d.id} onClick={() => toggleAlert({ id: d.codigo, administrativo: d.apellido + " " + d.nombre, correo: d.correo })} className="btn" style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        }
                        )}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={state} style={modalStyles}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Está seguro de que desea deshabilitar al administrativo {valor.administrativo} que tiene como id: {valor.id}?</Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={()=>{disableAdmin()}}>Deshabilitar</Button>
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
export default function Listar_Administrativos() {
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate()
    const getAdministrativos = async () => {
        let value = null;
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        value = (await axios.get('http://144.22.32.132:8080/coordinador/listar/administrativo', config)).data
            
        setFilteredData(value)
    };
    useEffect(() => {
        getAdministrativos();
    }, []);

    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Administrativos</h1>
                    <div className="container">
                        <br></br>
                        <Table data={filteredData}></Table>
                        <br></br>
                        <div className="d-flex justify-content-start">
                            <button onClick={ ()=>{navigate('registrar')}} type="button" className="btn rounded-3" style={{ background: "#1C3B57", color: "#FFFFFF" }}>
                                <div className="col-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



