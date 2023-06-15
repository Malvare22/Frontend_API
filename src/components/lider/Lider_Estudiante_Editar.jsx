import styled from 'styled-components';
import defaultImage from './../../assets/images/Users/02.png'
import pencil from './../../assets/images/Pencil.png'
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { Link, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { createRef } from 'react';
import { useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import { toLiderFormatStudentsFromImport, toLiderFormatStudentsToExport } from '../../context/functions_general';


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
        //Validar -> verificación de campos
        const state = await validar(form);
        //Si hubo error:
        if (state != null) {
            setErrors(state);
        }
        else {
            const tmp = {
                "correo": false,
                "contrasenia": false,
                "apellido": false,
                "nombre": false,
                "curso": false,
                "sexo": false,
                "fecha_nacimiento": false,
                "nombre_acudiente": false,
                "telefono": false,
                "foto": false,
                "tipo_usuario": false
            };
            setErrors(tmp);
            toggleAlert();
            console.log("Todo bien");
        }
    };
    return { form, setForm, errors, viewAlert, viewAlertPassword, handleChange, toggleAlert, toggleAlertPassword, handleSubmit };
};


//Componente general
export default function LiderEditarPerfilEstudiante() {


    return (

        <SContent>
            <div className='d-flex justify-content-center' id='d_head'>
                <div className='' id='head'>
                    <Head></Head>
                </div>
                <div className='' id="info"> <Information></Information></div>
            </div>
        </SContent>

    );
};


