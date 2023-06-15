import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Collapse, Nav, NavItem, NavLink, Row, UncontrolledCollapse } from 'reactstrap';
import Emprender_Aprender from '../../assets/images/Login/Emprender_Aprender.png'
import '../../css/Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { CerrarSesion } from '../../context/functions_app';

const arrowUp = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
</svg>);

const arrowDown = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
</svg>);

const Sidebar = () => {

  const initValue = [false, false]

  const [flechas, setFlechas] = useState(initValue)

  const toggleFlechas = (index) => {
    let temp = [...flechas];
    temp[index] = !temp[index]
    setFlechas(temp)
  }

  return (<><div id='sbsid01'><SideBarStatic flechas={flechas} toggleFlechas={toggleFlechas}></SideBarStatic></div><div id='sbsid02'><SideBarResponsive flechas={flechas} toggleFlechas={toggleFlechas}></SideBarResponsive></div></>);
}

const SideBarStatic = ({ flechas, toggleFlechas }) => {
  const navigate = useNavigate()
  return (
    <div id="Sidebar" className="d-flex flex-column flex-shrink-0 text-white" style={{}}>

      <Nav vertical className=' d-flex' style={{ height: "100%" }}>
        <NavItem>
          <div className='container-fluid w-100 h-100'>
            <img className='img-fluid' src={Emprender_Aprender}></img>
          </div>
        </NavItem>
        <hr></hr>
        <NavItem>
          <NavLink href="#">
            <Row className='d-flex align-content-center align-items-center'>
              <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </Col>
              <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">
                <Link to={'Perfil'} style={{ textDecoration: "none", color: "white" }}>Perfil</Link>
              </Col>
            </Row>

          </NavLink>
        </NavItem>


        <NavItem>
          <NavLink id='Usuarios' href="#" onClick={() => toggleFlechas(0)}>
            <Row className='d-flex align-content-center align-items-center'>
              <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                </svg>
              </Col>
              <Col xs="9" className="d-flex text-white text-start justify-content-between align-items-center">Usuarios {flechas[0] ? arrowDown : arrowUp}</Col>
            </Row>

          </NavLink>
        </NavItem>

        <UncontrolledCollapse id="despliegue" toggler="#Usuarios">
          <NavItem>
            <NavLink className='offset-md-3 text-white text-start' href="#">
              <Link to={'Lider'} style={{ textDecoration: "none", color: "white" }}>Lider de la Unidad</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='offset-md-3 text-white text-start' href="#">
              <Link to={'Administrativos'} style={{ textDecoration: "none", color: "white" }}>Administrativos</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='offset-md-3 text-white text-start' href="#">
              <Link to={'Docentes'} style={{ textDecoration: "none", color: "white" }}>Docentes</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='offset-md-3 text-white text-start' href="#">
              <Link to={'Estudiantes'} style={{ textDecoration: "none", color: "white" }}>Estudiantes</Link>
            </NavLink>
          </NavItem>

        </UncontrolledCollapse>

        <NavItem>
          <NavLink id="" href="#">
            <Row className='d-flex align-content-center align-items-center  justify-content-end'>
              <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-lightbulb-fill" viewBox="0 0 16 16">
                  <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Col>
              <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">
                <Link to={'Ideas'} style={{ textDecoration: "none", color: "white" }}>Idea de Negocio</Link>
              </Col>
            </Row>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink id="" href="#">
            <Row className='d-flex align-content-center align-items-center justify-content-end'>
              <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-briefcase-fill" viewBox="0 0 16 16">
                  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z" />
                </svg>
              </Col>
              <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">
                <Link to={'Planes'} style={{ textDecoration: "none", color: "white" }}>Plan de Negocio</Link>
              </Col>
            </Row>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink id="Habilidades" href="#" onClick={() => toggleFlechas(1)}>
            <Row className='d-flex align-content-center align-items-center  justify-content-end'>
              <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-clipboard2-check-fill" viewBox="0 0 16 16">
                  <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                  <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5Zm6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                </svg>
              </Col>
              <Col xs="9" className="d-flex text-white text-start justify-content-between align-items-center">Evaluacion {flechas[1] ? arrowDown : arrowUp}</Col>
            </Row>
          </NavLink>
        </NavItem>

        <UncontrolledCollapse id="despliegue" toggler="#Habilidades">

          <NavItem>
            <NavLink className='offset-md-3 text-white text-start' href="#">
                <Link to={'Resultados/Listar'} style={{ textDecoration: "none", color: "white" }}>Resultados</Link>
            </NavLink>
          </NavItem>

        </UncontrolledCollapse>

        <NavItem>
          <NavLink href="#">
            <Row className='d-flex align-content-center align-items-center justify-content-end'>
              <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-coin" viewBox="0 0 16 16">
                  <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
              </Col>
              <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">
                <Link to={'Entidades'} style={{ textDecoration: "none", color: "white" }}>Entidades financiadoras</Link>
              </Col>
            </Row>
          </NavLink>
        </NavItem>

        {/* <NavItem>
          <NavLink href="#">
            <Row className='d-flex align-content-center align-items-center justify-content-end'>
              <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-trophy-fill" viewBox="0 0 16 16">
                  <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                </svg>
              </Col>
              <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">Experiencias exitosas</Col>
            </Row>
          </NavLink>
        </NavItem> */}

        {/* <NavItem>
          <NavLink href="#">
            <Row className='d-flex align-content-center align-items-center justify-content-end'>
              <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-calendar-week" viewBox="0 0 16 16">
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
              </Col>
              <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">Cronograma</Col>
            </Row>
          </NavLink>
        </NavItem> */}


        {/* <NavItem>
          <NavLink href="#">
            <Row className='d-flex align-content-center align-items-center justify-content-end'>
              <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
                </svg>
              </Col>
              <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">Informe general UE</Col>
            </Row>
          </NavLink>
        </NavItem> */}

        <NavItem className='d-flex flex-column justify-content-end flex-grow-1' onClick={() => CerrarSesion(navigate)}>
          <NavLink id='cerrar' className='' href="#">
            <Row className='d-flex align-content-center align-items-center justify-content-end'>
              <Col className=" text-white align-items-end justify-content-end d-flex" xs="3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                  <path d="M7.5 1v7h1V1h-1z" />
                  <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                </svg>
              </Col>
              <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">Cerrar Sesion</Col>
            </Row>
          </NavLink>
        </NavItem>


      </Nav>

    </div>
  );
}

