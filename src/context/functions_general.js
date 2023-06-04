export function toLiderFormatStudentsFromImport(students){
    // const grades = {
    //     "primero":"Primero",
    //     "segundo":"Segundo",
    //     "tercero":"Tercero",
    //     "cuarto":"Cuarto",
    //     "quinto":"Quinto",
    //     "sexto":"Sexto",
    //     "septimo":"Séptimo",
    //     "octavo":"Octavo",
    //     "noveno":"Noveno",
    //     "decimo":"Décimo",
    //     "once": "Once",
    // }

    // return students.map((student,i)=>{
    //     student.curso = grades[student.curso]
    //     setDateAndYearsOld(student)
    //     student.sexo = setGenreToImport(student)
    //     student.nombre_acudiente = student.nombreAcudiente
    //     console.log(i,student)
    //     return student;

    // });
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

export function contraseniaNoCumple(password){
   return !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+]).{6,}$/.test(password)
}

export function importAdmins(admins){

    return admins.map((elemento)=>{
        elemento.sexo = setGenreToExport(elemento)
        setDateAndYearsOld(elemento)
        return elemento
    })
}

export function importDocents(docentes){
    
    return docentes.map((elemento)=>{
        elemento.sexo = setGenreToImport(elemento)
        setDateAndYearsOld(elemento)
        elemento.area= elemento.area.charAt(0).toUpperCase() + elemento.area.slice(1)
        return elemento
    })
}

export function exportDocents(docentes){

    return docentes.map((elemento)=>{
        elemento.sexo = setGenreToExport(elemento)
        elemento.area= elemento.area.toLowerCase()
        elemento.tipoUsuario = 'docente'
        return elemento
    })

}