import styled from "styled-components";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, UncontrolledCollapse } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { redirect, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Componente principal que contiene la tabla y los filtros
export default function Aceptar_TutoriaPlan() {    
    const [area, setArea] = useState('');
    const [nombreDocente, setNombreDocente] = useState('');
    const { tituloPlan } = useParams();
    console.log(tituloPlan);
    const JSONString = localStorage.getItem("session")
    const jsonObject = JSON.parse(JSONString);    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://150.136.248.85:8080/docente/${jsonObject.email}`, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } });
                setNombreDocente(response.data.nombre + ' ' + response.data.apellido);
                setArea(response.data.area)
            } catch (error) {
                console.log(error);
            }            
        };
        fetchData();
    }, []);
    const navigate = useNavigate();
    const aceptar = async (tituloPlan) => {
        try {
            await axios.get(`http://150.136.248.85:8080/docente/acceptarTutorPlan/${tituloPlan}/true`, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } });
            navigate('/Docente/Perfil');
        } catch (error) {
            console.log("A?");
            alert(error.response.data.errorMessage);
            navigate('/Docente/Perfil')
        }
    };

    const rechazar = async (tituloPlan) => {
        try {
            await axios.get(`http://150.136.248.85:8080/docente/acceptarTutorPlan/${tituloPlan}/false`, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } });
            navigate('/Docente/Perfil');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Invitación a ser tutor</h1>
                    <div className="container">
                        <div className="mt-3 rounded" style={{ background: "#ECECEC", padding: "10px" }}>
                            <div className=''>
                                <h6 className='text-center'>¡Hola {nombreDocente}! <br></br>Te invitamos a unirte a nuestro programa como tutor de {tituloPlan}. Tu experiencia en el área {area} sería invaluable para guiar a nuestros emprendedores hacia el éxito.<br></br>¡Esperamos contar con tu participación!</h6>
                            </div>
                            <div className="row mt-3">
                                <div className="col d-flex justify-content-end">
                                    <button onClick={() => aceptar(tituloPlan)} style={{ background: "#0D6EFD", color: "white" }} className="btn text-white">Aceptar</button>
                                </div>
                                <div className="col d-flex">
                                    <button onClick={() => rechazar(tituloPlan)} style={{ background: "#DC3545", color: "white" }} className="btn text-white">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





