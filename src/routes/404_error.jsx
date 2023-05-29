import { useRouteError } from 'react-router-dom';
import ghost from '../assets/images/404_error.png'
export default function Error404() {

    const error = useRouteError()

    return (
        <div className="container-fluid row m-0 p-0 justify-content-center" style={{position: "absolute",top: "50%",left: "50%",transform:"translate(-50%, -50%)",}}>
            <div className='col-md-8 d-flex justify-content-center'>
                <div className='row'>
                    <div className='col col-md-7 col-12 order-md-0 d-flex align-items-center'>
                        <div className=''>
                            <h1 className='fw-bold'>404 Not Found</h1>
                            <p style={{ fontSize: "200%" }}>Ups...<br></br>
                                ¡El sitio al que intentas acceder no se encuentra disponible!</p>
                        </div>
                    </div>
                    <div className='col col-md-5 col-12 order-md-1 d-flex justify-content-center align-items-center'>
                        <img src={ghost} height={"500px"} className=''></img>
                    </div>
                </div>
            </div>
        </div>
    );
};