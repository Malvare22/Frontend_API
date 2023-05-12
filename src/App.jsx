import logo from './logo.svg';
import './App.css';
import React from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './routes/Home.jsx'
import Login from './routes/login/Login.jsx'
import Footer from './components/Footer';
import Recovery from './routes/login/Recovery';
import Error404 from './routes/404_error'
import ContextProvider from './context/UserContext';

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
    path: '*',
    element: <Error404></Error404>,
  }
]);

export default function App(){
  return <><ContextProvider><RouterProvider router={router}></RouterProvider></ContextProvider></>;
}

