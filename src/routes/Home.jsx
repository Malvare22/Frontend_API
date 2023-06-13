import tictac_logo from '../assets/images/Logo_TicToc.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css'
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Footer from '../components/Footer.jsx';
import styled from 'styled-components';
import ImagenUE from '../assets/images/Home/ImageUE.png'
import ImagenMision from '../assets/images/Home/ImagenMision.png'
import ImagenVision from '../assets/images/Home/ImagenVision.png'
import ImagenOrganigrama from '../assets/images/Home/Organigrama.png'
import ImagenFlujograma1 from '../assets/images/Home/ImagenFlujograma1.jpg'
import ImagenFlujograma2 from '../assets/images/Home/ImagenFlujograma2.jpg'


function Menu() {
  return (
    <div>
      <Navbar expand="lg" id='navbar'>
        <Navbar.Brand href="#home"><img src={tictac_logo} height={"90px"}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
        <Navbar.Collapse className='' id="basic-navbar-nav">
          <Nav className="h-100 ms-auto" id='nav_elements'>
            <Nav.Link as={Link} className=''>INFORMACIÓN</Nav.Link>
            <Nav.Link as={Link}>EXPERIENCIAS EXITOSAS</Nav.Link>
            <Nav.Link as={Link}>ESTADÍSTICAS</Nav.Link>
            <Nav.Link as={Link} to={"/login"}>INGRESAR</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <SHome>
        <div className='container-fluid'>
          <div className='container my-5' style={{ width: "80%" }}>
            <UnidadEmprendimiento></UnidadEmprendimiento>
            <div id='columnas' className='row my-4 d-flex justify-content-center'>
              <Mision></Mision>
              <Vision></Vision>
            </div>
            <Organigrama></Organigrama>
            <Flujograma></Flujograma>
            <b><p id='cita'>
              Sacado de la tesis de grado presentada por Rolon Estupiñan, M. y Benavides Escalante, C. A. (2021).
            </p></b>
          </div>
        </div>
      </SHome>
    </div>
  );
}


export default Menu;

const UnidadEmprendimiento = () => {
  return (
    <div className='row'>
      <div className='col'>
        <div className='row'>
          <p id='tituloG' style={{ color: "#1C3B57" }}>¿Qué es una unidad de emprendimiento?</p>
        </div>
        <div className='row'>
          <p id='parrafoG'>
            Una Unidad de Emprendimiento (UE) es un espacio de atención en donde se capacita y asesora a los emprendedores, en todo lo relacionado a procesos de formulación de ideas de negocio, creación y consolidación de unidades productivas, mediante la generación de una cultura emprendedora con innovación y desarrollo tecnológico.
          </p>
        </div>
      </div>
      <div className='col-12 col-lg-5 d-flex justify-content-center align-items-center'>
        <img src={ImagenUE} className='img-fluid m-auto' width="80%" />
      </div>
    </div>
  )
}

const Mision = () => {
  return (
    <div className='col-12 col-lg-5 mt-4'>
      <div className='container p-5 rounded-4' style={{ background: "#1C3B57", height: "100%" }}>
        <div className='row'>
          <p id='tituloG' className='text-center' style={{ color: "white" }}>Misión</p>
        </div>
        <div className='row'>
          <img src={ImagenMision} className='img-fluid mt-2' width="70%" />
        </div>
        <div className='row'>
          <p id='parrafoG' className='p-4' style={{ color: "white" }}>
            La unidad de emprendimiento es un centro de mejoramiento  emprendedor que brinda  atención a los estudiantes de las IE de Sardinata,  que apoya y fortalece el fomento de la cultura del emprendimiento y la innovación a través del acompañamiento, asesoría y seguimiento de los estudiantes en el proceso emprendedor en todas sus etapas como la formulación y consolidación de sus ideas de negocio, siendo claves en la puesta en marcha sus proyectos e ideas a futuro que genere desarrollo económico en la región.
          </p>
        </div>
      </div>
    </div>
  )
}

const Vision = () => {
  return (
    <div className='col-12 col-lg-5 mt-4'>
      <div className='container p-5 rounded-4' style={{ background: "#1C3B57", height: "100%" }}>
        <div className='row'>
          <p id='tituloG' className='text-center' style={{ color: "white" }}>Visión</p>
        </div>
        <div className='row'>
          <img src={ImagenVision} className='img-fluid mt-2' width="70%" />
        </div>
        <div className='row'>
          <p id='parrafoG' className='p-4' style={{ color: "white" }}>
            La unidad de emprendimiento se visualiza como un centro gran valor para la comunidad educativa de las IE de Sardinata, con una cultura de emprendimiento plasmada en el ámbito académico, con alianzas estratégicas con entes que apoyen y fortalezcan el emprendimiento y la innovación, siendo un referente clave para la creación y generación de ideas productivas e innovadoras que apunten al mejoramiento económico y social de la comunidad educativa y la región.
          </p>
        </div>
      </div>
    </div>
  )
}

const Organigrama = () => {
  return (
    <div className='row mt-5 d-flex justify-content-center'>
      <div className='container d-flex justify-content-center align-items-center my-3' style={{ background: "#1C3B57" }}>
        <p id='tituloG' className='m-0 p-4' style={{ color: "white" }}>Organigrama</p>
      </div>
      <img id='imagenOrganigrama' src={ImagenOrganigrama} className='img-fluid p-5' />
    </div>
  )
}

const Flujograma = () => {
  return (
    <div className='row mt-5 d-flex justify-content-center'>
      <div className='container d-flex justify-content-center align-items-center my-3' style={{ background: "#1C3B57" }}>
        <p id='tituloG' className='m-0 p-4' style={{ color: "white" }}>Flujograma de procesos</p>
      </div>
      <img src={ImagenFlujograma1} className='img-fluid p-5' />
      <img src={ImagenFlujograma2} className='img-fluid p-5' />
    </div>
  )
}

const SHome = styled.div`

.justify-content-center {
    justify-content: space-evenly !important;
}

#imagenOrganigrama{
  width: 70%;
}

@media screen and (max-width: 576px){

#imagenOrganigrama{
  width: 100%;
}

}

`;


