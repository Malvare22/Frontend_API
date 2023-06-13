import styled from 'styled-components';
import image from './../../assets/images/Users/01.png'
import { Link, useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import { useState } from 'react';
import LiderEditarPerfil from '../useGeneral/Editar_Perfil_Lider';
import LiderPerfil from '../useGeneral/Perfil_Lider';
import { importLider } from '../../context/functions_general';
import { PerfilLider } from '../useGeneral/Profiles';

export default function AdministrativoVerPerfilLider() {
    return (<VistaGeneral></VistaGeneral>);
}

const VistaGeneral = () => {
    const [usuario, setUsuario] = useState();
    const [modalDisable, setModalDisable] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const navigate = useNavigate();

    const selectLider = async () => {
        try {
            const config = {
                headers: {
                    "X-Softue-JWT": localStorage.getItem('token_access')
                }
            }
            let data = (await axios.get('http://144.22.32.132:8080/coordinador/listar/coordinador', config).then(response => response.data))

            if (data.length == 0) {
                setModalAdd(true)
            }
            else {
                let foto;
                let archivo;
                try {
                    data = (importLider(data))[0]
                    foto = await axios.get('http://144.22.32.132:8080/coordinador/foto/' + data.codigo, {
                        headers: {
                            "X-Softue-JWT": localStorage.getItem('token_access')
                        },
                        responseType: 'arraybuffer' // asegúrate de especificar el tipo de respuesta como arraybuffer
                    }).then(response => {
                        const base64Image = btoa(
                            new Uint8Array(response.data)
                                .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                        const imageUrl = `data:${response.headers['content-type']};base64,${base64Image}`;

                        return imageUrl;
                    });
                    const blob = await fetch(foto).then(response => response.blob());
                    archivo = new File([blob], "IMG.png", { type: "image/png" });
                }
                catch {
                    foto = ''
                    archivo = ''
                }
                data = { ...data, contrasenia: "-", foto: { archivo: archivo, direccion: foto } }

                setUsuario(data)
            }
        }
        catch (error) {
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

    useEffect(() => {

        selectLider()

    }, []);

    async function disableLider() {
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        await axios.get('http://144.22.32.132:8080/coordinador/deshabilitarUsuario/' + usuario.correo, config)
    }

    const toggleAddAlert = () => {
        setModalAdd(true);
    };
    const toggleDisableAlert = () => {
        setModalDisable(!modalDisable);
    };

    if (modalAdd) {
        return <Modal isOpen={modalAdd} onRequestClose={toggleAddAlert} style={modalStyles}>
            <ModalBody>
                <FormGroup>
                    <Label id="texto">No hay un lider de unidad de emprendimiento asignado, ¿desea asignar uno?</Label>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => { navigate('registrar') }}>Agregar</Button>
                <Button color="danger" onClick={() => { navigate(-1) }}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    }
    else return (
        <div className='flex-grow-1'>

            {usuario && <PerfilLider usuario={usuario} editable={false} />}
            <div className='d-flex justify-content-center' style={{ marginBottom: "2rem" }}>
                <Boton toggleDisableAlert={toggleDisableAlert} usuario={usuario} navigate={navigate}></Boton>
            </div>
            <Modal isOpen={modalDisable} onRequestClose={toggleDisableAlert} style={modalStyles}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Estás seguro de que quieres deshabilitar al líder de la unidad de emprendimiento?</Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={async () => { await disableLider(); navigate(0); }}>Confirmar</Button>
                    <Button color="primary" onClick={toggleDisableAlert}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>
    );
}

const modalStyles = {
    transform: 'translate(0%, 120%)'
}

const Boton = (props) => {
    return (
        <Sdiv04 className="row align-items-center">
            <div className="col">
                <button className='border rounded-4' style={{ backgroundColor: "#1C3B57" }} onClick={() => { localStorage.setItem('LIDER_EMAIL', props.usuario.correo); props.navigate("editar") }}>
                    <h5 className='fw-bold text-white text-center'>
                        Editar Información del liderUE
                    </h5>
                </button>
            </div>
            <div className="col">
                <button className='border rounded-4' style={{ backgroundColor: "#1C3B57" }} onClick={props.toggleDisableAlert}>
                    <h5 className='fw-bold text-white text-center'>
                        Deshabilitar liderUE
                    </h5>
                </button>
            </div>
        </Sdiv04>
    );
};
const Sdiv04 = styled.div`
    h5{
        margin: 20px;
    }
    @media screen and (max-width: 576px){
        h5{
            font-size: small;
            margin: 20px;
        }
    }
`;

const Sdiv01 = styled.div.attrs({
    className: 'd-inline-flex',
})`
    background-color: #1C3B57;
    border-radius: 20px;
    align-items: center;
    align-content: center;
    width: auto;
    #principal{
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        img{
            margin-left: 20px;
            width: 80px;
        }
        div{
            font-size: x-large;
            margin-left: 20px;
            margin-right: 20px;
        }
        p{
            margin: 0;
            padding: 0;
            font-weight: bold;
        }
    }
    @media screen and (max-width: 576px){
        p{
            font-size: medium;
        }
    }
`;

const Sdiv02 = styled.div`
    background-color: #CECECE;
    >div{
        padding: 4%;
        padding-top: 8%;
        padding-bottom: 0%;
    }
    #principal{
        padding-top: 3%;
        padding-bottom: 1%;
        .row{
            padding-bottom: 2%;
        }
    }
    
    @media screen and (max-width: 576px){
        .row > div{
            font-size: x-small;
        }
        .row{
            margin-bottom: 10px;
        }
        h3{
            margin-top: 40px;
        }
    }
    
`;

const Sdiv03 = styled.div`
    position: absolute;
    top: -50px;
    left: -30px;
`;





