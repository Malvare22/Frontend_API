import styled from 'styled-components';
import pencil from './../../assets/images/Pencil.png'
import defaultImage from './../../assets/images/Users/02.png'
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { createRef } from 'react';
import { useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';


//Almacenamiento de datos, errores y mostrar alerta de envio
const useForm = (initialData, validar, initialErrors) => {
    const [viewAlert, setViewAlert] = useState(false);
    const [form, setForm] = useState(initialData);
    const [errors, setErrors] = useState(initialErrors);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const toggleAlert = () => {
        setViewAlert(!viewAlert);
    }

    /**Función que se aplica al querer efectuar en Submit **/
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Validar -> verificación de campos
        toggleAlert()
        // const state = await validar(form);
        // //Si hubo error:
        // if (state != null) {
        //     setErrors(state);
        // }
        // else {
        //     const tmp = {
        //         nombres: false,
        //         apellidos: false,
        //         fecha_nacimiento: false,
        //         sexo: false,
        //         nombre_acudiente: false,
        //         telefono_acudiente: false,
        //         correo: false,
        //     };
        //     setErrors(tmp);
        //     toggleAlert();
        //     console.log("Todo bien");
        // }
    };
    return { form, errors, viewAlert, handleChange, toggleAlert, handleSubmit };
};


//Componente general
export default function RegistrarEstudiantePerfil() {

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
            {icon}
            <h5 className='text-white fw-bold'>Agregar estudiante</h5>
        </div>
    );
}

//Listado de Cursos para combobox (útil para carga y validación de dato curso)
const courses = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo", "Once"];

