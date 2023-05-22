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
        <div className='container-fluid'>
            <SContent>
                <div className='d-flex justify-content-center' id='d_head'>
                    <div className='' id='head'>
                        <Head></Head>
                    </div>
                    <div className='' id="info"> <Information></Information></div>
                </div>
            </SContent>
        </div>
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
    transform: 'translate(0%, 0%)'
}

const Information = () => {

    const user = {
        nombres: 'Juanes Anderson',
        apellidos: 'Corozo Curacao',
        codigo: '6545',
        curso: 'Septimo',
        fecha_nacimiento: '2001-04-20',
        sexo: "0",
        nombre_acudiente: 'Royer Olivia',
        telefono_acudiente: '564556',
        correo: 'sdfdsfg@asd.com',
        foto: './../../assets/images/Users/01.png'
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
        const number_regex = /[0-9]/g;
        if (number_regex.test(user.nombre_acudiente) || user.nombre_acudiente.length > 50) {
            errors.nombre_acudiente = true;
            fail = true;
        }
        if (number_regex.test(user.apellidos) || user.apellidos.length > 50) {
            errors.apellidos = true;
            fail = true;
        }
        if (number_regex.test(user.nombres) || user.nombres.length > 50) {
            errors.nombres = true;
            fail = true;
        }
        if (!Date.parse(user.fecha_nacimiento)) { errors.fecha_nacimiento = true; }
        if (user.sexo != '0' && user.sexo != '1') {
            errors.sexo = true;
            fail = true;
        }

        if (isNaN(user.telefono_acudiente) || user.telefono_acudiente.length > 10) {
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

    const { form, errors, viewAlert, handleChange, toggleAlert, handleSubmit } = useForm(user, validar, initialErrors);
    return (
        <div className='' style={{paddingBottom:"110px"}}>
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
                                Código:
                            </div>
                            <div className='col-sm-8 col-6'>
                                {form.codigo}
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
                                <input type="date" className={`form-control ${errors.fecha_nacimiento ? "is-invalid" : ""}`} value={form.fecha_nacimiento} onChange={handleChange} name='fecha_nacimiento' />
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
            <Modal isOpen={viewAlert} style={modalStyles}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">Hollaaa</Label>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger">Eliminar</Button>
                    <Button color="primary" onClick={toggleAlert}>Cancelar</Button>
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
            width: 100%;
    
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