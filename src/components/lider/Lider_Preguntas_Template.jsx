import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Enunciado = ({ pregunta, enviarDatos }) => {
    const [preguntaState, setPreguntaState] = useState(pregunta);
    const [errorState, setErrorState] = useState({
        "enunciadoInvalido": false,
        "componenteInvalido": false,
        "msgErrorEnunciado": "Ingrese un enunciado válido",
        "msgErrorComponente": "Seleccione una componente válida"
    });
    const [errorRespuestasState, setErrorRespuestasState] = useState([]);
    const [respuestasEliminar, setRespuestasEliminar] = useState([]);
    let nextRespuestaId = preguntaState.listaRespuestas.length > 0 ? Math.max(...preguntaState.listaRespuestas.map(respuesta => respuesta.id)) + 1 : 1;

    const [componentes, setComponentes] = useState([]);

    const getComponentes = async () => {
        try {
            const config = {
                headers: {
                    "X-Softue-JWT": localStorage.getItem('token_access')
                }
            }
            const response = await axios.get('http://144.22.32.132:8080/componenteCompetencias', config);
            setComponentes(response.data);
        } catch (error) {
            console.error("Error al obtener las componentes:", error);
        }
    };
    useEffect(() => {
        getComponentes();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPreguntaState((prevState) => ({
            ...prevState,
            [name]: value,
            ...(name === "componente" && {
                componenteCompetenciasId: {
                    ...prevState.componenteCompetenciasId,
                    nombre: value
                }
            })
        }));
    };

    const handleClickEnviar = () => {
        let valid = true;

        const errorRespuestas = preguntaState.listaRespuestas.map((respuesta) => {
            const errores = {};
            if (respuesta.contenido === "") {
                errores.contenidoInvalido = true;
                valid = false;
            }
            if (respuesta.valor === "" || respuesta.valor < 0 || respuesta.valor > 100) {
                errores.valorInvalido = true;
                valid = false;
                console.log("invalido");
            }
            return { ...errores, id: respuesta.id };
        });

        setErrorRespuestasState(errorRespuestas);


        if (preguntaState.enunciado === "") {
            setErrorState((prevState) => ({
                ...prevState,
                enunciadoInvalido: true
            }));
            valid = false;
        }
        else {
            setErrorState((prevState) => ({
                ...prevState,
                enunciadoInvalido: false
            }));
        }

        if (preguntaState.componente === "Seleccione una opción") {
            setErrorState((prevState) => ({
                ...prevState,
                componenteInvalido: true
            }));
            valid = false;
        }
        else {
            setErrorState((prevState) => ({
                ...prevState,
                componenteInvalido: false
            }));
        }

        if (preguntaState.listaRespuestas.length < 2) {
            valid = false;
            alert("No se puede crear una pregunta con menos de 2 respuestas.")
        }

        if (valid) {
            enviarDatos(preguntaState, respuestasEliminar);
        }
    };

    const handleClickAgregar = () => {
        setPreguntaState((prevState) => ({
            ...prevState,
            listaRespuestas: [
                ...prevState.listaRespuestas,
                {
                    "id": nextRespuestaId,
                    "contenido": '',
                    "valor": '',
                    "agregada": true
                }
            ]
        }));
    };

    const handleRespuestaChange = (id, updatedRespuesta, eliminar = false) => {
        setPreguntaState((prevState) => {
            const listaRespuestas = [...prevState.listaRespuestas];
            const index = listaRespuestas.findIndex(respuesta => respuesta.id === id);

            if (index !== -1) {
                if (eliminar) {
                    const respuestaEliminada = listaRespuestas[index];
                    if(!('agregada' in respuestaEliminada))
                        setRespuestasEliminar((prevRespuestasEliminar) => [...prevRespuestasEliminar, respuestaEliminada]);
                    listaRespuestas.splice(index, 1);
                } else {
                    listaRespuestas[index] = updatedRespuesta;
                }
            }

            return { ...prevState, listaRespuestas };
        });
    };


    return (
        <div>
            <div className='rounded-3 bg-grey p-4'>
                <div className="row p-2">
                    <div className="col-12 col-md-4">
                        <p className='h5' >Enunciado:</p>
                    </div>
                    <div className="col-12 col-md-8">
                        <textarea className={`rounded-5 p-3 form-control ${errorState.enunciadoInvalido ? 'is-invalid' : ''}`}
                            name="enunciado"
                            placeholder={preguntaState.enunciado === "" ? "Ingrese un enunciado" : preguntaState.enunciado}
                            defaultValue={preguntaState.enunciado}
                            onChange={handleChange}>
                        </textarea>
                        {errorState.enunciadoInvalido && <div className="invalid-feedback"> {errorState.msgErrorEnunciado} </div>}
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col-12 col-md-4">
                        <p className='h5' >Componente:</p>
                    </div>
                    <div className="col-12 col-md-8">
                        <select className={`rounded-5 p-1 text-center form-select ${errorState.componenteInvalido ? 'is-invalid' : ''}`}
                            name="componente"
                            defaultValue={preguntaState.componente}
                            onChange={handleChange}>
                            <option value={preguntaState.componente}>
                                {preguntaState.componente.charAt(0).toUpperCase() + preguntaState.componente.slice(1).toLowerCase()}
                            </option>
                            {componentes.map((componente) => (
                                componente.nombre === preguntaState.componente ? "" : (
                                    <option key={componente.id} value={componente.nombre}>
                                        {componente.nombre.charAt(0).toUpperCase() + componente.nombre.slice(1).toLowerCase()}
                                    </option>
                                )
                            ))}
                        </select>
                        {errorState.componenteInvalido && <div className="invalid-feedback">{errorState.msgErrorComponente}</div>}
                    </div>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-12 col-md-6">
                    <button className='btn mt-4' id='btn-Azul' onClick={handleClickEnviar}>Guardar cambios</button>
                </div>
                <div className="col-12 col-md-6">
                    <button className='btn mt-4' id='btn-Azul' onClick={handleClickAgregar}>Agregar Respuesta</button>
                </div>
            </div>

            {preguntaState.listaRespuestas.map((respuesta) => (
                <Respuesta
                    key={respuesta.id}
                    respuesta={respuesta}
                    onChangeRespuesta={(updatedRespuesta, eliminar) =>
                        handleRespuestaChange(respuesta.id, updatedRespuesta, eliminar)
                    }
                    errorRespuesta={errorRespuestasState.find(error => error.id === respuesta.id) || {}}
                />
            ))}
        </div>

    );
}

const Respuesta = ({ respuesta, onChangeRespuesta, errorRespuesta }) => {

    const [respuestaState, setRespuestaState] = useState(respuesta);
    const errorState = {
        "msgErrorContenido": "Ingrese un contenido válido a la respuesta",
        "msgErrorValor": "Ingrese un contenido válido a la respuesta"
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRespuestaState((prevState) => ({ ...prevState, [name]: value }));
        onChangeRespuesta({ ...respuestaState, [name]: value });
    };

    const handleEliminar = () => {
        onChangeRespuesta(null, true);
    }

    return (
        <div className='rounded-3 bg-grey mt-4'>
            <div className="row p-2">
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-danger' onClick={handleEliminar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="row p-2 mb-2 me-2 ms-2">
                <div className="col-12 col-md-4">
                    <p className='h5' >Respuesta:</p>
                </div>
                <div className="col-12 col-md-8">
                    <textarea className={`rounded-5 p-3 form-control ${errorRespuesta.contenidoInvalido ? 'is-invalid' : ''}`}
                        name="contenido"
                        placeholder={respuestaState.contenido === "" ? "Ingrese una respuesta" : respuestaState.contenido}
                        defaultValue={respuestaState.contenido}
                        onChange={handleChange}>
                    </textarea>
                    {errorRespuesta.contenidoInvalido && <div className="invalid-feedback">{errorState.msgErrorContenido}</div>}
                </div>
            </div>
            <div className="row p-4 mb-2 me-2 ms-2">
                <div className="col-12 col-md-4">
                    <p className='h5' >Valor:</p>
                </div>
                <div className="col-12 col-md-8">
                    <input className={`rounded-5 p-1 text-center form-control ${errorRespuesta.valorInvalido ? 'is-invalid' : ''}`}
                        name="valor"
                        type="number" min="0" max="100"
                        placeholder={respuestaState.valor === "" ? "Ingrese un valor" : respuestaState.valor}
                        defaultValue={respuestaState.valor}
                        onChange={handleChange}>
                    </input>
                    {errorRespuesta.valorInvalido && <div className="invalid-feedback">{errorState.msgErrorValor}</div>}
                </div>
            </div>
        </div>
    );
}






