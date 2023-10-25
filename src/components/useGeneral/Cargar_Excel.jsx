import { useEffect, useRef, useState } from "react"
import ModalConfirmation from './ModalConfirmation'
import axios from "axios"

export default function BtnExcel(props) {

    const fileInput = useRef(null)

    const [excel, setExcel] = useState()

    useEffect(
        ()=>{
            if (excel) toggleAlert()
        }, [excel]
    )


    const loadExcel = async () => {
        let formdata = new FormData()
        formdata.append('file', excel)
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        try{
            if(props.type=='Estudiante') {
                await axios.post('http://150.136.248.85:8080/register/estudiante/archivo', formdata, config)
                toggleAlert()
            }
            if(props.type=='Docente') {
                await axios.post('http://150.136.248.85:8080/register/docente/archivo', formdata, config)
                toggleAlert()
            }
        }
        catch (error) {
            let msg = '';
            if (error.response) {
                msg = "Error " + error.response.status + ": " + error.response.data.errorMessage;
            } else if (error.request) {
                msg = 'Error: No se recibió respuesta de la base de datos';
            } else {
                msg = "Error al realizar la solicitud: " + error.message;
            }
            alert(msg)

        }
    }


    const handleButton = (e) => {
        e.preventDefault()
        fileInput.current.click()
        
    }

    const handleInput = () => {
        if(fileInput.current.files[0]){
            setExcel(fileInput.current.files[0])
        }
    }

    const [viewAlert, setViewAlert] = useState(false)

    const toggleAlert = () => {
        setViewAlert(!viewAlert)
    }

    return (
        <>
            <ModalConfirmation toggleAlert={toggleAlert} viewAlert={viewAlert} updateProfile={loadExcel} texto={"¿Estas seguro de que deseas cargar el listado de docentes?"}/>
            <input type='file' accept=".xlsx" className='d-none' ref={fileInput} onChange={handleInput}></input>
            <button type="button" className="btn rounded-3" onClick={handleButton} style={{ background: "#1C3B57", color: "#FFFFFF" }} >
                <div className="col-auto d-flex justify-content-center align-content-center aling-items-center">
                    <h6 className='m-0 p-0'>Importar Excel</h6>
                    <div className="d-flex align-content-center align-items-center ms-2">
                        <svg className="m-0 p-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
                        </svg>
                    </div>
                </div>
            </button>
        </>
    )
}


