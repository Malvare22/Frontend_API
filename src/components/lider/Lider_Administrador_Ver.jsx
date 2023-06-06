
import styled from 'styled-components';
import image from './../../assets/images/Users/01.png'
import { Link, useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { PerfilAdministrativo } from '../useGeneral/Profiles';

export default function LiderAdministrativoVer() {

    return (<VistaGeneral></VistaGeneral>);
}


const VistaGeneral = () => {

    const usuario = JSON.parse(localStorage.getItem("ADMINISTRATIVO_INFORMATION"))
    return (<PerfilAdministrativo usuario={usuario} editable={true}></PerfilAdministrativo>);
}
       