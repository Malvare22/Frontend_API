import styled from 'styled-components';
import image from './../../assets/images/Pencil.png'
import image2 from './../../assets/images/Users/01.png'
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

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
        const state = await validar(form);
        //Si hubo error:
        if (state != null) {
            setErrors(state);
        }
        else {
            const tmp = {
                nombres: false,
                apellidos: false,
                fecha_nacimiento: false,
                sexo: false,
                nombre_acudiente: false,
                telefono_acudiente: false,
                correo: false,
            };
            setErrors(tmp);
            toggleAlert();
            console.log("Todo bien");
        }
    };
    //No usado de momento
    const sendInfo = (state) => {

        const type = state.tipo_usuario
        switch (type) {
            case 'administrativo':
                break;
            case 'lider':
                break;
            case 'docente':
                break;
            case 'estudiante':
                break;
        }
        console.log("Se inició " + state);
    }

    return { form, errors, viewAlert, handleChange, toggleAlert, handleSubmit };
};

export default function EditarPerfilEstudiante() {

    return (
        <>
            <Content></Content>
        </>
    );
};

const Content = () => {

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

const Head = () => {
    return (
        <div className='d-flex justify-content-center align-content-center align-items-center rounded-3' style={{ backgroundColor: "#1C3B57" }}>
            <img className='rounded-circle' src={image} style={{ height: "50px" }}></img>
            <h5 className='text-white fw-bold'>Editar Perfil</h5>
        </div>
    );
}


const modalStyles = {
    
    
}

const Information = () => {

    const user = {
        id: "1",
        correo: "example@student.com",
        contrasenia: "123",
        apellidos: "Ramirez",
        nombres: "Jorge",
        curso: "Séptimo",
        sexo: "0",
        fecha_nacimiento: '2001-04-20',
        nombre_acudiente: "Luis Sanchez",
        telefono_acudiente: "305484564",
        foto: "/images/01.png",
        tipo_usuario: "estudiante",
        estado: "1"
    };

    const initialErrors = {
        nombres: false,
        apellidos: false,
        fecha_nacimiento: false,
        sexo: false,
        nombre_acudiente: false,
        telefono_acudiente: false,
        correo: false,
    };


    const validar = (user) => {
        let errors = {
            nombres: false,
            apellidos: false,
            fecha_nacimiento: false,
            sexo: false,
            nombre_acudiente: false,
            telefono_acudiente: false,
            correo: false,
        };
        let fail = false;
        const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const number_regex = /[0-9]/;
        if (user.nombres.trim() == '' || number_regex.exec(user.nombres) != null || user.nombres.length > 50) {
            errors.nombres = true;
            fail = true;
        }
        if (user.apellidos.trim() == '' || number_regex.exec(user.apellidos) != null || user.apellidos.length > 50) {
            errors.apellidos = true;
            fail = true;
        }
        if (!(new Date(user.fecha_nacimiento))|| ((new Date())).getTime()<((new Date(user.fecha_nacimiento)).getTime())) {
            errors.fecha_nacimiento = true;
            fail = true;
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
    const updateProfile= ()=>{
        //Aquí se hace la actualización de la info
        console.log("Info enviada")
    }
    const { form, errors, viewAlert, handleChange, toggleAlert, handleSubmit } = useForm(user, validar, initialErrors);
    
    const getPresentDate =()=>{
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
                                <input type="text" className={`form-control ${errors.nombres ? "is-invalid" : ""}`} name='nombres' value={form.nombres} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Apellidos:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.apellidos ? "is-invalid" : ""}`} name='apellidos' value={form.apellidos} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 carácteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Curso:
                            </div>
                            <div className='col-sm-8 col-6'>
                                {form.curso}
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
                                <input type="text" className={`form-control ${errors.nombre_acudiente ? "is-invalid" : ""}`} name='nombre_acudiente' value={form.nombre_acudiente} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite letras y una longitud máxima de 50 caracteres.</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Teléfono del acudiente:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="number" className={`form-control ${errors.telefono_acudiente ? "is-invalid" : ""}`} name='telefono_acudiente' value={form.telefono_acudiente} onChange={handleChange} />
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
                        <div className='row' style={{ paddingBottom: "3%" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Foto:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <img src={form.foto} className='border border-2 border-dark rounded-circle ' style={{ height: "80px" }}></img>
                            </div>
                        </div>

                    </SInfo>
                </div>
                <div id='btns'>
                    <button type='submit' className='btn rounded-3'><h6 className='text-white'>Guardar Cambios</h6></button>
                    <Link to={"/Estudiante/Perfil"} style={{ textDecoration: 'none' }}><button className='btn rounded-3'><h6 className='text-white'>Cancelar</h6></button></Link>
                </div>
            </form>
            <Modal isOpen={viewAlert} centered={true} style={modalStyles}>
                <ModalBody className='d-flex justify-content-center align-content-center p-4'>
                        <h6 id="texto" className='m-0 p-0'>¿Está seguro de guardar los cambios?</h6>

                </ModalBody>
                <ModalFooter className='d-flex justify-content-center'>
                    <Button color="primary" style={{marginRight:"40px"}} onClick={updateProfile} >Aceptar</Button>
                    <Button color="secondary" style={{marginLeft:"40px"}} onClick={toggleAlert}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

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