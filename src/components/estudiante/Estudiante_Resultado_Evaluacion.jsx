import axios from "axios";
import styled from "styled-components";
import React, { useEffect, useState } from 'react';

export default function Estudiante_Evaluacion() {

    const [componentes, setComponentes] = useState([]);
    var localData = localStorage.getItem("MY_PROFILE_INFO");
    var parsedData = JSON.parse(localData);
    var codigoEstudiante = parsedData.codigo;
    var estadoCapacitacion = parsedData.capacitacionAprobada;

    const getEvaluacion = async () => {

        let value = await axios.get("http://localhost:8080/test/resultadosEstudiante/" + codigoEstudiante, { headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const data = response.data;
                return data;
            }).catch(error => {
                console.error(error);
            });

            console.log(value);
        setComponentes(value);

    };

    useEffect(() => {
        getEvaluacion();
    }, []);

    return (
        <main>
            <Style>
                <div className="container" style={{ width: "80%" }}>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center align-items-center">
                            <p id="prueba"><b>El resultado de su evaluación es : </b></p>
                        </div>

                        {estadoCapacitacion === "aprobada" ?

                            <div className="col-6 d-flex justify-content-center align-items-center">
                                <p id="porcentajeAprobado">25%</p>
                            </div>

                            :

                            <div className="col-6 d-flex justify-content-center align-items-center">
                                <p id="porcentajeReprobado">25%</p>
                            </div>

                        }

                        <div className='w-auto m-2'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className='text-center' scope="col-auto">Componente</th>
                                        <th className='text-center' scope="col-auto">Calificación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {componentes && componentes.map((d, i) => (
                                        <tr key={i}>
                                            <td className='text-center align-middle col-auto'>{d.nombre}</td>
                                            <td className='text-center align-middle col-auto'>{d.valor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </Style>
        </main>
    )
};

const Style = styled.div`

#prueba{
    font-size: x-large;
}

#porcentajeAprobado{
    font-family: 'Bebas Neue', sans-serif;
    font-size: 120px;
    color: #75C47D;
}

#porcentajeReprobado{
    font-family: 'Bebas Neue', sans-serif;
    font-size: 120px;
    color: #DC4B4B;
}

table{
    table-layout: fixed;
}

th, td {
    border: 1px solid;
    width: 100px;
    word-wrap: break-word;
}

table th{
    background-color: #1C3B57;
    color: #FFF;
}

table td{
    background-color:#FFF;
}

    overflow-y: scroll;
    height: fit-content;
    max-height: 66.4vh;

@media screen and (max-width: 576px){
    th, td {
        width: 60px;
    }
}

`
