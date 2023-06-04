import axios from "axios";
import { importDocents, importStudents } from "./functions_general";

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

  export const GestionarDocente=async()=>{

    let zelda = "http://localhost:8080/docente/" + (localStorage.getItem('DOCENTE_EMAIL'));
    const value = await axios.get(zelda, {
      headers: {
        "X-Softue-JWT": localStorage.getItem('token_access')
      }
    })
    let temp_user = importDocents([value.data])[0]
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
    localStorage.setItem("DOCENTE_INFORMATION", JSON.stringify({ ...temp_user, contrasenia: "", foto: { "archivo": archivo, "direccion": foto } }))
    return true;
  }


export const ListarDocentes = async () => {
  let zelda = "http://localhost:8080/docente/listar";
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })
  let temp_user = importDocents(value.data)
  localStorage.setItem("LISTA_DOCENTES", JSON.stringify(temp_user))
  return true;
}

export const MiPerfilEstudiante = async ()=>{
  //localStorage.setItem('session', JSON.stringify({"email": "Jany.Viddah@gmail.com", "rol": "estudiante"}))
  const email=(JSON.parse(localStorage.getItem('session'))).email
  let zelda = "http://localhost:8080/estudiante/" + email;
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })
  let temp_user = importStudents([value.data])[0]
  zelda = 'http://localhost:8080/coordinador/foto/'
  let foto;
  let archivo;
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
    const blob = await fetch(foto).then(response => response.blob());
    archivo = new File([blob], "IMG.png", { type: "image/png" });
  }
  catch (error){
      foto=''
      archivo = ''
  }
  localStorage.setItem("MY_PROFILE_INFO", JSON.stringify({ ...temp_user, contrasenia: "", foto: { "archivo": archivo, "direccion": foto } }))
    return true;
}

export const GestionarEstudiante=async()=>{
  let zelda = "http://localhost:8080/estudiante/" + (localStorage.getItem('ESTUDIANTE_EMAIL'));

  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })
  let temp_user = importStudents([value.data])[0]
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
  localStorage.setItem("ESTUDIANTE_INFORMATION", JSON.stringify({ ...temp_user, contrasenia: "", foto: { "archivo": archivo, "direccion": foto } }))
  return true;
}

// const getAllInfoDocent = async () => {
//   let zelda = "http://localhost:8080/docente/" + localStorage.getItem('DOCENTE_EMAIL');
//   const value = await axios.get(zelda, {
//     headers: {
//       "X-Softue-JWT": localStorage.getItem('token_access')
//     }
//   })
//   let temp_user = importDocents([value.data])[0]

//   zelda = 'http://localhost:8080/coordinador/foto/'
//   let foto;
//   try {
//     foto = await axios.get(zelda + value.data.codigo, {
//       headers: {
//         "X-Softue-JWT": localStorage.getItem('token_access')
//       },
//       responseType: 'arraybuffer' // asegúrate de especificar el tipo de respuesta como arraybuffer
//     }).then(response => {
//       const base64Image = btoa(
//         new Uint8Array(response.data)
//           .reduce((data, byte) => data + String.fromCharCode(byte), '')
//       );
//       const imageUrl = `data:${response.headers['content-type']};base64,${base64Image}`;
//       return imageUrl;
//     });
//     await fetch(foto).then(response => response.blob())

//   }
//   catch{
//     foto='';
//   }

//   localStorage.setItem("INFO_DOCENTES", JSON.stringify({ ...temp_user, contrasenia: "", foto: { "archivo": foto, "direccion": foto } }))
//   return true;
// }