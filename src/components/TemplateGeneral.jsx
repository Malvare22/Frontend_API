import { Navigate, Outlet } from "react-router-dom";
import Footer from './Footer'
export default function Template({children}){
    /*Método de autenticación*/

    /**/
    return(<><Outlet></Outlet><Footer></Footer></>);
}