//Componenete Head
const Head = () => {

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

//Listado de Cursos para combobox (útil para carga y validación de dato curso)
const courses = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo", "Once"];

//Contenido del formulario
const Information = () => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("ESTUDIANTE_ALL"))
    

    const initialErrors = {
        "correo": false,
        "contrasenia": false,
        "apellido": false,
        "nombre": false,
        "curso": false,
        "sexo": false,
        "fecha_nacimiento": false,
        "nombre_acudiente": false,
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
            "curso": false,
            "sexo": false,
            "fecha_nacimiento": false,
            "nombre_acudiente": false,
            "telefono": false,
            "foto": false,
            "tipo_usuario": false
        };

        let fail = false;
        const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const number_regex = /[0-9]/;
        const espacios = /\s/;
        const password = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/
        if (user.nombre.trim() == '' || number_regex.exec(user.nombre) != null || user.nombre.length > 50) {
            errors.nombre = true;
            fail = true;
        }
        if (user.apellido.trim() == '' || number_regex.exec(user.apellido) != null || user.apellido.length > 50) {
            errors.apellido = true;
            fail = true;
        }

        if (user.contrasenia.trim() == '' || password.exec(user.contrasenia) == null) {
            errors.contrasenia = true;
            fail = true;
        }

        if (user.curso == 0 || !courses.includes(user.curso)) {
            errors.curso = true;
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

        if (user.nombre_acudiente.trim() == '' || number_regex.exec(user.nombre_acudiente) != null || user.nombre_acudiente.length > 50) {
            errors.nombre_acudiente = true;
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
            "tipoUsuario": "estudiante",
            "curso": form.curso,
            "nombreAcudiente": form.nombre_acudiente,
            "capacitacionAprobada": "aprobada"
        }
        const toSend = toLiderFormatStudentsToExport([prototype])[0]
        /*Registro*/
        await axios.post('http://146.235.246.199:8080/register/estudiante', toSend).then(

        ).catch((error) => { alert(error) })


        /*Set Foto*/
        const zelda = "http://146.235.246.199:8080/coordinador/guardarFoto";

        await axios({
            method: "post",
            url: zelda,
            data: formData,
            headers: { "X-Softue-JWT": localStorage.getItem('token_access') },
        }).then(
            (response) => {
                console.log("ENTER->", response)
                navigate('../Estudiantes')
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
                                Curso:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <Form.Select aria-label="Seleccione un curso" className={`form-control ${errors.curso ? "is-invalid" : ""}`} name='curso' value={form.curso} onChange={handleChange}>
                                    <option value={0} selected={"selected"}>Seleccione un curso</option>
                                    {courses.map((c) => {
                                        return <option value={c}>{c}</option>
                                    })}
                                </Form.Select>
                                <div className="invalid-feedback">Solo se admiten cursos válidos</div>
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
                                Nombre del acudiente:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.nombre_acudiente ? "is-invalid" : ""}`} name='nombre_acudiente' value={form.nombre_acudiente} onChange={handleChange} maxlength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 caracteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Teléfono del acudiente:
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
                        <div className='row btns d-flex justify-content-end m-0 p-0'>
                            <button className='btn d-inline-flex text-white' onClick={(e) => { e.preventDefault(); toggleAlertPassword() }}>Cambiar contraseña</button>
                        </div>
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
                    <Link to={"../Estudiantes"} style={{ textDecoration: 'none' }}><button className='btn rounded-3'><h6 className='text-white'>Cancelar</h6></button></Link>
                </div>
            </form>

            <Modal isOpen={viewAlert} centered={true}>
                <ModalBody className='d-flex justify-content-center align-content-center p-4'>
                    <h6 className='m-0 p-0'>¿Está seguro de guardar los cambios?</h6>
                </ModalBody>

                <ModalFooter className='d-flex justify-content-center'>
                    <Button color="primary" style={{ marginRight: "40px" }} onClick={async () => {
                        updateProfile();
                        //console.log(tempo)
                        // const myUrl = new URL('http://example.com');
                        // const myUrlString = myUrl.toString();
                        // console.log(myUrlString)
                        //navigate("../Estudiantes")
                    }
                    } >Aceptar</Button>
                    <Button color="secondary" style={{ marginLeft: "40px" }} onClick={toggleAlert}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            <WindowForPassword viewAlertPassword={viewAlertPassword} toggleAlertPassword={toggleAlertPassword} form={form} setForm={setForm}></WindowForPassword>

        </div>
    );
}

const WindowForPassword = (props) => {
    const [valid, setValid] = useState(true)
    const [view1, setView1] = useState(false)
    const [view2, setView2] = useState(false)
    const [success, setSuccess] = useState(false)
    const [inputs, setInputs] = useState({ first: '', second: '' })

    const toggleInputs = (e) => {
        const { value, name } = e.target
        setInputs({ ...inputs, [name]: value })
    }

    const iconEye = <svg xmlns="http://www.w3.org/2000/svg" className='ms-2 bi bi-eye-fill' width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>;
    const iconEyeClose = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="ms-2 bi bi-eye-slash-fill" viewBox="0 0 16 16">
        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
    </svg>

    const verifyPassword = (e) => {
        e.preventDefault()
        const espacios = /\s/;
        if (inputs.first == inputs.second && inputs.first.length >= 8 && espacios.exec(inputs.first) == null) {
            setSuccess(true)
            setValid(true)
            props.setForm({ ...props.form, ["contrasenia"]: inputs.first })
            props.toggleAlertPassword()

        }
        else {
            setValid(false)
            setSuccess(false)
        }
    }

    return (<Modal isOpen={props.viewAlertPassword} size='' centered={true}>
        <ModalBody className='' >
            <div>
                <div className='row m-3'>
                    <div className='col-4'>
                        <h6>Contraseña nueva</h6>
                    </div>
                    <div className='col-8 d-flex align-items-center'>
                        <input type={`${view1 ? "text" : "password"}`} onChange={toggleInputs} name='first' value={inputs.first} className='form-control'></input>
                        <div onClick={() => setView1(!view1)}>{view1 ? iconEye : iconEyeClose}</div>
                    </div>
                </div>
                <div className='row m-3'>
                    <div className='col-4'>
                        <h6>Confirmar contraseña</h6>
                    </div>
                    <div className='col-8 d-flex align-items-center'>
                        <input type={`${view2 ? "text" : "password"}`} onChange={toggleInputs} name='second' value={inputs.second} className='form-control'></input>
                        <div onClick={() => setView2(!view2)}>{view2 ? iconEye : iconEyeClose}</div>
                    </div>
                </div>
                {!valid && <div class="alert alert-danger" role="alert">
                    La contraseña debe tener una longitud mínima de 8 carácteres y no puede poseer espacios en blanco. (Ambos campos deben coincidir).
                </div>}
                {success && <div class="alert alert-success" role="alert">Contraseña válida (Recuerda guardar los cambios)</div>}
            </div>
        </ModalBody>

        <ModalFooter className='d-flex justify-content-center'>
            <Button color="primary" style={{ marginRight: "40px" }} onClick={verifyPassword}>Aceptar</Button>
            <Button color="secondary" style={{ marginLeft: "40px" }} onClick={props.toggleAlertPassword}>Cancelar</Button>
        </ModalFooter>
    </Modal>)
}

//Componente de carga de imagen
const ImageContainer = (props) => {

    // useEffect(()=>{
    //     return () => URL.revokeObjectURL(fileInput.current.files[0])
    // },[props.form.foto])

    const fileInput = useRef(null)

    const handleButton = (e) => {
        e.preventDefault()
        fileInput.current.click()
    }

    const handleInput = () => {
        if (fileInput.current.files[0]) {
            const reader = new FileReader()
            reader.onload = () => {
                props.setForm({ ...props.form, ["foto"]: { "archivo": fileInput.current.files[0], "direccion": reader.result } })
            }
            reader.readAsDataURL(fileInput.current.files[0])

        };
    }

    const removeImage = () => {
        props.setForm({ ...props.form, ["foto"]: { "archivo": "", "direccion": "" } })
        fileInput.current.value = ''
    }

    return (
        <SImageContainer>
            {props.form.foto.direccion != "" && <div className='col-12 col-sm-5 d-flex align-content-center align-items-center justify-content-center'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={removeImage} style={{ cursor: "pointer" }} width="40" height="40" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                </div>
                <div>
                    <img src={props.form.foto.direccion} className='border border-2 border-dark rounded-circle img-fluid'></img>
                </div>
            </div>}

            <div className='col-12 col-sm-7 d-flex justify-content-center' id='div_02'>
                <input type='file' accept=".png, .jpg" className='d-none' onChange={handleInput} ref={fileInput}></input>
                <button className='btn text-white rounded-3' onClick={handleButton} style={{ backgroundColor: "#1C3B57" }}>
                    <div className='d-flex justify-content-between text-center align-content-center align-items-center'>
                        <h6>Seleccionar archivo</h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                        </svg>
                    </div>
                </button>

            </div>
        </SImageContainer>
    );
}

const SImageContainer = styled.div.attrs({
    className: 'row',
})
    `
        *{
            padding: 0px;
            margin: 0px;
        }
        
        div>img{

            aspect-ratio: 1 / 1;
            object-fit: cover; 
            margin: 20px;
            min-height : 100px;
            min-height : 100px;
            max-width: 100px;
            max-height: 100px;
        }
        button{
            padding: 15px;
            font-weight: bold;
        }
        button > div{
            display: flex;
            justify-content: space-between;
        }

        @media screen and (max-width: 576px){
            div>img{
            margin: 0px;
            max-width: 100px;
            max-height: 100px;
        }
            #div_02{
                margin-top: 20px;
            }
        }

        h6{
            word-break: break-all;
        }
    `;

const SContent = styled.div`
    #d_head{
        position: relative;
        margin-top: 30px;
    }
    #head{
        position: absolute;
        top: -15px;
        left: 10px;
    }

    #head > div{
        padding: 30px;
        padding-top: 2px;
        padding-bottom: 2px;
        
    }
    #head > div> *{
        margin: 10px;
    }

    #info{
        width: 80%;
        @media screen and (max-width: 576px) {
            width: 95%;
    
        }
    }
    .btns{
        display: flex;
        margin-top: 0px;
        margin-bottom: 20px;
        justify-content: center;
    }
    .btns button{
        background-color:#1C3B57;
        margin-left: 40px;
        margin-right:40px;
        width: 200px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        @media screen and (max-width: 576px) {
            width: 100px;
            margin-right: 10px;
            margin-left: 10px;
            h6{
                font-size: 12px;
            }
        }
    }
    .btns h6{
        
        font-weight: bold;
        margin: 0px;
    }
`;

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











