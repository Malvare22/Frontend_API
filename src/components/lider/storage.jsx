import axios from "axios";

const generarToken=()=>{
    axios.post('http://146.235.246.199:8080/login',{
        
        email: 'Ericka.Eckblad@gmail.com',
        password: 'Ericka2022-07-13'
        
    }).then((response)=>{

        localStorage.setItem('token_access', response.data.token)
    })
}

const StorageTest = ()=>{

    return <button onClick={generarToken}>Guardar datos</button>;
}

const Button = () => {
    return <button>Generar token!</button>
}

export default StorageTest;












