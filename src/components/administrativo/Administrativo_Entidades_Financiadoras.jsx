import axios from "axios";
import React, { useEffect, useState } from 'react'
import Information from './Administrativo_Info_Entidad_Financiadora'

export default function EntidadesFinanciadoras() {
    const [datos, setDatos] = useState([]);

    const entidad_Financiadora = async () => {
        try {
            const response = await axios.get('http://localhost:8080/entidadFinanciadora/' + localStorage.getItem("correo"), {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
            });
            console.log(response.data);
            setDatos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        entidad_Financiadora();
    }, []);

    return (
        <div className="container">
            <h3 className="ms-5 mt-5">Información de la entidad financiadora</h3>
            <Information
                nombre={datos.nombre}
                telefono={datos.telefono}
                sitioweb={datos.sitioWeb}
                correo={datos.correo}
                descripcion={datos.descripcion}
            />
        </div>
    )
}





