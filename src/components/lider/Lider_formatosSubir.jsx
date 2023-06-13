import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
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

            let ruta = 'http://144.22.32.132:8080/formato';
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
            navigate('../Formatos');
        } else {
            setError('Por favor, selecciona un archivo');
            if (!formatoValido) {
                alert('El archivo debe ser en formato PDF o DOCX');
            }
        }
    };

    const verificarNombreArchivo = (nombreArchivo) => {
        // Nombre de archivo esperado para la validación
        const nombreArchivoEsperado = modulo === 'idea_de_negocio' ? 'idea_de_negocio' : 'plan_de_negocio';
      
        // Dividir el nombre del archivo en nombre y extensión
        const partesNombreArchivo = nombreArchivo.split('.');
        const nombreArchivoSinExtension = partesNombreArchivo[0];
        const extensionArchivo = partesNombreArchivo[1];
      
        if (nombreArchivoSinExtension === nombreArchivoEsperado && (extensionArchivo === 'pdf' || extensionArchivo === 'docx')) {
          setNombreArchivoValido(true);
          setFormatoValido(true);
        } else {
          setNombreArchivoValido(false);
          setFormatoValido(false);
        }
      };


    useEffect(() => {
        if (formato) {
            verificarNombreArchivo(formato.name);
        }
    }, [formato]);

    return (
        <div className="container-fluid w-75">
            <div className="row">
                <div className="col-12 m-1 p-1">
                    <h1 className="fst-italic fw-bold fs-1 text-black">Formato proyectos de emprendimiento</h1>
                    <div className="container">
                        <div className="mt-3">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-auto d-flex align-items-center mb-1">
                                        <select name="modulo" onChange={handleModuloChange} className="form-select-sm selector fw-bold text-black" required>
                                            <option value="">Seleccione...</option>
                                            <option value="idea_de_negocio">Idea de negocio</option>
                                            <option value="plan_de_negocio">Plan de negocio</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-3 rounded d-flex align-items-center justify-content-center" style={{ background: '#ECECEC', padding: '10px' }}>
                                    <div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="https://live.staticflickr.com/65535/52935272392_1eff2004b3_o.png" className="img-fluid" />
                                        </div>
                                        <div className="mt-3">
                                            {modulo === 'idea_de_negocio' ? (
                                                <>
                                                    <p className="text-center">
                                                        <b>4. Subir formato de la idea de negocio</b>
                                                    </p>
                                                    <p style={{fontSize:"smaller"}} className="text-center">Tenga en cuenta que el formato a subir debe llamarse "idea_de_negocio" y coincidir con el formato esperado</p>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <input type="file" id="formatoIdea" onChange={handleformatoChange} accept=".pdf,.docx" required />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-center">
                                                        <b>4. Subir formato del plan de negocio</b>
                                                    </p>
                                                    <p style={{fontSize:"smaller"}} className="text-center">Tenga en cuenta que el formato a subir debe llamarse "plan_de_negocio" y coincidir con el formato esperado</p>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <input type="file" id="formatoPlan" onChange={handleformatoChange} accept=".pdf,.docx" required />
                                                    </div>
                                                </>
                                            )}
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







