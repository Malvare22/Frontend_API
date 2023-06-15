import axios from "axios";
import React, { useEffect, useState } from 'react'
import Information from './Estudiante_Info_Entidad_Financiadora'

export default function EntidadesFinanciadoras() {
  const [datos, setDatos] = useState([]);

  const entidad_Financiadora = async () => {
    try {
      const response = await axios.get('http://146.235.246.199:8080/entidadFinanciadora', {
        headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
      });

      const newData = response.data.map(
        (v) => {
          let foto;
          console.log(v)
          if (v.fotoEntidadFinanciadoraId === null) {
            foto = ""
          }
          else {
            // Establecer la fuente de la imagen como el string Base64
            foto = "data:image/png;base64," + v.fotoEntidadFinanciadoraId.foto;
          }
          return { ...v, "foto": foto }
        }
      )

      setDatos(newData)
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    entidad_Financiadora();
  }, []);

  const getFoto = async (email) => {

  }

  return (
    <div className="container">
      <img src="https://live.staticflickr.com/65535/52923106446_5eeaffda21_o.png" className='img-fluid mt-2' />
      <div className="row">
        {datos.map((v, i) => {
          return (<div key={i}>
            <Information key={i} nombre={v.nombre} telefono={v.telefono} sitioweb={v.sitioWeb} correo={v.correo} descripcion={v.descripcion} foto={v.foto}></Information>
          </div>
          );
        })}
      </div>
    </div>
  )
}












