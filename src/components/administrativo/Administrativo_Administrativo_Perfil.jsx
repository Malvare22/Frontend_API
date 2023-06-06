
import styled from 'styled-components';
import image_default from './../../assets/images/Users/01.png'
import { Link, json, useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { PerfilAdministrativo, PerfilDocente } from '../useGeneral/Profiles';

export default function AdministrativoAdministrativoPerfil() {

    return (<VistaGeneral></VistaGeneral>);
}

const VistaGeneral = () => {
    const usuario = JSON.parse(localStorage.getItem('ADMINISTRATIVO_INFORMATION'))

    return (
        <PerfilAdministrativo usuario={usuario} editable={true}></PerfilAdministrativo>
    )

}