const SideBarResponsive = ({ flechas, toggleFlechas }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (<div className="text-white d-flex flex-column flex-shrink-0" id='principal_div_nav' >
    <Nav vertical id='Sidebar' className='d-flex'>
      <div className='d-flex'>
        <button type='button' id='btn-toggler' onClick={toggleNavbar} className="btn border border-white m-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>
      </div>
      <div>
        <Collapse isOpen={!collapsed} navbar>
          <NavItem>
            <div className='container-fluid' id='img'>
              <img className='img-fluid' src={Emprender_Aprender}></img>
            </div>
          </NavItem>
          <hr></hr>
          <NavItem>
            <NavLink href="#">
              <Row className='d-flex align-content-center align-items-center'>
                <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                  </svg>
                </Col>
                <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">
                  <Link to={'Perfil'} style={{ textDecoration: "none", color: "white" }}>Perfil</Link>
                </Col>
              </Row>

            </NavLink>
          </NavItem>


          <NavItem>
            <NavLink id='Usuarios' href="#" onTouchEnd={() => toggleFlechas(0)}>
              <Row className='d-flex align-content-center align-items-center'>
                <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                </Col>
                <Col xs="9" className="d-flex text-white text-start justify-content-between align-items-center">Usuarios {flechas[0] ? arrowDown : arrowUp}</Col>
              </Row>

            </NavLink>
          </NavItem>

          <UncontrolledCollapse id="despliegue" toggler="#Usuarios">
            <NavItem>
              <NavLink className='offset-md-3 text-white text-start' href="#">
                <Link to={'Lider'} style={{ textDecoration: "none", color: "white" }}>Lider de la Unidad</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='offset-md-3 text-white text-start' href="#">
                <Link to={'Administrativos'} style={{ textDecoration: "none", color: "white" }}>Administrativos</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='offset-md-3 text-white text-start' href="#">
                <Link to={'Docentes'} style={{ textDecoration: "none", color: "white" }}>Docentes</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='offset-md-3 text-white text-start' href="#">
                <Link to={'Estudiantes'} style={{ textDecoration: "none", color: "white" }}>Estudiantes</Link>
              </NavLink>
            </NavItem>

          </UncontrolledCollapse>

          <NavItem>
            <NavLink id="" href="#">
              <Row className='d-flex align-content-center align-items-center  justify-content-end'>
                <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-lightbulb-fill" viewBox="0 0 16 16">
                    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </Col>
                <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">
                  <Link to={'Ideas'} style={{ textDecoration: "none", color: "white" }}>Idea de Negocio</Link>
                </Col>
              </Row>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink id="" href="#">
              <Row className='d-flex align-content-center align-items-center justify-content-end'>
                <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-briefcase-fill" viewBox="0 0 16 16">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z" />
                  </svg>
                </Col>
                <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">
                  <Link to={'Planes'} style={{ textDecoration: "none", color: "white" }}>Plan de Negocio</Link>
                </Col>
              </Row>
            </NavLink>
          </NavItem>


          <NavItem>
            <NavLink id="Habilidades" href="#" onTouchEnd={() => toggleFlechas(1)}>
              <Row className='d-flex align-content-center align-items-center  justify-content-end'>
                <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-clipboard2-check-fill" viewBox="0 0 16 16">
                    <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                    <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5Zm6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                  </svg>
                </Col>
                <Col xs="9" className="d-flex text-white text-start justify-content-between align-items-center">Evaluacion {flechas[1] ? arrowDown : arrowUp}</Col>              </Row>
            </NavLink>
          </NavItem>

          <UncontrolledCollapse id="despliegue" toggler="#Habilidades">

            <NavItem>
              <NavLink className='offset-md-3 text-white text-start' href="#">
                  <Link to={'Resultados/Listar'} style={{ textDecoration: "none", color: "white" }}>Resultados</Link>
              </NavLink>
            </NavItem>

          </UncontrolledCollapse>

          <NavItem>
            <NavLink href="#">
              <Row className='d-flex align-content-center align-items-center justify-content-end'>
                <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-coin" viewBox="0 0 16 16">
                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                  </svg>
                </Col>
                <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">
                  <Link to={'Entidades'} style={{ textDecoration: "none", color: "white" }}>Entidades financiadoras</Link>
                </Col>
              </Row>
            </NavLink>
          </NavItem>

          {/* <NavItem>
            <NavLink href="#">
              <Row className='d-flex align-content-center align-items-center justify-content-end'>
                <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-trophy-fill" viewBox="0 0 16 16">
                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                  </svg>
                </Col>
                <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">Experiencias exitosas</Col>
              </Row>
            </NavLink>
          </NavItem> */}

          {/* <NavItem>
            <NavLink href="#">
              <Row className='d-flex align-content-center align-items-center justify-content-end'>
                <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-calendar-week" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                  </svg>
                </Col>
                <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">Cronograma</Col>
              </Row>
            </NavLink>
          </NavItem> */}


          {/* <NavItem>
            <NavLink href="#">
              <Row className='d-flex align-content-center align-items-center justify-content-end'>
                <Col className="d-flex justify-content-end text-white align-content-center" xs="3" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
                  </svg>
                </Col>
                <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">Informe general UE</Col>
              </Row>
            </NavLink>
          </NavItem> */}

          <NavItem className='d-flex flex-column justify-content-end flex-grow-1' onClick={() => CerrarSesion(navigate)}>
            <NavLink id='cerrar' className='' href="#">
              <Row className='d-flex align-content-center align-items-center justify-content-end'>
                <Col className=" text-white align-items-end justify-content-end d-flex" xs="3" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                    <path d="M7.5 1v7h1V1h-1z" />
                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                  </svg>
                </Col>
                <Col xs="9" className="d-flex text-white text-start justify-content-start align-content-center">Cerrar Sesion</Col>
              </Row>
            </NavLink>
          </NavItem>

        </Collapse>
      </div>
    </Nav>
  </div>
  );
}


export default Sidebar;











