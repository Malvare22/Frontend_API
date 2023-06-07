import axios from "axios";
import React, { useEffect, useState } from 'react'
import Information from './Estudiante_Info_Entidad_Financiadora'

export default function EntidadesFinanciadoras() {
    const [datos, setDatos] = useState([]);

    const entidad_Financiadora = async () => {
        try {
          const response = await axios.get('http://localhost:8080/entidadFinanciadora', {
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
            <img src="https://live.staticflickr.com/65535/52923106446_5eeaffda21_o.png" className='img-fluid mt-2' />
            <div className="row">
                {datos.map((v, i) => {
                    return (<div key={i}>
                        <Information key={i} nombre={v.nombre} telefono={v.telefono} sitioweb={v.sitioWeb} correo={v.correo} descripcion={v.descripcion} imagen={v.fotoEntidadFinanciadoraId}></Information>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}