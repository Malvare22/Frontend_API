import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getCursos } from '../lider/Filtros_endpoint';

export const Tabla = ({ datos, columnas, handleEliminarClick, handleEditarClick, handleVisualizarClick, permisos }) => {
    /**Permisos:
     * True: Muestra
     * Fale: No muestra 
     * 0=Agregar 1=Visualizar 2=Editar 4=Eliminar*/
    return (
        <div>
            <Sdiv>
                <div className='w-auto'>
                    <table className="table table-striped tablaPrueba">
                        <thead>
                            <tr>
                                {columnas.map((columna) => (
                                    <th className='text-center thPrueba' id="Color" key={columna}>{columna.charAt(0).toUpperCase() + columna.slice(1).toLowerCase()}</th>
                                ))}
                                <th className='text-center thPrueba'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((dato, index) => (
                                <tr key={index}>
                                    {columnas.map((columna) => (
                                        <td className='text-center align-middle col-auto tdPrueba' key={columna}>{dato[columna]}</td>
                                    ))}
                                    <td className='text-center align-middle tdPrueba'>
                                        <div>
                                            {permisos[1] &&
                                                <button type="button" className="btn btnPrueba" onClick={() => handleVisualizarClick(dato)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                    </svg>
                                                </button>
                                            }
                                            {permisos[2] &&
                                                <button type="button" className="btn btnPrueba" onClick={() => handleEditarClick(dato)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </button>
                                            }
                                            {permisos[3] &&
                                                <button type="button" id="eliminar" className="btn btnPrueba" onClick={() => handleEliminarClick(dato)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                                                    </svg>
                                                </button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Sdiv>
            {permisos[0] &&
                <div className="d-flex justify-content-start">
                    <Link to={'Agregar'} type="button" className="btn rounded-3 pb-0" style={{ background: "#1C3B57", color: "#FFFFFF" }}>
                        <div className='row'>
                            <div className="col-6">
                                <p>Agregar</p>
                            </div>
                            <div className="col-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>
            }
        </div>
    );
}

const Sdiv = styled.div`
overflow-y: scroll;
height: fit-content;
max-height: 66.4vh;

th{
    background-color: #1C3B57;
    color: #FFFFFF;
  }
`;
export const Filtros = ({ onFilter }) => {

    const [filtro, setFiltro] = useState({
        codigoEstudiante: '',
        curso: '',
        estado: '',
        fechaInicio: '',
        fechaFin: ''
    });
    const [cursos, setCursos] = useState([]);
    useEffect(() => {
        const obtenerCursos = async () => {
          try {
            const response = await getCursos();
            setCursos(response);
          } catch (error) {
            console.error("Error al obtener los cursos:", error);
          }
        };
        obtenerCursos();
    }, []);
      

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filtro);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltro({ ...filtro, [name]: value });
    };

    return (
        <form className="row gy-3 gx-2 mb-2" onSubmit={handleSubmit}>
            <div className="col-auto d-flex align-items-center mb-1">
                <input type="number"
                    placeholder="Código del estudiante"
                    className="form-control"
                    name="codigoEstudiante"
                    value={filtro.codigoEstudiante}
                    onChange={handleChange}/>
            </div>
            <div className="col-auto d-flex align-items-center mb-1">
                <select name="curso"
                    className="form-select selector text-black"
                    value={filtro.curso}
                    onChange={handleChange}>
                    <option value="">
                        Seleccione un curso
                    </option>
                    {cursos.map((curso, index) => (
                        <option key={index} value={curso}>
                            {curso}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-auto d-flex align-items-center mb-1">
                <select name="estado"
                    className="form-select selector text-black"
                    value={filtro.estado}
                    onChange={handleChange}>
                    <option value="">
                        Seleccione un estado
                    </option>
                    <option value="aprobada">
                        Aprobado
                    </option>
                    <option value="reprobada">
                        Reprobado
                    </option>
                </select>
            </div>
            <div className="col-auto d-flex align-items-center mb-1">
                <input name="fechaInicio"
                    type="date"
                    className="text-black form-control"
                    id="start"
                    min="2020-01-01"
                    max="3000-12-31"
                    value={filtro.fechaInicio}
                    onChange={handleChange}>
                </input>
            </div>
            <div className="col-auto d-flex align-items-center mb-1">
                <input name="fechaFin"
                    type="date"
                    className="text-black form-control"
                    id="finish"
                    min="2020-01-01"
                    max="3000-12-31"
                    value={filtro.fechaFin}
                    onChange={handleChange}></input>
            </div>
            <div className="col-auto d-flex align-items-center mb-1">
                <button type="submit" className="btn btn-warning text-black">Aplicar</button>
            </div>
        </form>
    );
};




