import axios from "axios";
import { importDocents } from "./functions_general";

export const MiPerfilDocente=async()=>{
    let zelda = "http://localhost:8080/docente/" + (JSON.parse(localStorage.getItem('session'))).email;
    const value = await axios.get(zelda, {
      headers: {
        "X-Softue-JWT": localStorage.getItem('token_access')
      }
    })
    let temp_user = importDocents([value.data])[0]
    console.log(temp_user)
    zelda = 'http://localhost:8080/coordinador/foto/'
    let foto='';
    let archivo='';
    try{
      foto = await axios.get(zelda + value.data.codigo, {
        headers: {
          "X-Softue-JWT": localStorage.getItem('token_access')
        },
        responseType: 'arraybuffer' // asegúrate de especificar el tipo de respuesta como arraybuffer
      }).then(response => {
        const base64Image = btoa(
          new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const imageUrl = `data:${response.headers['content-type']};base64,${base64Image}`;
        return imageUrl;
      });
      archivo = await fetch(foto).then(response => response.blob())
    }
    catch{
      foto='';
      archivo='';
    }
    localStorage.setItem("MY_PROFILE_INFO", JSON.stringify({ ...temp_user, contrasenia: "", foto: { "archivo": archivo, "direccion": foto } }))
    return true;
  }