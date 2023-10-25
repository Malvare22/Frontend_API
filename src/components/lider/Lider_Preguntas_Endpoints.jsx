import axios from 'axios';

export const getPreguntas = async ({preguntaInfo, setPreguntaInfo}) => {
    try {
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        const response = await axios.get('http://150.136.248.85:8080/pregunta', config);
        setPreguntaInfo(response.data);
    } catch (error) {
        console.error("Error al obtener las preguntas:", error);
    }
};

export const getPregunta = async ({preguntaInfo, setPreguntaInfo}) => {
    try {
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        const response = await axios.get(`http://150.136.248.85:8080/pregunta/${localStorage.getItem('idPregunta')}`, config);
        const preguntaData = {
            ...response.data,
            componente: response.data.componenteCompetenciasId.nombre
          };
        setPreguntaInfo(preguntaData);
        
    } catch (error) {
        console.error("Error al obtener las preguntas:", error);
    }
};

export const crearPregunta = async (datos) => {
    try {
        const formData = new FormData();
        formData.append('enunciado', datos.enunciado);
        formData.append('nombreComponente', datos.componente);
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        const response = await axios.post('http://150.136.248.85:8080/pregunta', formData, config);
        return response.data;
    }
    catch (error) {
        let msg = '';
        if (error.response) {
            console.log('Código de estado:', error.response.status);
            msg = "Error " + error.response.status + ": " + error.response.data.errorMessage;
        } else if (error.request) {
            msg = 'Error: No se recibió respuesta de la base de datos';
        } else {
            msg = "Error al realizar la solicitud: " + error.message;
        }
        console.error(msg);
    }
};

export const actualizarPregunta = async (datos) => {
    try {
        const formData = new FormData();
        formData.append('id', datos.id);
        formData.append('enunciado', datos.enunciado);
        formData.append('nombreComponente', datos.componente);
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        await axios.patch('http://150.136.248.85:8080/pregunta', formData, config);
    }
    catch (error) {
        let msg = '';
        if (error.response) {
            console.log('Código de estado:', error.response.status);
            msg = "Error " + error.response.status + ": " + error.response.data.errorMessage;
        } else if (error.request) {
            msg = 'Error: No se recibió respuesta de la base de datos';
        } else {
            msg = "Error al realizar la solicitud: " + error.message;
        }
        console.error(msg);
    }
};

export const eliminarPregunta = async ({idPregunta}) => {
    try {
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        await axios.delete(`http://150.136.248.85:8080/pregunta/${idPregunta}`, config);
        
    } catch (error) {
        console.error("Error al obtener las preguntas:", error);
    }
};

export const crearRespuesta = async (respuesta) => {
    try {
        const formData = new FormData();
        formData.append('contenido', respuesta.contenido);
        formData.append('valor', respuesta.valor);
        formData.append('preguntaId', respuesta.preguntaId);
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        await axios.post('http://150.136.248.85:8080/respuesta', formData, config);
    }
    catch (error) {
        let msg = '';
        if (error.response) {
            console.log('Código de estado:', error.response.status);
            msg = "Error " + error.response.status + ": " + error.response.data.errorMessage;
        } else if (error.request) {
            msg = 'Error: No se recibió respuesta de la base de datos';
        } else {
            msg = "Error al realizar la solicitud: " + error.message;
        }
        console.error(msg);
    }
};

export const actualizarRespuesta = async (respuesta) => {
    try {
        const formData = new FormData();
        formData.append('id', respuesta.id);
        formData.append('contenido', respuesta.contenido);
        formData.append('valor', respuesta.valor);
        formData.append('preguntaId', respuesta.preguntaId);
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        await axios.patch('http://150.136.248.85:8080/respuesta', formData, config);
    }
    catch (error) {
        let msg = '';
        if (error.response) {
            console.log('Código de estado:', error.response.status);
            msg = "Error " + error.response.status + ": " + error.response.data.errorMessage;
        } else if (error.request) {
            msg = 'Error: No se recibió respuesta de la base de datos';
        } else {
            msg = "Error al realizar la solicitud: " + error.message;
        }
        console.error(msg);
    }
};

export const eliminarRespuesta = async (respuesta) => {
    try {
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        await axios.delete(`http://150.136.248.85:8080/respuesta/${respuesta.id}`, config);
    }
    catch (error) {
        let msg = '';
        if (error.response) {
            console.log('Código de estado:', error.response.status);
            msg = "Error " + error.response.status + ": " + error.response.data.errorMessage;
        } else if (error.request) {
            msg = 'Error: No se recibió respuesta de la base de datos';
        } else {
            msg = "Error al realizar la solicitud: " + error.message;
        }
        console.error(msg);
    }
};












