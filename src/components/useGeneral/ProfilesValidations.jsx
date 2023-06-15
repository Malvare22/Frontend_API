import { useState } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"

export function docente(props){

}

export function validarContrasenia(contrasenia){

    let result = !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+]).{6,}$/.test(contrasenia)
     return !result
}

export default function WindowForPassword(props){
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
        if (inputs.first == inputs.second && validarContrasenia(inputs.first)) {
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
                La contraseña debe cumplir con los siguientes requisitos mínimos: almenos 6 carácteres, una letra en mayúscula, un número y un caracter especial (Ambos campos deben coincidir).
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










