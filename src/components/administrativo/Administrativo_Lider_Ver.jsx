import styled from 'styled-components';
import image from './../../assets/images/Users/01.png'
import { Link, useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import { useState } from 'react';

export default function AdministrativoVerPerfilLider() {
    return (<VistaGeneral></VistaGeneral>);
}

const VistaGeneral = () => {
    const [usuario, setUsuario] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalJsonVacio, setModalJsonVacio] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get('../../liderUE.json');
                const data = response.data;
                console.log(data[0]);
                if (data.length === 0) {
                    setModalJsonVacio(true);
                } else {
                    setUsuario(data[0]);
                    localStorage.setItem('usuario', JSON.stringify(data[0]));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsuario();
    }, []);

    const handleModalJsonVacioClose = () => {
        setModalJsonVacio(false);
        navigate('../Perfil');
    };

    const handleDeshabilitarClick = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };
    return (
        <div className='flex-grow-1'>
            <h2 className='m-4 fw-bold'>Información del LiderUE</h2>
            <div className='justify-content-center' style={{ marginTop: "5rem", marginBottom: "2rem" }}>
                <div className='d-flex justify-content-center'>
                    <div className='w-75 position-relative'>
                        <Information usuario={usuario}></Information>
                        <Sdiv03><Profile usuario={usuario}></Profile></Sdiv03>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{ marginBottom: "2rem" }}>
                <Boton onDeshabilitarClick={handleDeshabilitarClick}></Boton>
            </div>
            <Modal isOpen={modalOpen} onRequestClose={handleModalClose} style={modalStyles}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Estás seguro de que quieres deshabilitar al líder de la unidad de emprendimiento?</Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger">Confirmar</Button>
                    <Button color="primary" onClick={handleModalClose}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalJsonVacio} onRequestClose={handleModalJsonVacioClose} style={modalStyles}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">No hay un lider de unidad de emprendimiento asignado, ¿desea asignar uno?</Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">Agregar</Button>
                    <Button color="danger" onClick={handleModalJsonVacioClose}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const modalStyles = {
    transform: 'translate(0%, 120%)'
}

const Profile = (props) => {
    return (
        <Sdiv01>
            <div id='principal' className=''>
                {props.usuario && (
                    <>
                        <img className='rounded-circle' src={"/images/03.png"}></img>
                        <div className='d-flex align-content-center align-items-center'>
                            <div>
                                <p className='text-white'>{props.usuario.nombre}</p>
                                <p className='text-white'>{props.usuario.apellido}</p>

                            </div>
                        </div>
                    </>
                )}
            </div>
        </Sdiv01>
    );
}

const Information = (props) => {
    return (
        <Sdiv02>
            <div>
                <h3 className='fw-bold'>Información</h3>
                <hr className='border-3 border-black m-0'></hr>
            </div>
            <div id='principal'>
                {props.usuario && (
                    <>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Nombre completo:
                            </div>
                            <div className='col-sm-4 col-6'>
                                {props.usuario.nombre} {props.usuario.apellido}

                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Código:
                            </div>
                            <div className='col-sm-4 col-6'>
                                {props.usuario.codigo}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Sexo:
                            </div>
                            <div className='col-sm-4 col-6'>
                                {props.usuario.sexo == 'M' ? "Masculino" : "Femenino"}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Correo electronico:
                            </div>
                            <div className='col-sm-4 col-6'>
                                {props.usuario.correo}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Telefono:
                            </div>
                            <div className='col-sm-4 col-6'>
                                {props.usuario.telefono}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Sdiv02>
    );
}

const Boton = ({ onDeshabilitarClick }) => {
    return (
        <Sdiv04 className="row align-items-center">
            <div className="col">
                <Link to={"Editar"}>
                    <button className='border rounded-4' style={{ backgroundColor: "#1C3B57" }}>
                        <h5 className='fw-bold text-white text-center'>
                            Editar Información del liderUE
                        </h5>
                    </button>
                </Link>
            </div>
            <div className="col">
                <button className='border rounded-4' style={{ backgroundColor: "#1C3B57" }} onClick={onDeshabilitarClick}>
                    <h5 className='fw-bold text-white text-center'>
                        Deshabilitar liderUE
                    </h5>
                </button>
            </div>
        </Sdiv04>
    );
};
const Sdiv04 = styled.div`
    h5{
        margin: 20px;
    }
    @media screen and (max-width: 576px){
        h5{
            font-size: small;
            margin: 20px;
        }
    }
`;

const Sdiv01 = styled.div.attrs({
    className: 'd-inline-flex',
})`
    background-color: #1C3B57;
    border-radius: 20px;
    align-items: center;
    align-content: center;
    width: auto;
    #principal{
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        img{
            margin-left: 20px;
            width: 80px;
        }
        div{
            font-size: x-large;
            margin-left: 20px;
            margin-right: 20px;
        }
        p{
            margin: 0;
            padding: 0;
            font-weight: bold;
        }
    }
    @media screen and (max-width: 576px){
        p{
            font-size: medium;
        }
    }
`;

const Sdiv02 = styled.div`
    background-color: #CECECE;
    >div{
        padding: 4%;
        padding-top: 8%;
        padding-bottom: 0%;
    }
    #principal{
        padding-top: 3%;
        padding-bottom: 1%;
        .row{
            padding-bottom: 2%;
        }
    }
    
    @media screen and (max-width: 576px){
        .row > div{
            font-size: x-small;
        }
        .row{
            margin-bottom: 10px;
        }
        h3{
            margin-top: 40px;
        }
    }
    
`;

const Sdiv03 = styled.div`
    position: absolute;
    top: -50px;
    left: -30px;
`;