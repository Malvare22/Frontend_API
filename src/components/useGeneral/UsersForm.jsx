import { useRef, useState } from "react";
import { Input } from "reactstrap";
import ImageContainer, { ImagePreviewNoEditable } from "./ImagePreview";
import ModalPassword from "./ModalConfirmation";
import WindowForPassword, { validarContrasenia } from "./ProfilesValidations";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import pencil from './../../assets/images/Pencil.png'
import ModalConfirmation from "./ModalConfirmation";
import default_profile from './../../assets/images/Users/default_profile.png'
import axios from "axios";
import { contraseniaNoCumple, exportAdmins, exportDocents, exportStudents } from "../../context/functions_general";
import { useEffect } from "react";

const EditPasswordInput = ({ toggleAlertPassword }) => {
    return (
        <div className='row btns d-flex justify-content-end m-0 p-0'>
            <button className='btn d-inline-flex text-white' onClick={(e) => { e.preventDefault(); toggleAlertPassword() }}>Cambiar contraseña</button>
        </div>
    )
}

const RegisterPasswordInput = ({ errors, form, handleChange }) => {
    return (
        <div className='row'>
            <div className='col-sm-4 col-6 fw-bold'>
                Contraseña:
            </div>
            <div className='col-sm-8 col-6'>
                <input type="text" className={`form-control ${errors.contrasenia ? "is-invalid" : ""}`} name='contrasenia' value={form.contrasenia} onChange={handleChange} />
                <div className="invalid-feedback">La contraseña debe cumplir con los siguientes requisitos mínimos: almenos 6 carácteres, una letra en mayúscula, un número y un carácter especial.</div>
            </div>
        </div>
    )
}

//Areas
const areas = ["Minera", "Agropecuaria", "Comercial", "Servicios", "Industrial"]

//Cursos
const courses = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo", "Once"];


//Componenete Head de Editar
export function HeadEdit() {

    const icon = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" className="bi bi-person-plus-fill" viewBox="0 0 16 16" style={{ height: "50px" }}>
        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
    </svg>;

    return (
        <div className='d-flex justify-content-center align-content-center align-items-center rounded-3' style={{ backgroundColor: "#1C3B57" }}>
            <img src={pencil} className='' style={{ width: "50px", height: "50px" }}></img>
            <h5 className='text-white fw-bold'>Editar Información</h5>
        </div>
    );
}

//Componenete Head de Registrar
export function HeadRegister() {

    const icon = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" className="bi bi-person-plus-fill" viewBox="0 0 16 16" style={{ height: "50px" }}>
        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
    </svg>;

    return (
        <div className='d-flex justify-content-center align-content-center align-items-center rounded-3' style={{ backgroundColor: "#1C3B57" }}>
            {icon}
            <h5 className='text-white fw-bold'>Registrar</h5>
        </div>
    );
}


const getPresentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
        month = '0' + month; // Agrega un cero al mes si es menor a 10
    }
    let day = today.getDate();
    if (day < 10) {
        day = '0' + day; // Agrega un cero al día si es menor a 10
    }
    return `${year}-${month}-${day}`;
}

const changePassword = async (contrasenia) => {
    const config = {
        headers: {
            "X-Softue-Reset": localStorage.getItem('token_access')
        }
    }
    const dataToSend = {
        "password" : contrasenia
    }
    await axios.patch('http://localhost:8080/coordinador/reestablecer', dataToSend, config)
}  

//Almacenamiento de datos, errores y mostrar alerta de envio
const useForm = (initialData, validar, initialErrors) => {
    const [viewAlert, setViewAlert] = useState(false);
    const [viewAlertPassword, setViewAlertPassword] = useState(false);
    const [form, setForm] = useState(initialData);
    const [errors, setErrors] = useState(initialErrors);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const toggleAlert = () => {
        setViewAlert(!viewAlert);
    }

    const toggleAlertPassword = () => {
        setViewAlertPassword(!viewAlertPassword)
    }

    /**Función que se aplica al querer efectuar en Submit **/
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
        //Validar -> verificación de campos
        const state = await validar(form);
        //Si hubo error:
        if (state != null) {
            setErrors(state);
            console.log(state)
        }
        else {
            setErrors(initialErrors);
            toggleAlert();
            console.log("Todo bien");
        }
    };
    return { form, setForm, errors, viewAlert, viewAlertPassword, handleChange, toggleAlert, toggleAlertPassword, handleSubmit };
};

