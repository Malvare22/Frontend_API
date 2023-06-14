//import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import image from '../../assets/images/Login/login.png'
import logo from '../../assets/images/Login/Emprender_Aprender.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserSession, useUserTogglerSession } from '../../context/UserContext';
import axios from 'axios';
import { validarContrasenia } from '../../components/useGeneral/ProfilesValidations';
//import Sidebar from '../../components/NavBar'



const useForm = (initialData, validar, navigate) => {

    const [fail, setFail] = useState(false);
    const [form, setForm] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    /**Función que se aplica al querer efectuar en Submit **/
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Validar -> verificación de campos
        const state = await validar(form)
        //Si hubo error:
        if (state) { console.log('Iniciaste'); iniciarSesion() }
        else {
            setFail(true)
        }
    };

    const iniciarSesion = () => {
        const type = JSON.parse(localStorage.getItem('session')).rol;
        let direction = '/';
        switch (type) {
            case 'administrativo':
                direction = '../Administrativo/Perfil';
                break;
            case 'coordinador':
                direction = '../Lider/Perfil';
                break;
            case 'docente':
                direction = '../Docente/Perfil';
                break;
            case 'estudiante':
                direction = '../Estudiante/Perfil';
                break;
        }
        navigate(direction)

    }

    return { form, fail, handleChange, handleSubmit };
};


export default function Login(props) {
    return (
        <div className='container-fluid' style={{ background: "#1C3B57" }}>
            <div className='row p-5'>
                <div className='col-md-6 col-12 p-5 d-flex justify-content-center align-items-center' style={{ background: "#68462C" }}>
                    <div className='flex-grow-1'>
                        <h2 className='text-center mb-5' style={{ color: "white", fontWeight: "bold" }}>SoftUE</h2>
                        <Panel Relogin={props.Relogin}></Panel>
                    </div>
                </div>
                <div className='col-md-6 col-12 p-0'>
                    <img src={image} className='w-100 h-100'></img>
                </div>
            </div>
        </div>
    );
}

const Panel = (props) => {
    const navigate = useNavigate();
    const toggleA = () => {
        navigate('/forgetPassword');
    };
    const register = () => {
        navigate('/registro')
    }
    //Aquí se hace toda la validación de los campos
    const validar = async (form) => {
        //Colocar método de verificación de clave (Cada input está en form)
        let condition = undefined
        const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const userEstudiante = !isNaN(form.userName);
        if (!userEstudiante) {
            if (!email_regex.test(form.userName) || form.userName.length > 50 || form.userName.trim() == '' || !validarContrasenia(form.password)) {
                return undefined;
            }
            else {
                try {
                    condition = await axios.post('http://localhost:8080/login', {
                        email: form.userName,
                        password: form.password
                    }).then((response) => {
                        const valor = props.Relogin;
                        localStorage.setItem('token_access', response.data.token)
                        localStorage.setItem('session', JSON.stringify({ "email": response.data.email, "rol": response.data.rol }))
                        if (valor === '1') {
                            navigate(-1);
                        }
                        else {
                            return true;
                        }
                    })
                }
                catch {
                }
            }
            return condition;
            // if(form.userName=="estudiante") navigate('/estudiante');
            // if(form.userName=="lider") navigate('/lider');
            // if(form.userName=="docente") navigate('/docente');
            // if(form.userName=="admin") navigate('/admin');
        }
        else {
            if (form.userName.length > 50 || form.userName.trim() == '' || !validarContrasenia(form.password)) {
                return undefined;
            }
            else {
                try {
                    let endpoint="http://localhost:8080/estudiante/obtenerCorreoIngreo/"+form.userName;
                    const correo = await axios.get(endpoint).then((response)=>{
                        return(response.data);
                    })
                    condition = await axios.post('http://localhost:8080/login', {
                        email: correo,
                        password: form.password
                    }).then((response) => {
                        console.log(response.data)
                        const valor = props.Relogin;
                        localStorage.setItem('token_access', response.data.token)
                        localStorage.setItem('session', JSON.stringify({ "email": response.data.email, "rol": response.data.rol }))
                        if (valor === '1') {
                            navigate(-1);
                        }
                        else {
                            return true;
                        }
                    })
                }
                catch {
                }
            }
            return condition;
        };
    }
    //Plantilla del objeto user
    const user = {
        userName: '',
        password: '',
    };

    /*Método de mostrar contraseña*/
    const [type, setType] = useState('password');
    const changeType = () => {
        if (type === 'password') {
            setType('text');
        }
        else {
            setType('password');
        }
    };

    const { form, fail, handleChange, handleSubmit } = useForm(user, validar, navigate);

    return (<div className='container border rounded' style={{ backgroundColor: "#D9D9D9" }}>
        <div className='text-center m-3'>
            <img src={logo} height={"120px"} className=''></img>
        </div>
        <form onSubmit={handleSubmit}>
            {fail && <div className='d-flex justify-content-center align-items-center rounded'><ErrorMessage></ErrorMessage></div>}
            <div className='mt-4'>
                <div>
                    <h3 className='fw-bold'>Usuario</h3>
                </div>
                <div className='d-flex align-items-center position-relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='m-1 mb-0 mt-0 bi bi-person-fill' width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg><input type='text' className='form-control border-0 border-bottom rounded-0 border-dark shadow-none' name='userName' value={form.userName} onChange={handleChange} style={{ backgroundColor: "#D9D9D9", position: "relative", left: "1%", marginRight: "5%" }}></input>
                </div>
            </div>
            <div className='mt-4'>
                <div className=''>
                    <h3 className='fw-bold'>Contraseña</h3>
                </div>
                <div className='d-flex align-items-center position-relative'>
                    {/*Lock*/}
                    <svg xmlns="http://www.w3.org/2000/svg" className='m-1 mb-0 mt-0 bi bi-lock-fill' width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                    <input className='form-control border-0 border-bottom rounded-0 border-dark shadow-none' type={type} name='password' value={form.password} onChange={handleChange} style={{ backgroundColor: "#D9D9D9", position: "relative", left: "1%", marginRight: "2%", width: "86%" }}></input>
                    {type == 'password' ? <svg xmlns="http://www.w3.org/2000/svg" onClick={changeType} className='bi bi-eye-fill' width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" onClick={changeType} width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                    </svg>}
                </div>
            </div>
            <div className='mt-3 mb-4'>
                <div className='row'>
                    <div className='col'>
                        <div className='text-center'>
                            <a href='' onClick={toggleA}>¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='text-center'>
                            <a href='' onClick={register}>Registrar estudiante</a>
                        </div>
                    </div>
                </div>

                <div className='text-center mt-3'>
                    <button type="submit" className="btn" style={{ backgroundColor: "#2B9877", color: "white" }}>Ingresar</button>
                </div>
            </div>
        </form>

    </div>
    );
};

const ErrorMessage = () => {
    return (
        <div style={{ background: "#DC4B4B" }} className='d-flex justify-content-center align-items-center rounded p-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div className='text-white m-2 mt-1 mb-1'>Usuario y/o contraseña incorrectos</div>
        </div>);
};






