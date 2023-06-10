import axios from "axios";
import React, { useEffect, useState } from 'react'
import Information from './Lider_Info_Entidad_Financiadora'

export default function EntidadesFinanciadoras() {
  const datos = JSON.parse(localStorage.getItem("ENTIDAD_INFORMATION"))

  return (
    <div className="container">
      <h3 className="ms-5 mt-5">Información de la entidad financiadora</h3>
      <Information
        nombre={datos.nombre}
        telefono={datos.telefono}
        sitioweb={datos.sitioWeb}
        correo={datos.correo}
        descripcion={datos.descripcion}
        foto={datos.foto}
      />
    </div>
  )
}