import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
    const [orderBy, setOrderBy] = useState({ column: 'Id', ascending: true });

    const handleSort = (column) => {
        if (orderBy.column === column) {
            setOrderBy((prevState) => ({
                column,
                ascending: !prevState.ascending
            }));
        } else {
            setOrderBy({
                column,
                ascending: true
            });
        }
    };

    const sortData = () => {
        const { column, ascending } = orderBy;
        return data.slice().sort((a, b) => {
            let comparison = 0;
            if (column === 'Id') {
                comparison = a.id.toString().localeCompare(b.id.toString(), undefined, { numeric: true });
            } else if (column === 'Modulo') {
                comparison = a.modulo.localeCompare(b.modulo);
            } else if (column === 'Fecha') {
                comparison = a.fechaCreacion.localeCompare(b.fechaCreacion);
            }
            if (!ascending) {
                comparison *= -1;
            }
            return comparison;
        });
    };

    const sortedData = sortData();
    const navigate = useNavigate();
    const descargarFormato = () => {
        navigate('');
    };

    //Eliminar formato
    const [showModal, setShowModal] = useState(false);
    const [formatoEliminar, setFormatoEliminar] = useState(null);

    const toggleAlert = (formato) => {
        setFormatoEliminar(formato);
        setShowModal(true);
    };

    const eliminarFormato = async () => {
        try {
            await axios.delete(`http://localhost:8080/formato/${formatoEliminar.id}`, {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
            });

            console.log("Formato eliminado correctamente");
            window.location.reload();

        } catch (error) {
            if (error.response) {
                console.log('Código de estado:', error.response.status);
                console.log('Respuesta del backend:', error.response.data);
            } else if (error.request) {
                console.log('No se recibió respuesta del backend');
            } else {
                console.log('Error al realizar la solicitud:', error.message);
            }
        }

        setShowModal(false);
        setFormatoEliminar(null);
    };

    //Descargar formatos
    const descargarDocumento = async (documentoId) => {
        let value = null;

        let URL = `http://localhost:8080/formato/recuperar/`+documentoId;
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
        <Sdiv>
            <div className='w-auto'>
                <div className="col-auto d-flex align-items-center mt-3">
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Id')} scope="col-auto">Id</th>
                            <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Modulo')} scope="col-auto">Módulo</th>
                            <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Fecha')} scope="col-auto">Fecha de creación</th>
                            <th className='text-center' scope="col-auto">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((d) => (
                            <tr key={d.id}>
                                <td className='text-center align-middle col-auto'>{d.id}</td>
                                <td className='text-center align-middle col-auto'>{d.modulo}</td>
                                <td className='text-center align-middle col-auto'>{d.fechaCreacion}</td>
                                <td className='text-center align-middle'>
                                    <div>
                                        <button type="button" className="btn" onClick={() => descargarDocumento(d.id)} value={d.id} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                            </svg>
                                        </button>
                                        <button type="button" id="eliminar" onClick={() => toggleAlert({ id: d.id, modulo: d.modulo })} className="btn" style={{ width: "auto", border: "none" }}>
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
            <Modal isOpen={showModal} style={modalStyles}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Está seguro de que desea eliminar el formato de {formatoEliminar?.modulo} de negocio que tiene como id: {formatoEliminar?.id}?</Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={eliminarFormato}>Eliminar</Button>
                    <Button color="primary" onClick={() => setShowModal(false)}>Cancelar</Button>
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
export default function Listar_Formatos() {

    const [filteredData, setFilteredData] = useState([]);
    const [modulo, setModulo] = useState('');

    const handleModuloChange = (e) => {
        setModulo(e.target.value);
    };

    console.log(modulo);

    const getFormatos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/formato/material', {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
            });

            let formatos = response.data;

            if (modulo !== '') {
                formatos = formatos.filter(formato => formato.modulo === modulo);
            }

            formatos = formatos.map((formato) => {
                const [year, month, day] = formato.fechaCreacion;
                const fechaCreacion = `${day}/${month}/${year}`;
                return { ...formato, fechaCreacion };
            });

            setFilteredData(formatos);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFormatos();
    }, [modulo]);


    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Historial de capacitaciones de proyecto de emprendimiento</h1>
                    <div className='container mt-3'>
                        <select name="modulo" onChange={handleModuloChange} className="form-select-sm selector fw-bold text-black" required>
                            <option value="">General</option>
                            <option value="material_plan_negocio">Plan de negocio</option>
                            <option value="material_general">Material general</option>
                            <option value="material_idea_negocio">Idea de negocio</option>
                        </select>
                    </div>
                    <div className="container">
                        <Table data={filteredData}></Table>
                        <br></br>
                        <div className="d-flex justify-content-end">
                            <Link to={'../AgregarCapacitacion'} style={{ textDecoration: "none" }}>
                                <button type="button" className="btn rounded-3" style={{ background: "#1C3B57", color: "#FFFFFF" }}>
                                    <div className="row">
                                        <div className="col-auto">
                                            Subir formato
                                        </div>
                                        <div className="col-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}