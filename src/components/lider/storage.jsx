
const StorageTest = ()=>{

    return <button onClick={()=>{localStorage.setItem("Estudiante", "1"); console.log(localStorage.getItem("Estudiante"))}}>Guardar datos</button>;
}

const Button = () => {
    return <button>Hello world</button>
}

export default StorageTest;