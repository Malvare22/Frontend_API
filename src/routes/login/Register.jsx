//import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import image from '../../assets/images/Login/login.png'
import logo from '../../assets/images/Login/Emprender_Aprender.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Screen() {

    return (
        <div className='container-fluid' style={{ background: "#1C3B57" }}>
            <div className='row p-5 d-flex justify-content-center'>
                <div className='col-md-6 col-12 p-5 d-flex justify-content-center align-items-center' style={{ background: "#68462C" }}>
                    <div className='flex-grow-1'>
                        <h2 className='text-center mb-5' style={{ color: "white", fontWeight: "bold" }}>SoftUE</h2>
                        <div className='container border rounded m-0' style={{ backgroundColor: "#D9D9D9" }}>
                            <div className='text-center m-3'>
                                <img src={logo} className='' style={{ width: "30%" }}></img>
                            </div>
                            <PanelPrincipal></PanelPrincipal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PanelPrincipal = (props) => {
    const [rol, setRol] = useState(0);
    const roles = ['Estudiante', 'Docente']
    const [form, setForm] = useState({ usuario: '', contrasenia: '' });


    const initialErrors = {
        usuario: false,
        contrasenia: false,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();

    const validar = () => {
        let newErrors = {
            usuario: false,
            contrasenia: false,
        };
        let fail = false;

        if (rol == 'Estudiante' || rol=='Docente') {
            if (isNaN(form.usuario) || form.usuario <= 0) {
                newErrors.usuario = true;
                fail = true;
                alert('El campo de código no puede ser negativo.', 'error');
            }

            if (form.contrasenia.trim() === '') {
                newErrors.contrasenia = true;
                fail = true;
                alert('La contraseña no puede estar vacía.', 'error');
            } 
            
            else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+]).{6,}$/.test(form.contrasenia)) {
                newErrors.contrasenia = true;
                fail = true;
                alert('La contraseña debe contener mayúsculas, minúsculas, números, un carácter especial y tener al menos 6 caracteres.', 'error');
            }
        }
        else{
            alert('Debe seleccionar un rol.', 'error');
            fail = true;
        }

        setErrors(newErrors);
        return !fail;
    };


    const handleSubmit = () => {
        if (!validar()) {
            return;
        }
        const { usuario, contrasenia } = form;
        var formData = new FormData();
        formData.append('codigo', usuario);
        formData.append('contrasenia', contrasenia);
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        if(rol == 'Estudiante'){
            axios.post('http://localhost:8080/register/estudiante/codigo', formData, config)
            .then((response) => {
                alert("Se ha creado exitosamente su usuario, ya puede iniciar sesión con su código institucional y contraseña.")
                navigate('/Login');
            })
            .catch((error) => {
                alert(error.response.data.errorMessage);
            });
        }
        else{
            alert('Hola')
        }
    };

    const toggleSelect = (e) => {
        const { value } = e.target
        setRol(value)
    }

    return (
        <StyledDiv>
            <form>
                <div className='d-flex justify-content-center'>
                    <select className="form-select w-75" onChange={(e) => toggleSelect(e)} aria-label="Default select example">
                        <option selected value={0}>Seleccione el rol de su usuario</option>
                        {roles.map((r) =>
                            <option value={r}> {r}</option>
                        )}
                    </select>
                </div>
                {rol != 0 && <RegisterForm rol={rol} form={form} handleChange={handleChange} errors={errors}/>}
                <div className='d-flex justify-content-center align-content-center'>
                    <button type="button" className="btn m-4" style={{ backgroundColor: "#2B9877", color: "white" }}>
                        <p onClick={() => navigate('/login')} className='d-flex align-items-center justify-content-center m-1'>Volver</p>
                    </button>
                    <button type="button" onClick={() => handleSubmit()} className="btn m-4" style={{ backgroundColor: "#2B9877", color: "white" }}> <p className='d-flex align-items-center justify-content-center m-1'>Enviar</p></button>
                </div>
            </form>
        </StyledDiv>
    );
};

const RegisterForm = (props) => {

    const [type, setType] = useState('password');

    const changeType = () => {
        setType(type === 'password' ? 'text' : 'password');
    };

    return (<>
        <div>
            <p className='text-center mt-4 fw-bold'>{"Introduzca su código institucional de estudiante:"}</p>
            <div className='d-flex justify-content-center'>
                <input type='number' min={0} onChange={props.handleChange} className={`required form-control border-0 border-bottom rounded-0 border-dark shadow-none w-75 ${props.errors.usuario ? 'is-invalid' : ''}`} name='usuario' value={props.form.usuario} style={{ backgroundColor: "#D9D9D9" }} />
            </div>
        </div>
        <div>
            <p className='text-center mt-4 fw-bold'>Establezca una contraseña:</p>
            <div className='d-flex justify-content-center'>
                <input onChange={props.handleChange} type={type} className={`required form-control border-0 border-bottom rounded-0 border-dark shadow-none w-75 ${props.errors.contrasenia ? 'is-invalid' : ''}`} name='contrasenia' value={props.form.contrasenia} style={{ backgroundColor: "#D9D9D9" }} />
                {type === 'password' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={changeType} className='bi bi-eye-fill' width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={changeType} width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                )}
            </div>
        </div>
    </>)
}

const StyledDiv = styled.div`
    @media only screen and  (max-width: 768px){
        p{font-size: 1rem;}
    }
`;