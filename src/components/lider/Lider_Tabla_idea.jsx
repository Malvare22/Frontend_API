import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

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

export default function Tabla(props) {
  const { state, toggleAlert, valor } = useAlert();
  const [datos, setDatos] = useState([]);
  const [order, setOrder] = useState("ASC");
  const sorting=(col)=>{
    if(order==='ASC'){
      const sorted=[...datos].sort((a,b)=>{
        if (col === 'date') {
          return new Date(a[col].replace(/-/g, '/')) - new Date(b[col].replace(/-/g, '/'));
        } else {
          return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
        }
      })
      setDatos(sorted);
      setOrder("DSC")
    }
    if(order==='DSC'){
      const sorted=[...datos].sort((a,b)=>{
        if (col === 'date') {
          return new Date(b[col].replace(/-/g, '/')) - new Date(a[col].replace(/-/g, '/'));
        } else {
          return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
        }
      })
      setDatos(sorted);
      setOrder("ASC")
    }
  }
  const getIdeas = async () => {
    let value = null;
    value = await axios.get('../ideas.json').then(
      response => {
        const data = response.data;
        return data;
      }).catch(error => {
        console.error(error);
      });
    setDatos(value)
  };
  useEffect(() => {
    getIdeas();
  }, []);
  return (
    <Sdiv>
      <div className='w-auto'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className='text-center' onClick={()=>sorting("titulo")} scope="col-auto">Título</th>
              <th className='text-center' onClick={()=>sorting("estudiante_codigo")} scope="col-auto">Estudiante</th>
              <th className='text-center' onClick={()=>sorting("docente_codigo")} scope="col-auto">Tutor</th>
              <th className='text-center' onClick={()=>sorting("fecha_creacion")} scope="col-auto">Fecha de corte</th>
              <th className='text-center' scope="col-auto">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((d) => {
              return (
                <tr key={d.id}>
                  <td className='text-center align-middle col-auto'>{d.titulo}</td>
                  <td className='text-center align-middle col-auto'>{d.estudiante_codigo}</td>
                  <td className='text-center align-middle col-auto'>{d.docente_codigo}</td>
                  <td className='text-center align-middle'>{d.fecha_creacion}</td>
                  <td className='text-center align-middle'>
                    <div>
                      <button type="button" class="btn" value={d.id} style={{ width: "auto" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                      </button>
                      <button type="button" class="btn" value={d.id} style={{ width: "auto", border: "none"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                        </svg>
                      </button>
                      <button type="button" id="eliminar" value={d.id} onClick={()=>toggleAlert({id:d.id,titulo:d.titulo})} class="btn" style={{ width: "auto" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )

            })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={state} style={modalStyles}>
        <ModalBody>
          <FormGroup>
            <Label id="texto">¿Está seguro de que desea eliminar la idea de negocio: {valor.titulo} que tiene como id: {valor.id}?</Label>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="danger">Eliminar</Button>
          <Button color="primary" onClick={()=>toggleAlert(null)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </Sdiv>
  );
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
