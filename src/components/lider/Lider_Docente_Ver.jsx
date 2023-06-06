
import styled from 'styled-components';
import image_default from './../../assets/images/Users/01.png'
import { Link, json, useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { PerfilDocente } from '../useGeneral/Profiles';

export default function LiderVerPerfilDocente() {

    return (<VistaGeneral></VistaGeneral>);
}

const VistaGeneral = () => {
    const usuario = JSON.parse(localStorage.getItem('DOCENTE_INFORMATION'))

    return (
        <PerfilDocente usuario={usuario} editable={true}></PerfilDocente>
    )

}