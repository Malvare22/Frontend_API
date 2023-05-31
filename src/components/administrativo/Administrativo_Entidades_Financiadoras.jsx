import axios from "axios";
import React, { useEffect, useState } from 'react'
import Information from './Administrativo_Info_Entidad_Financiadora'

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

    let datosPosicion1 = [];
    if (datos.length > 1) {
        datosPosicion1 = [datos[1]];
    }

    return (
        <div className="container">
            <h3 className="ms-5 mt-5">Información de la entidad financiadora</h3>
           {datosPosicion1.map((v, i) => (
                <div key={i}>
                    <Information
                        nombre={v.nombre}
                        telefono={v.telefono}
                        sitioweb={v.sitioWeb}
                        correo={v.correo}
                        descripcion={v.descripcion}
                    />
                </div>
            ))}
        </div>
    )
}