//Contenido del formulario
export function FormDocente({ user, type }) {
    const navigate = useNavigate()
    if (type == 'registrar') {
        user = {
            "nombre": "",
            "apellido": "",
            "cedula": "",
            "titulo": "",
            "area": "",
            "correo": "",
            "contrasenia": "",
            "telefono": "",
            "foto": { "archivo": "", "direccion": "" },
            "fecha_nacimiento": "",
            "sexo": ""
        };
    }

    const initialErrors = {
        "nombre": false,
        "apellido": false,
        "cedula": false,
        "titulo": false,
        "area": false,
        "correo": false,
        "contrasenia": false,
        "telefono": false,
        "foto": false,
        "fecha_nacimiento": false,
        "sexo": false
    };



    const validar = (user) => {
        let errors = {
            "nombre": false,
            "apellido": false,
            "cedula": false,
            "titulo": false,
            "area": false,
            "correo": false,
            "contrasenia": false,
            "telefono": false,
            "foto": false,
            "fecha_nacimiento": false,
            "sexo": false
        }

        let fail = false;
        const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const number_regex = /[0-9]/;
        const caracteresEspeciales = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        if (user.nombre.trim() == '' || caracteresEspeciales.exec(user.nombre) == null || user.nombre.length > 50) {
            errors.nombre = true;
            fail = true;
        }
        if (user.apellido.trim() == '' || caracteresEspeciales.exec(user.apellido) == null || user.apellido.length > 50) {
            errors.apellido = true;
            fail = true;
        }
        if (user.cedula.trim() == '' || isNaN(user.cedula)) {
            errors.cedula = true;
            fail = true;
        }
        if (user.titulo.trim() == '' || caracteresEspeciales.exec(user.titulo) == null) {
            errors.titulo = true;
            fail = true;
        }
        if (!areas.includes(user.area)) {
            errors.area = true;
            fail = true;
        }

        if (type == 'registrar' && !validarContrasenia(user.contrasenia)) {
            errors.contrasenia = true;
            fail = true;
        }

        if (user.fecha_nacimiento == '' || !(Date.parse(user.fecha_nacimiento)) || ((new Date())).getTime() < ((new Date(user.fecha_nacimiento)).getTime())) {
            errors.fecha_nacimiento = true;
            fail = true;
        }

        if (user.sexo != 'Masculino' && user.sexo != 'Femenino') {
            errors.sexo = true;
            fail = true;
        }

        if (isNaN(user.telefono) || user.telefono.length != 10) {
            errors.telefono = true;
            fail = true;
        }

        if (!email_regex.test(user.correo) || user.correo.length > 50) {
            errors.correo = true;
            fail = true;
        }
        if (fail == false) return null;
        return errors;
    };

    const { form, setForm, errors, viewAlert, viewAlertPassword, handleChange, toggleAlert, toggleAlertPassword, handleSubmit } = useForm(user, validar, initialErrors);



    //Método para cargar la información
    const updateProfile = async () => {
        try {
            const imageRef = form.foto.direccion == '' ? default_profile : form.foto.direccion
            const file = await fetch(imageRef).then(response => response.blob());
            const formData = new FormData();
            formData.append('foto', file, 'nombre_archivo.png');
            formData.append('correo', form.correo)
            const dataToSend = exportDocents([{ ...form }])[0]
            const config = {
                headers: {
                    "X-Softue-JWT": localStorage.getItem('token_access')
                }
            }
            if (type == 'registrar') {
                await axios.post('http://localhost:8080/register/docente', dataToSend)
            }
            else {

                await axios.patch('http://localhost:8080/docente/actualizar', dataToSend, config)
                if(form.contrasenia!=''){
                    await changePassword(form.contrasenia)
                }
            }

            await axios.post('http://localhost:8080/coordinador/guardarFoto', formData, config)

            navigate(-1)

        } catch (error) {
            let msg = '';
            if (error.response) {
                console.log('Código de estado:', error.response.status);
                msg = "Error " + error.response.status + ": " + error.response.data.errorMessage;
            } else if (error.request) {
                msg = 'Error: No se recibió respuesta de la base de datos';
            } else {
                msg = "Error al realizar la solicitud: " + error.message;
            }
            alert(msg)

        }

    }

    return (
        <div >
            <form onSubmit={handleSubmit}>
                <div className='' style={{ backgroundColor: "#ECECEC" }}>
                    <SInfo>
                        <div className='row' style={{ paddingTop: "60px" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                nombre:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.nombre ? "is-invalid" : ""}`} name='nombre' value={form.nombre} onChange={handleChange} maxlength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                apellido:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.apellido ? "is-invalid" : ""}`} name='apellido' value={form.apellido} onChange={handleChange} maxlength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Documento de identificación:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.cedula ? "is-invalid" : ""}`} name='cedula' value={form.cedula} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite cedulas de identificación válidos.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Título académico:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.titulo ? "is-invalid" : ""}`} name='titulo' value={form.titulo} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo no admite valores númericos.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Área espacializada:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <Input className={`form-control ${errors.area ? "is-invalid" : ""}`} name='area' value={form.area} onChange={handleChange} type="select">
                                    <option value={0}>Seleccione un área</option>
                                    {areas.map((a) => {
                                        return <option value={a}>{a}</option>;
                                    })}
                                </Input>
                                <div className="invalid-feedback">Este campo solo admite las áreas de conocimientos registradas.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Fecha de Nacimiento:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="date" max={getPresentDate()} className={`form-control ${errors.fecha_nacimiento ? "is-invalid" : ""}`} value={form.fecha_nacimiento} onChange={handleChange} name='fecha_nacimiento' />
                                <div className="invalid-feedback">Solo se admiten fechas válidas.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Sexo:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <select className={`form-control ${errors.sexo ? "is-invalid" : ""}`} name='sexo' value={form.sexo} onChange={handleChange}>
                                    <option value={""} selected={"select"}>
                                        Selecciona un género
                                    </option>
                                    <option value={"Masculino"}>
                                        Masculino
                                    </option>
                                    <option value={"Femenino"}>
                                        Femenino
                                    </option>
                                </select>
                                <div className="invalid-feedback">Este campo solo admite valores Femenino y Masculino.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Teléfono:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="number" className={`form-control ${errors.telefono ? "is-invalid" : ""}`} name='telefono' value={form.telefono} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite números teléfonicos válidos</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Correo eléctronico:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.correo ? "is-invalid" : ""}`} name='correo' value={form.correo} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite correos electrónicos válidos.</div>
                            </div>
                        </div>

                        {type == 'registrar' ? <RegisterPasswordInput errors={errors} form={form} handleChange={handleChange}></RegisterPasswordInput> : <EditPasswordInput toggleAlertPassword={toggleAlertPassword}></EditPasswordInput>}

                        <div className='row' style={{ paddingBottom: "3%" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Foto:
                            </div>
                            <div className='col-sm-8 col-6' id='div_img'>
                                <ImageContainer form={form} setForm={setForm}></ImageContainer>
                            </div>
                        </div>
                    </SInfo>
                </div>
                <div className='btns'>
                    <button type='submit' className='btn rounded-3'><h6 className='text-white'>Guardar Cambios</h6></button>
                    <Link to={-1} style={{ textDecoration: 'none' }}><button className='btn rounded-3'><h6 className='text-white'>Cancelar</h6></button></Link>
                </div>
            </form>

            <ModalConfirmation viewAlert={viewAlert} updateProfile={updateProfile} toggleAlert={toggleAlert}></ModalConfirmation>
            <WindowForPassword viewAlertPassword={viewAlertPassword} toggleAlertPassword={toggleAlertPassword} form={form} setForm={setForm}></WindowForPassword>

        </div>
    );
}

/**
 *  Formulario de estudiante, dispone de tres variantes:
 *  Registro ("registrar"), fuertemente editable ("sudo") y levemente editable ("estudiante")
 *  **/
export const FormEstudiante = ({ user, type }) => {
    const navigate = useNavigate()

    if (type == 'registrar') {
        user = {
            "correo": "",
            "contrasenia": "",
            "apellido": "",
            "nombre": "",
            "curso": "",
            "sexo": "",
            "fecha_nacimiento": "",
            "nombre_acudiente": "",
            "telefono": "",
            "foto": { "archivo": "", "direccion": "" },
            "tipo_usuario": "",
        };
    }

    const initialErrors = {
        nombre: false,
        apellido: false,
        fecha_nacimiento: false,
        sexo: false,
        nombre_acudiente: false,
        telefono: false,
        correo: false,
        contrasenia: false
    };


    const validar = (user) => {
        let errors = {
            nombre: false,
            apellido: false,
            fecha_nacimiento: false,
            sexo: false,
            nombre_acudiente: false,
            telefono: false,
            correo: false,
            contrasenia: false
        };
        let fail = false;
        const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const number_regex = /[0-9]/;
        if (user.nombre.trim() == '' || number_regex.exec(user.nombre) != null || user.nombre.length > 50) {
            errors.nombre = true;
            fail = true;
        }
        if (user.apellido.trim() == '' || number_regex.exec(user.apellido) != null || user.apellido.length > 50) {
            errors.apellido = true;
            fail = true;
        }
        if (!courses.includes(user.curso)) {
            errors.curso = true;
            fail = true;
        }
        if (user.fecha_nacimiento == '' || !(new Date(user.fecha_nacimiento)) || ((new Date())).getTime() < ((new Date(user.fecha_nacimiento)).getTime())) {
            errors.fecha_nacimiento = true;
            fail = true;
        }
        if (user.sexo != 'Masculino' && user.sexo != 'Femenino') {
            errors.sexo = true;
            fail = true;
        }
        if (user.nombre_acudiente.trim() == '' || number_regex.exec(user.nombre_acudiente) != null || user.nombre_acudiente.length > 50) {
            errors.nombre_acudiente = true;
            fail = true;
        }

        if (isNaN(user.telefono) || user.telefono.length != 10) {
            errors.telefono = true;
            fail = true;
        }

        if (type == 'registrar') {
            if (!validarContrasenia(user.contrasenia)) {
                errors.contrasenia = true
                fail = true
            }
        }

        if (!email_regex.test(user.correo) || user.correo.length > 50) {
            errors.correo = true;
            fail = true;
        }
        if (fail == false) return null;
        return errors;
    };
    const updateProfile = async () => {
        //Aquí se hace la actualización de la info
        try {
            let dataToSend = exportStudents([{ ...form }])[0];
            // {
            //     "nombre" : "Dorothy",
            //     "apellido" : "Pulsifer Osuna",
            //     "fecha_nacimiento" : "2000-05-31",
            //     "sexo" : "F",
            //     "correo" : "ADA@ASDSAS.ESES",
            //     "telefono" : "1-348-367-3111",
            //     "contrasenia" : "AUasd234",
            //     "tipoUsuario" : "estudiante",
            //     "curso" : "noveno",
            //     "nombreAcudiente" : "Jean Zaslow",
            //     "capacitacionAprobada" : "aprobada"
            // }
            console.log(dataToSend)
            const imageRef = form.foto.direccion == '' ? default_profile : form.foto.direccion
            const file = await fetch(imageRef).then(response => response.blob());
            const formData = new FormData();
            formData.append('foto', file, 'nombre_archivo.png');
            formData.append('correo', form.correo)
            const config = {
                headers: {
                    "X-Softue-JWT": localStorage.getItem('token_access')
                }
            }

            if (type == 'registrar') {
                dataToSend.capacitacionAprobada = "aprobada"
                await axios.post('http://localhost:8080/register/estudiante', dataToSend)
            }

            else {

                await axios.patch('http://localhost:8080/estudiante/actualizar', dataToSend, config)
                if (type == 'sudo') {
                    if(form.contrasenia!=''){
                    await changePassword(form.contrasenia)
                }
                }
            }

            await axios.post('http://localhost:8080/coordinador/guardarFoto', formData, config)

            navigate(-1)
        }
        catch (error) {
            alert(error)
        }
        console.log("Info enviada")
    }
    const { form, setForm, errors, viewAlert, viewAlertPassword, handleChange, toggleAlert, toggleAlertPassword, handleSubmit } = useForm(user, validar, initialErrors);
    return (
        <div >
            <form onSubmit={handleSubmit}>
                <div className='' style={{ backgroundColor: "#ECECEC" }}>
                    <SInfo>
                        <div className='row' style={{ paddingTop: "60px" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                nombre:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.nombre ? "is-invalid" : ""}`} name='nombre' value={form.nombre} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                apellido:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.apellido ? "is-invalid" : ""}`} name='apellido' value={form.apellido} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Curso:
                            </div>
                            {type == 'estudiante' ? <div className='col-sm-8 col-6'>
                                {form.curso}
                            </div> : <div className='col-sm-8 col-6'>
                                <Input className={`form-control ${errors.curso ? "is-invalid" : ""}`} name='curso' value={form.curso} onChange={handleChange} type="select">
                                    <option value={0}>Seleccione un curso</option>
                                    {courses.map((a) => {
                                        return <option value={a}>{a}</option>;
                                    })}
                                </Input>
                                <div className="invalid-feedback">Este campo solo admite los cursos establecidos.</div>
                            </div>}
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Fecha de Nacimiento:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="date" max={getPresentDate()} className={`form-control ${errors.fecha_nacimiento ? "is-invalid" : ""}`} value={form.fecha_nacimiento} onChange={handleChange} name='fecha_nacimiento' />
                                <div className="invalid-feedback">Solo se admiten fechas válidas.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Sexo:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <select className={`form-control ${errors.sexo ? "is-invalid" : ""}`} name='sexo' value={form.sexo} onChange={handleChange}>
                                    <option value={"0"}>
                                        Seleccione un género
                                    </option>
                                    <option value={"Masculino"}>
                                        Masculino
                                    </option>
                                    <option value={"Femenino"}>
                                        Femenino
                                    </option>
                                </select>
                                <div className="invalid-feedback">Este campo solo admite valores Femenino y Masculino.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Nombre del acudiente:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.nombre_acudiente ? "is-invalid" : ""}`} name='nombre_acudiente' value={form.nombre_acudiente} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Teléfono del acudiente:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="number" className={`form-control ${errors.telefono ? "is-invalid" : ""}`} name='telefono' value={form.telefono} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite teléfonos válidos</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Correo eléctronico:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.correo ? "is-invalid" : ""}`} name='correo' value={form.correo} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite correos electrónicos válidos.</div>
                            </div>
                        </div>
                        {type == 'registrar' && <RegisterPasswordInput errors={errors} form={form} handleChange={handleChange}></RegisterPasswordInput>}
                        {type == 'sudo' && <EditPasswordInput toggleAlertPassword={toggleAlertPassword}></EditPasswordInput>}
                        <div className='row' style={{ paddingBottom: "3%" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Foto:
                            </div>
                            <div className='col-sm-8 col-6' id='div_img'>
                                {type == 'estudiante' ? <ImagePreviewNoEditable form={form}></ImagePreviewNoEditable> : <ImageContainer form={form} setForm={setForm}></ImageContainer>}
                            </div>
                        </div>
                    </SInfo>
                </div>
                <div className='btns'>
                    <button type='submit' className='btn rounded-3'><h6 className='text-white'>Guardar Cambios</h6></button>
                    <Link to={-1} style={{ textDecoration: 'none' }}><button className='btn rounded-3'><h6 className='text-white'>Cancelar</h6></button></Link>
                </div>
            </form>

            <ModalConfirmation viewAlert={viewAlert} updateProfile={updateProfile} toggleAlert={toggleAlert}></ModalConfirmation>
            <WindowForPassword viewAlertPassword={viewAlertPassword} toggleAlertPassword={toggleAlertPassword} form={form} setForm={setForm}></WindowForPassword>

        </div>
    );
}

export const FormAdministrativo = ({ user, type }) => {

    const navigate = useNavigate()

    if (type == 'registrar') {
        user = {
            "correo": "",
            "apellido": "",
            "nombre": "",
            "documento": "",
            "sexo": "",
            "fecha_nacimiento": "",
            "telefono": "",
            "foto": { "archivo": "", "direccion": "" },
            "contrasenia": ""
        }
    }

    const initialErrors = {
        "correo": false,
        "nombre": false,
        "apellido": false,
        "documento": false,
        "sexo": false,
        "fecha_nacimiento": false,
        "telefono": false,
        "foto": false,
        "contrasenia": false,
    };


    const validar = (user) => {
        let errors = {
            "correo": false,
            "nombre": false,
            "apellido": false,
            "documento": false,
            "sexo": false,
            "fecha_nacimiento": false,
            "telefono": false,
            "foto": false,
            "contrasenia": false,
        };

        let fail = false;
        const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const number_regex = /[0-9]/;
        const espacios = /\s/;
        if (user.nombre.trim() == '' || number_regex.exec(user.nombre) != null || user.nombre.length > 50) {
            errors.nombre = true;
            fail = true;
        }
        if (user.apellido.trim() == '' || number_regex.exec(user.apellido) != null || user.apellido.length > 50) {
            errors.apellido = true;
            fail = true;
        }

        if (type == 'registrar') {
            if (!validarContrasenia(user.contrasenia)) {
                errors.contrasenia = true
                fail = true
            }
        }

        if (user.fecha_nacimiento == '' || !(new Date(user.fecha_nacimiento)) || ((new Date())).getTime() < ((new Date(user.fecha_nacimiento)).getTime())) {
            errors.fecha_nacimiento = true;
            fail = true;
        }

        if (user.sexo != 'Masculino' && user.sexo != 'Femenino') {
            errors.sexo = true;
            fail = true;
        }

        if (isNaN(user.telefono) || user.telefono.length != 10) {
            errors.telefono = true;
            fail = true;
        }

        if (!email_regex.test(user.correo) || user.correo.length > 50) {
            errors.correo = true;
            fail = true;
        }

        if (fail == false) return null;
        return errors;
    };


    const { form, setForm, errors, viewAlert, viewAlertPassword, handleChange, toggleAlert, toggleAlertPassword, handleSubmit } = useForm(user, validar, initialErrors);

    //Método para cargar la información
    const updateProfile = async () => {

        try {
            const dataToSend = exportAdmins([{ ...form }])[0]
            console.log(type)
            const imageRef = form.foto.direccion == '' ? default_profile : form.foto.direccion
            const file = await fetch(imageRef).then(response => response.blob());
            const formData = new FormData();
            formData.append('foto', file, 'nombre_archivo.png');
            formData.append('correo', form.correo)
            const config = {
                headers: {
                    "X-Softue-JWT": localStorage.getItem('token_access')
                }
            }

            if (type == 'registrar') {
                await axios.post('http://localhost:8080/register', dataToSend)
            }

            else {
                console.log('HALT')
                await axios.patch('http://localhost:8080/administrativo/update', dataToSend, config)
                if (type == 'editar') {
                    if (form.contrasenia != '-') {
                        await changePassword(form.contrasenia)
                    }
                }
            }

            await axios.post('http://localhost:8080/coordinador/guardarFoto', formData, config)

            navigate(-1)

            console.log('Archivo enviado correctamente.');
        } catch (error) {
            console.error('Error al enviar el archivo:', error);
        }

    }
    return (
        <div >
            <form onSubmit={handleSubmit}>
                <div className='' style={{ backgroundColor: "#ECECEC" }}>
                    <SInfo>
                        <div className='row' style={{ paddingTop: "60px" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                nombre:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.nombre ? "is-invalid" : ""}`} name='nombre' value={form.nombre} onChange={handleChange} maxlength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                apellido:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.apellido ? "is-invalid" : ""}`} name='apellido' value={form.apellido} onChange={handleChange} maxlength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Sexo:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <select className={`form-control ${errors.sexo ? "is-invalid" : ""}`} name='sexo' value={form.sexo} onChange={handleChange} defaultValue={"0"}>
                                    <option value={""} selected={"select"}>
                                        Selecciona un género
                                    </option>
                                    <option value={"Masculino"}>
                                        Masculino
                                    </option>
                                    <option value={"Femenino"}>
                                        Femenino
                                    </option>
                                </select>
                                <div className="invalid-feedback">Este campo solo admite valores Femenino y Masculino.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Fecha de Nacimiento:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="date" max={getPresentDate()} className={`form-control ${errors.fecha_nacimiento ? "is-invalid" : ""}`} value={form.fecha_nacimiento} onChange={handleChange} name='fecha_nacimiento' />
                                <div className="invalid-feedback">Solo se admiten fechas válidas.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Teléfono:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="number" className={`form-control ${errors.telefono ? "is-invalid" : ""}`} name='telefono' value={form.telefono} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite números teléfonicos válidos</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Correo eléctronico:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.correo ? "is-invalid" : ""}`} name='correo' value={form.correo} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite correos electrónicos válidos.</div>
                            </div>
                        </div>
                        {type == 'registrar' ? <RegisterPasswordInput errors={errors} form={form} handleChange={handleChange}></RegisterPasswordInput> : <EditPasswordInput toggleAlertPassword={toggleAlertPassword}></EditPasswordInput>}

                        <div className='row' style={{ paddingBottom: "3%" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Foto:
                            </div>
                            <div className='col-sm-8 col-6' id='div_img'>
                                <ImageContainer form={form} setForm={setForm}></ImageContainer>
                            </div>
                        </div>
                    </SInfo>
                </div>
                <div className='btns'>
                    <button type='submit' className='btn rounded-3'><h6 className='text-white'>Guardar Cambios</h6></button>
                    <Link to={-1} style={{ textDecoration: 'none' }}><button className='btn rounded-3'><h6 className='text-white'>Cancelar</h6></button></Link>
                </div>
            </form>

            <ModalConfirmation viewAlert={viewAlert} updateProfile={updateProfile} toggleAlert={toggleAlert}></ModalConfirmation>
            <WindowForPassword viewAlertPassword={viewAlertPassword} toggleAlertPassword={toggleAlertPassword} form={form} setForm={setForm}></WindowForPassword>

        </div>
    );
}

