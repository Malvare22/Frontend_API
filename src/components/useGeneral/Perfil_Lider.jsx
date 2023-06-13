
import styled from 'styled-components';
import image from './../../assets/images/Users/01.png'
import { Link } from 'react-router-dom';
import { toLiderFormatStudentsFromImport } from '../../context/functions_general';
import { PerfilAdministrativo, PerfilDocente, PerfilEstudiante, PerfilLider } from './Profiles';
export default function LiderPerfil(props) {
    let user = JSON.parse(localStorage.getItem(props.location))
    return (<PerfilLider usuario={user} editable={props.editable}></PerfilLider>);
}





