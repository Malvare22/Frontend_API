import axios from 'axios'

export const getCursos = async () => {
    try {
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        const response = await axios.get(`http://146.235.246.199:8080/estudiante/listarCursos`, config);
        return response.data;        
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
    }
};

export const getResultadosFiltrados = async (filtro) => {
    try {
        const formData = new FormData();
        if(filtro.codigoEstudiante !== '')
            formData.append('codigo', filtro.codigoEstudiante);
        if(filtro.curso !== '')
            formData.append('curso', filtro.curso);
        if(filtro.fechaInicio !== '' && filtro.fechaFin !== '') {
            formData.append('fechaInicio', filtro.fechaInicio);
            formData.append('fechaFin', filtro.fechaFin);
        }            
        if(filtro.estado !== '')
            formData.append('estado', filtro.estado);
          
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        const response = await axios.post('http://146.235.246.199:8080/test/filtrar', formData, config);
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
}

export const getResultados = async () => {
    try {
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        const response = await axios.get(`http://146.235.246.199:8080/test`, config);
        return response.data;        
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
    }
}







