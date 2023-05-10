import tictac_logo from '../assets/images/Logo_TicToc.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css'
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Footer from '../components/Footer.jsx';
import styled from 'styled-components';


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
      <div className='container-fluid' style={{height:"900px"}}>
        a
      </div>
      <Footer></Footer>
    </div>
  );
}


export default Menu;