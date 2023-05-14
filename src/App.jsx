import logo from './logo.svg';
import './App.css';
import React from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Login from './routes/login/Login.jsx'
import Footer from './components/Footer';
import Recovery from './routes/login/Recovery';
import Error404 from './routes/404_error'
import TemplateEstudiante from './components/estudiante/Estudiante_Template'
import ContextProvider from './context/UserContext';
import Template from './components/TemplateGeneral';
import Perfil from './routes/usuarios/Perfil';
import Sidebar from './components/estudiante/Estudiante_Navbar'

const Enrutado = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Template></Template>}>
          <Route path='/' element={<Home></Home>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/forgetPassword' element={<Recovery></Recovery>} />
          <Route element={<TemplateEstudiante></TemplateEstudiante>}>
            <Route path='/test1' element={<Perfil></Perfil>} />
            <Route path='/test2' element={<Login></Login>} />
          </Route>
        </Route>
        <Route path='/*' element={<Error404></Error404>} />
      </Routes>
    </BrowserRouter>
  );

}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/login',
    element: <><Login></Login></>,
  },
  {
    path: '/forgetPassword',
    element: <><Recovery></Recovery></>,
  },
  {
    path: '/profile',
    element: <Error404></Error404>,
  },
  {
    path: '*',
    element: <Error404></Error404>,
  }
]);

export default function App() {
  return <><ContextProvider><Enrutado></Enrutado></ContextProvider></>;
}

