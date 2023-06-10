import React, { useState } from 'react';


export const Enunciado = ({ pregunta, cargarComponentes, enviarDatos }) => {

    const [preguntaState, setPreguntaState] = useState(pregunta);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPreguntaState((prevState) => ({ ...prevState, [name]: value }));
    };
    

    const handleClickEnviar = () => {
        enviarDatos(preguntaState);
    };

    return (
        <div>
            <div className='rounded-3 bg-grey p-4'>
                <div className="row p-2">
                    <div className="col-12 col-md-4">
                        <p className='h5' >Enunciado:</p>
                    </div>
                    <div className="col-12 col-md-8">
                        <textarea className='rounded-5 p-3 form-control' name="enunciado" placeholder={preguntaState.enunciado} defaultValue={preguntaState.enunciado} onChange={handleChange}></textarea>
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col-12 col-md-4">
                        <p className='h5' >Número de respuestas:</p>
                    </div>
                    <div className="col-12 col-md-8">
                        <input className='rounded-5 p-1 text-center form-control' name="numeroRespuestas" type="number" min="2" placeholder={preguntaState.numeroRespuestas} defaultValue={preguntaState.numeroRespuestas} onChange={handleChange}></input>
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col-12 col-md-4">
                        <p className='h5' >Componente:</p>
                    </div>
                    <div className="col-12 col-md-8">
                        <select className='rounded-5 p-1 text-center form-select' name="componente" value={preguntaState.componente} onChange={handleChange}>
                            <option value={preguntaState.componente}>
                                {preguntaState.componente.charAt(0).toUpperCase() + preguntaState.componente.slice(1).toLowerCase()}
                            </option>
                            {cargarComponentes().map((componente) => (
                                componente === preguntaState.componente ? "" : (
                                    <option key={componente} value={componente}>
                                        {componente.charAt(0).toUpperCase() + componente.slice(1).toLowerCase()}
                                    </option>
                                )
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            
            <button className='btn btn-primary' onClick={handleClickEnviar}>Enviar Datos</button>
        </div>

    );
}

const Respuestas = ({respuestas}) => {
    return (
        <div>
          {respuestas.map((respuesta) => (
            <Respuesta respuesta={respuesta} />
          ))}
        </div>
      );
}

const Respuesta = ({respuesta}) => {

    const [respuestaState, setRespuesaState] = useState(respuesta);

    return (
        <div className='rounded-3 bg-grey p-4'>
            <div className="row p-2">
                <div className="col-12 col-md-4">
                    <p className='h5' >Contenido:</p>
                </div>
                <div className="col-12 col-md-8">
                    <textarea className='rounded-5 p-3 form-control' name="contenido" placeholder={respuestaState.contenido} defaultValue={respuestaState.numeroRespuestas}></textarea>
                </div>
            </div>
            <div className="row p-2">
                <div className="col-12 col-md-4">
                    <p className='h5' >Valor:</p>
                </div>
                <div className="col-12 col-md-8">
                    <input className='rounded-5 p-1 text-center form-control' name="valor" type="number" min="1" max="100" placeholder={respuestaState.numeroRespuestas}></input>
                </div>
            </div>
        </div>
    );
}