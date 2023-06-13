import styled from 'styled-components';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, Modal, FormGroup, ModalBody, ModalFooter, Label } from 'reactstrap';
import axios from "axios";
import ModalAceptar from '../useGeneral/ModalAceptar';


const useAlert = () => {
    const [state, setState] = useState(false);
    const [valor, setValor] = useState({});

    const toggleAlert = (v) => {
        setState(!state);
    }

    const setValue = (v) =>{
        setValor(v);
    }
    return { state, toggleAlert, valor, setValue }
}

const Information = () => {
    const { state, toggleAlert, valor, setValue } = useAlert();
    const [confirmacionView, setConfirmacionView] = useState(false);
    const [errorView, setErrorView] = useState(false);

    const toggleConfirmacion = () => {
        setConfirmacionView(!confirmacionView);
    }

    const toggleError = () => {
        setErrorView(!errorView);
    }

    const agregar = async (nombre) => {
        try {
            toggleAlert(null)
            var formData = new FormData();
            formData.append('nombre', nombre.valor);
            
            const config = {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") },
            };
            console.log(nombre.valor)

            await axios.post("http://144.22.32.132:8080/areaConocimiento", formData, config)
            toggleConfirmacion(null)

        }
        catch (error){
            console.error(error);
            toggleError();


        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        toggleAlert(null);
      };
    return(
    <div>
        <form onSubmit={handleSubmit} className="container rounded-3" style={{ backgroundColor: "#ECECEC" }}>
            <div >
                <div className='row container' style={{ paddingTop: "80px" }}>
                    <div className='col-sm-4 col-6 fw-bold  d-flex justify-content-center align-items-center '>
                        Nombre del area:
                    </div>
                    <div className='col-sm-8 col-6 p-1'>
                        <input onChange={(e)=>{setValue(e.target.value)}} required type="text" className='form-control' name='nombre' maxLength="50" />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-3 p-2">
                <button type='submit' className="btn my-2 rounded-4" style={{ background: '#1C3B57', color: 'white' }}>
                    <b>Guardar Area</b>
                </button>
            </div>
            <Modal centered isOpen={state}>
                <ModalBody>
                    <FormGroup>
                        <Label id="texto">¿Quieres agregar el area de {valor}?</Label>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={()=>{agregar({valor})}} color="primary">Agregar</Button>
                    <Button onClick={()=>{toggleAlert()}} color="danger">Cancelar</Button>
                </ModalFooter>
            </Modal>
            <ModalAceptar viewAlert={confirmacionView} msg="Se agrego la nueva area de conocimiento" toggleAlert={toggleConfirmacion}></ModalAceptar>
            <ModalAceptar viewAlert={errorView} msg="Esa area de conocimiento ya existe" toggleAlert={toggleError}></ModalAceptar>
        </form>
        
    </div>

    );
}

export default function RegistrarArea() {
    return (
        <SContent>
            <div className='d-flex justify-content-center' id='d_head'>
                <div className='' id='head'>
                    <Head></Head>
                </div>
                <div id="info">
                    <Information>

                    </Information>
                </div>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <h5 className='text-white fw-bold'>Agregar Area</h5>
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





