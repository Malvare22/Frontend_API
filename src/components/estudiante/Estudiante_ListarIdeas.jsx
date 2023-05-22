import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from 'reactstrap';
import CardEs from './Estudiante_Card_Idea';





export default function Estudiante_ListarIdeas() {



    const [datos, setDatos] = useState([]);

    const definir_Color = async () => {
        let value = null;
        value = await axios.get('../ideas.json').then(
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
        <div className="container">
            <div className="row">
                {datos.map((v, i) => {

                    let color = "";
                    if (v.estado === "a") {
                        color = "#75C47D";
                    } else if (v.estado === "r") {
                        color = "#DC4B4B";
                    } else {
                        color = "#ECB904";
                    }

                    return (<div key={i} className="col-12 col-lg-4 col-sm-6">
                        <CardEs key={v.titulo} titulo={v.titulo} color={color}></CardEs>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}
