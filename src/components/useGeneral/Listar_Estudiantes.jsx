import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import { importStudents, toLiderFormatStudentsFromImport } from '../../context/functions_general'

import axios from "axios";
import BtnExcel from './Cargar_Excel';

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
const Table = (props) => {
    const [orderBy, setOrderBy] = useState({ column: 'Codigo', ascending: true });
    const [orderData, setOrderData] = useState([])
    // useEffect(()=>{
    //     setOrderData()
    // },[])
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
        return props.data.slice().sort((a, b) => {
            let comparison = 0;
            if (column === 'Código') {
                comparison = a.codigo - b.codigo;
            } else if (column === 'Estudiante') {
                comparison = a.nombre.localeCompare(b.nombre);
            } else if (column === 'Curso') {
                const cursoA = parseInt(a.cursoToString.split(' ')[0], 10);
                const cursoB = parseInt(b.cursoToString.split(' ')[0], 10);
                comparison = cursoA - cursoB;
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
    const toggleA = (value) => {
        localStorage.setItem('ESTUDIANTE_EMAIL',value.correo)

        navigate('../Estudiantes/Perfil')
    };
    const toggleB = (value) => {
        localStorage.setItem('ESTUDIANTE_EMAIL',value.correo)

        navigate('../Estudiantes/Perfil/Editar')
    };

    const disableStudent = async () => {

        try{
            await axios.get('http://146.235.246.199:8080/coordinador/deshabilitarUsuario/' + valor.correo, {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        })
            props.updater()
            toggleAlert(null)
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
                            <th className='text-center' style={{ cursor: "pointer" }} onClick={() => handleSort('Código')} scope="col-auto">Código</th>
                            <th className='text-center' style={{ cursor: "pointer" }} onClick={() => handleSort('Estudiante')} scope="col-auto">Nombre completo</th>
                            <th className='text-center' style={{ cursor: "pointer" }} onClick={() => handleSort('Curso')} scope="col-auto">Curso</th>
                            <th className='text-center' scope="col-auto">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {sortData && sortedData.map((d) => (
                            <tr key={d.correo}>
                                <td className='text-center align-middle col-auto'>{d.codigo}</td>
                                <td className='text-center align-middle col-auto'>{d.nombre}</td>
                                <td className='text-center align-middle col-auto'>{d.cursoToString}</td>
                                <td className='text-center align-middle'>
                                    <div>

                                        <button type="button" className="btn" onClick={()=>{toggleA(d)}} value={d.id} style={{ width: "auto", border: "none" }}>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>
                                        </button>
                                        {(props.type!='docente' && props.type!='lider') && <button type="button" className="btn" onClick={()=>toggleB(d)} value={d.id} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>}
                                        {/* <button type="button" id="eliminar" value={d.id} onClick={() => toggleAlert({ codigo: d.codigo, nombre: d.nombre, correo: d.correo })} className="btn" style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                                            </svg>
                                        </button> */}
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
                        <Label id="texto">¿Está seguro de que desea deshabilitar al estudiante {valor.nombre} que tiene como código: {valor.codigo}?</Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => { disableStudent() }}>Deshabilitar</Button>
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
export default function ListarEstudiantes(props) {
    const [filteredData, setFilteredData] = useState([]);
    const getEstudiantes = async () => {
        let value = null;
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        value = await axios.get('http://146.235.246.199:8080/estudiante/listar', config)
        setFilteredData(importStudents(value.data))


    };
    const navigate = useNavigate()
    const addStudent = () => {
        navigate('../Estudiantes/Registrar')
    }
    useEffect(() => {
        getEstudiantes();
    }, []);




    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Estudiantes</h1>
                    <div className="container">
                        <br></br>
                        <Table data={filteredData} type={props.type} updater={getEstudiantes}></Table>
                        <br></br>
                        {(props.type!='docente' && props.type!='lider')&& <div className="d-flex justify-content-between">
                            <button type="button" className="btn rounded-3" style={{ background: "#1C3B57", color: "#FFFFFF" }} onClick={addStudent}>
                                <div className="col-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                    </svg>
                                </div>
                            </button>
                            <BtnExcel type={'Estudiante'}/>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}











