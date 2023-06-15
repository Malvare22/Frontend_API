import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function TablaMaterialIdea(props) {

    const[material, setMaterial] = useState([]);
    const getMaterial = async () => {
        try {
            let urls;
            if(props.tipo !== "")  urls='http://146.235.246.199:8080/formato/material'+props.tipo;
            else  urls='http://146.235.246.199:8080/formato/materialGeneral';
            const response = await axios.get(urls, {
                headers: { "X-Softue-JWT": localStorage.getItem("token_access") }
            });
            const data = response.data;
            setMaterial(data);
        } catch (error) {
            if (error.response) {
                console.log('Código de estado:', error.response.status);
                console.log('Respuesta del backend:', error.response.data);
            } else if (error.request) {
                console.log('No se recibió respuesta del backend');
            } else {
                console.log('Error al realizar la solicitud:', error.message);
            }
        }
    };

    const getArchi = async (id) => {
        let value = null;
        //let URL = 'http://144.22.37.238:8080/ideaNegocio/recuperarDocumento/' + props.nombre;
        let URL = 'http://146.235.246.199:8080/formato/recuperar/'+id;
        axios.get(URL, { responseType: 'blob', headers: { "X-Softue-JWT": localStorage.getItem("token_access") } }
        ).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');

                // Obtener la extensión del nombre de archivo del encabezado Content-Type
                const contentType = response.headers['content-type'];
                const extension = contentType === 'application/octet-stream' ? '.docx' : '.pdf';

                link.href = url;
                link.setAttribute('download', `documento${extension}`); // Establecer el nombre del archivo con la extensión obtenida
                document.body.appendChild(link);
                link.click();

                // Limpiar el enlace temporal después de la descarga
                link.parentNode.removeChild(link);
            }).catch(error => {
                if (error.response) {
                    console.log('Código de estado:', error.response.status);
                    console.log('Respuesta del backend:', error.response.data);
                } else if (error.request) {
                    console.log('No se recibió respuesta del backend');
                } else {
                    console.log('Error al realizar la solicitud:', error.message);
                }
            });
    };

    


    useEffect(() => {
        getMaterial();
     }, []);

    return (
        <Sdiv>
            <div className='w-auto m-2'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col-auto">Tipo de material</th>
                            <th className='text-center' scope="col-auto">Fecha de creación</th>
                            <th className='text-center' scope="col-auto">Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                         {material && material.map((d,i) => ( 
                            <tr key={i}>
                                <td className='text-center align-middle col-auto'>Documento</td>
                                <td className='text-center align-middle'>{d.fechaCreacion[2]}/{d.fechaCreacion[1]}/{d.fechaCreacion[0]}</td>
                                <td className='text-center align-middle col-auto'>
                                    <button type="button" className="btn" onClick={()=>{getArchi(d.id)}} /*value={d.id}*/ style={{ width: "auto", border: "none" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Sdiv>
    );
}

const Sdiv = styled.div`
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
      }}
`;











