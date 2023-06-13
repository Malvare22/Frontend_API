
import styled from 'styled-components';
import imageDefault from './../../assets/images/Users/01.png'
import { Link, useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toLiderFormatStudentsFromImport } from '../../context/functions_general';

export default function LiderVerPerfilEstudiante() {

    return (<VistaGeneral></VistaGeneral>);
}

const VistaGeneral = () => {

    const usuario = JSON.parse(localStorage.getItem("ESTUDIANTE_ALL"))
    const navigate = useNavigate()

   

    return (
        <div className='flex-grow-1'>
            <h2 className='m-4 fw-bold'>Información de Usuario</h2>
            <div className='justify-content-center' style={{ marginTop: "5rem", marginBottom: "2rem" }}>
                <div className='d-flex justify-content-center'>
                    <div className='w-75 position-relative'>
                        <Information usuario={usuario}></Information>
                        <Sdiv03><Profile usuario={usuario}></Profile></Sdiv03>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{ marginBottom: "2rem" }}>
                <Button navigate={navigate} usuario={usuario}></Button>
            </div>
        </div>
    );
}

const Profile = (props) => {

    return (
        <Sdiv01>
            <div id='principal' className=''>
                <img className='rounded-circle' src={`${props.usuario.foto.direccion==''?imageDefault : props.usuario.foto.direccion}`}></img>
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

const Information = (props) => {

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

                        {props.usuario.apellidos}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Curso:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.curso}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Edad:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.edad}

                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Sexo:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.sexo == '0' ? "Masculino" : "Femenino"}
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
                        Nombre del acudiente:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {props.usuario.nombreAcudiente}
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


const Button = (props) => {
    return (
        <Sdiv04><button onClick={()=>{localStorage.setItem('ESTUDIANTE_EMAIL',props.usuario.correo); props.navigate('Editar')}} className='border rounded-4' style={{ backgroundColor: "#1C3B57" }}>
            <h5 className='fw-bold text-white text-center'>
                Editar Información de Estudiante
            </h5>
        </button></Sdiv04>
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