//Contenido del formulario
const Information = () => {

    const [codesForStudents, setCodesForStudents] = useState([]);

    const getCodesForStudents = async () => {
        let codes = [];
        await axios.get('../../../anotherStudent.json').then(
            response => {
                const data = response.data;
                data.map((d) => {
                    codes.push(d.codigo)
                })
            }).catch(error => { console.error(error); })
        setCodesForStudents(codes);
    }

    useEffect(() => {
        getCodesForStudents()
    }, [])

    const user = {
        "codigo": "",
        "correo": "",
        "contrasenia": "",
        "apellidos": "",
        "nombres": "",
        "curso": "",
        "codigo": "",
        "sexo": "0",
        "fecha_nacimiento": "",
        "nombre_acudiente": "",
        "telefono_acudiente": "",
        "foto": "",
        "tipo_usuario": "",
    }

    const initialErrors = {
        "codigo": false,
        "correo": false,
        "contrasenia": false,
        "apellidos": false,
        "nombres": false,
        "curso": false,
        "codigo": false,
        "sexo": false,
        "fecha_nacimiento": false,
        "nombre_acudiente": false,
        "telefono_acudiente": false,
        "foto": false,
        "tipo_usuario": false,
    };


    const validar = (user) => {
        let errors = {
            "codigo": false,
            "correo": false,
            "contrasenia": false,
            "apellidos": false,
            "nombres": false,
            "curso": false,
            "codigo": false,
            "sexo": false,
            "fecha_nacimiento": false,
            "nombre_acudiente": false,
            "telefono_acudiente": false,
            "foto": false,
            "tipo_usuario": false,
        };

        let fail = false;
        let email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let number_regex = /[0-9]/;

        if (user.nombres.trim() == '' || number_regex.exec(user.nombres) != null || user.nombres.length > 50) {
            errors.nombres = true;
            fail = true;
        }
        if (user.apellidos.trim() == '' || number_regex.exec(user.apellidos) != null || user.apellidos.length > 50) {
            errors.apellidos = true;
            fail = true;
        }

        if (isNaN(user.codigo) || codesForStudents.includes(user.codigo)) {
            errors.codigo = true;
            fail = true;
        }
        if (isNaN(user.curso) || courses.length < user.curso) {
            errors.curso = true;
            fail = true;
        }

        if (!Date.parse(user.fecha_nacimiento)) {
            errors.fecha_nacimiento = true;
        }

        if (user.sexo != '0' && user.sexo != '1') {
            errors.sexo = true;
            fail = true;
        }

        if (user.nombre_acudiente.trim() == '' || number_regex.exec(user.nombre_acudiente) != null || user.nombre_acudiente.length > 50) {
            errors.nombre_acudiente = true;
            fail = true;
        }

        if (isNaN(user.telefono_acudiente) || user.telefono_acudiente.length != 10) {
            errors.telefono_acudiente = true;
            fail = true;
        }

        if (!email_regex.test(user.correo) || user.correo.length > 50) {
            errors.correo = true;
            fail = true;
        }

        if (fail == false) return null;
        return errors;
    };

    const defaulFile = { "name": "Seleccione una imagen", "direction": defaultImage }
    const [file, setFile] = useState(defaulFile)

    const { form, errors, viewAlert, handleChange, toggleAlert, handleSubmit } = useForm(user, validar, initialErrors);

    const updateProfile = async () => {
        
        try {
            const response = await fetch(file.direction);
            const blob = await response.blob(); 
            console.log(blob)
            const formData = new FormData();
            formData.append('archivo', blob, 'nombre_archivo.png');
        
            
        
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
                                Nombres:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.nombres ? "is-invalid" : ""}`} name='nombres' value={form.nombres} onChange={handleChange} maxlength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Apellidos:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.apellidos ? "is-invalid" : ""}`} name='apellidos' value={form.apellidos} onChange={handleChange} maxlength="50" />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Código:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="number" className={`form-control ${errors.codigo ? "is-invalid" : ""}`} name='codigo' value={form.codigo} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite valores númericos, los códigos deben no encontrarse en uso</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Curso:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <Form.Select aria-label="Seleccione un curso" className={`form-control ${errors.curso ? "is-invalid" : ""}`} name='curso' value={form.curso} onChange={handleChange}>
                                    <option>Seleccione un curso</option>
                                    {courses.map((c, i) => {
                                        return <option value={i + 1}>{c}</option>
                                    })}
                                </Form.Select>
                                <div className="invalid-feedback">Este campo solo cursos válidos</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Fecha de Nacimiento:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="date" className={`form-control ${errors.fecha_nacimiento ? "is-invalid" : ""}`} value={form.fecha_nacimiento} onChange={handleChange} name='fecha_nacimiento' />
                                <div className="invalid-feedback">Solo se admiten fechas válidas.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Sexo:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <select className={`form-control ${errors.sexo ? "is-invalid" : ""}`} name='sexo' value={form.sexo} onChange={handleChange} defaultValue={"0"}>
                                    <option value={"0"}>
                                        Masculino
                                    </option>
                                    <option value={"1"}>
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
                                <input type="number" className={`form-control ${errors.telefono_acudiente ? "is-invalid" : ""}`} name='telefono_acudiente' value={form.telefono_acudiente} onChange={handleChange} />
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
                        <div className='row' style={{ paddingBottom: "3%" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Foto:
                            </div>
                            <div className='col-sm-8 col-6' id='div_img'>
                                <ImageContainer setFile={setFile} file={file} defaulFile={defaulFile}></ImageContainer>
                            </div>
                        </div>

                    </SInfo>
                </div>
                <div id='btns'>
                    <button type='submit' className='btn rounded-3'><h6 className='text-white'>Guardar Cambios</h6></button>
                    <Link to={"/Estudiante/Perfil"} style={{ textDecoration: 'none' }}><button className='btn rounded-3'><h6 className='text-white'>Cancelar</h6></button></Link>
                </div>
            </form>
            <Modal isOpen={viewAlert} centered={true}>
                <ModalBody className='d-flex justify-content-center align-content-center p-4'>
                    <h6 id="texto" className='m-0 p-0'>¿Está seguro de guardar los cambios?</h6>
                </ModalBody>

                <ModalFooter className='d-flex justify-content-center'>
                    <Button color="primary" style={{ marginRight: "40px" }} onClick={updateProfile} >Aceptar</Button>
                    <Button color="secondary" style={{ marginLeft: "40px" }} onClick={toggleAlert}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}


//Componente de carga de imagen
const ImageContainer = (props) => {

    const fileInput = useRef(null)

    const handleButton = (e) => {
        e.preventDefault()
        fileInput.current.click()
    }

    const handleInput = () => {
        if (fileInput.current.files[0] != null) {
            const newFile = { name: fileInput.current.files[0].name, direction: URL.createObjectURL(fileInput.current.files[0]) }
            props.setFile(newFile)
        }
    }

    const removeImage = () => {
        props.setFile(props.defaulFile);
        fileInput.current.value = "";
    }

    return (
        <SImageContainer>
            <div className='col-12 col-sm-5 d-flex align-content-center align-items-center justify-content-center'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={removeImage} style={{ cursor: "pointer" }} width="40" height="40" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                </div>
                <div>
                    <img src={`${props.file.direction}`} className='border border-2 border-dark rounded-circle img-fluid'></img>
                </div>
            </div>
            <div className='col-12 col-sm-7 d-flex justify-content-center' id='div_02'>
                <input type='file' className='d-none' onChange={handleInput} ref={fileInput}></input>
                <button className='btn text-white rounded-3' onClick={handleButton} style={{ backgroundColor: "#1C3B57" }}>
                    <div className='d-flex justify-content-between text-center align-content-center align-items-center'>
                        <h6>{props.file.name}</h6>
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
    #btns{
        display: flex;
        margin-top: 0px;
        margin-bottom: 20px;
        justify-content: center;
    }
    #btns button{
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
    #btns h6{
        
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