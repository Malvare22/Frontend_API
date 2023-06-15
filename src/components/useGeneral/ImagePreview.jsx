import { useRef } from "react"
import styled from "styled-components"
import default_profile from './../../assets/images/Users/default_profile.png'

//Componente de carga de imagen
export default function ImageContainer(props){

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
                props.setForm({ ...props.form, ["foto"]: { "archivo": fileInput.current.files[0], "direccion": reader.result } })
            }
            reader.readAsDataURL(fileInput.current.files[0])

        };
    }

    const removeImage = () => {
        props.setForm({ ...props.form, ["foto"]: { "archivo": "", "direccion": "" } })
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
                        <h6>Seleccionar archivo</h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                        </svg>
                    </div>
                </button>


            </div>
        </SImageContainer>
    );
}

export function ImagePreviewNoEditable(props){
    return (
        <SImageContainer>
            <div className='col-12 col-sm-5 d-flex align-content-center align-items-center justify-content-center'>
                <div>
                    <img className='border border-2 border-dark rounded-circle img-fluid' src={`${(props.form).foto.direccion == '' ? default_profile : (props.form).foto.direccion}`}></img>
                </div>
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










