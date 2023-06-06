
import styled from 'styled-components';
import default_profile from './../../assets/images/Users/default_profile.png'
import { Link, useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { PerfilDocente } from '../useGeneral/Profiles';

export default function LiderVerPerfilDocente() {

    return (<PerfilDocente usuario={JSON.parse(localStorage.getItem('MY_PROFILE_INFO'))} editable={true}></PerfilDocente>);
}
