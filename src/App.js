import logo from './logo.svg';
import './App.css';
import React from "react";
import { createRoot } from "react-dom/client";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import Footer from './components/Footer';
import Recovery from './routes/ForgetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/login',
    element: <><Login></Login><Footer></Footer></>,
  },
  {
    path: '/contact',
    element: <h1>Contact</h1>,
  },
  {
    path: '/forgetPassword',
    element: <><Recovery></Recovery><Footer></Footer></>,
  },
]);

export default function App(){
  return <RouterProvider router={router}></RouterProvider>;
}

