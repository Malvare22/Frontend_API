import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
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
    const [orderBy, setOrderBy] = useState({ column: 'Título', ascending: true });

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
            if (column === 'Título') {
                comparison = a.titulo.localeCompare(b.titulo);
            } else if (column === 'Estudiante') {
                comparison = a.estudiante_codigo.localeCompare(b.estudiante_codigo);
            } else if (column === 'Tutor') {
                comparison = a.docente_codigo.localeCompare(b.docente_codigo);
            } else if (column === 'Fecha de corte') {
                comparison = a.fecha_creacion.localeCompare(b.fecha_creacion);
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
    const toggleA = () => {
        navigate('/Lider/VistaPlan');
    };
    return (
        <Sdiv>
            <div className='w-auto'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' onClick={() => handleSort('Título')} scope="col-auto">Título</th>
                            <th className='text-center' onClick={() => handleSort('Estudiante')} scope="col-auto">Estudiante</th>
                            <th className='text-center' onClick={() => handleSort('Tutor')} scope="col-auto">Tutor</th>
                            <th className='text-center' onClick={() => handleSort('Fecha de corte')} scope="col-auto">Fecha de corte</th>
                            <th className='text-center' scope="col-auto">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((d) => (
                            <tr key={d.id}>
                                <td className='text-center align-middle col-auto'>{d.titulo}</td>
                                <td className='text-center align-middle col-auto'>{d.estudiante_codigo}</td>
                                <td className='text-center align-middle col-auto'>{d.docente_codigo}</td>
                                <td className='text-center align-middle'>{d.fecha_creacion}</td>
                                <td className='text-center align-middle'>
                                    <div>
                                        <button type="button" className="btn" onClick={toggleA} value={d.id} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>
                                        </button>
                                        <button type="button" className="btn" value={d.id} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                            </svg>
                                        </button>
                                        <button type="button" id="eliminar" value={d.id} onClick={() => toggleAlert({ id: d.id, titulo: d.titulo })} className="btn" style={{ width: "auto", border: "none" }}>
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
                        <Label id="texto">¿Está seguro de que desea eliminar el plan de negocio: {valor.titulo} que tiene como id: {valor.id}?</Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger">Eliminar</Button>
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

// Componente de filtros
const Filters = ({ onFilter }) => {
    const [tutor, setTutor] = useState('');
    const [estudiante, setEstudiante] = useState('');
    const [area, setArea] = useState('');
    const [estado, setEstado] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const filters = {
            tutor,
            estudiante,
            area,
            estado,
            fechaInicio,
            fechaFin
        };
        if ((fechaInicio && !fechaFin) || (!fechaInicio && fechaFin)) {
            alert("Se requiere tanto la fecha de inicio como la fecha de fin para filtrar.");
            return;
        }
        if (fechaInicio && fechaFin) {
            const dateInicio = new Date(fechaInicio);
            const dateFin = new Date(fechaFin);
            if (dateInicio > dateFin) {
                alert("La fecha de inicio no puede ser mayor que la fecha de fin.");
                return;
            }
        }
        onFilter(filters);
    };

    return (<form className="row gy-2 gx-1" onSubmit={handleSubmit}>
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="tutor" onChange={(e) => setTutor(e.target.value)} className="form-select-sm selector fw-bold text-black">
                <option defaultValue="0">Tutor</option>
                <Getdocentes></Getdocentes>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="estudiante" onChange={(e) => setEstudiante(e.target.value)} className="form-select-sm selector fw-bold text-black">
                <option defaultValue="0">Estudiante</option>
                <Getestudiantes></Getestudiantes>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="actividad" onChange={(e) => setArea(e.target.value)} className="form-select-sm selector fw-bold text-black">
                <option defaultValue="0">Actividad</option>
                <option defaultValue="minera">Minera</option>
                <option defaultValue="agrupecuaria">Agropecuaria</option>
                <option defaultValue="comercial">Comercial</option>
                <option defaultValue="servicios">Servicios</option>
                <option defaultValue="industrial">Industrial</option>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="estado" onChange={(e) => setEstado(e.target.value)} className="form-select-sm selector fw-bold text-black">
                <option defaultValue="0">Estado</option>
                <option defaultValue="aprobada">Aprobada</option>
                <option defaultValue="desaprobada">Desaprobada</option>
                <option defaultValue="vencida">Vencida</option>
                <option defaultValue="formulacion">Formulación</option>
                <option defaultValue="formulacion">Pendiente</option>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <input name="fecha_inicio" onChange={(e) => setFechaInicio(e.target.value)} type="date" className="fw-bold text-black form-control-sm" id="start" min="2020-01-01" max="3000-12-31"></input>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <input name="fecha_fin" onChange={(e) => setFechaFin(e.target.value)} type="date" className="fw-bold text-black form-control-sm" id="finish" min="2020-01-01" max="3000-12-31"></input>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <button type="submit" className="btn btn-warning fw-bold text-black">Aplicar</button>
        </div>
    </form>
    );
};

// Componente principal que contiene la tabla y los filtros
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
                        <Filters onFilter={handleFilter}></Filters>
                        <br></br>
                        <Table data={filteredData}></Table>
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
function Getdocentes() {
    const [datos, setDatos] = useState([]);
    const getDocentes = async () => {
        let value = null;
        value = await axios.get('../docentes.json').then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setDatos(value)
    };
    useEffect(() => {
        getDocentes();
    }, []);
    return (
        datos.map((d) => {
            return (
                <option value={d.id} key={d.id}>{d.docente}</option>
            )
        })
    )
}
function Getestudiantes() {
    const [datos2, setDatos] = useState([]);
    const getEstudiantes = async () => {
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
        getEstudiantes();
    }, []);
    return (
        datos2.map((d) => {
            return (
                <option value={d.id} key={d.id}>{d.estudiante}</option>
            )
        })
    )
}