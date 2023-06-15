
import styled from 'styled-components';
import image from './../../assets/images/Users/01.png'
import { Link } from 'react-router-dom';
import { toLiderFormatStudentsFromImport } from '../../context/functions_general';
import { PerfilAdministrativo, PerfilDocente, PerfilEstudiante } from './Profiles';
export default function DocentePerfil(props) {
    let user = JSON.parse(localStorage.getItem(props.location))
    return (<PerfilDocente usuario={user} editable={props.editable}></PerfilDocente>);
}










