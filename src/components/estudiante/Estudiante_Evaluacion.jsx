import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pregunta from './Estudiante_Preguntas';

const EstudianteEvaluacion = () => {
    
    const [datos, setDatos] = useState([]);
    const definir_Color = async () => {
        let value = null;
        value = await axios.get('../preguntas.json').then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setDatos(value)
        console.log(value)
    };
    useEffect(() => {
        definir_Color();

    }, []);
    
    return (
        <div className='form'>
            {datos.map((v, i) => {

                return (<div key={i} className='col-12 col-sm-4'>
                   <Pregunta coso={v}></Pregunta>
                </div>
                );
            })}
        </div>
    );
}

export default EstudianteEvaluacion;
