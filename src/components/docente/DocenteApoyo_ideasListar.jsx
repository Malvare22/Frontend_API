import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";

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
        return data && data.slice().sort((a, b) => {
            let comparison = 0;
            if (column === 'Título') {
                comparison = a.titulo.localeCompare(b.titulo);
            } else if (column === 'Estudiante') {
                comparison = a.estudianteLiderInfo && a.estudianteLiderInfo[1][0].localeCompare(b.estudianteLiderInfo && b.estudianteLiderInfo[1][0]);
            } else if (column === 'Area') {
                comparison = a.areaEnfoque.localeCompare(b.areaEnfoque);
            }
            if (!ascending) {
                comparison *= -1;
            }
            return comparison;
        });
    };
    const sortedData = sortData();
    const navigate = useNavigate();
    const toggleA = (titulo) => {
        localStorage.setItem('titulo', titulo);
        navigate('../Apoyo/Ideas/Vista');
    };
    const descargarArchivo = (nombre) => {
        let URL = 'http://150.136.248.85:8080/ideaNegocio/recuperarDocumento/' + nombre;
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
    }
    return (
        <Sdiv>
            <div className='w-auto'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Título')} scope="col-auto">Título</th>
                            <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Estudiante')} scope="col-auto">Estudiante</th>
                            <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Area')} scope="col-auto">Area</th>
                            <th className='text-center' scope="col-auto">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData && sortedData.map((d) => (
                            <tr key={d.id}>
                                <td className='text-center align-middle col-auto'>{d.titulo}</td>
                                <td className='text-center align-middle col-auto'>{d.estudianteLiderInfo && d.estudianteLiderInfo[1][0]}</td>
                                <td className='text-center align-middle col-auto'>{d.areaEnfoque.charAt(0).toUpperCase() + d.areaEnfoque.slice(1)}</td>
                                <td className='text-center align-middle'>
                                    <div>
                                        <button type="button" className="btn" onClick={() => toggleA(d.titulo)} value={d.id} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>
                                        </button>
                                        <button type="button" className="btn" onClick={() => descargarArchivo(d.titulo)} value={d.id} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
    const [estudiante, setEstudiante] = useState('');
    const [area, setArea] = useState('');
    const [estado, setEstado] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const filters = {
            estudiante,
            area,
            estado,
        };
        onFilter(filters);
    };

    return (<form className="row gy-2 gx-1" onSubmit={handleSubmit}>
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="estudiante" onChange={(e) => setEstudiante(e.target.value)} className="form-select-sm selector fw-bold text-black">
                <option value="">Estudiante</option>
                <Getestudiantes></Getestudiantes>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="area" onChange={(e) => setArea(e.target.value)} className="form-select-sm selector fw-bold text-black">
                <option value="">Area</option>
                <Getareas></Getareas>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <select name="estado" onChange={(e) => setEstado(e.target.value)} className="form-select-sm selector fw-bold text-black">
                <option value="">Estado</option>
                <option value="aprobada">Aprobada</option>
                <option value="rechazada">Desaprobada</option>
                <option value="vencida">Vencida</option>
                <option value="formulado">Formulación</option>
                <option value="pendiente">Pendiente</option>
            </select>
        </div>
        <div className="col-auto d-flex align-items-center mb-1">
            <button type="submit" className="btn btn-warning fw-bold text-black">Aplicar</button>
        </div>
    </form>
    );
};

// Componente principal que contiene la tabla y los filtros
export default function Listar_Ideas() {
    const [filteredData, setFilteredData] = useState([]);
    const getIdeas = async () => {
        let formData = new FormData();
        var localData = localStorage.getItem("MY_PROFILE_INFO");
        var parsedData = JSON.parse(localData);
        formData.append('docenteCodigo', parsedData.codigo);
        console.log([...formData.entries()]);
        let value = await axios.post("http://150.136.248.85:8080/ideaNegocio/IdeasDocentesApoyo", formData, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setFilteredData(value);
    };
    useEffect(() => {
        getIdeas();
    }, []);
    const handleFilter = async (filters) => {
        console.log(filters.area)
        var formData = new FormData();
        var localData = localStorage.getItem("MY_PROFILE_INFO");
        var parsedData = JSON.parse(localData);
        formData.append('docenteCodigo', parsedData.codigo);
        if (filters.estudiante !== '') {
            formData.append('estudianteCodigo', filters.estudiante);
        }
        if (filters.area !== '') {
            formData.append('area', filters.area);
        }
        if (filters.estado !== '') {
            formData.append('estado', filters.estado);
        }
        try {
            const config = {
                headers: {
                    "X-Softue-JWT": localStorage.getItem('token_access')
                }
            }
            const value = await axios.post("http://150.136.248.85:8080/ideaNegocio/IdeasDocentesApoyo",  formData, config
            ).then(
                response => {
                    const data = response.data;
                    console.log(data)
                    return data;
                }).catch(error => {
                    console.log("a");
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
    const obtenerFormato = async () => {
        let value = null;
        let URL = 'http://150.136.248.85:8080/formato/IdeaNegocio';
        axios.get(URL, {responseType : 'blob', headers: { "X-Softue-JWT": localStorage.getItem("token_access") }}
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
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Ideas de Negocio - Apoyo</h1>
                    <div className="container">
                        <Filters onFilter={handleFilter}></Filters>
                        <br></br>
                        <Table data={filteredData}></Table>
                        <br></br>
                        <div className='row'>
                            <div className="col">
                                <button onClick={obtenerFormato} type="button" className="btn rounded-3" style={{ background: "#1C3B57", color: "#FFFFFF" }}>
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
function Getestudiantes() {
    const [datos2, setDatos] = useState([]);
    const getEstudiantes = async () => {
        let value = null;
        value = await axios.get('http://150.136.248.85:8080/estudiante/listar', { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.log(error);
            });
        setDatos(value)
    };
    useEffect(() => {
        getEstudiantes();
    }, []);
    return (
        datos2 && datos2.map((d) => {
            return (
                <option value={d.codigo} key={d.correo}>{d.nombre} {d.apellido}</option>
            )
        })
    )
}
function Getareas() {
    const [datos3, setDatos] = useState([]);
    const getAreas = async () => {
        let value = null;
        value = await axios.get('http://150.136.248.85:8080/areaConocimiento', { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.log(error);
            });
        setDatos(value)
    };
    useEffect(() => {
        getAreas();
    }, []);
    return (
        datos3 && datos3.map((d) => {
            return (
                <option value={d.id} key={d.id}>{d.nombre.charAt(0).toUpperCase() + d.nombre.slice(1).toLowerCase()}</option>
            )
        })
    )
}












