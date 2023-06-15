import axios from "axios";
import React, { useEffect, useState } from 'react'
import Information from './Administrativo_Info_Entidad_Financiadora'

export default function EntidadesFinanciadoras() {
    const [datos, setDatos] = useState([]);

    const entidad_Financiadora = async () => {
        try {
            const response = await axios.get('http://144.22.63.128:8080/entidadFinanciadora/' + localStorage.getItem("correo"), {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
            });
            const data = response.data
            let foto;
            if (data.fotoEntidadFinanciadoraId === null) {
                foto = ""
            }
            else {
                // Establecer la fuente de la imagen como el string Base64
                foto = "data:image/png;base64," + data.fotoEntidadFinanciadoraId.foto;
            }
            data.foto = foto;
            setDatos(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        entidad_Financiadora();
    }, []);

    return (
        <div className="container">
            <h3 className="ms-5 mt-5"><b>Información de la entidad financiadora</b></h3>
            <Information
                nombre={datos.nombre}
                telefono={datos.telefono}
                sitioweb={datos.sitioWeb}
                correo={datos.correo}
                descripcion={datos.descripcion}
                imagen={datos.foto}
            />
        </div>
    )
}















