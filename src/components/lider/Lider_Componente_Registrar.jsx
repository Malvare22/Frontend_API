import styled from 'styled-components';
import defaultImage from './../../assets/images/Users/02.png'
import add from './../../assets/images/persona.png'
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { Link, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { createRef } from 'react';
import { useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import { toLiderFormatStudentsToExport } from '../../context/functions_general';

export default function RegistrarComponente() {
    return (
        <SContent>
            <div className='d-flex justify-content-center' id='d_head'>
                <div className='' id='head'>
                    <Head></Head>
                </div>
                <div className='' id="info"> <Information></Information></div>
            </div>
        </SContent>
    );
};


//Componenete Head
const Head = () => {
    const icon = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" className="bi bi-person-plus-fill" viewBox="0 0 16 16" style={{ height: "50px" }}>
        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
    </svg>;

    return (
        <div className='d-flex justify-content-center align-content-center align-items-center rounded-3' style={{ backgroundColor: "#1C3B57", color: "#FFFFFF" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <h5 className='text-white fw-bold'>Agregar componente</h5>
        </div>
    );
}

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
//Contenido del formulario
const Information = () => {
    const navigate = useNavigate();
    const { state, toggleAlert } = useAlert();
    const initialErrors = {
        nombre: false,
        porcentaje: false,
    };
    const jesucristo = useRef(null);
    const [formValues, setFormValues] = useState({ nombre: '', porcentaje: '' });
    const [errors, setErrors] = useState(initialErrors);
    const validar = () => {
        let newErrors = {
            nombre: false,
            porcentaje: false,
        };
        let fail = false;
        if (formValues.nombre.trim() === '') {
            newErrors.nombre = true;
            fail = true;
        } else if (!/^[A-Za-z\s]+$/.test(formValues.nombre)) {
            newErrors.nombre = true;
            fail = true;
        }
        if (formValues.porcentaje < 1 || formValues.porcentaje > 100) {
            newErrors.porcentaje = true;
            fail = true;
        }
        setErrors(newErrors);
        return !fail;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validar()) {
            return;
        }
        const { nombre, porcentaje } = formValues;
        const data = {
            nombre: nombre,
            valorPorcentaje: parseFloat(porcentaje).toFixed(1),
            eliminada: false
        };
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        axios.post('http://146.235.246.199:8080/componenteCompetencias', data, config)
            .then((response) => {
                toggleAlert();
                navigate('/Lider/Evaluacion/Componentes');
            })
            .catch((error) => {
                alert(error.response.data.errorMessage);
            });

        toggleAlert();
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleAddComponent = () => {
        if (!validar()) {
            return;
        }
        toggleAlert();
    };
    return (
        <div>
            <form>
                <div className='' style={{ backgroundColor: "#ECECEC" }}>
                    <SInfo>
                        <div className='row' style={{ paddingTop: "60px" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Componente:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" onChange={handleChange} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} name='nombre' value={formValues.nombre}/> {errors.nombre && (<div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 caracteres.</div>)}
                            </div>
                        </div>
                        <div className='row' style={{ paddingBottom: "60px" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Porcentaje (%):
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="number" onChange={handleChange} step={0.1} className={`form-control ${errors.porcentaje ? 'is-invalid' : ''}`} name='porcentaje' min="1" max="100" value={formValues.porcentaje} />{errors.porcentaje && (<div className="invalid-feedback">Este campo solo admite números entre 1 y 100.</div>)}
                            </div>
                        </div>
                    </SInfo>
                </div>
                <div className='btns'>
                    <button type='button' className='btn rounded-3' onClick={handleAddComponent}>
                        <h6 className='text-white'>Añadir componente</h6>
                    </button>
                    <button type='button' className='btn-danger rounded-3' onClick={()=>navigate('/Lider/Evaluacion/Componentes')}>
                        <h6 className='text-white'>Cancelar</h6>
                    </button>
                </div>
            </form>
            <Modal isOpen={state} centered={true}>
                <ModalBody className='d-flex justify-content-center align-content-center p-4'>
                    <h6 className='m-0 p-0'>¿Está seguro de añadir este componente a la evaluación de competencias?</h6>
                </ModalBody>
                <ModalFooter className='d-flex justify-content-center'>
                    <Button color="primary" onClick={handleSubmit} style={{ marginRight: "40px" }}>Aceptar</Button>
                    <Button color="secondary" onClick={() => toggleAlert(null)} style={{ marginLeft: "40px" }}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};


const SContent = styled.div`
    #d_head{
        position: relative;
        margin-top: 30px;
    }
    #head{
        position: absolute;
        top: -15px;
        left: 10px;
    }
    #head > div{
        padding: 30px;
        padding-top: 2px;
        padding-bottom: 2px;
    }
    #head > div> *{
        margin: 10px;
    }
    #info{
        width: 80%;
        @media screen and (max-width: 576px) {
            width: 95%;
        }
    }
    .btns{
        display: flex;
        margin-top: 0px;
        margin-bottom: 20px;
        justify-content: center;
    }
    .btns button{
        background-color:#1C3B57;
        margin-left: 40px;
        margin-right:40px;
        width: 200px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        @media screen and (max-width: 576px) {
            width: 100px;
            margin-right: 10px;
            margin-left: 10px;
            h6{
                font-size: 12px;
            }
        }
    }
    .btns h6{
        
        font-weight: bold;
        margin: 0px;
    }
`;

const SInfo = styled.div`
.row{
    margin: 3%;
    display: flex;
    align-items: center;
    
};
@media screen and (max-width: 576px) {
    font-size: small;
    .row{
        margin: 5%;
    }
}
`;











