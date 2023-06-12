import axios from 'axios'

export const getCursos = async () => {
    try {
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        const response = await axios.get(`http://localhost:8080/estudiante/listarCursos`, config);
        return response.data;        
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
    }
};

export const getResultadosFiltrados = () => {
    return [
        {
            "codigo": 123654,
            "curso": 6 - 6,
            "estado": "aprobada",
            "calificacion": 60.0,
            "fecha": "23-04-22"
        },
        {
            "codigo": 123654,
            "curso": 6 - 5,
            "estado": "rechazada",
            "calificacion": 60.0,
            "fecha": "23-04-22"
        }
    ];
}