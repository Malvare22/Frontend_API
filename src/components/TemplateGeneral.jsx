import { Navigate, Outlet } from "react-router-dom";
import Footer from './Footer'
import { ErrorBoundary } from "react-error-boundary";
import Error404 from "../routes/404_error";
export default function Template({ children }) {
    /*Método de autenticación*/

    /**/
    return <><Outlet></Outlet><Footer></Footer></>;
    
}