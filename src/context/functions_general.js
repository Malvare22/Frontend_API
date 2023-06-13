import axios from "axios";

export function toLiderFormatStudentsFromImport(students){
    

    return students.map((student,i)=>{
        student.curso= student.area.charAt(0).toUpperCase() + student.curso.slice(1)
        setDateAndYearsOld(student)
        student.sexo = setGenreToImport(student)
        student.nombre_acudiente = student.nombreAcudiente
        console.log(i,student)
        return student;

    });
}

export function importStudents(students){
    
    return students.map((student)=>{
        const split = (student.curso).split('-')
        student.cursoToString = student.curso
        student.curso= split[0]
        student.subcurso = split[1]
        setDateAndYearsOld(student)
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

const setDateAndYearsOld=(user)=>{
    const date = user.fecha_nacimiento[0]+"-"+user.fecha_nacimiento[1]+"-"+user.fecha_nacimiento[2];
    const today = new Date()
    const birth = Date.parse(date);
    const ans = new Date(today-birth)
    user.edad = ans.getUTCFullYear()-1970
    user.fecha_nacimiento = new Date(date).toISOString().split('T')[0];
}

export function toLiderFormatStudentsToExport(students){
    const grades = {
        "Primero":"primero",
        "Segundo":"segundo",
        "Tercero":"tercero",
        "Cuarto":"cuarto",
        "Quinto":"quinto",
        "Sexto":"sexto",
        "Séptimo":"septimo",
        "Octavo":"octavo",
        "Noveno":"noveno",
        "Décimo":"decimo",
        "Once":"once",
    }
    return students.map((student)=>{
        student.curso = grades[student.curso]
        student.sexo = setGenreToExport(student)
        student.nombreAcudiente = student.nombre_acudiente

        return student
    })

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
        setDateAndYearsOld(elemento)
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
        setDateAndYearsOld(elemento)
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
        setDateAndYearsOld(elemento)
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
        const value = await axios.get('http://144.22.32.132:8080/areaConocimiento', config).then(response => response.data)
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



