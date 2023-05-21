import styled from 'styled-components';
import image from './../../assets/images/Pencil.png'

export default function EditarPerfilEstudiante() {

    return (
        <>
            <Content></Content>
        </>
    );
};

const Head = () => {
    return (
        <div className='d-inline-flex align-content-center align-items-center rounded-3' style={{ backgroundColor: "#1C3B57", width: "400px" }}>
            <img className='rounded-circle m-3 me-4 ms-3' src={image} style={{ height: "50px" }}></img>
            <h5 className='text-white fw-bold m-3 ms-0'>Editar Perfil</h5>
        </div>
    );
}

const Content = () => {
    const SContent = styled.div`
        .row{
            margin: 3%;
        };
    `;

    return (
        <div className='flex-grow-1' style={{ backgroundColor: "#ECECEC" }}>
            <SContent>
            <div className='row'>
                <div className='col-sm-4 col-6 fw-bold'>
                    Nombres:
                </div>
                <div className='col-sm-8 col-6'>
                    Luis
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-4 col-6 fw-bold'>
                    Apellidos:
                </div>
                <div className='col-sm-8 col-6'>
                    Corozo Ramirez
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-4 col-6 fw-bold'>
                    Código:
                </div>
                <div className='col-sm-8 col-6'>
                    Luis
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-4 col-6 fw-bold'>
                    Curso:
                </div>
                <div className='col-sm-8 col-6'>
                    Luis
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-4 col-6 fw-bold'>
                    Fecha de Nacimiento:
                </div>
                <div className='col-sm-8 col-6'>
                    Luis
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-4 col-6 fw-bold'>
                    Sexo:
                </div>
                <div className='col-sm-8 col-6'>
                    Luis
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-4 col-6 fw-bold'>
                    Nombre del acudiente:
                </div>
                <div className='col-sm-8 col-6'>
                    Luis
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-4 col-6 fw-bold'>
                    Teléfono del acudiente:
                </div>
                <div className='col-sm-8 col-6'>
                    Luis
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-4 col-6 fw-bold'>
                    Correo eléctronico:
                </div>
                <div className='col-sm-8 col-6'>
                    Luis
                </div>
            </div>
            </SContent>
        </div>
    );
}