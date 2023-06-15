import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Subir_Formatos() {
    const navigate = useNavigate();
    const [formato, setFormato] = useState(null);
    const [modulo, setModulo] = useState('');
    const [error, setError] = useState(null);
    const [nombreArchivoValido, setNombreArchivoValido] = useState(false);
    const [formatoValido, setFormatoValido] = useState(true);

    const handleformatoChange = (e) => {
        setFormato(e.target.files[0]);
    };

    const handleModuloChange = (e) => {
        setModulo(e.target.value);
    };

    console.log(modulo);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formato && nombreArchivoValido && formatoValido) {
            setError(null);

            var formData = new FormData();

            formData.append('modulo', modulo);
            formData.append('documento', formato);

            // Cambiar el nombre del archivo antes de enviarlo
            const nombreArchivoEsperado = modulo === 'idea_de_negocio' ? 'idea_de_negocio' : 'plan_de_negocio';
            const nuevoNombreArchivo = nombreArchivoEsperado + '.' + formato.name.split('.').pop();
            formData.set('documento', formato, nuevoNombreArchivo);

            let ruta = 'http://localhost:8080/formato';
            let value = await axios
                .post(ruta, formData, { headers: { 'X-Softue-JWT': localStorage.getItem('token_access') } })
                .then((response) => {
                    console.log('hecho');
                    console.log([...formData.entries()]);
                })
                .catch((error) => {
                    if (error.response) {
                        console.log('Código de estado:', error.response.status);
                        console.log('Respuesta del backend:', error.response.data);
                    } else if (error.request) {
                        console.log('No se recibió respuesta del backend');
                    } else {
                        console.log('Error al realizar la solicitud:', error.message);
                    }
                });

            setFormato(null);
            navigate('../Capacitacion');
        } else {
            setError('Por favor, selecciona un archivo');
            if (!formatoValido) {
                alert('El archivo debe ser en formato PDF o DOCX');
            }
        }
    };

    const cambiarNombreArchivo = (nombreArchivo) => {
        const nombreArchivoEsperado = modulo === 'material_idea_negocio' ? 'material_idea_negocio' : modulo === 'material_plan_negocio' ? 'material_plan_negocio' : 'material_general';
        const partesNombreArchivo = nombreArchivo.split('.');
        const extensionArchivo = partesNombreArchivo[partesNombreArchivo.length - 1];

        if (extensionArchivo === 'pdf' || extensionArchivo === 'docx') {
            setFormatoValido(true);
            const nuevoNombreArchivo = nombreArchivoEsperado + '.' + extensionArchivo;
            setNombreArchivoValido(true);
            return nuevoNombreArchivo;
        } else {
            setFormatoValido(false);
            setNombreArchivoValido(false);
            return nombreArchivo;
        }
    };

    useEffect(() => {
        if (formato) {
            const nuevoNombreArchivo = cambiarNombreArchivo(formato.name);
            if (nuevoNombreArchivo !== formato.name) {
                setFormato((prevFormato) => {
                    const formatoModificado = new File([prevFormato], nuevoNombreArchivo, { type: prevFormato.type });
                    return formatoModificado;
                });
            }
        }
    }, [formato]);

    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Capacitacion de proyectos de emprendimiento</h1>
                    <div className="container">
                        <div className="mt-3">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-auto d-flex align-items-center mb-1">
                                        <select name="modulo" onChange={handleModuloChange} className="form-select-sm selector fw-bold text-black" required>
                                            <option value="">Seleccione...</option>
                                            <option value="material_idea_negocio">Idea de negocio</option>
                                            <option value="material_plan_negocio">Plan de negocio</option>
                                            <option value="material_general">material general</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-3 rounded d-flex align-items-center justify-content-center" style={{ background: '#ECECEC', padding: '10px' }}>
                                    <div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="https://live.staticflickr.com/65535/52935272392_1eff2004b3_o.png" className="img-fluid" />
                                        </div>
                                        <div className="mt-3">
                                            {modulo === 'material_idea_negocio' ? (
                                                <>
                                                    <p className="text-center">
                                                        <b>4. Subir material de idea de negocio</b>
                                                    </p>
                                                    <p style={{ fontSize: 'smaller' }} className="text-center">
                                                        Tenga en cuenta que el formato a subir debe coincidir con el formato esperado (PDF o DOCX)
                                                    </p>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <input type="file" id="formatoIdea" onChange={handleformatoChange} accept=".pdf,.docx" required />
                                                    </div>
                                                </>
                                            ) : ( modulo === 'material_general' ? 
                                            (
                                                <>
                                                    <p className="text-center">
                                                        <b>4. Subir material general</b>
                                                    </p>
                                                    <p style={{ fontSize: 'smaller' }} className="text-center">
                                                        Tenga en cuenta que el formato a subir debe coincidir con el formato esperado (PDF o DOCX)
                                                    </p>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <input type="file" id="formatoPlan" onChange={handleformatoChange} accept=".pdf,.docx" required />
                                                    </div>
                                                </>
                                            )
                    
                                            :(
                                                <>
                                                    <p className="text-center">
                                                        <b>4. Subir material de plan de negocio</b>
                                                    </p>
                                                    <p style={{ fontSize: 'smaller' }} className="text-center">
                                                        Tenga en cuenta que el formato a subir debe coincidir con el formato esperado (PDF o DOCX)
                                                    </p>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <input type="file" id="formatoPlan" onChange={handleformatoChange} accept=".pdf,.docx" required />
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto d-flex align-items-center justify-content-center mt-3">
                                    <button style={{ background: '#1C3B57', color: 'white' }} type="submit" className="btn text-white" disabled={!nombreArchivoValido || !formatoValido}>
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
