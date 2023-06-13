import React, { useEffect, useState } from 'react';
import { Tabla, Filtros } from '../useGeneral/Tabla';
import { useNavigate } from "react-router-dom";
import { getResultadosFiltrados, getResultados } from "./Filtros_endpoint"

export default function useListarPreguntas() {
    const navigate = useNavigate();
    const [resultadosInfo, setResultadosInfo] = useState([]);


    useEffect(() => {
        const obtenerResultado = async () => {
            try {
                const resultados = await getResultados();
                const resultadosMapeados = formateo(resultados);
                setResultadosInfo(resultadosMapeados);
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };
        obtenerResultado();
    }, []);

    let columnas = ["codigo", "curso", "estado", "calificacion", "fecha"];

    const handleVisualizarClick = (dato) => {
        localStorage.setItem('estado', dato.estado);
        localStorage.setItem('codigo', dato.codigo);
        localStorage.setItem('calificacion', dato.calificacion);
        localStorage.setItem('id', dato.id);
        navigate('../Resultados/Ver')
    }

    const handleFilter = async (filtro) => {
        if(filtro.fechaInicio !== '' ^ filtro.fechaFin !== '') {
            alert("Para filtrar por fecha debe agregar ambas.");
        }
        const datos = await getResultadosFiltrados(filtro);
        const datosFiltrados = formateo(datos);
        setResultadosInfo(datosFiltrados);
    }

    return (
        <div className='m-5'>
            <div className="row">
                <div className="col-1 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-bookmark-star img-fluid" viewBox="0 0 16 16">
                        <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                    </svg>
                </div>
                <div className="col-10">
                    <h1 className="fst-italic fw-bold fs-1 text-black mb-4">
                        Resultados de la evaluacion de emprendimiento
                        <div className="custom-hr"></div>
                    </h1>

                </div>
            </div>
            <Filtros onFilter={handleFilter} />
            <Tabla datos={resultadosInfo} columnas={columnas} handleEliminarClick={null} handleEditarClick={null} handleVisualizarClick={handleVisualizarClick} permisos={[false, true, false, false]} />
        </div>
    );
}

const formateo = (resultados) => {
    const datosFiltrados = resultados.map((resultado) => {
        const fecha = resultado.fechaCreacion[0] + '-' + resultado.fechaCreacion[1] + '-' + resultado.fechaCreacion[2];
        const calificacion = resultado.calificacion.toFixed(2);
        const estado = (calificacion >= 75) ? "aprobada" : "reprobada";
        return {
            ...resultado,
            codigo: resultado.estudianteInfo[0],
            curso: resultado.estudianteInfo[1],
            estado: estado,
            fecha: fecha,
            calificacion: calificacion
        };
    });
    return datosFiltrados
}


