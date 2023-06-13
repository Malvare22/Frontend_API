import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";

// Componente de tabla
const Table = ({ data }) => {
    const [orderBy, setOrderBy] = useState({ column: 'NombreCompleto', ascending: true });
    const handleSort = (column) => {
        if (orderBy.column === column) {
            setOrderBy((prevState) => ({
                column,
                ascending: !prevState.ascending,
            }));
        } else {
            setOrderBy({ column, ascending: true });
        }
    };    
    const sortData = () => {
        const { column, ascending } = orderBy;
        return data.slice().sort((a, b) => {
            let comparison = 0;
            if (column === 'NombreCompleto') {
                const nombreCompletoA = `${a && a.nombre} ${a && a.apellido}`;
                const nombreCompletoB = `${b && b.nombre} ${b && b.apellido}`;
                comparison = nombreCompletoA.localeCompare(nombreCompletoB);
            }
            if (!ascending) {
                comparison *= -1;
            }
            return comparison;
        });
    };    
    const sortedData = sortData();
    const navigate = useNavigate();
    const toggleA = (correo) => {
        localStorage.setItem('ADMINISTRATIVO_EMAIL', correo);
        navigate('Perfil');
    };
    return (
        <Sdiv>
            <div className='w-auto'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' style={{ cursor: "pointer" }} onClick={() => handleSort('NombreCompleto')} scope="col-auto">Nombre completo</th>
                            <th className='text-center' scope="col-auto">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((d) => (
                            <tr key={d && d.codigo}>
                                <td className='text-center align-middle col-auto'>{d && d.nombre} {d && d.apellido}</td>
                                <td className='text-center align-middle'>
                                    <div>
                                        <button type="button" className="btn" onClick={()=>toggleA(d.correo)} value={d.correo} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
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

// Componente principal que contiene la tabla y los filtros
export default function Listar_Administrativos() {
    const [filteredData, setFilteredData] = useState([]);
    const getAdministrativos = async () => {
        const value = await axios.get("http://144.22.32.132:8080/coordinador/listar/administrativo", { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
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
                    </div>
                </div>
            </div>
        </div>
    );
}



