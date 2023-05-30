import axios from "axios";

const generarToken=()=>{
    axios.post('http://localhost:8080/login',{
        
        email: 'jose21xdd@gmail.com',
        password: 'pepe'
        
    }).then((response)=>{
        console.log(response.data.token)
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