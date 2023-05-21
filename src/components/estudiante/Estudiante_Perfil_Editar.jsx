import styled from 'styled-components';
import image from './../../assets/images/Pencil.png'
import image2 from './../../assets/images/Users/01.png'
import { useState } from 'react';
export default function EditarPerfilEstudiante() {

    return (
        <>
            <Content></Content>
        </>
    );
};


const useForm = (initialData, validar) => {

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
        if (state === undefined) setFail(true);
        else {
            sendInfo(state)
        }
    };

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

    return { form, fail, handleChange, handleSubmit };
};

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
        #btns > button{
            background-color:#1C3B57;
            margin-left: 40px;
            margin-right:40px;
            width: 200px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #btns > button > h6{
            font-weight: bold;
            margin: 0px;
        }
    `;

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

const Information = () => {

    const user = {
        nombres: 'Juanes Anderson',
        apellidos: 'Corozo Curacao',
        codigo: '6545',
        curso: 'Septimo',
        fecha_nacimiento: '22/04/2001',
        sexo: false,
        nombre_acudiente: 'Royer Olivia',
        telefono_acudiente: '564556',
        correo: 'sdfdsfg@asd.com',
        foto: './../../assets/images/Users/01.png'
    };


    const validar = () => {

    };
    const { form, fail, handleChange, handleSubmit } = useForm(user, validar);
    return (
        <div>
            <div className='' style={{ backgroundColor: "#ECECEC" }}>
                <SInfo>
                    <form onSubmit={handleSubmit}>
                        <div className='row' style={{ paddingTop: "60px" }}>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Nombres:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className="form-control" name='nombres' value={form.nombres} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Apellidos:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className="form-control" name='apellidos' value={form.apellidos} onChange={handleChange} />
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
                                <input type="date" className="form-control" name='fecha_nacimiento' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Sexo:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <select className="form-select">
                                    <option>
                                        Masculino
                                    </option>
                                    <option>
                                        Femenino
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Nombre del acudiente:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className="form-control" name='nombre_acudiente' value={form.nombre_acudiente} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Teléfono del acudiente:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="number" className="form-control" name='telefono_acudiente' value={form.telefono_acudiente} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 col-6 fw-bold'>
                                Correo eléctronico:
                            </div>
                            <div className='col-sm-8 col-6'>
                                <input type="text" className="form-control" name='correo' value={form.correo} onChange={handleChange} />
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
                    </form>
                </SInfo>
            </div>
            <div id='btns'>
                <button className='btn rounded-3'><h6 className='text-white'>Guardar Cambios</h6></button>
                <button className='btn rounded-3'><h6 className='text-white '>Cancelar</h6></button>
            </div>
        </div>
    );
}