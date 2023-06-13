import axios from "axios";
import { importAdmins, importDocents, importLider, importStudents } from "./functions_general";
import { Navigate } from "react-router-dom";

export const MiPerfilDocente = async () => {
  let zelda = "http://144.22.32.132:8080/docente/" + (JSON.parse(localStorage.getItem('session'))).email;
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })
  let temp_user = importDocents([value.data])[0]
  console.log(temp_user)
  zelda = 'http://144.22.32.132:8080/coordinador/foto/'
  let foto = '';
  let archivo = '';
  try {
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
  catch {
    foto = '';
    archivo = '';
  }
  localStorage.setItem("MY_PROFILE_INFO", JSON.stringify({ ...temp_user, contrasenia: "", foto: { "archivo": archivo, "direccion": foto } }))
  return true;
}

export const GestionarDocente = async () => {

  let zelda = "http://144.22.32.132:8080/docente/" + (localStorage.getItem('DOCENTE_EMAIL'));
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })
  let temp_user = importDocents([value.data])[0]
  zelda = 'http://144.22.32.132:8080/coordinador/foto/'
  let foto = '';
  let archivo = '';
  try {
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
  catch {
    foto = '';
    archivo = '';
  }
  localStorage.setItem("DOCENTE_INFORMATION", JSON.stringify({ ...temp_user, contrasenia: "", foto: { "archivo": archivo, "direccion": foto } }))
  return true;
}


export const ListarDocentes = async () => {
  let zelda = "http://144.22.32.132:8080/docente/listar";
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })
  let temp_user = importDocents(value.data)
  localStorage.setItem("LISTA_DOCENTES", JSON.stringify(temp_user))
  return true;
}

export const MiPerfilEstudiante = async () => {
  //localStorage.setItem('session', JSON.stringify({"email": "Jany.Viddah@gmail.com", "rol": "estudiante"}))
  const email = (JSON.parse(localStorage.getItem('session'))).email
  let zelda = "http://144.22.32.132:8080/estudiante/" + email;
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })
  let temp_user = importStudents([value.data])[0]
  zelda = 'http://144.22.32.132:8080/coordinador/foto/'
  let foto;
  let archivo;
  try {
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
  catch (error) {
    foto = ''
    archivo = ''
  }
  localStorage.setItem("MY_PROFILE_INFO", JSON.stringify({ ...temp_user, contrasenia: "", foto: { "archivo": archivo, "direccion": foto } }))
  return true;
}

export const GestionarEstudiante = async () => {
  let zelda = "http://144.22.32.132:8080/estudiante/" + (localStorage.getItem('ESTUDIANTE_EMAIL'));

  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })
  let temp_user = importStudents([value.data])[0]
  zelda = 'http://144.22.32.132:8080/coordinador/foto/'
  let foto = '';
  let archivo = '';

  try {
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
  catch {
    foto = '';
    archivo = '';
  }
  localStorage.setItem("ESTUDIANTE_INFORMATION", JSON.stringify({ ...temp_user, contrasenia: "", foto: { "archivo": archivo, "direccion": foto } }))
  return true;
}

export const MiPerfilAdministrativo = async () => {
  let zelda = "http://144.22.32.132:8080/administrativo/" + (JSON.parse(localStorage.getItem('session'))).email;
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })

  let temp_user = importAdmins([value.data])[0]
  temp_user.contrasenia = '-'
  zelda = 'http://144.22.32.132:8080/coordinador/foto/'
  let foto = '';
  let archivo = '';
  try {
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
  catch {
    foto = '';
    archivo = '';
  }
  localStorage.setItem("MY_PROFILE_INFO", JSON.stringify({ ...temp_user, foto: { "archivo": archivo, "direccion": foto } }))
  return true
}

export const GestionarAdministrativo = async () => {
  let zelda = "http://144.22.32.132:8080/administrativo/" + (localStorage.getItem('ADMINISTRATIVO_EMAIL'));
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })

  let temp_user = importAdmins([value.data])[0]
  temp_user.contrasenia = '-'
  zelda = 'http://144.22.32.132:8080/coordinador/foto/'
  let foto = '';
  let archivo = '';
  try {
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
  catch {
    foto = '';
    archivo = '';
  }
  localStorage.setItem("ADMINISTRATIVO_INFORMATION", JSON.stringify({ ...temp_user, foto: { "archivo": archivo, "direccion": foto } }))
  return true
}

export const MiPerfilLider = async () => {
  const email = (JSON.parse(localStorage.getItem('session'))).email
  let zelda = "http://144.22.32.132:8080/coordinador/" + email;
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })

  let temp_user = importLider([value.data])[0]
  zelda = 'http://144.22.32.132:8080/coordinador/foto/'
  let foto;
  let archivo;
  try {
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
  catch {
    foto = ''
    archivo = ''
  }
  localStorage.setItem("MY_PROFILE_INFO", JSON.stringify({ ...temp_user, contrasenia: "-", foto: { archivo: archivo, direccion: foto } }))

  return true;
}

export const GestionarLider = async () => {
  const email = (localStorage.getItem('LIDER_EMAIL'))
  let zelda = "http://144.22.32.132:8080/coordinador/" + email;
  const value = await axios.get(zelda, {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  })

  let temp_user = importLider([value.data])[0]
  zelda = 'http://144.22.32.132:8080/coordinador/foto/'
  let foto;
  let archivo;
  try {
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
  catch {
    foto = ''
    archivo = ''
  }
  localStorage.setItem("LIDER_INFORMATION", JSON.stringify({ ...temp_user, contrasenia: "-", foto: { archivo: archivo, direccion: foto } }))

  return true;
}

export const GestionarEntidad = async () => {
  const email = (localStorage.getItem('ENTIDAD_EMAIL'))
  const config = {
    headers: {
      "X-Softue-JWT": localStorage.getItem('token_access')
    }
  }
  const entidad = (await axios.get('http://144.22.32.132:8080/entidadFinanciadora/' + email, config)).data
  console.log(entidad)
  let foto;
  let archivo;
  try {
    foto = await axios.get('http://144.22.32.132:8080/entidadFinanciadora/foto/' + email, {
      ...config,
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
  catch {
    foto = ''
    archivo = ''

  }
  localStorage.setItem("ENTIDAD_INFORMATION", JSON.stringify({ ...entidad, "foto": { archivo: archivo, direccion: foto } }))

  return true;
}

export function CerrarSesion(navigate){
  navigate('/login')
  localStorage.clear();
}





