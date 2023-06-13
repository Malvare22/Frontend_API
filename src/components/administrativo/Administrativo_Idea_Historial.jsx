import axios from "axios";
import React, { useEffect, useState } from 'react'
import Evaluaciones from "./Administrativo_Idea_Evaluacion";

export default function Historial(props) {

    const [datos, setDatos] = useState([]);

    const definir_Estado = async () => {
        let value = null;
        //let URLs='http://144.22.37.238:8080/ideaNegocio/evaluacion/'+props.nombre;
        let URLs = 'http://144.22.32.132:8080/ideaNegocio/evaluacion/' + props.nombre;
        value = await axios.get(URLs, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
            //let URLs='http://144.22.32.132:8080/ideaNegocio/evaluacion/'+props.nombre;
            //value = await axios.get(URLs,{headers: { "X-Softue-JWT": props.Token /*localStorage.getItem("token_access")*/}}

        ).then(
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
                    let aprov = 0;
                    let recha = 0;
                    let gris = 0;
                    datos[i].calificacionesInfo.map((l) => {
                        if (l.estado === "aprobada") {
                            aprov = aprov + 1;
                        } else if (l.estado === "rechazada") {
                            recha = recha + 1;
                        } else {
                            gris = gris + 1;
                        }
                    })
                    let color = "";
                    let estado = "";
                    if (aprov >= 2) {
                        color = "#75C47D";
                        estado = "Aprobada";
                    } else if (recha >= 2) {
                        color = "#DC4B4B";
                        estado = "Reprobado";
                    } else {
                        color = "#B4B4B4";
                        estado = "NA";
                    }

                    return (<div key={i}>
                        <Evaluaciones nombre={props.nombre} key={i} estado={estado} color={color} fecha={v.fecha_creacion} identificador={i}></Evaluaciones>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}








