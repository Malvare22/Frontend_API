
import styled from 'styled-components';
import default_profile from './../../assets/images/Users/default_profile.png'
import { Link, useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export function PerfilDocente({ usuario, editable }) {

    return (
        <div className='flex-grow-1'>
            <h2 className='m-4 fw-bold'>Información de Usuario</h2>
            <div className='justify-content-center' style={{ marginTop: "5rem", marginBottom: "2rem" }}>
                <div className='d-flex justify-content-center'>
                    <div className='w-75 position-relative'>
                        <DocenteInformacion usuario={usuario}></DocenteInformacion>
                        <Sdiv03><Profile usuario={usuario}></Profile></Sdiv03>
                    </div>
                </div>
            </div>
            {
                editable == true && <div className='d-flex justify-content-center' style={{ marginBottom: "2rem" }}>
                    <Button></Button>
                </div>
            }
        </div>
    );
}

export function PerfilLider({ usuario, editable }) {

    return (
        <div className='flex-grow-1'>
            <h2 className='m-4 fw-bold'>Información de Usuario</h2>
            <div className='justify-content-center' style={{ marginTop: "5rem", marginBottom: "2rem" }}>
                <div className='d-flex justify-content-center'>
                    <div className='w-75 position-relative'>
                        <LiderInformacion usuario={usuario}></LiderInformacion>
                        <Sdiv03><Profile usuario={usuario}></Profile></Sdiv03>
                    </div>
                </div>
            </div>
            {
                editable == true && <div className='d-flex justify-content-center' style={{ marginBottom: "2rem" }}>
                    <Button></Button>
                </div>
            }
        </div>
    );
}

export function PerfilEstudiante({ usuario, editable }) {

    return (
        <div className='flex-grow-1'>
            <h2 className='m-4 fw-bold'>Información de Usuario</h2>
            <div className='justify-content-center' style={{ marginTop: "5rem", marginBottom: "2rem" }}>
                <div className='d-flex justify-content-center'>
                    <div className='w-75 position-relative'>
                        <EstudianteInformacion usuario={usuario}></EstudianteInformacion>
                        <Sdiv03><Profile usuario={usuario}></Profile></Sdiv03>
                    </div>
                </div>
            </div>
            {
                editable == true && <div className='d-flex justify-content-center' style={{ marginBottom: "2rem" }}>
                    <Button></Button>
                </div>
            }
        </div>
    );
}

export function PerfilAdministrativo({ usuario, editable }) {

    return (
        <div className='flex-grow-1'>
            <h2 className='m-4 fw-bold'>Información de Usuario</h2>
            <div className='justify-content-center' style={{ marginTop: "5rem", marginBottom: "2rem" }}>
                <div className='d-flex justify-content-center'>
                    <div className='w-75 position-relative'>
                        <AdministradorInformacion usuario={usuario}></AdministradorInformacion>
                        <Sdiv03><Profile usuario={usuario}></Profile></Sdiv03>
                    </div>
                </div>
            </div>
            {
                editable == true && <div className='d-flex justify-content-center' style={{ marginBottom: "2rem" }}>
                    <Button></Button>
                </div>
            }
        </div>
    );
}

const Profile = (props) => {
    return (
        <Sdiv01>
            <div id='principal' className=''>
                <img className='rounded-circle' style={{ height: '11vh', width: '11vh' }} src={`${props.usuario.foto.direccion == '' ? default_profile : props.usuario.foto.direccion}`}></img>
                <div className='d-flex align-content-center align-items-center'>
                    <div>
                        <p className='text-white'>{props.usuario.nombre}</p>
                        <p className='text-white'>{props.usuario.apellido}</p>
                    </div>
                </div>
            </div>
        </Sdiv01>
    );
}

const LiderInformacion = (props) => {
    return (
        <Sdiv02>
            <div>
                <h3 className='fw-bold'>Información</h3>
                <hr className='border-3 border-black m-0'></hr>
            </div>
            <div id='principal'>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Nombre:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.nombre}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Apellido:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.apellido}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Sexo:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.sexo}
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Correo eléctronico:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.correo}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Teléfono:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.telefono}
                    </div>
                </div>
            </div>
        </Sdiv02>
    );
}

const AdministradorInformacion = (props) => {
    return (
        <Sdiv02>
            <div>
                <h3 className='fw-bold'>Información</h3>
                <hr className='border-3 border-black m-0'></hr>
            </div>
            <div id='principal'>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Nombre Completo:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.apellido + " " + props.usuario.nombre}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Sexo:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.sexo}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Correo eléctronico:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.correo}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Teléfono:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.telefono}
                    </div>
                </div>
            </div>
        </Sdiv02>
    );
}

const DocenteInformacion = (props) => {
    return (
        <Sdiv02>
            <div>
                <h3 className='fw-bold'>Información</h3>
                <hr className='border-3 border-black m-0'></hr>
            </div>
            <div id='principal'>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Nombre:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.nombre}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Apellido:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.apellido}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Documento de identificación:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.cedula}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Sexo:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.sexo}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Título acádemico:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.titulo}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Área:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.areaToString}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Correo eléctronico:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.correo}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Teléfono:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.telefono}
                    </div>
                </div>
            </div>
        </Sdiv02>
    );
}

const EstudianteInformacion = (props) => {
    return (
        <Sdiv02>
            <div>
                <h3 className='fw-bold'>Información</h3>
                <hr className='border-3 border-black m-0'></hr>
            </div>
            <div id='principal'>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Código Institucional:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.codigoInstitucional}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Nombre:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.nombre}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Apellido:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.apellido}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Curso:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.cursoToString}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Sexo:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.sexo}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Correo eléctronico:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.correo==("correoNoRegistrado@usuario.correo"+props.usuario.codigoInstitucional)? "": props.usuario.correo}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Nombre del acudiente:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.nombre_acudiente}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Teléfono del acudiente:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.telefono}
                    </div>
                </div>
            </div>
        </Sdiv02>
    );
}

const Button = () => {
    return (
        <Sdiv04><Link to={"Editar"}><button className='border rounded-4' style={{ backgroundColor: "#1C3B57" }}>
            <h5 className='fw-bold text-white text-center'>
                Editar Información de Usuario
            </h5>
        </button></Link></Sdiv04>
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











