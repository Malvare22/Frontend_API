import axios from "axios";
import React, { useEffect, useState } from 'react'
import Information from './Estudiante_Info_Entidad_Financiadora'

export default function EntidadesFinanciadoras() {
    const [datos, setDatos] = useState([]);

    const entidad_Financiadora = async () => {
        let value = null;
        value = await axios.get('../entidadesFinanciadoras.json').then(
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
        entidad_Financiadora();

    }, []);

    return (
        <div className="container">
            <img src="https://live.staticflickr.com/65535/52923106446_5eeaffda21_o.png" className='img-fluid mt-2' />
            <div className="row">
                {datos.map((v, i) => {
                    return (<div key={i}>
                        <Information key={i} nombre={v.nombre} telefono={v.telefono} sitioweb={v.sitioWeb} correo={v.correo} descripcion={v.descripcion}></Information>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}