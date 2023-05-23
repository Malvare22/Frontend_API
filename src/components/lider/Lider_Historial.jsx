import axios from "axios";
import React, { useEffect, useState } from 'react'
import Evaluaciones from "./Lider_Evaluacion";

export default function Historial() {

    const [datos, setDatos] = useState([]);

    const definir_Estado = async () => {
        let value = null;
        value = await axios.get('../ideas.json').then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });
        setDatos(value)
    };
    useEffect(() => {
        definir_Estado();

    }, []);

    return (
        <div className="container">
            <div className="row">
                {datos.map((v, i) => {

                    let color = "";
                    let estado = "";
                    if (v.estado === "a") {
                        color = "#75C47D";
                        estado = "Aprobado";
                    } else if (v.estado === "r") {
                        color = "#DC4B4B";
                        estado = "Reprobado";
                    } else {
                        color = "#B4B4B4";
                        estado = "NA";
                    }


                    return (<div key={i}>
                        <Evaluaciones key={i} estado={estado} color={color} fecha={v.fecha_creacion} observacion={v.observacion} identificador={i}></Evaluaciones>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}
