
import styled from 'styled-components';
import image from './../../assets/images/Users/01.png'
import { Link } from 'react-router-dom';
import { toLiderFormatStudentsFromImport } from '../../context/functions_general';
import { PerfilAdministrativo, PerfilEstudiante } from '../useGeneral/Profiles';
export default function AdministrativoPerfil() {
    return (<PerfilAdministrativo usuario={JSON.parse(localStorage.getItem('MY_PROFILE_INFO'))} editable={true}></PerfilAdministrativo>);
}