export const FormLider = ({user, type}) => {
    const navigate = useNavigate();
    const jesucristo = useRef(null)
    if(type=='registrar'){
        user = {
            "correo": "",
            "contrasenia": "",
            "apellido": "",
            "nombre": "",
            "sexo": "",
            "fecha_nacimiento": "",
            "telefono": "",
            "foto": { "nombre": "Seleccionar archivo", "archivo": "", "direccion": "" },
            "tipo_usuario": "",
        };
    }
    const initialErrors = {
        "correo": false,
        "contrasenia": false,
        "apellido": false,
        "nombre": false,
        "sexo": false,
        "fecha_nacimiento": false,
        "telefono": false,
        "foto": false,
        "tipo_usuario": false,
    };
    const validar = (user) => {
        let errors = {
            "correo": false,
            "contrasenia": false,
            "apellido": false,
            "nombre": false,
            "sexo": false,
            "fecha_nacimiento": false,
            "telefono": false,
            "foto": false,
            "tipo_usuario": false
        };
        let fail = false;
        const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const number_regex = /[0-9]/;
        const espacios = /\s/;
        if (user.nombre.trim() == '' || number_regex.exec(user.nombre) != null || user.nombre.length > 50) {
            errors.nombre = true;
            fail = true;
        }
        if (user.apellido.trim() == '' || number_regex.exec(user.apellido) != null || user.apellido.length > 50) {
            errors.apellido = true;
            fail = true;
        }

        if (type == 'registrar' && !validarContrasenia(user.contrasenia)) {
            errors.contrasenia = true;
            fail = true;
        }

        if (!(new Date(user.fecha_nacimiento)) || ((new Date())).getTime() < ((new Date(user.fecha_nacimiento)).getTime())) {
            errors.fecha_nacimiento = true;
            fail = true;
        }

        if (user.sexo != 'Masculino' && user.sexo != 'Femenino') {
            errors.sexo = true;
            fail = true;
        }

        if (isNaN(user.telefono) || user.telefono.length != 10) {
            errors.telefono = true;
            fail = true;
        }

        if (!email_regex.test(user.correo) || user.correo.length > 50) {
            errors.correo = true;
            fail = true;
        }

        if (fail == false) return null;
        return errors;
    };

    const { form, setForm, errors, viewAlert, viewAlertPassword, handleChange, toggleAlert, toggleAlertPassword, handleSubmit } = useForm(user, validar, initialErrors);

    //Método para cargar la información
    const updateProfile = async () => {

        const formData = new FormData();
        formData.append('foto', form.foto.archivo);
        formData.append('correo', form.correo)


        const prototype = {
            "nombre": form.nombre,
            "apellido": form.apellido,
            "fecha_nacimiento": form.fecha_nacimiento,
            "sexo": form.sexo,
            "correo": form.correo,
            "telefono": form.telefono,
            "contrasenia": form.contrasenia,
            "tipoUsuario": "coordinador"
        }
        const toSend = ([prototype])[0]
        /*Registro*/
        await axios.post('http://localhost:8080/register', toSend).then(

        ).catch((error) => { alert(error) })


        /*Set Foto*/
        const zelda = "http://localhost:8080/coordinador/guardarFoto";

        await axios({
            method: "post",
            url: zelda,
            data: formData,
            headers: { "X-Softue-JWT": localStorage.getItem('token_access') },
        }).then(
            (response) => {
                console.log("ENTER->", response)
                navigate('../Lider')
            }
        ).catch(async (error) => {
            const value = await (error)
            if (error.response) {
                console.log('Código de estado:', error.response.status);
                console.log('Respuesta del backend:', error.response.data);
            } else if (error.request) {
                console.log('No se recibió respuesta del backend');
            } else {
                console.log('Error al realizar la solicitud:', error.message);
            }
        })

    }
    return (
        <div >
            <form onSubmit={handleSubmit}>
                <div className='' style={{ backgroundColor: "#ECECEC" }}>
                    <SInfo>
                        <div className='row' style={{ paddingTop: "60px" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Nombres:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.nombre ? "is-invalid" : ""}`} name='nombre' value={form.nombre} onChange={handleChange} maxlength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Apellidos:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.apellido ? "is-invalid" : ""}`} name='apellido' value={form.apellido} onChange={handleChange} maxlength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>                        
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Fecha de Nacimiento:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="date" max={getPresentDate()} className={`form-control ${errors.fecha_nacimiento ? "is-invalid" : ""}`} value={form.fecha_nacimiento} onChange={handleChange} name='fecha_nacimiento' />
                                <div className="invalid-feedback">Solo se admiten fechas válidas.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Sexo:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <select className={`form-control ${errors.sexo ? "is-invalid" : ""}`} name='sexo' value={form.sexo} onChange={handleChange}>
                                    <option value={""} selected={"select"}>
                                        Selecciona un género
                                    </option>
                                    <option value={"Masculino"}>
                                        Masculino
                                    </option>
                                    <option value={"Femenino"}>
                                        Femenino
                                    </option>
                                </select>
                                <div className="invalid-feedback">Este campo solo admite valores Femenino y Masculino.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Teléfono:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="number" className={`form-control ${errors.telefono ? "is-invalid" : ""}`} name='telefono' value={form.telefono} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite números teléfonicos válidos</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Correo eléctronico:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.correo ? "is-invalid" : ""}`} name='correo' value={form.correo} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite correos electrónicos válidos.</div>
                            </div>
                        </div>
                        {type == 'registrar' ? <RegisterPasswordInput errors={errors} form={form} handleChange={handleChange}></RegisterPasswordInput> : <EditPasswordInput toggleAlertPassword={toggleAlertPassword}></EditPasswordInput>}

                        <div className='row' style={{ paddingBottom: "3%" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Foto:
                            </div>
                            <div className='col-sm-8 col-6' id='div_img'>
                                <ImageContainer form={form} setForm={setForm}></ImageContainer>
                            </div>
                        </div>
                    </SInfo>
                </div>
                <div className='btns'>
                    <button type='submit' className='btn rounded-3'><h6 className='text-white'>Guardar Cambios</h6></button>
                    <Link to={-1} style={{ textDecoration: 'none' }}><button className='btn rounded-3'><h6 className='text-white'>Cancelar</h6></button></Link>
                </div>
            </form>

            <ModalConfirmation viewAlert={viewAlert} updateProfile={updateProfile} toggleAlert={toggleAlert}></ModalConfirmation>
            <WindowForPassword viewAlertPassword={viewAlertPassword} toggleAlertPassword={toggleAlertPassword} form={form} setForm={setForm}></WindowForPassword>


        </div>
    );
}

const SInfo = styled.div`

.row{
    margin: 3%;
    display: flex;
    align-items: center;
};
@media screen and (max-width: 576px) {
    font-size: small;
    .row{
        margin: 5%;
    }
}
`;


