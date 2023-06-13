import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import axios from "axios";

export default function Listar_Componentes() {
    const [data, setData] = useState([]);
    const getComponentes = async () => {
        const value = await axios.get("http://144.22.63.128:8080/componenteCompetencias", { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setData(value);
    };
    useEffect(() => {
        getComponentes();
    }, []);
    const navigate = useNavigate();
    const AgregarComponente = () => {
        navigate('/Lider/Evaluacion/Componentes/Registrar');
    };

    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Componentes de evaluación de emprendimiento</h1>
                    <div className="container">
                        <br></br>
                        <Table updater={getComponentes} data={data}></Table>
                        <br></br>
                        <div className='row'>
                            <div className="col">
                                <button type="button" onClick={() => AgregarComponente()} className="btn rounded-3" style={{ background: "#1C3B57", color: "#FFFFFF" }}>
                                    <div className="row">
                                        <div className="col-auto">
                                            Agregar
                                        </div>
                                        <div className="col-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="col d-flex justify-content-end">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const Table = (props) => {
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
        return props.data && props.data.slice().sort((a, b) => {
            let comparison = 0;
            if (column === 'Id') {
                comparison = a.id - b.id;
            }
            if (column === 'Componente') {
                comparison = a.nombre.localeCompare(b.nombre);
            }
            if (column === 'Porcentaje') {
                comparison = a.valorPorcentaje - b.valorPorcentaje;
                if (comparison === 0) {
                    // Si los porcentajes son iguales, se compara por el Id para mantener un orden consistente
                    comparison = a.id - b.id;
                }
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
    const EditarComponente = (data) => {
        const datosString = JSON.stringify(data);
        localStorage.setItem('datos', datosString);
        navigate('/Lider/Evaluacion/Componentes/Editar');
    };
    const eliminar = async (nombre) => {
        console.log(nombre)
        try {
            const config = {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") },
            };
            await axios.delete(`http://144.22.63.128:8080/componenteCompetencias/${nombre}`, config)
            props.updater();
            toggleAlert(null)
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <Sdiv>
            <div className='w-auto'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Id')} scope="col-auto">Id</th>
                            <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Componente')} scope="col-auto">Componente</th>
                            <th className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleSort('Porcentaje')} scope="col-auto">Porcentaje</th>
                            <th className='text-center' scope="col-auto">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData && sortedData.map((d) => (
                            <tr key={d.id}>
                                <td className='text-center align-middle col-auto'>{d.id}</td>
                                <td className='text-center align-middle col-auto'>{d.nombre}</td>
                                <td className='text-center align-middle col-auto'>{d.valorPorcentaje}%</td>
                                <td className='text-center align-middle'>
                                    <div>
                                        <button type="button" className="btn" onClick={() => EditarComponente({ id: d.id, nombre: d.nombre, valorPorcentaje: d.valorPorcentaje })} value={d.titulo} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                        <button type="button" className="btn" onClick={() => toggleAlert({ nombre: d && d.nombre })} value={d.titulo} style={{ width: "auto", border: "none" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
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
                        <Label id="texto">¿Está seguro de que desea eliminar el componente {valor.nombre}?</Label>
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









