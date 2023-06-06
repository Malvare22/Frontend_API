
import styled from 'styled-components';
import image from './../../assets/images/Users/01.png'
import { Link, useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toLiderFormatStudentsFromImport } from '../../context/functions_general';
import { PerfilEstudiante } from '../useGeneral/Profiles';

export default function LiderVerPerfilEstudiante() {

    return (<VistaGeneral></VistaGeneral>);
}

const VistaGeneral = () => {

    const usuario = JSON.parse(localStorage.getItem("ESTUDIANTE_INFORMATION"))
    return (<PerfilEstudiante usuario={usuario} editable={true}></PerfilEstudiante>);
}
        