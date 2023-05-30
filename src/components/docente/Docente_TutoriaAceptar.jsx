import React from 'react'

// Componente principal que contiene la tabla y los filtros
export default function Aceptar_Tutoria() {
    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Invitación a ser tutor</h1>
                    <div className="container">
                        <div className="mt-3 rounded" style={{ background: "#ECECEC", padding: "10px" }} >
                            <div className=''>
                                <h6 className='text-center'>¡Hola _! <br></br>Te invitamos a unirte a nuestro programa como tutor de __. Tu experiencia en el área _ sería invaluable para guiar a nuestros emprendedores hacia el éxito.<br></br>¡Esperamos contar con tu participación!</h6>
                            </div>                            
                            <div className="row mt-3">
                                <div className="col d-flex justify-content-end">
                                    <button style={{ background: "#0D6EFD", color: "white" }} className="btn text-white">Aceptar</button>
                                </div>
                                <div className="col d-flex">
                                    <button style={{ background: "#DC3545", color: "white" }} className="btn text-white">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}