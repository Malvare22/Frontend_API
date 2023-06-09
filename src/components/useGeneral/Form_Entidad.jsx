import { useState } from "react";
import ImageContainer from "./ImagePreview";
import ModalConfirmation from "./ModalConfirmation";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    return { form, setForm, errors, viewAlert, handleChange, toggleAlert, handleSubmit };
};

const plantilla = {
    "nombre": "",
    "telefono": "",
    "sitioWeb": "",
    "correo": "",
    "descripcion": "",
    "foto": { "archivo": "", "direccion": "" }
}

const validar = (entidad) => {
    let errors = {
        "nombre": false,
        "telefono": false,
        "sitioWeb": false,
        "correo": false,
        "descripcion": false
    }

    let fail = false;
    const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const number_regex = /[0-9]/;
    const caracteresEspeciales = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    if (entidad.nombre.trim() == '' || caracteresEspeciales.exec(entidad.nombre) == null || entidad.nombre.length > 50) {
        errors.nombre = true;
        fail = true;
    }
    if (entidad.apellido.trim() == '' || caracteresEspeciales.exec(entidad.apellido) == null || entidad.apellido.length > 50) {
        errors.apellido = true;
        fail = true;
    }

    if (isNaN(entidad.telefono) || entidad.telefono.length != 10) {
        errors.telefono = true;
        fail = true;
    }

    if (!email_regex.test(entidad.correo) || entidad.correo.length > 50) {
        errors.correo = true;
        fail = true;
    }
    if (fail == false) return null;
    return errors;
};

const FormEntidad = (props) => {

    let entidad = props.type == 'registrar' ? plantilla : props.entidad;

    let initialErrors = {
        "nombre": false,
        "telefono": false,
        "sitioWeb": false,
        "correo": false,
        "descripcion": false
    }

    const updateProfile=()=>{

    }

    const { form, setForm, errors, viewAlert, viewAlertPassword, handleChange, toggleAlert, toggleAlertPassword, handleSubmit } = useForm(entidad, validar, initialErrors);

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
                                Teléfono:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="number" className={`form-control ${errors.telefono ? "is-invalid" : ""}`} name='telefono' value={form.telefono} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite números teléfonicos válidos</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Sitio Web:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.sitioWeb ? "is-invalid" : ""}`} name='sitioWeb' value={form.sitioWeb} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite sitios web con sintaxis válidas.</div>
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
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Descripción:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className={`form-control ${errors.descripcion ? "is-invalid" : ""}`} name='descripcion' value={form.descripcion} onChange={handleChange} />
                                <div className="invalid-feedback">Este campo solo admite correos electrónicos válidos.</div>
                            </div>
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
                    <Link to={-1} style={{ textDecoration: 'none' }}><button className='btn rounded-3'><h6 className='text-white'>Cancelar</h6></button></Link>
                </div>
            </form>

            <ModalConfirmation viewAlert={viewAlert} updateProfile={updateProfile} toggleAlert={toggleAlert}></ModalConfirmation>

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

export default FormEntidad;