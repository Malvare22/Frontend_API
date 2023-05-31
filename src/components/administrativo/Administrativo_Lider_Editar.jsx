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
import { toLiderFormatStudentsToExport } from '../../context/functions_general';


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
                "sexo": false,
                "fecha_nacimiento": false,
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
export default function AdministrativoEditarPerfilLider() {
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
        <div className='d-flex justify-content-center align-content-center align-items-center rounded-3' style={{ backgroundColor: "#1C3B57", color: "#FFFFFF" }}>
            <img src={pencil} className='' style={{ width: "50px", height: "50px" }}></img>
            <h5 className='text-white fw-bold'>Editar información del liderUE</h5>
        </div>
    );
}

//Listado de Cursos para combobox (útil para carga y validación de dato curso)

//Contenido del formulario
const Information = () => {  
    const navigate = useNavigate();
    const jesucristo = useRef(null)
    let user = {
        "correo": "",
        "contrasenia": "",
        "apellido": "",
        "nombre": "",
        "sexo": "",
        "fecha_nacimiento": "",
        "telefono": "",
        "foto": { "nombre": "Seleccionar archivo", "archivo": "", "direccion": "../images/03.png" },
        "tipo_usuario": "",
    };    
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
            "tipoUsuario": "coordinador"
        }
        const toSend = toLiderFormatStudentsToExport([prototype])[0]
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
    const usuarioString = localStorage.getItem("usuario");
    const usuarioObjeto = JSON.parse(usuarioString);
    const [sexo, setSexo] = useState('');

    useEffect(() => {
      const usuarioString = localStorage.getItem('usuario');
      const usuarioObjeto = JSON.parse(usuarioString);
  
      if (usuarioObjeto && usuarioObjeto.sexo) {
        setSexo(usuarioObjeto.sexo);
      }
    }, []);
    var telefonoNumero = parseFloat(usuarioObjeto.telefono);
    console.log(`${usuarioObjeto.fecha_nacimiento[0]}-${usuarioObjeto.fecha_nacimiento[1]}-${usuarioObjeto.fecha_nacimiento[2]}`)
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
                                <input type="text" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} defaultValue={usuarioObjeto.nombre}  name="nombre" onChange={handleChange} maxLength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Apellidos:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.apellido ? "is-invalid" : ""}`} defaultValue={usuarioObjeto.apellido} name='apellido' onChange={handleChange} maxLength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Fecha de Nacimiento:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="date" max={getPresentDate()} className={`form-control ${errors.fecha_nacimiento ? "is-invalid" : ""}`} defaultValue={`${usuarioObjeto.fecha_nacimiento[0]}-${String(usuarioObjeto.fecha_nacimiento[1]).padStart(2, '0')}-${String(usuarioObjeto.fecha_nacimiento[2]).padStart(2, '0')}`}  onChange={handleChange} name='fecha_nacimiento' />
                                <div className="invalid-feedback">Solo se admiten fechas válidas.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Sexo:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <select className={`form-control ${errors.sexo ? "is-invalid" : ""}`} defaultValue={usuarioObjeto.sexo == 'M' ? "Masculino" : "Femenino"} name='sexo' onChange={handleChange} >
                                    <option defaultValue={"select"}>
                                        Selecciona un género
                                    </option>
                                    <option defaultValue={"Masculino"}>
                                        Masculino
                                    </option>
                                    <option defaultValue={"Femenino"}>
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
                                <input type="number" className={`form-control ${errors.telefono ? "is-invalid" : ""}`} defaultValue={telefonoNumero} name='telefono' onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite números teléfonicos válidos</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Correo eléctronico:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.correo ? "is-invalid" : ""}`} defaultValue={usuarioObjeto.correo} name='correo' onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite correos electrónicos válidos.</div>
                            </div>
                        </div>                        
                        <div className='row' style={{ paddingBottom: "3%" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Foto de perfil:
                            </div>
                            <div className='col-sm-8 col-6' id='div_img'>
                                <ImageContainer form={form} defaultImage={"./images/03.png"} setForm={setForm}></ImageContainer>
                            </div>
                        </div>
                    </SInfo>
                </div>
                <div className='btns'>
                    <button type='submit' className='btn rounded-3'><h6 className='text-white'>Añadir liderUE</h6></button>
                    <Link to={"../Lider"} ref={jesucristo} style={{ textDecoration: 'none' }}><button className='btn rounded-3'><h6 className='text-white'>Cancelar</h6></button></Link>
                </div>
            </form>

            <Modal isOpen={viewAlert} centered={true}>
                <ModalBody className='d-flex justify-content-center align-content-center p-4'>
                    <h6 className='m-0 p-0'>¿Está seguro de añadir este lider a la unidad de emprendimiento?</h6>
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

        </div>
    );
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
                console.log(reader)
                props.setForm({ ...props.form, ["foto"]: { "nombre": fileInput.current.files[0].name, "archivo": fileInput.current.files[0], "direccion": reader.result } })
            }
            reader.readAsDataURL(fileInput.current.files[0])

        };
    }

    const removeImage = () => {
        props.setForm({ ...props.form, ["foto"]: { "nombre": "Seleccionar archivo", "archivo": "", "direccion": "" } })
        fileInput.current.value = ''
    }

    return (
        <SImageContainer>
            {props.form.foto.archivo != "" && <div className='col-12 col-sm-5 d-flex align-content-center align-items-center justify-content-center'>
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
                        <h6>{props.form.foto.nombre}</h6>
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