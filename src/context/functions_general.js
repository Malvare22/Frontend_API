import axios from "axios";


export function importStudents(students){
    
    return students.map((student)=>{
        const split = (student.curso).split('-')
        student.cursoToString = student.curso
        student.curso= split[0]
        student.subcurso = split[1]
        student.sexo = setGenreToImport(student)
        student.nombre_acudiente = student.nombreAcudiente
        return student;

    });
}

const setGenreToImport = (user)=>{
    return user.sexo == 'M'? 'Masculino':'Femenino';
}

const setGenreToExport = (user)=>{
    return user.sexo == 'Masculino'? 'M':'F';
}

export function exportStudents(students){
    
    return students.map((student)=>{
        student.curso= student.curso + "-" + student.subcurso
        student.sexo = setGenreToExport(student)
        student.nombreAcudiente = student.nombre_acudiente
        student.tipoUsuario = 'estudiante'
        return student
    })

}

export function contraseniaNoCumple(password){
   return !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+]).{6,}$/.test(password)
}

export function importAdmins(admins){

    return admins.map((elemento)=>{
        elemento.sexo = setGenreToImport(elemento)
        return elemento
    })
}

export function exportAdmins(admins){

    return admins.map((elemento)=>{
        elemento.sexo = setGenreToExport(elemento)
        elemento.tipoUsuario = 'administrativo'
        return elemento
    })
}

export function importDocents(docentes){
    
    return docentes.map((elemento)=>{
        elemento.sexo = setGenreToImport(elemento)
        elemento.areaToString= elemento.area.charAt(0).toUpperCase() + elemento.area.slice(1)
        return elemento
    })
}

export function exportDocents(docentes){

    return docentes.map((elemento)=>{
        elemento.sexo = setGenreToExport(elemento)
        elemento.tipoUsuario = 'docente'
        return elemento
    })

}

export function importLider(admins){

    return admins.map((elemento)=>{
        elemento.sexo = setGenreToImport(elemento)
        elemento.contrasenia = '-'
        return elemento
    })
}

export function exportLider(admins){

    return admins.map((elemento)=>{
        elemento.sexo = setGenreToExport(elemento)
        elemento.tipoUsuario = 'coordinador'
        return elemento
    })
}

export async function loadAreas(setAreas){
    try {
        const config = {
            headers: {
                "X-Softue-JWT": localStorage.getItem('token_access')
            }
        }
        const value = await axios.get('http://146.235.246.199:8080/areaConocimiento', config).then(response => response.data)
        setAreas(value.map((area)=> area.nombre))
    }
    catch (error) {
        let msg = '';
        if (error.response) {
            console.log('Código de estado:', error.response.status);
            msg = "Error " + error.response.status + ": " + error.response.data.errorMessage;
        } else if (error.request) {
            msg = 'Error: No se recibió respuesta de la base de datos';
        } else {
            msg = "Error al realizar la solicitud: " + error.message;
        }
        alert(msg)
    }
}









