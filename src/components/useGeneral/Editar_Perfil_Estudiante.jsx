import styled from 'styled-components';
import image from './../../assets/images/Pencil.png'
import image2 from './../../assets/images/Users/01.png'
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FormEstudiante, HeadEdit, HeadRegister } from './UsersForm';
import { useEffect } from 'react';

//Componente general
export default function EstudianteEditarPerfil(props) {
    let user = null;
    const labelText = 'Estudiante'
    if(props.type!='registrar')
        user = JSON.parse(localStorage.getItem(props.location))
    
    return (

        <SContent>
            <div className='d-flex justify-content-center' id='d_head'>
                <div className='' id='head'>
                    {props.type!='registrar'?<HeadEdit labelText={labelText}/>:<HeadRegister labelText={labelText}/>}
                </div>
                <div className='' id="info"> <FormEstudiante user={user} type={props.type} myself={props.myself}></FormEstudiante></div>
            </div>
        </SContent>

    );
};

//Listado de Cursos para combobox (útil para carga y validación de dato curso)
const courses = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo", "Once"];

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













