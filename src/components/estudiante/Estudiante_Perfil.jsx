
import styled from 'styled-components';
import image from './../../assets/images/Users/01.png'
import { Link } from 'react-router-dom';
export default function PerfilEstudiante() {
    return (<VistaGeneral></VistaGeneral>);
}

const usuario = {
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
    foto: "./images/01.png",
    tipo_usuario: "estudiante",
    estado: "1"
};

const Profile = () => {
    return (
        <Sdiv01>
            <div id='principal' className=''>
                <img className='rounded-circle' src={image}></img>
                <div className='d-flex align-content-center align-items-center'>
                    <div>
                        <p className='text-white'>{usuario.nombres}</p>
                        <p className='text-white'>{usuario.apellidos}</p>
                    </div>
                </div>
            </div>
        </Sdiv01>
    );
}

const Information = () => {
    const edad=()=>{
        const today = new Date()
        const birth = Date.parse(usuario.fecha_nacimiento);
        const ans = new Date(today-birth)
        return (ans.getUTCFullYear()-1970)
    }
    return (
        <Sdiv02>
            <div>
                <h3 className='fw-bold'>Información</h3>
                <hr className='border-3 border-black m-0'></hr>
            </div>
            <div id='principal'>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Nombre:
                    </div>
                    <div className='col-sm-4 col-6'>
                       {usuario.nombres}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Apellido:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {usuario.apellidos}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Curso:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {usuario.curso}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Edad:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {edad()}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Sexo:
                    </div>
                    <div className='col-sm-4 col-6'>
                    {usuario.sexo=='0'? "Masculino":"Femenino"}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Correo eléctronico:
                    </div>
                    <div className='col-sm-4 col-6'>
                    {usuario.correo}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Nombre del acudiente:
                    </div>
                    <div className='col-sm-4 col-6'>
                    {usuario.nombre_acudiente}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 col-6 fw-bold'>
                        Teléfono del acudiente:
                    </div>
                    <div className='col-sm-4 col-6'>
                        {usuario.telefono_acudiente}
                    </div>
                </div>
            </div>
        </Sdiv02>
    );
}
//
const VistaGeneral = () => {
    return (
        <div className='flex-grow-1'>
            <h2 className='m-4 fw-bold'>Información de Usuario</h2>
            <div className='justify-content-center' style={{ marginTop: "5rem", marginBottom: "2rem" }}>
                <div className='d-flex justify-content-center'>
                    <div className='w-75 position-relative'>
                        <Information></Information>
                        <Sdiv03><Profile></Profile></Sdiv03>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{ marginBottom: "2rem" }}>
                <Button></Button>
            </div>
        </div>
    );
}

const Button = () => {
    return (
        <Sdiv04><Link to={"/Estudiante/Perfil/Editar"}><button className='border rounded-4' style={{ backgroundColor: "#1C3B57" }}>
            <h5 className='fw-bold text-white text-center'>
                Editar Información de Estudiante
            </h5>
        </button></Link></Sdiv04>
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
    .row{
        display: flex;
        align-items: center;
    }
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